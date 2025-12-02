/**
 * GameHeader - Fun, light game navigation
 * Teen-friendly design
 */

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Gift, Star, Zap } from "lucide-react";
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
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/80 backdrop-blur-xl shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <Image
              src="/favicon.png"
              alt="Mini.Fi"
              width={40}
              height={40}
              className="rounded-xl shadow-lg group-hover:scale-105 transition-transform"
            />
            <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent hidden sm:inline">
              Mini.Fi
            </span>
          </Link>
          
          {/* Stats */}
          <div className="flex items-center gap-3 sm:gap-4">
            
            {/* Rewards Button */}
            {onRewardsClick && (
              <button
                onClick={onRewardsClick}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-100 to-orange-100 border border-amber-200 text-amber-600 hover:shadow-lg hover:shadow-amber-100 hover:scale-105 transition-all"
              >
                <Gift className="h-4 w-4" />
                <span className="text-sm font-semibold hidden sm:inline">Rewards</span>
              </button>
            )}
            
            {/* Level & XP */}
            <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-white shadow-lg shadow-indigo-100 border border-indigo-100">
              {/* Level Badge */}
              <div className={`flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br ${levelInfo.color} shadow-md`}>
                <span className="text-sm font-bold text-white">{playerLevel}</span>
              </div>
              
              {/* XP */}
              <div className="hidden sm:block">
                <div className="flex items-center gap-1.5">
                  <Star className="h-4 w-4 text-amber-500" />
                  <span className="text-sm font-bold text-gray-900">
                    {playerXP.toLocaleString()}
                  </span>
                  <span className="text-xs text-gray-500">XP</span>
                </div>
                {/* Progress bar */}
                <div className="w-20 h-1.5 mt-1 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full transition-all duration-500"
                    style={{ width: `${xpProgress}%` }}
                  />
                </div>
              </div>
            </div>
            
            {/* Score */}
            <div className="text-center px-4 py-2.5 rounded-xl bg-white shadow-lg shadow-violet-100 border border-violet-100">
              <p className="text-xs text-gray-500">Score</p>
              <p className="text-sm font-bold text-violet-600">
                {totalScore.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
