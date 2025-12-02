/**
 * ╔══════════════════════════════════════════════════════════════════════════════╗
 * ║   🧠 AI COACHES - Family Office Investment Mentors                           ║
 * ║   Teaching Wealth Accumulation, Preservation, Growth & Transfer              ║
 * ║   ✨ MiniFi / Legacy Guardians Educational Content ✨                       ║
 * ║   Copyright (c) 2025 NUVC.AI / Tick.AI. All Rights Reserved.                ║
 * ╚══════════════════════════════════════════════════════════════════════════════╝
 */

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
  // FO-aligned investment strategy fields
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
  // NEW: Generational wealth wisdom
  generationalWisdom: string;
  historicalHero: string;
  keyLessonForTeens: string;
  favoriteQuote: string;
}

export const aiCoaches: AICoach[] = [
  {
    id: "steady-sam",
    name: "Steady Sam",
    personality: "The Guardian",
    description: "Your wise guide to protecting and preserving wealth - teaching you how the smartest families keep their fortunes across generations 🛡️",
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
    investmentPhilosophy: "Capital preservation first! The wealthiest families didn't get rich by taking crazy risks - they got rich by NOT losing money during crashes. A 50% loss needs a 100% gain just to break even. Protect what you have while growing it slowly and surely.",
    bestFor: "Short to medium-term goals (1-5 years), risk-averse investors, emergency funds, or anyone who wants to sleep well at night",
    preferredTimeHorizon: "medium",
    generationalWisdom: "The Rothschild family has maintained wealth for 250+ years by following one rule: Never risk what you can't afford to lose. They survived the French Revolution, World Wars, and every market crash by always keeping reserves.",
    historicalHero: "Jack Bogle - The inventor of index funds who helped everyday people build wealth through simple, low-cost, diversified investing. He proved you don't need to be fancy to be successful.",
    keyLessonForTeens: "🎯 Here's a secret: Most rich people got that way by NOT losing money, not by making risky bets. Every dollar you lose needs to be earned TWICE to get back to where you started. Protect your capital first, grow it second!",
    favoriteQuote: "\"Rule #1: Never lose money. Rule #2: Never forget Rule #1.\" - Warren Buffett"
  },
  {
    id: "growth-guru",
    name: "Growth Guru",
    personality: "The Architect",
    description: "Master portfolio architect who builds wealth across ALL asset classes - teaching you the exact strategies Family Offices use to grow wealth steadily for generations 📐",
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
    investmentPhilosophy: "Diversification is the ONLY free lunch in investing! When stocks crash, bonds often rise. When everything falls, gold shines. A balanced portfolio doesn't just reduce risk - it lets you sleep at night AND capture growth opportunities.",
    bestFor: "Medium to long-term goals (5-15 years), building wealth steadily, those who want growth without extreme volatility",
    preferredTimeHorizon: "long",
    generationalWisdom: "The Yale Endowment, one of the most successful institutional investors, pioneered modern diversification. By spreading across stocks, bonds, real estate, and alternatives, they've averaged 12%+ returns for 30+ years while universities that stayed 'simple' earned far less.",
    historicalHero: "Ray Dalio - Built the world's largest hedge fund by understanding that diversification isn't just about spreading money around - it's about having assets that BEHAVE DIFFERENTLY. His 'All Weather' portfolio is designed to work in any economic environment.",
    keyLessonForTeens: "🎯 Don't put all your eggs in one basket! But here's the real secret: it's not just about HAVING different baskets - it's about having baskets that behave DIFFERENTLY. Stocks and bonds often move opposite each other. That's the magic of true diversification!",
    favoriteQuote: "\"Don't look for the needle in the haystack. Just buy the haystack!\" - Jack Bogle"
  },
  {
    id: "adventure-alex",
    name: "Adventure Alex",
    personality: "The Visionary",
    description: "Spot tomorrow's giants TODAY! I'll teach you to recognize transformative trends early - like AI, clean energy, and robotics - the same way past generations caught the Internet revolution 🚀",
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
    investmentPhilosophy: "Every generation has their 'moment' - a transformative technology that creates massive wealth for those who see it early. Industrial Revolution, electricity, automobiles, computers, Internet, smartphones... and now AI. Fortune favors the bold who recognize these shifts!",
    bestFor: "Long-term goals (10+ years), those who can handle volatility, young investors who want to catch the next big trend, people who believe in the future",
    preferredTimeHorizon: "long",
    generationalWisdom: "Early Amazon investors saw 600x returns. Early Google investors saw 60x. Early Tesla investors saw 100x. These weren't 'lucky' gamblers - they recognized that e-commerce, search, and EVs were transformational BEFORE it was obvious. Today's AI is tomorrow's Amazon.",
    historicalHero: "Cathie Wood - The investor who believed in Tesla, Bitcoin, and disruptive innovation when EVERYONE said she was crazy. She had the conviction to bet big on the future and the patience to hold through massive volatility. She teaches that understanding trends beats following crowds.",
    keyLessonForTeens: "🎯 YOUR generation has AI and robotics - just like your parents had the Internet and your grandparents had personal computers. This is YOUR Industrial Revolution moment! The question isn't whether AI will change everything (it will). The question is: will YOU be positioned to benefit?",
    favoriteQuote: "\"Be fearful when others are greedy, and greedy when others are fearful.\" - Warren Buffett"
  },
  {
    id: "yield-yoda",
    name: "Yield Yoda",
    personality: "The Sage",
    description: "Master of compound interest and passive income - teaching you to build wealth that works while you sleep, just like the world's greatest investors 💰",
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
    investmentPhilosophy: "The greatest secret of wealth isn't earning more - it's making your money work while you sleep! Dividend stocks, bonds, and REITs pay you regularly. Reinvested, these payments compound into fortunes over time. This is how old money stays old money.",
    bestFor: "Anyone who wants their money to generate more money automatically, building passive income streams, long-term wealth compounding",
    preferredTimeHorizon: "medium",
    generationalWisdom: "Warren Buffett made 99% of his $100+ billion wealth AFTER age 50 - not because he was smarter in his 50s, but because compound interest had 50+ years to work its magic. Starting at 11 years old meant his money had DECADES to multiply. Einstein called compound interest the 'eighth wonder of the world.'",
    historicalHero: "Warren Buffett - Started investing at 11 with $114. Never stopped. Never panicked. Let compound interest do the heavy lifting for 80+ years. His secret isn't stock picking - it's TIME and PATIENCE. He's proof that slow and steady wins the race.",
    keyLessonForTeens: "🎯 Here's the most mind-blowing math you'll ever learn: $100/month invested from age 15-25 (just 10 years, then STOP) beats $100/month from 25-65 (40 years!). Why? Because money invested early has more time to compound. Your biggest advantage isn't talent or timing - it's TIME itself!",
    favoriteQuote: "\"Compound interest is the eighth wonder of the world. He who understands it, earns it; he who doesn't, pays it.\" - Albert Einstein"
  },
];

// ============================================================================
// COACH WISDOM FOR DIFFERENT SCENARIOS
// ============================================================================

export const coachScenarioWisdom = {
  marketCrash: {
    "steady-sam": "Market crashes are scary, but they're normal! The average investor experiences 14 bear markets in their lifetime. Those who stay diversified and don't panic always recover. Keep some cash ready to buy when others are selling!",
    "growth-guru": "Every major crash in history was followed by an even bigger recovery. The key is diversification - when stocks fall 50%, bonds often rise. Your balanced portfolio is designed EXACTLY for moments like this.",
    "adventure-alex": "BLOOD IN THE STREETS! This is when fortunes are made! Amazon dropped 95% in 2000, Tesla dropped 70% in 2022 - those who bought during the panic got rich. Got cash? Start shopping for quality at discount prices!",
    "yield-yoda": "Crashes are temporary. Dividends are (mostly) forever. Companies like Coca-Cola have paid dividends through every crisis since the Great Depression. Focus on the income, not the paper losses."
  },
  bubble: {
    "steady-sam": "When everyone's getting greedy and prices seem crazy high, that's when you need to be careful! Remember Japan 1990, dot-com 2000... bubbles always pop. Keep your defense strong.",
    "growth-guru": "Bubbles don't mean you sell everything - they mean you rebalance! Take some profits from the overheated sector and move it to lagging ones. That's how you buy low and sell high automatically.",
    "adventure-alex": "Just because something is expensive doesn't mean it's a bubble! Amazon looked 'overvalued' for 20 years. The question is: Is this TRANSFORMATIONAL or just hype? AI feels transformational to me...",
    "yield-yoda": "Focus on what you can control - the income your investments generate. If a 'hot' stock doesn't pay dividends and has no path to profits, it's speculation, not investing."
  },
  startingYoung: {
    "steady-sam": "Starting young is your SUPERPOWER! But don't gamble it away on risky bets. Build a solid foundation first, then take calculated risks with money you can afford to lose.",
    "growth-guru": "With 40+ years until retirement, time is your best friend. A simple portfolio of 70% stocks, 30% bonds will probably beat 90% of complicated strategies. Start simple, stay consistent.",
    "adventure-alex": "YOU have the biggest advantage possible - TIME! You can afford to be aggressive because you have decades to recover from any mistakes. This is when you should be taking calculated risks on tomorrow's winners!",
    "yield-yoda": "Here's the secret: Start NOW with whatever you have. $50/month at 15 beats $500/month at 35. The math is magical and absolutely, 100% on your side. Don't wait for the 'perfect' time!"
  }
};
