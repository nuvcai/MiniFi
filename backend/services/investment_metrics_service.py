import yfinance as yf
import pandas as pd
import numpy as np
from typing import Dict, Any, List
from datetime import datetime, timedelta


class InvestmentMetricsService:
    def __init__(self):
        pass

    async def calculate_investment_metrics(
        self,
        ticker: str,
        start_date: str,
        end_date: str,
        initial_investment: float = 100000
    ) -> Dict[str, Any]:
        """
        Calculate comprehensive investment metrics from real historical data
        """
        try:
            # Fetch real historical data
            stock_data = yf.download(
                ticker, start=start_date, end=end_date, progress=False, auto_adjust=True
            )

            if stock_data.empty or len(stock_data) == 0:
                return self._get_default_metrics()

            # Calculate daily returns
            stock_data['Returns'] = stock_data['Close'].pct_change()
            # Fill NaN returns with 0 for the first day
            stock_data['Returns'] = stock_data['Returns'].fillna(0)

            # Calculate portfolio value over time
            stock_data['Portfolio_Value'] = initial_investment * \
                (1 + stock_data['Returns']).cumprod()

            # Calculate metrics
            total_return = (
                stock_data['Portfolio_Value'].iloc[-1] - initial_investment) / initial_investment
            final_value = stock_data['Portfolio_Value'].iloc[-1]

            # Volatility (annualized)
            volatility = stock_data['Returns'].std() * np.sqrt(252)

            # Sharpe ratio (assuming risk-free rate of 2%)
            risk_free_rate = 0.02
            excess_returns = stock_data['Returns'] - risk_free_rate / 252
            if stock_data['Returns'].std() > 0:
                sharpe_ratio = excess_returns.mean(
                ) / stock_data['Returns'].std() * np.sqrt(252)
            else:
                sharpe_ratio = 0.0

            # Maximum drawdown
            cumulative_returns = (1 + stock_data['Returns']).cumprod()
            running_max = cumulative_returns.expanding().max()
            drawdown = (cumulative_returns - running_max) / running_max
            max_drawdown = drawdown.min()

            # Annualized return
            days = len(stock_data)
            annualized_return = (
                (final_value / initial_investment) ** (365 / days)) - 1

            # Prepare chart data
            chart_data = self._prepare_chart_data(
                stock_data, initial_investment)

            # Handle NaN values for JSON serialization
            def safe_float(value):
                if pd.isna(value) or np.isnan(value) or np.isinf(value):
                    return 0.0
                return float(value)

            return {
                "total_return": safe_float(total_return * 100),
                "final_value": safe_float(final_value),
                "volatility": safe_float(volatility * 100),
                "sharpe_ratio": safe_float(sharpe_ratio),
                "max_drawdown": safe_float(max_drawdown * 100),
                "annualized_return": safe_float(annualized_return * 100),
                "chart_data": chart_data,
                "data_points": len(stock_data),
                "start_date": start_date,
                "end_date": end_date,
                "ticker": ticker,
                "initial_investment": initial_investment
            }

        except Exception as e:
            print(f"Error calculating metrics for {ticker}: {e}")
            import traceback
            traceback.print_exc()
            return self._get_default_metrics()

    def _prepare_chart_data(self, stock_data: pd.DataFrame, initial_investment: float) -> List[Dict[str, Any]]:
        """Prepare chart data for frontend visualization"""
        chart_data = []

        # Define safe_value function outside the loop for better performance
        def safe_value(value):
            # Handle pandas Series properly
            if hasattr(value, 'iloc'):
                val = value.iloc[0]
            else:
                val = value

            # Handle NaN values
            if pd.isna(val) or np.isnan(val) or np.isinf(val):
                return 0.0
            return float(val)

        for date, row in stock_data.iterrows():
            chart_data.append({
                "date": date.strftime("%Y-%m-%d"),
                "portfolio_value": safe_value(row['Portfolio_Value']),
                "price": safe_value(row['Close']),
                "volume": safe_value(row['Volume'])
            })

        return chart_data

    def _get_default_metrics(self) -> Dict[str, Any]:
        """Return default metrics when data is unavailable"""
        return {
            "total_return": 0.0,
            "final_value": 100000.0,
            "volatility": 15.0,
            "sharpe_ratio": 0.0,
            "max_drawdown": -10.0,
            "annualized_return": 0.0,
            "chart_data": [],
            "data_points": 0,
            "start_date": "",
            "end_date": "",
            "ticker": "",
            "initial_investment": 100000.0
        }

    def _get_historical_ticker(self, ticker: str, event_year: int) -> str:
        """
        Get the appropriate ticker for historical periods when some assets didn't exist.
        Maps modern ETFs/assets to appropriate proxies for historical periods.
        """
        # Historical asset mapping for different periods
        # Key: Modern ticker -> Value: Dict of year -> appropriate proxy
        historical_mapping = {
            # ================================================================
            # GOLD & COMMODITIES
            # ================================================================
            "GLD": {  # Gold ETF - created 2004
                1990: "^GSPC",  # Use S&P 500 as stable proxy (Gold ETF didn't exist)
                1997: "^GSPC",  # Use S&P 500 as proxy
                2000: "^GSPC",  # Use S&P 500 as proxy
                2008: "GLD",    # GLD ETF available
                2020: "GLD",    # GLD ETF
                2025: "GLD",    # GLD ETF
            },
            "DJP": {  # Bloomberg Commodity Index - created 2006
                1990: "^GSPC",  # Use S&P 500 as proxy
                1997: "^GSPC",  # Use S&P 500 as proxy
                2000: "^GSPC",  # Use S&P 500 as proxy
                2008: "DJP",    # Available from 2006
                2020: "DJP",    # DJP
                2025: "DJP",    # DJP
            },
            
            # ================================================================
            # CRYPTOCURRENCY
            # ================================================================
            "BTC-USD": {  # Bitcoin - launched 2009, data from ~2014
                1990: "^IXIC",  # NASDAQ as tech proxy
                1997: "^IXIC",  # NASDAQ as tech proxy
                2000: "^IXIC",  # NASDAQ as tech proxy
                2008: "^IXIC",  # NASDAQ as tech proxy
                2020: "BTC-USD",  # Bitcoin available
                2025: "BTC-USD",  # Bitcoin
            },
            "ETH-USD": {  # Ethereum - launched 2015, data from ~2017
                1990: "^IXIC",  # NASDAQ as tech proxy
                1997: "^IXIC",  # NASDAQ as tech proxy
                2000: "^IXIC",  # NASDAQ as tech proxy
                2008: "^IXIC",  # NASDAQ as tech proxy
                2020: "ETH-USD",  # Ethereum available
                2025: "ETH-USD",  # Ethereum
            },
            
            # ================================================================
            # CURRENCY
            # ================================================================
            "UUP": {  # US Dollar ETF - created 2007
                1990: "^TYX",  # 30-year Treasury as safe asset proxy
                1997: "^TYX",  # 30-year Treasury as safe asset proxy
                2000: "^TYX",  # 30-year Treasury as safe asset proxy
                2008: "UUP",   # UUP ETF available
                2020: "UUP",   # UUP ETF
                2025: "UUP",   # UUP ETF
            },
            "^IRX": {  # 3-month Treasury Bill rate
                1990: "^TYX",  # Use 30-year Treasury as proxy
                1997: "^TYX",  # Use 30-year Treasury as proxy
                2000: "^IRX",  # Available
                2008: "^IRX",  # Available
                2020: "^IRX",  # Available
                2025: "^IRX",  # Available
            },
            
            # ================================================================
            # SECTOR ETFs
            # ================================================================
            "XLF": {  # Financial Select Sector SPDR - created 1998
                1990: "^GSPC",  # Use S&P 500 as proxy
                1997: "^GSPC",  # Use S&P 500 as proxy
                2000: "XLF",    # XLF available from 1998
                2008: "XLF",    # XLF
                2020: "XLF",    # XLF
                2025: "XLF",    # XLF
            },
            "JETS": {  # US Global Jets ETF - created 2015
                1990: "^GSPC",  # Use S&P 500 as proxy
                1997: "^GSPC",  # Use S&P 500 as proxy
                2000: "^GSPC",  # Use S&P 500 as proxy
                2008: "^GSPC",  # Use S&P 500 as proxy
                2020: "JETS",   # JETS available
                2025: "JETS",   # JETS
            },
            "ICLN": {  # iShares Global Clean Energy - created 2008
                1990: "^GSPC",  # Use S&P 500 as proxy
                1997: "^GSPC",  # Use S&P 500 as proxy
                2000: "^GSPC",  # Use S&P 500 as proxy
                2008: "ICLN",   # ICLN available
                2020: "ICLN",   # ICLN
                2025: "ICLN",   # ICLN
            },
            
            # ================================================================
            # BOND ETFs
            # ================================================================
            "TIP": {  # iShares TIPS Bond ETF - created 2003
                1990: "^TYX",  # Use 30-year Treasury as proxy
                1997: "^TYX",  # Use 30-year Treasury as proxy
                2000: "^TYX",  # Use 30-year Treasury as proxy
                2008: "TIP",   # TIP available
                2020: "TIP",   # TIP
                2025: "TIP",   # TIP
            },
            
            # ================================================================
            # REAL ESTATE
            # ================================================================
            "VNQ": {  # Vanguard Real Estate ETF - created 2004
                1990: "^GSPC",  # Use S&P 500 as proxy
                1997: "^GSPC",  # Use S&P 500 as proxy
                2000: "^GSPC",  # Use S&P 500 as proxy
                2008: "VNQ",    # VNQ available
                2020: "VNQ",    # VNQ
                2025: "VNQ",    # VNQ
            },
        }

        # Return the appropriate ticker for the event year, or original if not in mapping
        if ticker in historical_mapping:
            year_mapping = historical_mapping[ticker]
            # Find the closest year if exact match not found
            if event_year in year_mapping:
                return year_mapping[event_year]
            else:
                # Find the closest available year
                available_years = sorted(year_mapping.keys())
                for year in available_years:
                    if event_year <= year:
                        return year_mapping[year]
                # If event_year is after all mapped years, use the latest
                return year_mapping[available_years[-1]]
        
        return ticker

    async def calculate_historical_performance(
        self,
        ticker: str,
        event_year: int
    ) -> Dict[str, Any]:
        """
        Calculate performance for a specific historical event period.
        Maps event years to actual historical date ranges for real market data.
        """
        # Define event periods based on historical events in the game
        # Each period represents a significant financial event for educational purposes
        event_periods = {
            1990: ("1990-01-01", "1990-12-31"),  # Japanese asset bubble burst
            1997: ("1997-01-01", "1997-12-31"),  # Asian Financial Crisis
            2000: ("2000-01-01", "2000-12-31"),  # Dot-com bubble burst
            2008: ("2008-01-01", "2008-12-31"),  # Global Financial Crisis
            2020: ("2020-01-01", "2020-12-31"),  # COVID-19 pandemic
            2025: ("2024-01-01", "2024-12-31"),  # Current challenges (using 2024 data)
        }

        start_date, end_date = event_periods.get(
            event_year, ("2023-01-01", "2023-12-31"))  # Default to recent data

        # Get the appropriate historical ticker (proxy for assets that didn't exist)
        historical_ticker = self._get_historical_ticker(ticker, event_year)
        
        print(f"📊 Historical Performance Request: {ticker} -> {historical_ticker} for year {event_year}")
        print(f"📅 Date range: {start_date} to {end_date}")

        return await self.calculate_investment_metrics(
            ticker=historical_ticker,
            start_date=start_date,
            end_date=end_date,
            initial_investment=100000
        )

    async def get_asset_performance_comparison(
        self,
        assets: List[str],
        start_date: str,
        end_date: str
    ) -> Dict[str, Dict[str, Any]]:
        """
        Compare performance of multiple assets over a specified period
        """
        results = {}

        for asset in assets:
            try:
                metrics = await self.calculate_investment_metrics(
                    ticker=asset,
                    start_date=start_date,
                    end_date=end_date,
                    initial_investment=100000
                )
                results[asset] = metrics
            except Exception as e:
                print(f"Error comparing asset {asset}: {e}")
                results[asset] = self._get_default_metrics()

        return results
