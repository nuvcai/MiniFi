// Asset Class type for coach preferences
export type AssetClassPreference = 
  | "equities"           // Stocks, shares, equity funds
  | "fixed_income"       // Bonds, treasuries, fixed-rate securities
  | "commodities"        // Gold, oil, agricultural products
  | "alternatives"       // Real estate, private equity, hedge funds
  | "cash"               // Cash, money market, short-term deposits
  | "cryptocurrency";    // Digital assets (high-risk alternative)

// Time Horizon for investment recommendations
export type TimeHorizonPreference = "short" | "medium" | "long";

// Family Office aligned coach interface
export interface AICoach {
  id: string;
  name: string;
  personality: string;
  description: string;
  avatar: string;
  color: string;
  animatedAvatar: string;
  // NEW: FO-aligned investment strategy fields
  riskTolerance: "conservative" | "moderate" | "aggressive" | "very_aggressive";
  preferredAssetClasses: AssetClassPreference[];
  targetAllocation: {
    equities: string;
    fixed_income: string;
    commodities: string;
    alternatives: string;
    cash: string;
  };
  investmentPhilosophy: string;
  bestFor: string;
  preferredTimeHorizon: TimeHorizonPreference;
}

export const aiCoaches: AICoach[] = [
  {
    id: "steady-sam",
    name: "Steady Sam",
    personality: "Safety First",
    description: "Your chill guide to safe investments - bonds, gold, and keeping your money secure 🛡️",
    avatar: "/avatars/conservative.png",
    color: "bg-blue-100 text-blue-800",
    animatedAvatar: "/gifs/conservative.gif",
    // FO-aligned conservative strategy
    riskTolerance: "conservative",
    preferredAssetClasses: ["fixed_income", "cash", "commodities"],
    targetAllocation: {
      equities: "20-30%",
      fixed_income: "40-50%",
      commodities: "10-15%",
      alternatives: "5-10%",
      cash: "10-15%",
    },
    investmentPhilosophy: "Capital preservation first! Focus on stable income and protecting your principal. Low volatility assets like Treasury bonds and gold help weather market storms.",
    bestFor: "Short to medium-term goals (1-5 years), risk-averse investors, emergency funds, or those near retirement",
    preferredTimeHorizon: "medium",
  },
  {
    id: "growth-guru",
    name: "Growth Guru",
    personality: "Smart Mixer",
    description: "All about balance - mixing stocks, ETFs, and REITs like a pro DJ 🎧",
    avatar: "/avatars/balanced.png",
    color: "bg-green-100 text-green-800",
    animatedAvatar: "/gifs/balanced.gif",
    // FO-aligned balanced strategy
    riskTolerance: "moderate",
    preferredAssetClasses: ["equities", "fixed_income", "alternatives"],
    targetAllocation: {
      equities: "40-50%",
      fixed_income: "25-35%",
      commodities: "5-10%",
      alternatives: "10-15%",
      cash: "5-10%",
    },
    investmentPhilosophy: "Diversification is key! A balanced portfolio across asset classes provides growth potential while managing downside risk. Regular rebalancing keeps your allocation on track.",
    bestFor: "Medium to long-term goals (5-15 years), moderate risk tolerance, building wealth while maintaining stability",
    preferredTimeHorizon: "long",
  },
  {
    id: "adventure-alex",
    name: "Adventure Alex",
    personality: "Risk Taker",
    description: "Go big or go home! Growth stocks, emerging markets, and high-conviction bets 🚀",
    avatar: "/avatars/aggressive.png",
    color: "bg-purple-100 text-purple-800",
    animatedAvatar: "/gifs/aggressive.gif",
    // FO-aligned aggressive growth strategy
    riskTolerance: "very_aggressive",
    preferredAssetClasses: ["equities", "alternatives", "cryptocurrency"],
    targetAllocation: {
      equities: "60-75%",
      fixed_income: "5-15%",
      commodities: "5-10%",
      alternatives: "15-25%",
      cash: "0-5%",
    },
    investmentPhilosophy: "High risk, high reward! Focus on growth stocks, emerging markets, and disruptive technologies. Time in market beats timing the market - stay invested through volatility.",
    bestFor: "Long-term goals (10+ years), high risk tolerance, young investors with time to recover from losses, wealth accumulation phase",
    preferredTimeHorizon: "long",
  },
  {
    id: "yield-yoda",
    name: "Yield Yoda",
    personality: "Income Master",
    description: "Master of passive income - dividends, REITs, and bonds that pay you monthly 💰",
    avatar: "/avatars/master.png",
    color: "bg-yellow-100 text-yellow-800",
    animatedAvatar: "/gifs/master.gif",
    // FO-aligned income-focused strategy
    riskTolerance: "moderate",
    preferredAssetClasses: ["fixed_income", "alternatives", "equities"],
    targetAllocation: {
      equities: "30-40%",
      fixed_income: "30-40%",
      commodities: "5-10%",
      alternatives: "15-25%",
      cash: "5-10%",
    },
    investmentPhilosophy: "Let your money work for you! Focus on dividend-paying stocks, REITs, and bonds that generate regular income. Compound your returns through reinvestment or enjoy steady cash flow.",
    bestFor: "Income generation, semi-retirement, supplementing salary, building passive income streams",
    preferredTimeHorizon: "medium",
  },
];
