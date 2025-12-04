/**
 * SkillsMastery - Your Learning Dashboard
 * 
 * Simple language for teens & adults to understand wealth building
 * 
 * The 3 Steps to Building Wealth:
 * 1. MAKE MONEY - Start businesses, invest in new ideas
 * 2. KEEP MONEY - Don't lose it, spread your bets
 * 3. PASS IT ON - Teach the next generation
 */

"use client";

import React, { useState } from "react";
import { 
  TrendingUp, 
  Shield, 
  Coins, 
  Building2, 
  DollarSign, 
  Bitcoin,
  Target,
  Brain,
  Lightbulb,
  CheckCircle2,
  Lock,
  ChevronRight,
  Sparkles,
  GraduationCap,
  BarChart3,
  Wallet,
  TrendingDown,
  Zap,
  Rocket,
  Users,
  Globe,
  Cpu,
  Crown,
  ArrowUpRight,
  Clock,
  MessageCircle,
  HelpCircle,
} from "lucide-react";
import { FinancialEvent } from "@/components/data/events";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface SkillsMasteryProps {
  events: FinancialEvent[];
  onAskCoach?: () => void;
}

// The 3 Steps to Building Wealth (Simple language for teens)
const wealthPillars = [
  {
    id: "create",
    name: "Make Money 💰",
    icon: Rocket,
    color: "from-amber-500 to-orange-500",
    bgColor: "bg-amber-500/10",
    borderColor: "border-amber-500/30",
    textColor: "text-amber-600 dark:text-amber-400",
    description: "Start businesses, create value, invest in new ideas",
    strategies: ["Start a side hustle", "Invest in what you understand", "Take smart risks"],
    simpleExplanation: "Rich families don't just save - they build things that make money!",
    learnedIn: [2000, 2025],
  },
  {
    id: "preserve",
    name: "Keep Money 🛡️",
    icon: Shield,
    color: "from-emerald-500 to-teal-500",
    bgColor: "bg-emerald-500/10",
    borderColor: "border-emerald-500/30",
    textColor: "text-emerald-600 dark:text-emerald-400",
    description: "Don't lose what you have - spread your bets, stay calm in crashes",
    strategies: ["Don't put all eggs in one basket", "Stay calm when markets crash", "Keep some cash ready"],
    simpleExplanation: "It's not about getting rich quick - it's about not going broke!",
    learnedIn: [1990, 1997, 2008, 2020],
  },
  {
    id: "transfer",
    name: "Pass It On 🎓",
    icon: Users,
    color: "from-violet-500 to-purple-500",
    bgColor: "bg-violet-500/10",
    borderColor: "border-violet-500/30",
    textColor: "text-violet-600 dark:text-violet-400",
    description: "Teach the next generation - money skills AND good values",
    strategies: ["Teach kids about money", "Share your knowledge", "Build lasting habits"],
    simpleExplanation: "The best gift isn't money - it's knowing HOW to make & keep it!",
    learnedIn: [1990, 2020],
  },
];

// Each Generation's Big Opportunities (Simple language)
const generationalOpportunities = [
  {
    id: "boomers",
    generation: "Your Grandparents' Era",
    era: "1960s-1980s",
    icon: Building2,
    color: "from-slate-500 to-slate-600",
    opportunities: ["Bought houses cheap", "Factory jobs paid well", "Stocks were new"],
    keyLesson: "Buy property, hold it forever",
  },
  {
    id: "genx",
    generation: "Your Parents' Era",
    era: "1990s-2000s",
    icon: Globe,
    color: "from-blue-500 to-cyan-500",
    opportunities: ["The Internet changed everything", "Global trade exploded", "Tech stocks boomed"],
    keyLesson: "Get in early on new tech",
  },
  {
    id: "millennials",
    generation: "Older Siblings' Era",
    era: "2000s-2020s",
    icon: Bitcoin,
    color: "from-orange-500 to-red-500",
    opportunities: ["Apps on phones", "YouTube & TikTok stars", "Bitcoin millionaires"],
    keyLesson: "Build audiences, go digital",
  },
  {
    id: "genz",
    generation: "YOUR Era! 🚀",
    era: "2020s-Future",
    icon: Cpu,
    color: "from-[#9898f2] to-purple-600",
    opportunities: ["AI tools for everyone", "Climate solutions needed", "Create & earn online"],
    keyLesson: "Use AI to build something amazing!",
    isCurrentGen: true,
  },
];

// Innovation/Tech Cycles - Key disruption waves
const innovationCycles = [
  {
    id: "japan-bubble",
    year: 1990,
    name: "Japan Tech Bubble",
    type: "Bubble Burst",
    icon: TrendingDown,
    lesson: "Technology hype can exceed reality",
    opportunity: "Buy quality tech after crash",
  },
  {
    id: "dotcom",
    year: 2000,
    name: "Dot-com Revolution",
    type: "Tech Wave",
    icon: Globe,
    lesson: "Internet changes everything",
    opportunity: "Platform businesses win",
  },
  {
    id: "mobile",
    year: 2008,
    name: "Mobile & Social",
    type: "Tech Wave",
    icon: Zap,
    lesson: "Mobile-first disrupts incumbents",
    opportunity: "App economy creates billionaires",
  },
  {
    id: "ai",
    year: 2025,
    name: "AI Revolution",
    type: "Current Wave",
    icon: Cpu,
    lesson: "AI amplifies human capability",
    opportunity: "Build AI-native businesses",
  },
];

// Ways to Invest Your Money (Simple explanations)
const assetClasses = [
  {
    id: "equities",
    name: "Stocks 📈",
    icon: TrendingUp,
    color: "from-blue-500 to-cyan-500",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500/30",
    textColor: "text-blue-600 dark:text-blue-400",
    riskLevel: "Can go up or down",
    simpleAllocation: "Put 25-60% here",
    description: "Own a piece of companies like Apple or Tesla",
    learnedIn: [1990, 2000, 2008, 2020],
  },
  {
    id: "fixed-income",
    name: "Bonds 🔒",
    icon: Shield,
    color: "from-emerald-500 to-teal-500",
    bgColor: "bg-emerald-500/10",
    borderColor: "border-emerald-500/30",
    textColor: "text-emerald-600 dark:text-emerald-400",
    riskLevel: "Safer, steady",
    simpleAllocation: "Put 15-50% here",
    description: "Lend money to companies/governments, get paid back with interest",
    learnedIn: [1997, 2008],
  },
  {
    id: "commodities",
    name: "Gold & Stuff 🥇",
    icon: Coins,
    color: "from-amber-500 to-orange-500",
    bgColor: "bg-amber-500/10",
    borderColor: "border-amber-500/30",
    textColor: "text-amber-600 dark:text-amber-400",
    riskLevel: "Hedge against chaos",
    simpleAllocation: "Put 5-15% here",
    description: "Gold, silver, oil - things you can touch",
    learnedIn: [1990, 1997, 2008],
  },
  {
    id: "alternatives",
    name: "Property 🏠",
    icon: Building2,
    color: "from-violet-500 to-purple-500",
    bgColor: "bg-violet-500/10",
    borderColor: "border-violet-500/30",
    textColor: "text-violet-600 dark:text-violet-400",
    riskLevel: "Slow & steady",
    simpleAllocation: "Put 10-25% here",
    description: "Houses, buildings, land - real stuff",
    learnedIn: [1990, 2008],
  },
  {
    id: "ventures",
    name: "Startups 🚀",
    icon: Rocket,
    color: "from-rose-500 to-pink-500",
    bgColor: "bg-rose-500/10",
    borderColor: "border-rose-500/30",
    textColor: "text-rose-600 dark:text-rose-400",
    riskLevel: "High risk, high reward",
    simpleAllocation: "Put 5-15% here",
    description: "Invest in new businesses that could be the next big thing",
    learnedIn: [2000, 2025],
  },
  {
    id: "crypto",
    name: "Crypto 🪙",
    icon: Bitcoin,
    color: "from-orange-500 to-red-500",
    bgColor: "bg-orange-500/10",
    borderColor: "border-orange-500/30",
    textColor: "text-orange-600 dark:text-orange-400",
    riskLevel: "Very risky!",
    simpleAllocation: "Only 0-5%!",
    description: "Bitcoin, Ethereum - digital money (be careful!)",
    learnedIn: [2025],
  },
];

// Smart Money Strategies (Simple language)
const foStrategies = [
  {
    id: "entrepreneurship",
    name: "Start Something",
    icon: Rocket,
    description: "Build a business, create something valuable",
    learnedIn: [2000, 2025],
    pillar: "create",
  },
  {
    id: "innovation-investing",
    name: "Bet on the Future",
    icon: Lightbulb,
    description: "Invest in new tech before everyone else",
    learnedIn: [2000, 2025],
    pillar: "create",
  },
  {
    id: "diversification",
    name: "Don't Put All Eggs in One Basket",
    icon: BarChart3,
    description: "Spread your money across different things",
    learnedIn: [1990, 1997],
    pillar: "preserve",
  },
  {
    id: "risk-management",
    name: "Know What Can Go Wrong",
    icon: Shield,
    description: "Always have a backup plan",
    learnedIn: [2008, 2020],
    pillar: "preserve",
  },
  {
    id: "long-term-thinking",
    name: "Think in Decades, Not Days",
    icon: Clock,
    description: "Patient money wins - don't panic!",
    learnedIn: [1990, 2020, 2025],
    pillar: "transfer",
  },
  {
    id: "crisis-opportunity",
    name: "Buy When Others Panic",
    icon: TrendingDown,
    description: "Market crashes = sales on great investments",
    learnedIn: [2008, 2020],
    pillar: "preserve",
  },
];

// Core concepts by mission
const conceptsByMission: Record<number, string[]> = {
  1990: ["Asset Bubbles", "Speculation vs Investment", "Market Cycles", "Real Estate Risk"],
  1997: ["Currency Risk", "Contagion Effect", "Emerging Markets", "Capital Flight"],
  2000: ["Tech Disruption", "Valuation Metrics", "Irrational Exuberance", "Platform Business"],
  2008: ["Leverage", "Systemic Risk", "Too Big to Fail", "Credit Crisis"],
  2020: ["Black Swan Events", "V-shaped Recovery", "Volatility", "Central Bank Policy"],
  2025: ["AI Disruption", "Entrepreneurship", "Future of Work", "Innovation Cycles"],
};

export function SkillsMastery({ events, onAskCoach }: SkillsMasteryProps) {
  const [activeTab, setActiveTab] = useState<"pillars" | "generations" | "assets" | "strategies">("pillars");
  
  const completedMissions = events.filter(e => e.completed).map(e => e.year);
  
  // Calculate mastery for each pillar
  const getPillarMastery = (pillar: typeof wealthPillars[0]) => {
    const learnedCount = pillar.learnedIn.filter(year => 
      completedMissions.includes(year)
    ).length;
    return {
      learned: learnedCount,
      total: pillar.learnedIn.length,
      percentage: Math.round((learnedCount / pillar.learnedIn.length) * 100),
      isUnlocked: learnedCount > 0,
    };
  };
  
  // Calculate mastery for each asset class
  const getAssetMastery = (assetClass: typeof assetClasses[0]) => {
    const learnedCount = assetClass.learnedIn.filter(year => 
      completedMissions.includes(year)
    ).length;
    return {
      learned: learnedCount,
      total: assetClass.learnedIn.length,
      percentage: Math.round((learnedCount / assetClass.learnedIn.length) * 100),
      isUnlocked: learnedCount > 0,
    };
  };
  
  // Calculate strategy mastery
  const getStrategyMastery = (strategy: typeof foStrategies[0]) => {
    const learnedCount = strategy.learnedIn.filter(year => 
      completedMissions.includes(year)
    ).length;
    return {
      learned: learnedCount,
      total: strategy.learnedIn.length,
      isUnlocked: learnedCount > 0,
    };
  };
  
  const totalProgress = Math.round(
    wealthPillars.reduce((sum, p) => sum + getPillarMastery(p).percentage, 0) / wealthPillars.length
  );
  
  return (
    <div className="rounded-2xl bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 overflow-hidden shadow-lg dark:shadow-none">
      {/* Header - Simple & Clear */}
      <div className="p-5 sm:p-6 bg-gradient-to-br from-[#9898f2]/10 dark:from-[#9898f2]/20 via-transparent to-transparent border-b border-slate-200 dark:border-white/10">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-[#9898f2] to-purple-600 shadow-lg">
              <Crown className="h-5 w-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
                How Rich Families Think
                <Sparkles className="h-5 w-5 text-[#9898f2]" />
              </h2>
              <p className="text-sm text-slate-500 dark:text-white/50">
                Learn the secrets to building lasting wealth 💡
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {/* Ask Coach Button */}
            {onAskCoach && (
              <Button
                onClick={onAskCoach}
                variant="outline"
                size="sm"
                className="bg-white dark:bg-white/10 border-slate-200 dark:border-white/20 text-slate-700 dark:text-white hover:bg-slate-50 dark:hover:bg-white/20"
              >
                <MessageCircle className="h-4 w-4 mr-1.5" />
                <span className="hidden sm:inline">Ask Coach</span>
                <HelpCircle className="h-3.5 w-3.5 sm:hidden" />
              </Button>
            )}
            
            {/* Progress Badge */}
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#9898f2]/10 dark:bg-[#9898f2]/20 border border-[#9898f2]/30">
              <GraduationCap className="h-4 w-4 text-[#9898f2]" />
              <span className="text-sm font-bold text-[#7878d2] dark:text-[#9898f2]">
                {totalProgress}% Learned
              </span>
            </div>
          </div>
        </div>
        
        {/* Tab Navigation - Simple Labels */}
        <div className="flex items-center gap-1 p-1.5 bg-slate-100 dark:bg-white/5 rounded-xl w-fit border border-slate-200 dark:border-white/10 overflow-x-auto">
          {[
            { id: "pillars", label: "3 Money Rules", mobileLabel: "Rules", icon: <Crown className="h-3.5 w-3.5" />, count: 3 },
            { id: "generations", label: "Your Generation", mobileLabel: "Gen", icon: <Rocket className="h-3.5 w-3.5" />, count: 4 },
            { id: "assets", label: "Where to Invest", mobileLabel: "Invest", icon: <BarChart3 className="h-3.5 w-3.5" />, count: 6 },
            { id: "strategies", label: "Smart Moves", mobileLabel: "Moves", icon: <Target className="h-3.5 w-3.5" />, count: 6 },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === tab.id
                  ? "bg-[#9898f2]/20 text-[#7878d2] dark:text-[#9898f2] border border-[#9898f2]/30"
                  : "text-slate-500 dark:text-white/50 hover:text-slate-700 dark:hover:text-white/70"
              }`}
            >
              {tab.icon}
              <span className="hidden sm:inline">{tab.label}</span>
              <span className="sm:hidden">{tab.mobileLabel}</span>
              <span className={`px-1.5 py-0.5 rounded-full text-[10px] hidden sm:inline ${
                activeTab === tab.id 
                  ? 'bg-[#9898f2]/20 text-[#7878d2] dark:text-[#9898f2]' 
                  : 'bg-slate-200 dark:bg-white/10 text-slate-500 dark:text-white/50'
              }`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>
      </div>
      
      {/* Content */}
      <div className="p-5 sm:p-6 bg-white dark:bg-transparent">
        
        {/* Wealth Pillars Tab - NEW */}
        {activeTab === "pillars" && (
          <div className="space-y-6">
            {/* The 3 Pillars */}
            <div className="grid gap-4">
              {wealthPillars.map((pillar) => {
                const mastery = getPillarMastery(pillar);
                const Icon = pillar.icon;
                
                return (
                  <div 
                    key={pillar.id}
                    className={`relative p-5 rounded-xl border transition-all ${
                      mastery.isUnlocked
                        ? `${pillar.bgColor} ${pillar.borderColor} hover:scale-[1.01]`
                        : "bg-slate-50 dark:bg-white/[0.02] border-slate-200 dark:border-white/10 opacity-60"
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-xl bg-gradient-to-br ${pillar.color} shadow-lg`}>
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className={`font-bold text-lg ${mastery.isUnlocked ? pillar.textColor : "text-slate-400 dark:text-white/40"}`}>
                            {pillar.name}
                          </h4>
                          {mastery.isUnlocked && (
                            <Badge className={`${pillar.bgColor} ${pillar.textColor} border-0`}>
                              {mastery.percentage}%
                            </Badge>
                          )}
                        </div>
                        
                        <p className="text-sm text-slate-600 dark:text-white/60 mb-3">
                          {pillar.description}
                        </p>
                        
                        {mastery.isUnlocked ? (
                          <div className="flex flex-wrap gap-2">
                            {pillar.strategies.map((strategy) => (
                              <span 
                                key={strategy}
                                className="text-xs px-2.5 py-1 rounded-full bg-white dark:bg-white/10 text-slate-600 dark:text-white/70 border border-slate-200 dark:border-white/10"
                              >
                                {strategy}
                              </span>
                            ))}
                          </div>
                        ) : (
                          <div className="flex items-center gap-1.5 text-xs text-slate-400 dark:text-white/40">
                            <Lock className="h-3 w-3" />
                            <span>Complete missions to unlock</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            
            {/* Key Insight - Simple */}
            <div className="p-4 rounded-xl bg-gradient-to-br from-[#9898f2]/10 to-purple-500/5 border border-[#9898f2]/20">
              <div className="flex items-start gap-3">
                <Lightbulb className="h-5 w-5 text-[#9898f2] flex-shrink-0 mt-0.5" />
                <div>
                  <h5 className="font-bold text-slate-900 dark:text-white text-sm mb-1">
                    💡 Why Rich Stay Rich
                  </h5>
                  <p className="text-xs text-slate-600 dark:text-white/60 leading-relaxed">
                    Rich families do 3 things: <span className="text-amber-600 dark:text-amber-400 font-semibold">Make money</span> by starting businesses, <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Keep money</span> by not putting all eggs in one basket, and <span className="text-violet-600 dark:text-violet-400 font-semibold">Pass it on</span> by teaching their kids how money works.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Ask Coach CTA */}
            {onAskCoach && (
              <button
                onClick={onAskCoach}
                className="w-full p-4 rounded-xl border-2 border-dashed border-slate-200 dark:border-white/10 hover:border-[#9898f2] dark:hover:border-[#9898f2] hover:bg-[#9898f2]/5 transition-all group"
              >
                <div className="flex items-center justify-center gap-2 text-slate-500 dark:text-white/50 group-hover:text-[#9898f2]">
                  <MessageCircle className="h-5 w-5" />
                  <span className="font-semibold">Confused? Ask your AI Coach to explain! 🤖</span>
                </div>
              </button>
            )}
          </div>
        )}
        
        {/* Generational Opportunities Tab - NEW */}
        {activeTab === "generations" && (
          <div className="space-y-4">
            {generationalOpportunities.map((gen) => {
              const Icon = gen.icon;
              
              return (
                <div 
                  key={gen.id}
                  className={`relative p-4 rounded-xl border transition-all ${
                    gen.isCurrentGen
                      ? "bg-gradient-to-br from-[#9898f2]/20 to-purple-500/10 border-[#9898f2]/40 ring-2 ring-[#9898f2]/20"
                      : "bg-white dark:bg-white/[0.03] border-slate-200 dark:border-white/10"
                  }`}
                >
                  {gen.isCurrentGen && (
                    <div className="absolute -top-2 -right-2">
                      <Badge className="bg-gradient-to-r from-[#9898f2] to-purple-600 text-white border-0 text-[10px]">
                        YOUR ERA
                      </Badge>
                    </div>
                  )}
                  
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${gen.color}`}>
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className={`font-bold ${gen.isCurrentGen ? "text-[#7878d2] dark:text-[#9898f2]" : "text-slate-900 dark:text-white"}`}>
                          {gen.generation}
                        </h4>
                        <span className="text-xs text-slate-400 dark:text-white/40">{gen.era}</span>
                      </div>
                      
                      <div className="flex flex-wrap gap-1.5 mb-2">
                        {gen.opportunities.map((opp) => (
                          <Badge 
                            key={opp}
                            className={`text-[10px] ${
                              gen.isCurrentGen
                                ? "bg-[#9898f2]/20 text-[#7878d2] dark:text-[#9898f2] border-[#9898f2]/30"
                                : "bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-white/70 border-slate-200 dark:border-white/10"
                            }`}
                          >
                            {opp}
                          </Badge>
                        ))}
                      </div>
                      
                      <p className="text-xs text-slate-500 dark:text-white/50 flex items-center gap-1">
                        <Lightbulb className="h-3 w-3" />
                        {gen.keyLesson}
                      </p>
                    </div>
                    
                    {gen.isCurrentGen && (
                      <ArrowUpRight className="h-5 w-5 text-[#9898f2]" />
                    )}
                  </div>
                </div>
              );
            })}
            
            {/* Innovation Cycles */}
            <div className="mt-6 p-4 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/10">
              <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                <Cpu className="h-4 w-4 text-[#9898f2]" />
                Tech & Innovation Cycles
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {innovationCycles.map((cycle) => {
                  const isLearned = completedMissions.includes(cycle.year);
                  const Icon = cycle.icon;
                  
                  return (
                    <div 
                      key={cycle.id}
                      className={`p-3 rounded-lg border text-center ${
                        isLearned
                          ? "bg-emerald-500/10 border-emerald-500/30"
                          : "bg-white dark:bg-white/5 border-slate-200 dark:border-white/10 opacity-60"
                      }`}
                    >
                      <Icon className={`h-4 w-4 mx-auto mb-1 ${isLearned ? "text-emerald-500" : "text-slate-400"}`} />
                      <p className="text-[10px] font-bold text-slate-700 dark:text-white/80">{cycle.year}</p>
                      <p className="text-[9px] text-slate-500 dark:text-white/50 truncate">{cycle.name}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
        
        {/* Asset Classes Tab */}
        {activeTab === "assets" && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {assetClasses.map((asset) => {
              const mastery = getAssetMastery(asset);
              const Icon = asset.icon;
              
              return (
                <div 
                  key={asset.id}
                  className={`relative p-4 rounded-xl border transition-all ${
                    mastery.isUnlocked
                      ? `${asset.bgColor} ${asset.borderColor} hover:scale-[1.02]`
                      : "bg-slate-50 dark:bg-white/[0.02] border-slate-200 dark:border-white/10 opacity-60"
                  }`}
                >
                  {mastery.isUnlocked && mastery.percentage === 100 && (
                    <div className="absolute -top-1.5 -right-1.5">
                      <CheckCircle2 className="h-5 w-5 text-emerald-500 fill-emerald-100 dark:fill-emerald-500/20" />
                    </div>
                  )}
                  
                  <div className="flex items-start gap-3 mb-3">
                    <div className={`p-2 rounded-lg bg-gradient-to-br ${asset.color}`}>
                      <Icon className="h-4 w-4 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className={`font-bold text-sm ${mastery.isUnlocked ? asset.textColor : "text-slate-400 dark:text-white/40"}`}>
                        {asset.name}
                      </h4>
                      <p className="text-[10px] text-slate-500 dark:text-white/50 truncate">
                        {asset.description}
                      </p>
                    </div>
                  </div>
                  
                  {mastery.isUnlocked ? (
                    <>
                      <div className="h-1.5 bg-slate-200 dark:bg-white/10 rounded-full overflow-hidden mb-2">
                        <div 
                          className={`h-full rounded-full bg-gradient-to-r ${asset.color}`}
                          style={{ width: `${mastery.percentage}%` }}
                        />
                      </div>
                      <div className="flex items-center justify-between text-[10px]">
                        <span className="text-slate-500 dark:text-white/50">
                          FO: {asset.foAllocation}
                        </span>
                        <Badge className={`${asset.bgColor} ${asset.textColor} border-0 text-[9px] px-1.5 py-0`}>
                          {asset.riskLevel}
                        </Badge>
                      </div>
                    </>
                  ) : (
                    <div className="flex items-center gap-1.5 text-[10px] text-slate-400 dark:text-white/40">
                      <Lock className="h-3 w-3" />
                      <span>Complete missions to unlock</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
        
        {/* FO Strategies Tab */}
        {activeTab === "strategies" && (
          <div className="space-y-4">
            {/* Group by pillar */}
            {["create", "preserve", "transfer"].map((pillarId) => {
              const pillar = wealthPillars.find(p => p.id === pillarId)!;
              const pillarStrategies = foStrategies.filter(s => s.pillar === pillarId);
              
              return (
                <div key={pillarId}>
                  <h4 className={`text-xs font-bold mb-2 flex items-center gap-1.5 ${pillar.textColor}`}>
                    <pillar.icon className="h-3.5 w-3.5" />
                    {pillar.name}
                  </h4>
                  <div className="grid gap-2">
                    {pillarStrategies.map((strategy) => {
                      const mastery = getStrategyMastery(strategy);
                      const Icon = strategy.icon;
                      
                      return (
                        <div 
                          key={strategy.id}
                          className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${
                            mastery.isUnlocked
                              ? `${pillar.bgColor} ${pillar.borderColor}`
                              : "bg-slate-50 dark:bg-white/[0.02] border-slate-200 dark:border-white/10 opacity-60"
                          }`}
                        >
                          <div className={`p-2 rounded-lg ${
                            mastery.isUnlocked 
                              ? `bg-gradient-to-br ${pillar.color}` 
                              : "bg-slate-200 dark:bg-white/10"
                          }`}>
                            <Icon className={`h-4 w-4 ${mastery.isUnlocked ? "text-white" : "text-slate-400 dark:text-white/40"}`} />
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <h5 className={`font-semibold text-sm ${
                              mastery.isUnlocked ? "text-slate-900 dark:text-white" : "text-slate-400 dark:text-white/40"
                            }`}>
                              {strategy.name}
                            </h5>
                            <p className="text-xs text-slate-500 dark:text-white/50 truncate">
                              {strategy.description}
                            </p>
                          </div>
                          
                          {mastery.isUnlocked ? (
                            <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-white dark:bg-white/10 border border-slate-200 dark:border-white/10">
                              <CheckCircle2 className="h-3 w-3 text-emerald-500" />
                              <span className="text-[10px] font-medium text-slate-600 dark:text-white/70">
                                {mastery.learned}/{mastery.total}
                              </span>
                            </div>
                          ) : (
                            <Lock className="h-4 w-4 text-slate-400 dark:text-white/40" />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
