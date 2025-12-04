/**
 * IIIDashboard — Apple-inspired Design
 * 
 * Clean, minimal stats display
 * No overwhelming visual elements
 */

"use client";

import React from "react";
import Link from "next/link";
import {
  Flame,
  TrendingUp,
  Gift,
  Sparkles,
  Award,
  ChevronRight,
} from "lucide-react";
import { levelTitles } from "./LevelUpCelebration";
import { type League } from "./LeagueSystem";

interface IIIDashboardProps {
  totalIII: number;
  level: number;
  levelProgress: number;
  iiiToNextLevel: number;
  weeklyIII: number;
  league: League | null;
  leagueRank: number;
  leagueZone: 'promotion' | 'safe' | 'danger';
  streakDays: number;
  streakBonusAvailable: boolean;
  streakBonus: number;
  onClaimStreak: () => void;
  stakedIII?: number;
  stakingAPY?: number;
  pendingRewards?: number;
  onStake?: () => void;
  onClaimRewards?: () => void;
  badgeCount: number;
  onViewLeague?: () => void;
  onViewBadges?: () => void;
}

export function IIIDashboard({
  totalIII,
  level,
  levelProgress,
  iiiToNextLevel,
  weeklyIII,
  league,
  leagueRank,
  leagueZone,
  streakDays,
  streakBonusAvailable,
  streakBonus,
  onClaimStreak,
  badgeCount,
}: IIIDashboardProps) {
  const levelInfo = levelTitles[level] || levelTitles[1];

  const zoneStyles = {
    promotion: "text-emerald-600 dark:text-emerald-400",
    safe: "text-gray-600 dark:text-gray-400",
    danger: "text-amber-600 dark:text-amber-400",
  };

  const zoneLabels = {
    promotion: "↑ Promotion",
    safe: "Safe",
    danger: "↓ Danger Zone",
  };

  return (
    <div className="rounded-2xl bg-white dark:bg-[#1A1A1A] border border-black/[0.04] dark:border-white/[0.06] shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.3)] overflow-hidden">
      {/* Main Stats */}
      <div className="p-5">
        {/* Level & Balance */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-violet-500 flex items-center justify-center text-white text-lg font-bold">
              {level}
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Level {level}</p>
              <p className="font-semibold text-gray-900 dark:text-white">{levelInfo.title}</p>
            </div>
          </div>
          
          {league && (
            <Link 
              href="/leaderboard"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-white/[0.06] hover:bg-gray-200 dark:hover:bg-white/[0.1] transition-colors"
            >
              <span className="text-base">{league.emoji}</span>
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">#{leagueRank}</span>
            </Link>
          )}
        </div>
        
        {/* iii Balance */}
        <div className="mb-4">
          <div className="flex items-center gap-1.5 mb-1">
            <Sparkles className="h-4 w-4 text-amber-500" />
            <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">Total Balance</span>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-3xl font-bold text-gray-900 dark:text-white">
              {totalIII.toLocaleString()}
            </span>
            <span className="text-sm font-semibold text-amber-500">iii</span>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs">
            <span className="text-gray-500 dark:text-gray-400">Next Level</span>
            <span className="text-violet-600 dark:text-violet-400 font-medium">
              {iiiToNextLevel.toLocaleString()} iii left
            </span>
          </div>
          <div className="h-2 rounded-full bg-gray-100 dark:bg-white/[0.06] overflow-hidden">
            <div 
              className="h-full rounded-full bg-violet-500 transition-all duration-500"
              style={{ width: `${levelProgress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 border-t border-black/[0.04] dark:border-white/[0.06]">
        {/* Streak */}
        <button 
          onClick={streakBonusAvailable ? onClaimStreak : undefined}
          className={`p-4 text-center border-r border-black/[0.04] dark:border-white/[0.06] ${
            streakBonusAvailable 
              ? 'bg-amber-50 dark:bg-amber-500/10 cursor-pointer hover:bg-amber-100 dark:hover:bg-amber-500/15' 
              : ''
          } transition-colors`}
        >
          <div className="flex items-center justify-center gap-1 mb-1">
            <Flame className={`h-4 w-4 ${
              streakDays >= 7 ? 'text-orange-500' : 
              streakDays >= 3 ? 'text-amber-500' : 'text-gray-400 dark:text-gray-500'
            }`} />
            <span className="text-lg font-bold text-gray-900 dark:text-white">{streakDays}</span>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400">Streak</p>
          {streakBonusAvailable && (
            <span className="inline-block mt-1 text-xs font-semibold text-amber-600 dark:text-amber-400">
              +{streakBonus} iii
            </span>
          )}
        </button>
        
        {/* Weekly */}
        <Link 
          href="/leaderboard"
          className="p-4 text-center border-r border-black/[0.04] dark:border-white/[0.06] hover:bg-gray-50 dark:hover:bg-white/[0.02] transition-colors"
        >
          <div className="flex items-center justify-center gap-1 mb-1">
            <TrendingUp className="h-4 w-4 text-emerald-500" />
            <span className="text-lg font-bold text-gray-900 dark:text-white">{weeklyIII}</span>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400">This Week</p>
          {league && (
            <span className={`inline-block mt-1 text-xs font-medium ${zoneStyles[leagueZone]}`}>
              {zoneLabels[leagueZone]}
            </span>
          )}
        </Link>
        
        {/* Badges */}
        <Link 
          href="/profile"
          className="p-4 text-center hover:bg-gray-50 dark:hover:bg-white/[0.02] transition-colors"
        >
          <div className="flex items-center justify-center gap-1 mb-1">
            <Award className="h-4 w-4 text-amber-500" />
            <span className="text-lg font-bold text-gray-900 dark:text-white">{badgeCount}</span>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400">Badges</p>
        </Link>
      </div>

      {/* Claim Streak Button */}
      {streakBonusAvailable && (
        <div className="p-4 border-t border-black/[0.04] dark:border-white/[0.06]">
          <button
            onClick={onClaimStreak}
            className="w-full flex items-center justify-between p-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-white transition-colors"
          >
            <div className="flex items-center gap-2">
              <Gift className="h-5 w-5" />
              <span className="font-medium">Claim Daily Bonus</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="font-bold">+{streakBonus}</span>
              <ChevronRight className="h-4 w-4" />
            </div>
          </button>
        </div>
      )}
    </div>
  );
}

export default IIIDashboard;
