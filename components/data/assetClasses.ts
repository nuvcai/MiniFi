/**
 * ╔══════════════════════════════════════════════════════════════════════════════╗
 * ║   Asset Class Reference - Family Office Aligned Financial Literacy          ║
 * ║   ✨ MiniFi / Legacy Guardians Educational Content ✨                       ║
 * ║   Copyright (c) 2025 NUVC.AI / Tick.AI. All Rights Reserved.                ║
 * ╚══════════════════════════════════════════════════════════════════════════════╝
 * 
 * This file contains comprehensive asset class definitions aligned with 
 * Family Office (FO) investment standards. Use this as the central source
 * of truth for all financial literacy content.
 */

// ============================================================================
// ASSET CLASS TYPES
// ============================================================================

export type AssetClass = 
  | "equities"           // Stocks, shares, equity funds
  | "fixed_income"       // Bonds, treasuries, fixed-rate securities
  | "commodities"        // Gold, oil, agricultural products
  | "alternatives"       // Real estate, private equity, hedge funds
  | "cash"               // Cash, money market, short-term deposits
  | "cryptocurrency";    // Digital assets (high-risk alternative)

export type RiskLevel = "none" | "low" | "medium" | "high" | "extreme";

export type TimeHorizon = 
  | "short"    // 0-1 years - capital preservation
  | "medium"   // 1-5 years - balanced growth
  | "long";    // 5+ years - wealth building

export type LiquidityRating = "high" | "medium" | "low";

// ============================================================================
// ASSET CLASS DETAILED INFORMATION
// ============================================================================

export interface AssetClassInfo {
  id: AssetClass;
  name: string;
  emoji: string;
  description: string;
  educationalSummary: string;
  
  // Risk & Return Profile
  riskLevel: RiskLevel;
  typicalReturnRange: string;
  historicalVolatility: string;
  correlationWithStocks: "negative" | "low" | "moderate" | "high";
  
  // Time Horizon Guidance
  recommendedTimeHorizon: TimeHorizon;
  minHoldingPeriod: string;
  bestForGoals: string[];
  
  // Family Office Allocation Standards
  foAllocationRange: {
    conservative: string;
    moderate: string;
    aggressive: string;
  };
  
  // Liquidity
  liquidityRating: LiquidityRating;
  typicalSettlement: string;
  
  // Examples
  examples: string[];
  
  // Key Considerations
  pros: string[];
  cons: string[];
  
  // Teen-friendly explanation
  teenExplanation: string;
  
  // Generational Wealth Wisdom (FO Perspective)
  generationalWealthRole: string;
  historicalPerspective: string;
  opportunityForTeens: string;
  foWisdomSnippet: string;
}

// ============================================================================
// COMPREHENSIVE ASSET CLASS DATA
// ============================================================================

export const assetClassData: Record<AssetClass, AssetClassInfo> = {
  equities: {
    id: "equities",
    name: "Equities (Stocks)",
    emoji: "📈",
    description: "Ownership shares in publicly traded companies that offer growth potential",
    educationalSummary: "When you buy a stock, you own a tiny piece of that company. If the company does well, your share becomes more valuable!",
    
    riskLevel: "medium",
    typicalReturnRange: "8-12% annually (long-term average)",
    historicalVolatility: "15-25% annually",
    correlationWithStocks: "high",
    
    recommendedTimeHorizon: "long",
    minHoldingPeriod: "5+ years recommended",
    bestForGoals: [
      "Long-term wealth building",
      "Retirement savings",
      "College funds (10+ years away)",
      "Financial independence"
    ],
    
    foAllocationRange: {
      conservative: "20-35%",
      moderate: "40-55%",
      aggressive: "60-80%"
    },
    
    liquidityRating: "high",
    typicalSettlement: "T+2 (2 business days)",
    
    examples: [
      "Apple (AAPL) - Tech giant",
      "Microsoft (MSFT) - Software leader",
      "S&P 500 ETF - Basket of 500 top US companies",
      "Tesla (TSLA) - EV manufacturer"
    ],
    
    pros: [
      "Highest long-term growth potential",
      "Easy to buy and sell (liquid)",
      "Ownership in real companies",
      "Dividend income from some stocks",
      "Tax advantages for long-term holdings"
    ],
    
    cons: [
      "Can be volatile short-term",
      "Individual stocks can go to zero",
      "Requires patience through market cycles",
      "Emotional decision-making risk"
    ],
    
    teenExplanation: "Stocks are like owning a slice of your favorite companies! 🍕 When Apple sells more iPhones, your slice of Apple becomes worth more. But be patient - stocks go up and down like a rollercoaster. The trick is to stay on the ride long enough to see the big gains!",
    
    // NEW: Generational Wealth Context
    generationalWealthRole: "Equities are the PRIMARY engine of wealth creation. Every major fortune - Rockefeller, Carnegie, Gates, Bezos - was built through equity ownership. The stock market has turned ordinary people into millionaires more than any other asset class.",
    historicalPerspective: "Since 1926, US stocks have returned about 10% annually - doubling every 7 years! $1,000 invested in 1926 would be worth $10+ million today. No other asset class has matched this long-term wealth creation power.",
    opportunityForTeens: "As a young investor, stocks are your BEST friend because you have TIME. Market crashes (which WILL happen) become buying opportunities when you have 40+ years to wait. Your parents wish they'd started at your age!",
    foWisdomSnippet: "Family Offices typically keep 40-60% in equities for growth, but they NEVER sell during crashes. They BUY more. That's how old money stays old money."
  },
  
  fixed_income: {
    id: "fixed_income",
    name: "Fixed Income (Bonds)",
    emoji: "📊",
    description: "Loans to governments or corporations that pay regular interest",
    educationalSummary: "Bonds are like being a bank! You lend money to a government or company, and they pay you back with interest over time.",
    
    riskLevel: "low",
    typicalReturnRange: "4-7% annually",
    historicalVolatility: "5-10% annually",
    correlationWithStocks: "negative",
    
    recommendedTimeHorizon: "medium",
    minHoldingPeriod: "1-5 years",
    bestForGoals: [
      "Capital preservation",
      "Steady income generation",
      "Near-term goals (1-5 years)",
      "Reducing portfolio volatility"
    ],
    
    foAllocationRange: {
      conservative: "40-60%",
      moderate: "25-40%",
      aggressive: "10-25%"
    },
    
    liquidityRating: "high",
    typicalSettlement: "T+1 to T+2",
    
    examples: [
      "US Treasury Bonds - Government backed, safest",
      "Corporate Bonds - Higher yield, some risk",
      "Municipal Bonds - Tax-free for local projects",
      "TIPS - Inflation-protected bonds"
    ],
    
    pros: [
      "Stable, predictable income",
      "Lower risk than stocks",
      "Often rise when stocks fall (diversification)",
      "Government bonds are very safe",
      "Good for preserving capital"
    ],
    
    cons: [
      "Lower returns than stocks",
      "Inflation can erode real returns",
      "Interest rate changes affect bond prices",
      "Less exciting (but that's okay!)"
    ],
    
    teenExplanation: "Bonds are the 'chill friend' of investing 😌 They don't party as hard as stocks, but they're reliable. Imagine lending money to the government - they HAVE to pay you back with interest. It's like a guaranteed side hustle for your money!",
    
    // NEW: Generational Wealth Context
    generationalWealthRole: "Bonds are the PRESERVERS of wealth. While stocks build fortunes, bonds protect them. The wealthiest families always have 20-40% in bonds because when stocks crash 50%, bonds often RISE. This cushion lets them buy cheap stocks without selling at a loss.",
    historicalPerspective: "During the 2008 crash, stocks fell 50%. But Treasury bonds ROSE 20%+! Investors who had bonds could rebalance - selling high (bonds) to buy low (stocks). This is how sophisticated investors outperform.",
    opportunityForTeens: "You might think bonds are 'boring old people stuff' - but they're a secret weapon! Having 20-30% in bonds means when the NEXT crash happens, you'll have money to buy stocks at discount prices. Smart, not boring!",
    foWisdomSnippet: "Family Offices NEVER go 100% stocks, even with infinite time horizon. Why? Because bonds let them REBALANCE during crashes - sell bonds high, buy stocks low. It's mathematically proven to boost returns."
  },
  
  commodities: {
    id: "commodities",
    name: "Commodities",
    emoji: "🥇",
    description: "Physical goods like gold, oil, and agricultural products",
    educationalSummary: "Commodities are real, tangible stuff - gold bars, oil barrels, wheat bushels. Their value comes from what they're actually used for!",
    
    riskLevel: "medium",
    typicalReturnRange: "5-10% annually (varies widely)",
    historicalVolatility: "15-25% annually",
    correlationWithStocks: "low",
    
    recommendedTimeHorizon: "long",
    minHoldingPeriod: "3-10 years",
    bestForGoals: [
      "Inflation protection",
      "Portfolio diversification",
      "Crisis hedging (gold especially)",
      "Long-term wealth preservation"
    ],
    
    foAllocationRange: {
      conservative: "5-10%",
      moderate: "5-15%",
      aggressive: "5-10%"
    },
    
    liquidityRating: "high",
    typicalSettlement: "T+2 for ETFs",
    
    examples: [
      "Gold (GLD ETF) - Classic safe haven",
      "Silver - Industrial and precious metal",
      "Oil - Energy commodities",
      "Agricultural - Wheat, corn, soybeans"
    ],
    
    pros: [
      "Hedge against inflation",
      "Real, tangible value",
      "Diversification from stocks/bonds",
      "Gold shines during crises",
      "No counterparty risk (physical)"
    ],
    
    cons: [
      "No income (doesn't pay dividends)",
      "Storage costs for physical",
      "Can be volatile",
      "Affected by global supply/demand"
    ],
    
    teenExplanation: "Gold is like the OG of money - people have valued it for thousands of years! 🥇 When everything else seems crazy (inflation, market crashes), gold tends to hold its value. It's like having a financial security blanket!",
    
    // NEW: Generational Wealth Context
    generationalWealthRole: "Gold is the INSURANCE policy of wealth. For 5,000+ years, gold has been valuable across every civilization. When currencies collapse, governments fail, or markets crash - gold holds its value. That's why wealthy families always keep 5-10%.",
    historicalPerspective: "During the 2008 financial crisis, gold rose 25% while stocks crashed 50%. In the 1970s inflation crisis, gold went up 2,300%! It's not a growth asset - it's a PROTECTION asset against chaos.",
    opportunityForTeens: "Gold might seem old-fashioned, but it teaches an important lesson: TRUE diversification means owning things that behave DIFFERENTLY. When stocks crash and people panic, gold often shines. That's portfolio insurance!",
    foWisdomSnippet: "Every major Family Office holds 5-10% in gold or commodities. Not because they expect huge returns, but because when everything else fails, gold is the last asset standing. It's been true for 5,000 years."
  },
  
  alternatives: {
    id: "alternatives",
    name: "Alternatives",
    emoji: "🏢",
    description: "Non-traditional investments like real estate, private equity, and hedge funds",
    educationalSummary: "Alternative investments are everything BESIDES stocks, bonds, and cash. Real estate, private companies, and specialized funds that wealthy families use.",
    
    riskLevel: "medium",
    typicalReturnRange: "8-15% annually (target)",
    historicalVolatility: "10-20% annually",
    correlationWithStocks: "moderate",
    
    recommendedTimeHorizon: "long",
    minHoldingPeriod: "5-10+ years",
    bestForGoals: [
      "Diversification",
      "Income generation (REITs)",
      "Long-term wealth building",
      "Accessing unique opportunities"
    ],
    
    foAllocationRange: {
      conservative: "5-15%",
      moderate: "10-20%",
      aggressive: "15-30%"
    },
    
    liquidityRating: "low",
    typicalSettlement: "Days to months (varies)",
    
    examples: [
      "REITs - Real Estate Investment Trusts",
      "Private Equity - Investing in private companies",
      "Hedge Funds - Sophisticated investment strategies",
      "Infrastructure - Roads, bridges, utilities"
    ],
    
    pros: [
      "Diversification from traditional markets",
      "REITs provide regular income",
      "Access to real estate without buying property",
      "Potential for higher returns",
      "Less correlated with stocks"
    ],
    
    cons: [
      "Often less liquid (harder to sell quickly)",
      "Higher fees typically",
      "More complex to understand",
      "May require higher minimums"
    ],
    
    teenExplanation: "Alternatives are like the VIP section of investing! 🎪 REITs let you own pieces of shopping malls, apartments, and office buildings without buying the whole thing. Family Offices love alternatives because they don't move the same way as stocks!",
    
    // NEW: Generational Wealth Context
    generationalWealthRole: "Alternatives are how wealthy families ACCESS unique opportunities. Real estate has created more millionaires than any other asset except stocks. REITs let regular investors own pieces of billion-dollar properties. This used to be 'rich people only' - now everyone can play!",
    historicalPerspective: "The Yale Endowment revolutionized investing by putting 30%+ into alternatives. Their returns beat 99% of other universities for 30 years! They proved that diversifying BEYOND stocks and bonds creates superior long-term wealth.",
    opportunityForTeens: "REITs are your gateway to real estate investing without needing hundreds of thousands for a down payment. You can own pieces of Amazon warehouses, Apple stores, and data centers with just $100! That's generational wealth building made accessible.",
    foWisdomSnippet: "Family Offices typically hold 15-25% in alternatives (real estate, private equity, infrastructure). These assets generate INCOME (rent, dividends) while providing diversification. It's why old money stays diversified - they've seen what happens when you don't."
  },
  
  cash: {
    id: "cash",
    name: "Cash & Equivalents",
    emoji: "💵",
    description: "Highly liquid, safe assets including savings accounts and money market funds",
    educationalSummary: "Cash isn't just bills in your wallet - it includes savings accounts, money market funds, and short-term treasury bills. Super safe but doesn't grow much.",
    
    riskLevel: "none",
    typicalReturnRange: "3-5% annually (varies with rates)",
    historicalVolatility: "0-2% annually",
    correlationWithStocks: "low",
    
    recommendedTimeHorizon: "short",
    minHoldingPeriod: "No minimum - always accessible",
    bestForGoals: [
      "Emergency fund (3-6 months expenses)",
      "Near-term purchases (< 1 year)",
      "Waiting for investment opportunities",
      "Reducing portfolio risk"
    ],
    
    foAllocationRange: {
      conservative: "10-20%",
      moderate: "5-15%",
      aggressive: "0-10%"
    },
    
    liquidityRating: "high",
    typicalSettlement: "Immediate to T+1",
    
    examples: [
      "High-yield savings accounts",
      "Money Market Funds",
      "Treasury Bills (T-Bills)",
      "Certificates of Deposit (CDs)"
    ],
    
    pros: [
      "Completely safe (FDIC insured up to $250K)",
      "Always accessible when you need it",
      "No risk of loss",
      "Earns some interest",
      "Flexibility to invest elsewhere"
    ],
    
    cons: [
      "Lowest returns of all asset classes",
      "Inflation can erode purchasing power",
      "Opportunity cost (missing out on growth)",
      "Not a wealth-building tool"
    ],
    
    teenExplanation: "Cash is your 'sleep well at night' money 😴 It's boring but essential! Everyone needs an emergency fund - usually 3-6 months of expenses. Just don't keep TOO much in cash, or inflation will slowly eat away at what it can buy!",
    
    // NEW: Generational Wealth Context
    generationalWealthRole: "Cash is your OPPORTUNITY fund. Warren Buffett kept $150 BILLION in cash waiting for the right moment. When markets crashed in 2008 and 2020, he was ready to buy while others were panic selling. Cash isn't just safety - it's ammunition!",
    historicalPerspective: "In 2008, investors with cash could buy Bank of America at $3 (now $35), Apple at $3 (now $180+), and Amazon at $35 (now $180+). Those without cash could only watch. Having dry powder during crises is how fortunes are made.",
    opportunityForTeens: "Don't keep ALL your money in cash (inflation will eat it), but ALWAYS keep some ready. The next market crash will happen - that's 100% certain. When it does, those with cash become wealthy, while those fully invested can only hold on.",
    foWisdomSnippet: "Family Offices ALWAYS maintain 5-15% in cash or cash equivalents. Not because they're scared, but because they're READY. When blood is in the streets, they're the ones shopping for deals."
  },
  
  cryptocurrency: {
    id: "cryptocurrency",
    name: "Cryptocurrency",
    emoji: "₿",
    description: "Digital assets using blockchain technology - highly speculative",
    educationalSummary: "Crypto is digital money that runs on blockchain technology. Bitcoin and Ethereum are the biggest ones. Super volatile but some see it as the future of finance.",
    
    riskLevel: "extreme",
    typicalReturnRange: "-50% to +200% (extremely variable)",
    historicalVolatility: "60-100%+ annually",
    correlationWithStocks: "moderate",
    
    recommendedTimeHorizon: "long",
    minHoldingPeriod: "Only invest what you can afford to lose completely",
    bestForGoals: [
      "Speculation with high risk tolerance",
      "Technological conviction",
      "Small portfolio allocation for potential upside",
      "NOT for essential savings"
    ],
    
    foAllocationRange: {
      conservative: "0-2%",
      moderate: "0-5%",
      aggressive: "0-10%"
    },
    
    liquidityRating: "high",
    typicalSettlement: "Minutes to hours",
    
    examples: [
      "Bitcoin (BTC) - Original cryptocurrency",
      "Ethereum (ETH) - Smart contract platform",
      "Stablecoins - Pegged to fiat currencies",
      "Various altcoins (higher risk)"
    ],
    
    pros: [
      "Potential for massive gains",
      "24/7 trading availability",
      "Decentralized (no government control)",
      "Blockchain technology innovation",
      "Easy to buy/sell"
    ],
    
    cons: [
      "Extreme volatility (can lose 50%+ quickly)",
      "Regulatory uncertainty",
      "Security risks (hacks, lost keys)",
      "No underlying cash flows",
      "Highly speculative"
    ],
    
    teenExplanation: "Crypto is the 'wild west' of investing! 🤠 Bitcoin went from $0 to $69,000 to $16,000 and back up. Some people got rich, many lost everything. The rule? Only invest what you'd be okay losing COMPLETELY. Family Offices keep crypto at 0-5% max!",
    
    // NEW: Generational Wealth Context
    generationalWealthRole: "Cryptocurrency is the SPECULATIVE frontier. Like the early Internet, it might transform finance - or it might fade away. The key is position sizing: never more than 0-5% of your portfolio. It's a lottery ticket with decent odds, not a retirement plan.",
    historicalPerspective: "Bitcoin has been the best-performing asset of the 2010s, turning $100 into $1M+ for early holders. But it's also crashed 80%+ four times! The people who got rich either got in early OR had the stomach to hold through terrifying crashes.",
    opportunityForTeens: "Here's the truth: If crypto is transformational (big IF), you want some exposure. But if you put 50% of your money there and it crashes 80%, you need a 400% gain just to break even. Small positions, maximum 5%, lets you participate without risking your future.",
    foWisdomSnippet: "Most Family Offices now have 0-5% in crypto - enough to participate if it moons, not enough to matter if it crashes. The key insight: No single asset should ever be big enough to ruin you if it goes to zero. Especially one this volatile!"
  }
};

// ============================================================================
// GENERATIONAL WEALTH WISDOM - UPDATED INTERFACES
// ============================================================================

// Update the AssetClassInfo interface to include new fields
export interface ExtendedAssetClassInfo extends AssetClassInfo {
  generationalWealthRole: string;
  historicalPerspective: string;
  opportunityForTeens: string;
  foWisdomSnippet: string;
}

// ============================================================================
// RISK LEVEL INFORMATION
// ============================================================================

export interface RiskLevelInfo {
  level: RiskLevel;
  label: string;
  color: string;
  bgColor: string;
  description: string;
  suitableFor: string;
  typicalVolatility: string;
}

export const riskLevelData: Record<RiskLevel, RiskLevelInfo> = {
  none: {
    level: "none",
    label: "No Risk",
    color: "text-green-700",
    bgColor: "bg-green-100",
    description: "Capital is protected - virtually no chance of loss",
    suitableFor: "Emergency funds, short-term savings",
    typicalVolatility: "0-2%"
  },
  low: {
    level: "low",
    label: "Low Risk",
    color: "text-blue-700",
    bgColor: "bg-blue-100",
    description: "Small fluctuations possible but capital is relatively safe",
    suitableFor: "Conservative investors, near-term goals",
    typicalVolatility: "5-10%"
  },
  medium: {
    level: "medium",
    label: "Medium Risk",
    color: "text-yellow-700",
    bgColor: "bg-yellow-100",
    description: "Moderate fluctuations expected - balance of growth and safety",
    suitableFor: "Most long-term investors, balanced portfolios",
    typicalVolatility: "15-25%"
  },
  high: {
    level: "high",
    label: "High Risk",
    color: "text-orange-700",
    bgColor: "bg-orange-100",
    description: "Significant fluctuations likely - potential for large gains or losses",
    suitableFor: "Aggressive investors with long time horizons",
    typicalVolatility: "25-40%"
  },
  extreme: {
    level: "extreme",
    label: "Extreme Risk",
    color: "text-red-700",
    bgColor: "bg-red-100",
    description: "Highly volatile - potential for total loss or massive gains",
    suitableFor: "Only money you can afford to lose completely",
    typicalVolatility: "50-100%+"
  }
};

// ============================================================================
// TIME HORIZON INFORMATION
// ============================================================================

export interface TimeHorizonInfo {
  horizon: TimeHorizon;
  label: string;
  years: string;
  description: string;
  suitableAssetClasses: AssetClass[];
  riskCapacity: string;
}

export const timeHorizonData: Record<TimeHorizon, TimeHorizonInfo> = {
  short: {
    horizon: "short",
    label: "Short-Term",
    years: "0-1 years",
    description: "Focus on capital preservation - you'll need this money soon!",
    suitableAssetClasses: ["cash", "fixed_income"],
    riskCapacity: "Very low - can't afford losses"
  },
  medium: {
    horizon: "medium",
    label: "Medium-Term",
    years: "1-5 years",
    description: "Balance growth with stability - some time to recover from dips",
    suitableAssetClasses: ["fixed_income", "equities", "alternatives"],
    riskCapacity: "Moderate - can handle some volatility"
  },
  long: {
    horizon: "long",
    label: "Long-Term",
    years: "5+ years",
    description: "Focus on growth - time is on your side to ride out volatility",
    suitableAssetClasses: ["equities", "alternatives", "commodities"],
    riskCapacity: "High - can recover from market downturns"
  }
};

// ============================================================================
// FAMILY OFFICE MODEL PORTFOLIOS
// ============================================================================

export interface ModelPortfolio {
  name: string;
  riskProfile: "conservative" | "moderate" | "aggressive";
  description: string;
  targetReturn: string;
  allocation: {
    equities: number;
    fixed_income: number;
    commodities: number;
    alternatives: number;
    cash: number;
    cryptocurrency: number;
  };
  suitableFor: string[];
  rebalancingFrequency: string;
}

export const foModelPortfolios: ModelPortfolio[] = [
  {
    name: "Capital Preservation",
    riskProfile: "conservative",
    description: "Focus on protecting your money while earning steady returns",
    targetReturn: "4-6% annually",
    allocation: {
      equities: 25,
      fixed_income: 45,
      commodities: 10,
      alternatives: 10,
      cash: 10,
      cryptocurrency: 0
    },
    suitableFor: [
      "Risk-averse investors",
      "Near-retirement individuals",
      "Short to medium-term goals",
      "Emergency fund overflow"
    ],
    rebalancingFrequency: "Quarterly"
  },
  {
    name: "Balanced Growth",
    riskProfile: "moderate",
    description: "Equal focus on growth and stability - the 'Goldilocks' approach",
    targetReturn: "7-9% annually",
    allocation: {
      equities: 45,
      fixed_income: 30,
      commodities: 8,
      alternatives: 12,
      cash: 5,
      cryptocurrency: 0
    },
    suitableFor: [
      "Most long-term investors",
      "Retirement savings (10+ years away)",
      "Building wealth steadily",
      "Moderate risk tolerance"
    ],
    rebalancingFrequency: "Quarterly or Semi-annually"
  },
  {
    name: "Growth Focused",
    riskProfile: "aggressive",
    description: "Maximize growth potential - embrace volatility for higher returns",
    targetReturn: "10-12% annually",
    allocation: {
      equities: 65,
      fixed_income: 15,
      commodities: 5,
      alternatives: 12,
      cash: 0,
      cryptocurrency: 3
    },
    suitableFor: [
      "Young investors with long time horizons",
      "High risk tolerance",
      "Wealth accumulation phase",
      "Can handle 30-40% drawdowns"
    ],
    rebalancingFrequency: "Quarterly"
  }
];

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Get asset class info by ID
 */
export const getAssetClassInfo = (assetClass: AssetClass): AssetClassInfo => {
  return assetClassData[assetClass];
};

/**
 * Get risk level info
 */
export const getRiskLevelInfo = (riskLevel: RiskLevel): RiskLevelInfo => {
  return riskLevelData[riskLevel];
};

/**
 * Get time horizon info
 */
export const getTimeHorizonInfo = (horizon: TimeHorizon): TimeHorizonInfo => {
  return timeHorizonData[horizon];
};

/**
 * Get recommended allocation based on risk profile
 */
export const getRecommendedAllocation = (
  assetClass: AssetClass, 
  riskProfile: "conservative" | "moderate" | "aggressive"
): string => {
  return assetClassData[assetClass].foAllocationRange[riskProfile];
};

/**
 * Get suitable asset classes for a time horizon
 */
export const getSuitableAssetClasses = (horizon: TimeHorizon): AssetClass[] => {
  return timeHorizonData[horizon].suitableAssetClasses;
};

/**
 * Check if an asset class is suitable for a given risk level
 */
export const isAssetSuitableForRisk = (
  assetClass: AssetClass, 
  maxRisk: RiskLevel
): boolean => {
  const riskOrder: RiskLevel[] = ["none", "low", "medium", "high", "extreme"];
  const assetRiskIndex = riskOrder.indexOf(assetClassData[assetClass].riskLevel);
  const maxRiskIndex = riskOrder.indexOf(maxRisk);
  return assetRiskIndex <= maxRiskIndex;
};

