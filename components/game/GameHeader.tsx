"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Gift, Star, Flame } from "lucide-react";

interface GameHeaderProps {
  playerLevel: number;
  playerXP: number;
  lifetimeXP?: number; // For level progress calculation (optional, uses playerXP if not provided)
  streakDays?: number;
  onRewardsClick?: () => void;
}

// Level titles for personality
const LEVEL_TITLES: Record<number, string> = {
  1: "Rookie",
  2: "Learner", 
  3: "Investor",
  4: "Strategist",
  5: "Expert",
  6: "Master",
  7: "Legend",
};

// Level XP thresholds
const XP_THRESHOLDS = [0, 250, 600, 1000, 1500, 2000, 2600, 3300];

export function GameHeader({
  playerLevel,
  playerXP,
  lifetimeXP,
  streakDays = 0,
  onRewardsClick,
}: GameHeaderProps) {
  // Use lifetimeXP for level progress if provided, otherwise use playerXP
  const xpForLevel = lifetimeXP ?? playerXP;
  
  // Calculate progress to next level
  const currentThreshold = XP_THRESHOLDS[playerLevel - 1] || 0;
  const nextThreshold = XP_THRESHOLDS[playerLevel] || XP_THRESHOLDS[XP_THRESHOLDS.length - 1];
  const xpInLevel = xpForLevel - currentThreshold;
  const xpNeeded = nextThreshold - currentThreshold;
  const xpProgress = Math.min((xpInLevel / xpNeeded) * 100, 100);
  const levelTitle = LEVEL_TITLES[playerLevel] || "Legend";

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-indigo-100 shadow-sm">
      <div className="container mx-auto px-3 sm:px-4 py-2.5 sm:py-3">
        <div className="flex items-center justify-between gap-3">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <Image
              src="/favicon.png"
              alt="Mini.Fi"
              width={36}
              height={36}
              className="w-8 h-8 sm:w-9 sm:h-9"
            />
            <span className="hidden sm:block font-serif font-black text-lg text-indigo-600">
              Mini.Fi
            </span>
          </Link>

          {/* Stats Row */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Streak - Key engagement metric! */}
            {streakDays > 0 && (
              <div className="flex items-center gap-1 px-2 py-1 sm:px-2.5 sm:py-1.5 rounded-lg bg-gradient-to-r from-orange-100 to-amber-100 border border-orange-200">
                <Flame className="h-4 w-4 text-orange-500" />
                <span className="text-sm font-bold text-orange-600">{streakDays}</span>
              </div>
            )}

            {/* XP + Level - Combined for clarity */}
            <div className="flex items-center gap-2 px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-xl bg-gradient-to-r from-indigo-50 to-violet-50 border border-indigo-200">
              {/* Level Badge */}
              <div className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 shadow-md">
                <span className="text-[10px] sm:text-xs font-black text-white">{playerLevel}</span>
              </div>
              
              {/* XP Display */}
              <div className="flex flex-col">
                <div className="flex items-center gap-1">
                  <Star className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-amber-500" />
                  <span className="text-xs sm:text-sm font-bold text-gray-900">
                    {playerXP.toLocaleString()}
                  </span>
                </div>
                {/* Progress bar */}
                <div className="w-16 sm:w-20 h-1 bg-gray-200 rounded-full overflow-hidden mt-0.5">
                  <div 
                    className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full transition-all duration-300"
                    style={{ width: `${xpProgress}%` }}
                  />
                </div>
              </div>
              
              {/* Level title - desktop only */}
              <span className="hidden md:block text-[10px] text-indigo-600 font-medium">
                {levelTitle}
              </span>
            </div>

            {/* Rewards */}
            {onRewardsClick && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onRewardsClick}
                className="p-2 sm:px-3 hover:bg-amber-50"
              >
                <Gift className="h-5 w-5 text-amber-500" />
                <span className="hidden sm:inline ml-1.5 text-sm font-medium text-amber-600">
                  Rewards
                </span>
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
