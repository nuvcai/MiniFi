/**
 * GameHeader - Minimalist game navigation
 * Clean, focused design with essential info only
 */

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Gift, Star } from "lucide-react";
import { levelTitles } from "@/components/gamification/LevelUpCelebration";

interface GameHeaderProps {
  playerLevel: number;
  playerXP: number;
  totalScore: number;
  onRewardsClick?: () => void;
}

export function GameHeader({
  playerLevel,
  playerXP,
  totalScore,
  onRewardsClick,
}: GameHeaderProps) {
  const xpToNextLevel = 1000;
  const xpInLevel = playerXP % xpToNextLevel;
  const xpProgress = (xpInLevel / xpToNextLevel) * 100;
  const levelInfo = levelTitles[playerLevel] || levelTitles[1];

  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-[#0a0a0f]/80 backdrop-blur-xl">
      <div className="container mx-auto px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <Image
              src="/favicon.png"
              alt="Mini.Fi"
              width={36}
              height={36}
              className="rounded-xl group-hover:scale-105 transition-transform"
            />
            <span className="text-lg font-semibold text-white/90 hidden sm:inline">
              Mini.Fi
            </span>
          </Link>
          
          {/* Stats */}
          <div className="flex items-center gap-3 sm:gap-4">
            
            {/* Rewards Button */}
            {onRewardsClick && (
              <button
                onClick={onRewardsClick}
                className="flex items-center gap-2 px-3 py-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 hover:bg-amber-500/20 transition-colors"
              >
                <Gift className="h-4 w-4" />
                <span className="text-sm font-medium hidden sm:inline">Rewards</span>
              </button>
            )}
            
            {/* Level & XP */}
            <div className="flex items-center gap-3 px-4 py-2 rounded-xl bg-white/5 border border-white/10">
              {/* Level Badge */}
              <div className={`flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br ${levelInfo.color}`}>
                <span className="text-sm font-bold text-white">{playerLevel}</span>
              </div>
              
              {/* XP */}
              <div className="hidden sm:block">
                <div className="flex items-center gap-1.5">
                  <Star className="h-3.5 w-3.5 text-indigo-400" />
                  <span className="text-sm font-semibold text-white">
                    {playerXP.toLocaleString()}
                  </span>
                  <span className="text-xs text-white/40">XP</span>
                </div>
                {/* Progress bar */}
                <div className="w-20 h-1 mt-1 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full transition-all duration-500"
                    style={{ width: `${xpProgress}%` }}
                  />
                </div>
              </div>
            </div>
            
            {/* Score - compact */}
            <div className="text-center px-3 py-2 rounded-xl bg-white/5 border border-white/10">
              <p className="text-xs text-white/40">Score</p>
              <p className="text-sm font-bold text-indigo-400">
                {totalScore.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
