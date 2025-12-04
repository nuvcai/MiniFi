/**
 * ChapterHub - Game-Like Chapter Selection Screen
 * Designed for teens with modern mobile game UX patterns
 * Inspired by: Duolingo, Clash Royale, Candy Crush progression systems
 * © 2025 NUVC.AI. All Rights Reserved.
 */

"use client";

import React, { useState } from "react";
import { 
  Lock,
  Star,
  Flame,
  Trophy,
  Play,
  Gift,
  Heart,
  CheckCircle2,
  Rocket,
  Brain,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FinancialEvent } from "@/components/data/events";
import { III_CONFIG } from "@/hooks/useIII";

interface ChapterHubProps {
  events: FinancialEvent[];
  onLevelClick: (event: FinancialEvent) => void;
  streakDays?: number;
}

// Chapter metadata - Using brand colors (#9898f2 Teen Tech Purple as primary)
const chapters = [
  {
    id: 1,
    title: "Market Crashes 101",
    subtitle: "Learn to Survive the Storm",
    emoji: "📉",
    description: "How smart investors survived (and got RICH!) during market chaos",
    // Primary brand purple theme
    theme: "from-[#9898f2] via-[#7878d2] to-[#5858b2]",
    themeBg: "from-[#9898f2]/20 via-[#7878d2]/10 to-[#5858b2]/5",
    themeBgLight: "from-[#9898f2]/10 via-[#7878d2]/5 to-transparent",
    borderColor: "border-[#9898f2]/30 dark:border-[#9898f2]/40",
    accentColor: "text-[#7070c0] dark:text-[#9898f2]",
    accentColorBold: "text-[#5858a0] dark:text-[#b8b8ff]",
    levels: 6,
    unlocked: true,
    skills: ["Crisis Management", "Emotional Control", "Diversification"],
    reward: "🏆 Market Survivor Badge",
    bgImage: "/images/crash-bg.png",
  },
  {
    id: 2,
    title: "Bull Run Mastery",
    subtitle: "Ride the Wave Without Wiping Out",
    emoji: "🐂",
    description: "Master the art of timing and know when to take profits",
    theme: "from-emerald-500 via-green-500 to-teal-500",
    themeBg: "from-emerald-500/20 via-green-500/10 to-teal-500/5",
    themeBgLight: "from-emerald-500/10 via-green-500/5 to-transparent",
    borderColor: "border-emerald-500/30 dark:border-emerald-500/40",
    accentColor: "text-emerald-600 dark:text-emerald-400",
    accentColorBold: "text-emerald-700 dark:text-emerald-300",
    levels: 6,
    unlocked: false,
    skills: ["Trend Recognition", "Profit Taking", "Position Sizing"],
    reward: "🐂 Bull Rider Badge",
    bgImage: "/images/bull-bg.png",
    comingSoon: true,
  },
  {
    id: 3,
    title: "Portfolio Architect",
    subtitle: "Build Wealth That Lasts Generations",
    emoji: "🏛️",
    description: "Design portfolios like billion-dollar family offices",
    theme: "from-amber-500 via-orange-500 to-rose-500",
    themeBg: "from-amber-500/20 via-orange-500/10 to-rose-500/5",
    themeBgLight: "from-amber-500/10 via-orange-500/5 to-transparent",
    borderColor: "border-amber-500/30 dark:border-amber-500/40",
    accentColor: "text-amber-600 dark:text-amber-400",
    accentColorBold: "text-amber-700 dark:text-amber-300",
    levels: 6,
    unlocked: false,
    skills: ["Asset Allocation", "Rebalancing", "Tax Optimization"],
    reward: "🏛️ Family Office Master Badge",
    bgImage: "/images/portfolio-bg.png",
    comingSoon: true,
  },
];

// Level difficulty & rewards
const levelMeta = [
  { difficulty: "Beginner", stars: 1, baseXP: 100, color: "from-blue-400 to-cyan-400" },
  { difficulty: "Beginner", stars: 1, baseXP: 150, color: "from-blue-400 to-cyan-400" },
  { difficulty: "Intermediate", stars: 2, baseXP: 150, color: "from-emerald-400 to-teal-400" },
  { difficulty: "Advanced", stars: 3, baseXP: 200, color: "from-amber-400 to-orange-400" },
  { difficulty: "Advanced", stars: 3, baseXP: 250, color: "from-amber-400 to-orange-400" },
  { difficulty: "Expert", stars: 4, baseXP: 300, color: "from-violet-400 to-purple-400" },
];

export function ChapterHub({ events, onLevelClick, streakDays = 0 }: ChapterHubProps) {
  const [selectedChapter, setSelectedChapter] = useState(0);
  const [animatingLevel, setAnimatingLevel] = useState<number | null>(null);
  
  const completedLevels = events.filter(e => e.completed).length;
  const currentChapter = chapters[selectedChapter];
  const progressPercentage = (completedLevels / events.length) * 100;
  
  // Streak bonus calculation
  const streakMultiplier = streakDays >= 7 ? 2 : streakDays >= 3 ? 1.5 : 1;
  
  // Find next available level
  const nextLevel = events.find(e => e.unlocked && !e.completed);
  
  const handleLevelClick = (event: FinancialEvent, index: number) => {
    if (!event.unlocked) return;
    setAnimatingLevel(index);
    setTimeout(() => {
      setAnimatingLevel(null);
      onLevelClick(event);
    }, 200);
  };

  return (
    <div className="space-y-6">
      {/* Chapter Selection Pills */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide -mx-2 px-2">
        {chapters.map((chapter, idx) => (
          <button
            key={chapter.id}
            onClick={() => chapter.unlocked && setSelectedChapter(idx)}
            disabled={!chapter.unlocked}
            className={`flex-shrink-0 px-4 py-2.5 rounded-full font-bold text-sm transition-all duration-300 ${
              selectedChapter === idx
                ? `bg-gradient-to-r ${chapter.theme} text-white shadow-lg scale-105`
                : chapter.unlocked
                  ? "bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-white/70 hover:bg-slate-200 dark:hover:bg-white/20 hover:text-slate-900 dark:hover:text-white"
                  : "bg-slate-50 dark:bg-white/5 text-slate-400 dark:text-white/30 cursor-not-allowed"
            }`}
          >
            <span className="mr-1.5">{chapter.emoji}</span>
            {chapter.unlocked ? `Chapter ${chapter.id}` : (
              <span className="flex items-center gap-1">
                <Lock className="h-3 w-3" />
                Ch {chapter.id}
              </span>
            )}
          </button>
        ))}
      </div>
      
      {/* Main Chapter Card */}
      <div className={`relative rounded-3xl overflow-hidden bg-white dark:bg-white/[0.03] bg-gradient-to-br ${currentChapter.themeBgLight} dark:${currentChapter.themeBg} border-2 ${currentChapter.borderColor}`}>
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className={`absolute -top-20 -right-20 w-60 h-60 bg-gradient-to-br ${currentChapter.theme} opacity-20 rounded-full blur-3xl`} />
          <div className={`absolute -bottom-20 -left-20 w-80 h-80 bg-gradient-to-br ${currentChapter.theme} opacity-10 rounded-full blur-3xl`} />
          {/* Floating particles */}
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white/20 rounded-full animate-pulse" />
          <div className="absolute top-1/3 right-1/3 w-1.5 h-1.5 bg-white/30 rounded-full animate-pulse delay-300" />
          <div className="absolute bottom-1/4 right-1/4 w-2 h-2 bg-white/20 rounded-full animate-pulse delay-700" />
        </div>
        
        <div className="relative p-6">
          {/* Chapter Header */}
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-start gap-4">
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${currentChapter.theme} flex items-center justify-center text-3xl shadow-xl transform hover:scale-110 transition-transform`}>
                {currentChapter.emoji}
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Badge className={`bg-gradient-to-r ${currentChapter.theme} text-white border-0 text-xs font-bold px-2.5`}>
                    CHAPTER {currentChapter.id}
                  </Badge>
                  {completedLevels === events.length && (
                    <Badge className="bg-amber-500/20 text-amber-600 dark:text-amber-400 border-amber-500/30 text-xs">
                      <Star className="h-3 w-3 mr-1 fill-current" />
                      COMPLETE
                    </Badge>
                  )}
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mb-1">
                  {currentChapter.title}
                </h2>
                <p className={`${currentChapter.accentColor} font-medium text-sm`}>
                  {currentChapter.subtitle}
                </p>
              </div>
            </div>
            
            {/* Chapter Stats */}
            <div className="hidden sm:flex flex-col items-end gap-2">
              {streakMultiplier > 1 && (
                <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white border-0 animate-pulse">
                  <Flame className="h-3.5 w-3.5 mr-1" />
                  {streakMultiplier}x BONUS
                </Badge>
              )}
              <div className="flex items-center gap-1.5 text-slate-500 dark:text-white/60 text-sm">
                <Trophy className="h-4 w-4 text-amber-500 dark:text-amber-400" />
                <span>{completedLevels}/{events.length} Completed</span>
              </div>
            </div>
          </div>
          
          {/* Progress Bar with Rewards */}
          <div className="mb-6">
            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-white/60 mb-2">
              <span>Progress</span>
              <span className="font-bold text-slate-900 dark:text-white">{Math.round(progressPercentage)}%</span>
            </div>
            <div className="relative h-4 bg-slate-200 dark:bg-black/30 rounded-full overflow-hidden backdrop-blur">
              <div 
                className={`h-full rounded-full bg-gradient-to-r ${currentChapter.theme} transition-all duration-1000 ease-out relative overflow-hidden`}
                style={{ width: `${progressPercentage}%` }}
              >
                {/* Shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
              </div>
              
              {/* Milestone markers */}
              {[25, 50, 75, 100].map((milestone) => (
                <div 
                  key={milestone}
                  className="absolute top-1/2 -translate-y-1/2 transform"
                  style={{ left: `${milestone}%`, marginLeft: '-8px' }}
                >
                  <div className={`w-4 h-4 rounded-full border-2 ${
                    progressPercentage >= milestone 
                      ? 'bg-white border-white shadow' 
                      : 'bg-slate-100 dark:bg-black/50 border-slate-300 dark:border-white/30'
                  } flex items-center justify-center`}>
                    {progressPercentage >= milestone && (
                      <CheckCircle2 className="h-3 w-3 text-emerald-500" />
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            {/* Rewards strip */}
            <div className="flex justify-between mt-3">
              {[
                { at: 25, icon: "⭐", label: "25%", reward: `+50 ${III_CONFIG.symbol}` },
                { at: 50, icon: "🎯", label: "50%", reward: `+100 ${III_CONFIG.symbol}` },
                { at: 75, icon: "💎", label: "75%", reward: `+150 ${III_CONFIG.symbol}` },
                { at: 100, icon: "🏆", label: "Master", reward: "Badge!" },
              ].map((reward) => (
                <div 
                  key={reward.at}
                  className={`flex flex-col items-center ${
                    progressPercentage >= reward.at ? 'opacity-100' : 'opacity-40'
                  }`}
                >
                  <span className={`text-lg ${progressPercentage >= reward.at ? 'animate-bounce' : ''}`}>
                    {reward.icon}
                  </span>
                  <span className="text-[10px] text-slate-500 dark:text-white/60">{reward.label}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Description */}
          <p className="text-slate-600 dark:text-white/70 text-sm mb-6 leading-relaxed">
            {currentChapter.description}
          </p>
          
          {/* Skills Preview */}
          <div className="flex flex-wrap gap-2 mb-6">
            {currentChapter.skills.map((skill) => (
              <Badge 
                key={skill}
                variant="outline" 
                className={`${currentChapter.borderColor} ${currentChapter.accentColor} bg-white/50 dark:bg-white/5 text-xs`}
              >
                <Brain className="h-3 w-3 mr-1" />
                {skill}
              </Badge>
            ))}
          </div>
          
          {/* Level Grid - The Heart of the Chapter */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {events.map((event, index) => {
              const meta = levelMeta[index] || levelMeta[0];
              const isLocked = !event.unlocked;
              const isCompleted = event.completed;
              const isNext = nextLevel?.year === event.year;
              const isAnimating = animatingLevel === index;
              
              return (
                <button
                  key={event.year}
                  onClick={() => handleLevelClick(event, index)}
                  disabled={isLocked}
                  className={`group relative p-4 rounded-2xl transition-all duration-300 ${
                    isAnimating ? 'scale-95' : ''
                  } ${
                    isLocked 
                      ? 'bg-slate-100 dark:bg-white/5 cursor-not-allowed opacity-50'
                      : isCompleted
                        ? 'bg-emerald-50 dark:bg-emerald-500/20 border border-emerald-200 dark:border-emerald-500/30 hover:border-emerald-300 dark:hover:border-emerald-400/50'
                        : isNext
                          ? `bg-white dark:bg-gradient-to-br ${currentChapter.themeBgLight} dark:${currentChapter.themeBg} border-2 ${currentChapter.borderColor} hover:scale-105 shadow-lg shadow-[#9898f2]/20`
                          : 'bg-slate-50 dark:bg-white/10 border border-slate-200 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-white/15 hover:border-slate-300 dark:hover:border-white/20'
                  }`}
                >
                  {/* Next Level Indicator */}
                  {isNext && !isLocked && (
                    <div className="absolute -top-2 -right-2 z-10">
                      <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0 text-[10px] font-bold animate-pulse shadow-lg">
                        PLAY NOW
                      </Badge>
                    </div>
                  )}
                  
                  {/* Level Number & Status */}
                  <div className="flex items-center justify-between mb-2">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-lg ${
                      isLocked 
                        ? 'bg-slate-200 dark:bg-white/10 text-slate-400 dark:text-white/30'
                        : isCompleted 
                          ? 'bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400'
                          : `bg-gradient-to-br ${meta.color} text-white`
                    }`}>
                      {isLocked ? (
                        <Lock className="h-5 w-5" />
                      ) : isCompleted ? (
                        <CheckCircle2 className="h-5 w-5" />
                      ) : (
                        index + 1
                      )}
                    </div>
                    
                    {/* Stars */}
                    <div className="flex gap-0.5">
                      {[...Array(meta.stars)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`h-3.5 w-3.5 ${
                            isCompleted 
                              ? 'text-amber-500 dark:text-amber-400 fill-amber-500 dark:fill-amber-400' 
                              : 'text-slate-300 dark:text-white/20'
                          }`} 
                        />
                      ))}
                    </div>
                  </div>
                  
                  {/* Level Title */}
                  <h4 className={`font-bold text-sm mb-1 line-clamp-1 ${
                    isLocked ? 'text-slate-400 dark:text-white/30' : isCompleted ? 'text-emerald-700 dark:text-emerald-300' : 'text-slate-900 dark:text-white'
                  }`}>
                    {event.title}
                  </h4>
                  
                  {/* Year & Difficulty */}
                  <div className="flex items-center justify-between">
                    <span className={`text-xs ${isLocked ? 'text-slate-300 dark:text-white/20' : 'text-slate-500 dark:text-white/50'}`}>
                      {event.year}
                    </span>
                    <Badge 
                      variant="outline" 
                      className={`text-[9px] px-1.5 py-0 ${
                        isLocked 
                          ? 'border-slate-200 dark:border-white/10 text-slate-300 dark:text-white/20' 
                          : 'border-slate-300 dark:border-white/20 text-slate-500 dark:text-white/50'
                      }`}
                    >
                      {meta.difficulty}
                    </Badge>
                  </div>
                  
                  {/* XP Reward */}
                  {!isLocked && (
                    <div className={`mt-2 pt-2 border-t ${isLocked ? 'border-slate-100 dark:border-white/5' : 'border-slate-200 dark:border-white/10'}`}>
                      <div className="flex items-center justify-between">
                        <span className={`text-xs font-semibold ${
                          isCompleted ? 'text-emerald-600 dark:text-emerald-400' : currentChapter.accentColor
                        }`}>
                          {isCompleted ? '✓ Earned' : `+${Math.round(event.reward * streakMultiplier)} iii`}
                        </span>
                        {!isCompleted && !isLocked && (
                          <Play className={`h-4 w-4 ${isNext ? 'text-[#7070c0] dark:text-white animate-pulse' : 'text-slate-400 dark:text-white/40 group-hover:text-slate-600 dark:group-hover:text-white/70'}`} />
                        )}
                      </div>
                    </div>
                  )}
                  
                  {/* Hover effect for unlocked levels */}
                  {!isLocked && !isCompleted && (
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-slate-100/50 dark:from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                  )}
                </button>
              );
            })}
          </div>
          
          {/* Chapter Reward Preview */}
          <div className="mt-6 p-4 rounded-2xl bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg">
                  <Trophy className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-xs text-amber-600 dark:text-amber-400 font-semibold mb-0.5">CHAPTER REWARD</p>
                  <p className="text-slate-900 dark:text-white font-bold">{currentChapter.reward}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-slate-500 dark:text-white/50">Complete all {currentChapter.levels} levels</p>
                <p className="text-amber-600 dark:text-amber-400 font-bold">{completedLevels}/{currentChapter.levels}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Coming Soon Chapters */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-slate-500 dark:text-white/50 text-sm font-semibold">
          <Rocket className="h-4 w-4" />
          COMING SOON
        </div>
        
        <div className="grid gap-3">
          {chapters.filter(c => c.comingSoon).map((chapter) => (
            <div
              key={chapter.id}
              className={`relative p-4 rounded-2xl bg-slate-100 dark:bg-gradient-to-br ${chapter.themeBg} border ${chapter.borderColor} opacity-60 hover:opacity-80 transition-opacity cursor-not-allowed overflow-hidden`}
            >
              {/* Locked overlay */}
              <div className="absolute inset-0 bg-slate-200/80 dark:bg-black/40 backdrop-blur-[1px] flex items-center justify-center">
                <Badge className="bg-white dark:bg-white/10 text-slate-600 dark:text-white border-slate-300 dark:border-white/20 backdrop-blur">
                  <Lock className="h-3 w-3 mr-1" />
                  Complete Chapter {chapter.id - 1} to Unlock
                </Badge>
              </div>
              
              <div className="flex items-center gap-4">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${chapter.theme} flex items-center justify-center text-2xl opacity-50`}>
                  {chapter.emoji}
                </div>
                <div>
                  <Badge className={`${chapter.borderColor} ${chapter.accentColor} bg-white/50 dark:bg-white/5 text-[10px] mb-1`}>
                    CHAPTER {chapter.id}
                  </Badge>
                  <h3 className="text-lg font-bold text-slate-600 dark:text-white/70">{chapter.title}</h3>
                  <p className="text-xs text-slate-400 dark:text-white/40">{chapter.subtitle}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Sponsor CTA */}
        <div className="p-4 rounded-2xl bg-[#9898f2]/10 dark:bg-gradient-to-r dark:from-[#9898f2]/20 dark:via-violet-500/10 dark:to-purple-500/5 border border-[#9898f2]/30">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#9898f2] to-violet-500 flex items-center justify-center flex-shrink-0">
              <Heart className="h-5 w-5 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-slate-900 dark:text-white font-bold text-sm mb-1">Help Us Build More Chapters! ❤️</p>
              <p className="text-slate-600 dark:text-white/60 text-xs mb-3">
                Want to see Chapter 2 & 3? Sponsor our mission to bring financial literacy to every teen!
              </p>
              <Button 
                size="sm" 
                className="bg-gradient-to-r from-[#9898f2] to-violet-500 text-white font-bold text-xs hover:from-[#8888e2] hover:to-violet-600"
              >
                <Gift className="h-3.5 w-3.5 mr-1.5" />
                Become a Sponsor
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

