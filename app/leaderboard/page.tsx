/**
 * Leaderboard Page - League Rankings & Competition
 * Shows current league standings and player rankings
 */

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  Trophy,
  Crown,
  TrendingUp,
  TrendingDown,
  Clock,
  ChevronUp,
  ChevronDown,
  Minus,
  Flame,
  Zap,
  Users,
  Target,
} from "lucide-react";
import { useLeague, type LeaguePlayer } from "@/hooks/useLeague";
import { useIII } from "@/hooks/useIII";
import { Button } from "@/components/ui/button";

const III_CONFIG = {
  symbol: 'iii',
  emoji: '✦',
};

export default function LeaderboardPage() {
  const {
    league,
    standings,
    userRank,
    zone,
    timeRemaining,
    xpToNextRank,
    xpLead,
    allLeagues,
    isLoading,
  } = useLeague();

  const { totalIII, weeklyIII } = useIII();
  const [selectedLeague, setSelectedLeague] = useState<string | null>(null);

  // Use current league if no selection
  const activeLeagueId = selectedLeague || league?.id || 'bronze';

  // Format time remaining
  const formatTime = () => {
    const { days, hours, minutes } = timeRemaining;
    if (days > 0) return `${days}d ${hours}h`;
    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m`;
  };

  // Get rank change icon
  const getRankChangeIcon = (change: number) => {
    if (change > 0) return <ChevronUp className="h-4 w-4 text-emerald-400" />;
    if (change < 0) return <ChevronDown className="h-4 w-4 text-red-400" />;
    return <Minus className="h-3 w-3 text-white/30" />;
  };

  // Zone styling
  const zoneConfig = {
    promotion: { bg: 'bg-emerald-500/20', border: 'border-emerald-500/40', text: 'text-emerald-400', label: 'Promotion Zone' },
    safe: { bg: 'bg-white/10', border: 'border-white/20', text: 'text-white/70', label: 'Safe Zone' },
    danger: { bg: 'bg-red-500/20', border: 'border-red-500/40', text: 'text-red-400', label: 'Danger Zone' },
  };

  return (
    <div className="min-h-screen w-full bg-[#050507] overflow-x-hidden">
      {/* Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-900/20 via-transparent to-transparent" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-orange-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-4xl mx-auto px-4 sm:px-6 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Link href="/timeline" className="flex items-center gap-2 text-white/70 hover:text-white transition-colors">
            <ArrowLeft className="h-5 w-5" />
            <span className="font-medium">Back to Game</span>
          </Link>
          <div className="flex items-center gap-2 text-white/60">
            <Clock className="h-4 w-4" />
            <span className="text-sm font-medium">Season ends in {formatTime()}</span>
          </div>
        </div>

        {/* Consolidated League Section */}
        <div className="mb-6">
          {/* League Tabs with Your Stats */}
          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10">
            {/* League Selector */}
            <div className="flex gap-2 overflow-x-auto pb-3 mb-4 border-b border-white/10">
              {allLeagues.map((l) => {
                const isActive = activeLeagueId === l.id;
                const isUserLeague = l.id === league?.id;
                return (
                  <button
                    key={l.id}
                    onClick={() => setSelectedLeague(l.id)}
                    className={`flex-shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm transition-all ${
                      isActive
                        ? 'bg-gradient-to-r from-amber-500/30 to-orange-500/20 text-amber-300 border border-amber-500/40 shadow-lg shadow-amber-500/10'
                        : 'bg-white/5 text-white/60 border border-white/10 hover:bg-white/10 hover:border-white/20'
                    }`}
                  >
                    <span className="text-lg">{l.emoji}</span>
                    <span>{l.name}</span>
                    {isUserLeague && !isActive && (
                      <span className="ml-1 px-1.5 py-0.5 rounded text-[9px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">YOU</span>
                    )}
                  </button>
                );
              })}
            </div>
            
            {/* Your Stats - Only show when viewing your league */}
            {league && activeLeagueId === league.id && (
              <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
                {/* Your Rank & Zone */}
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{league.emoji}</span>
                    <div>
                      <p className="text-sm text-white/50">Your Rank</p>
                      <p className="text-2xl font-black text-white">#{userRank}</p>
                    </div>
                  </div>
                  <div className={`px-3 py-2 rounded-xl ${zoneConfig[zone].bg} border ${zoneConfig[zone].border}`}>
                    <p className={`text-sm font-bold ${zoneConfig[zone].text}`}>
                      {zone === 'promotion' ? '🚀' : zone === 'danger' ? '⚠️' : '✓'} {zoneConfig[zone].label}
                    </p>
                  </div>
                </div>
                
                {/* Divider */}
                <div className="hidden sm:block w-px h-12 bg-white/20" />
                
                {/* Weekly Stats */}
                <div className="flex items-center gap-6 flex-1">
                  <div className="text-center sm:text-left">
                    <p className="text-xs text-white/50">Weekly {III_CONFIG.symbol}</p>
                    <p className="text-xl font-black text-emerald-400">{weeklyIII.toLocaleString()}</p>
                  </div>
                  
                  {/* Progress indicators */}
                  {xpToNextRank > 0 && (
                    <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                      <TrendingUp className="h-4 w-4 text-emerald-400" />
                      <span className="text-xs text-emerald-400 font-medium">
                        {xpToNextRank.toLocaleString()} to #{userRank - 1}
                      </span>
                    </div>
                  )}
                  {xpLead > 0 && (
                    <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/20">
                      <TrendingDown className="h-4 w-4 text-amber-400" />
                      <span className="text-xs text-amber-400 font-medium">
                        {xpLead.toLocaleString()} lead over #{userRank + 1}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}
            
            {/* Viewing other league message */}
            {league && activeLeagueId !== league.id && (
              <div className="flex items-center justify-center gap-3 py-2">
                <span className="text-sm text-white/50">
                  Viewing {allLeagues.find(l => l.id === activeLeagueId)?.name}
                </span>
                <button 
                  onClick={() => setSelectedLeague(league.id)}
                  className="text-sm text-amber-400 hover:text-amber-300 font-medium transition-colors"
                >
                  → Back to your league
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Standings Table */}
        <div className="rounded-2xl bg-white/[0.03] border border-white/10 overflow-hidden">
          {/* Table Header */}
          <div className="grid grid-cols-12 gap-2 px-4 py-3 bg-white/5 border-b border-white/10 text-xs text-white/50 font-medium">
            <div className="col-span-1 text-center">#</div>
            <div className="col-span-5">Player</div>
            <div className="col-span-3 text-right">Weekly {III_CONFIG.symbol}</div>
            <div className="col-span-2 text-center">Streak</div>
            <div className="col-span-1 text-center">Δ</div>
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="p-8 text-center">
              <div className="animate-spin w-8 h-8 border-2 border-amber-500 border-t-transparent rounded-full mx-auto mb-3" />
              <p className="text-white/50">Loading standings...</p>
            </div>
          )}

          {/* Players List */}
          {!isLoading && standings?.players && (
            <div className="divide-y divide-white/5">
              {standings.players.map((player, index) => {
                const isCurrentUser = player.is_current_user;
                const isPromotion = index < (league?.promotionSlots || 3);
                const isRelegation = league?.relegationSlots && index >= standings.players.length - league.relegationSlots;

                return (
                  <div
                    key={player.id}
                    className={`grid grid-cols-12 gap-2 px-4 py-3 items-center transition-all ${
                      isCurrentUser
                        ? 'bg-emerald-500/10 border-l-4 border-emerald-500'
                        : isPromotion
                        ? 'bg-emerald-500/5'
                        : isRelegation
                        ? 'bg-red-500/5'
                        : 'hover:bg-white/5'
                    }`}
                  >
                    {/* Rank */}
                    <div className="col-span-1 text-center">
                      {index === 0 ? (
                        <Crown className="h-5 w-5 text-amber-400 mx-auto" />
                      ) : index === 1 ? (
                        <span className="text-lg">🥈</span>
                      ) : index === 2 ? (
                        <span className="text-lg">🥉</span>
                      ) : (
                        <span className={`font-bold ${isCurrentUser ? 'text-emerald-400' : 'text-white/70'}`}>
                          {player.rank}
                        </span>
                      )}
                    </div>

                    {/* Player */}
                    <div className="col-span-5 flex items-center gap-2">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm ${
                        isCurrentUser
                          ? 'bg-gradient-to-br from-emerald-400 to-teal-500 text-white font-bold'
                          : 'bg-white/10 text-white/70'
                      }`}>
                        {player.display_name.charAt(0).toUpperCase()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`font-medium truncate ${isCurrentUser ? 'text-emerald-400' : 'text-white'}`}>
                          {isCurrentUser ? 'You' : player.display_name}
                        </p>
                        {player.country && (
                          <span className="text-xs text-white/40">{player.country}</span>
                        )}
                      </div>
                    </div>

                    {/* Weekly XP */}
                    <div className="col-span-3 text-right">
                      <span className={`font-bold ${isCurrentUser ? 'text-emerald-400' : 'text-white'}`}>
                        {player.weekly_xp.toLocaleString()}
                      </span>
                      <span className="text-white/40 text-xs ml-1">{III_CONFIG.symbol}</span>
                    </div>

                    {/* Streak */}
                    <div className="col-span-2 text-center">
                      {player.current_streak > 0 && (
                        <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-orange-500/20 text-orange-400 text-xs">
                          <Flame className="h-3 w-3" />
                          {player.current_streak}
                        </div>
                      )}
                    </div>

                    {/* Rank Change */}
                    <div className="col-span-1 text-center">
                      {getRankChangeIcon(player.rank_change)}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Zone Legend */}
        <div className="mt-4 flex flex-wrap gap-4 justify-center text-xs text-white/50">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-emerald-500/30" />
            <span>Promotion Zone</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-white/10" />
            <span>Safe Zone</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-red-500/30" />
            <span>Relegation Zone</span>
          </div>
        </div>

        {/* Season Rewards Preview */}
        <div className="mt-8 p-5 rounded-2xl bg-white/[0.03] border border-white/10">
          <h3 className="font-bold text-white flex items-center gap-2 mb-4">
            <Trophy className="h-5 w-5 text-amber-400" />
            Season End Rewards
          </h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-center">
              <Crown className="h-6 w-6 text-amber-400 mx-auto mb-2" />
              <p className="font-bold text-amber-300">1st Place</p>
              <p className="text-sm text-white/60">+{league?.id === 'diamond' ? '1500' : league?.id === 'platinum' ? '750' : league?.id === 'gold' ? '400' : league?.id === 'silver' ? '200' : '100'} {III_CONFIG.symbol}</p>
            </div>
            <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
              <span className="text-2xl block mb-1">🥈</span>
              <p className="font-bold text-white/80">2nd Place</p>
              <p className="text-sm text-white/60">+{league?.id === 'diamond' ? '1000' : league?.id === 'platinum' ? '500' : league?.id === 'gold' ? '300' : league?.id === 'silver' ? '150' : '75'} {III_CONFIG.symbol}</p>
            </div>
            <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
              <span className="text-2xl block mb-1">🥉</span>
              <p className="font-bold text-white/80">3rd Place</p>
              <p className="text-sm text-white/60">+{league?.id === 'diamond' ? '750' : league?.id === 'platinum' ? '350' : league?.id === 'gold' ? '200' : league?.id === 'silver' ? '100' : '50'} {III_CONFIG.symbol}</p>
            </div>
          </div>
          <p className="text-center text-white/40 text-xs mt-4">
            Top {league?.promotionSlots || 10} players get promoted • Bottom {league?.relegationSlots || 5} players get relegated
          </p>
        </div>

        {/* Footer */}
        <footer className="mt-12 pt-6 border-t border-white/10">
          <div className="flex items-center justify-center gap-3">
            <Image src="/nuvc-logo.png" alt="NUVC" width={24} height={24} className="rounded" />
            <span className="text-sm text-white/40">Mini.Fi by NUVC.AI</span>
          </div>
        </footer>
      </div>
    </div>
  );
}

