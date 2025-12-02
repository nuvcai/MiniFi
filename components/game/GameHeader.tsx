/**
 * GameHeader - Enhanced game navigation
 * Dynamic stats display with animations
 */

"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  Gift, 
  Star, 
  Zap, 
  Menu,
  X,
  Trophy,
  Flame,
  Sparkles,
} from "lucide-react";
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
  
  const [animatedXP, setAnimatedXP] = useState(0);
  const [animatedScore, setAnimatedScore] = useState(0);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Animate numbers on mount and when they change
  useEffect(() => {
    const duration = 1000;
    const steps = 30;
    const xpStep = (playerXP - animatedXP) / steps;
    const scoreStep = (totalScore - animatedScore) / steps;
    
    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep++;
      if (currentStep >= steps) {
        setAnimatedXP(playerXP);
        setAnimatedScore(totalScore);
        clearInterval(interval);
      } else {
        setAnimatedXP(prev => Math.round(prev + xpStep));
        setAnimatedScore(prev => Math.round(prev + scoreStep));
      }
    }, duration / steps);
    
    return () => clearInterval(interval);
  }, [playerXP, totalScore]);

  // Handle scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-xl shadow-lg shadow-indigo-100/50 border-b border-indigo-100'
        : 'bg-white/80 backdrop-blur-xl border-b border-gray-100'
    }`}>
      <div className="container mx-auto px-4 sm:px-6 py-3">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-violet-500 rounded-xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity" />
              <Image
                src="/favicon.png"
                alt="Mini.Fi"
                width={44}
                height={44}
                className="relative rounded-xl shadow-lg group-hover:scale-110 transition-transform"
              />
            </div>
            <div className="hidden sm:block">
              <span className="text-xl font-black bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 bg-clip-text text-transparent">
                Mini.Fi
              </span>
              <p className="text-[10px] text-gray-500 -mt-0.5">Learn • Play • Invest</p>
            </div>
          </Link>
          
          {/* Desktop Stats */}
          <div className="hidden md:flex items-center gap-3">
            
            {/* Rewards Button */}
            {onRewardsClick && (
              <button
                onClick={onRewardsClick}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-200 text-amber-600 hover:shadow-lg hover:shadow-amber-100 hover:scale-105 hover:border-amber-300 transition-all group"
              >
                <Gift className="h-5 w-5 group-hover:animate-bounce" />
                <span className="text-sm font-bold">Rewards</span>
                <Sparkles className="h-4 w-4 text-amber-400" />
              </button>
            )}
            
            {/* Level & XP Display */}
            <div className="flex items-center gap-3 px-4 py-2 rounded-2xl bg-gradient-to-r from-slate-50 to-indigo-50 shadow-lg shadow-indigo-100/50 border border-indigo-100">
              {/* Animated Level Badge */}
              <div className="relative group cursor-pointer">
                <div className={`absolute inset-0 bg-gradient-to-br ${levelInfo.color} rounded-xl blur opacity-50 group-hover:opacity-75 transition-opacity`} />
                <div className={`relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br ${levelInfo.color} shadow-lg`}>
                  <span className="text-sm font-black text-white">{playerLevel}</span>
                </div>
                {/* Tooltip */}
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-3 py-1.5 rounded-lg bg-slate-900 text-white text-xs font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  {levelInfo.title}
                </div>
              </div>
              
              {/* XP Stats */}
              <div>
                <div className="flex items-center gap-1.5">
                  <Star className="h-4 w-4 text-amber-500" />
                  <span className="text-base font-black text-gray-900">
                    {animatedXP.toLocaleString()}
                  </span>
                  <span className="text-xs text-gray-500 font-medium">XP</span>
                </div>
                {/* Animated Progress bar */}
                <div className="relative w-24 h-2 mt-1 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-indigo-500 via-violet-500 to-purple-500 rounded-full transition-all duration-500"
                    style={{ width: `${xpProgress}%` }}
                  >
                    {/* Shimmer effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Score Display */}
            <div className="flex items-center gap-3 px-4 py-2 rounded-2xl bg-gradient-to-r from-violet-50 to-purple-50 shadow-lg shadow-violet-100/50 border border-violet-100">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 shadow-lg">
                <Trophy className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-[10px] text-gray-500 uppercase tracking-wider font-medium">Score</p>
                <p className="text-base font-black text-violet-600">
                  {animatedScore.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
          
          {/* Mobile Stats & Menu */}
          <div className="flex md:hidden items-center gap-2">
            {/* Compact Level Badge */}
            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-xl bg-gradient-to-r from-slate-50 to-indigo-50 border border-indigo-100`}>
              <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${levelInfo.color} flex items-center justify-center shadow`}>
                <span className="text-xs font-black text-white">{playerLevel}</span>
              </div>
              <div className="flex items-center gap-1">
                <Star className="h-3 w-3 text-amber-500" />
                <span className="text-xs font-bold text-gray-900">{(playerXP / 1000).toFixed(1)}k</span>
              </div>
            </div>
            
            {/* Mobile Menu Button */}
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              {showMobileMenu ? (
                <X className="h-5 w-5 text-gray-600" />
              ) : (
                <Menu className="h-5 w-5 text-gray-600" />
              )}
            </button>
          </div>
        </div>
        
        {/* Mobile Dropdown Menu */}
        {showMobileMenu && (
          <div className="md:hidden mt-3 p-4 rounded-2xl bg-white border border-gray-200 shadow-xl animate-in slide-in-from-top-2 duration-200">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-indigo-50 to-violet-50 border border-indigo-100">
                <div className="flex items-center gap-2 mb-1">
                  <Star className="h-4 w-4 text-amber-500" />
                  <span className="text-xs text-gray-500">XP</span>
                </div>
                <p className="text-lg font-black text-gray-900">{playerXP.toLocaleString()}</p>
                <div className="w-full h-1.5 mt-1 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full"
                    style={{ width: `${xpProgress}%` }}
                  />
                </div>
              </div>
              
              <div className="p-3 rounded-xl bg-gradient-to-br from-violet-50 to-purple-50 border border-violet-100">
                <div className="flex items-center gap-2 mb-1">
                  <Trophy className="h-4 w-4 text-violet-500" />
                  <span className="text-xs text-gray-500">Score</span>
                </div>
                <p className="text-lg font-black text-violet-600">{totalScore.toLocaleString()}</p>
              </div>
            </div>
            
            {/* Level Info */}
            <div className="p-3 rounded-xl bg-gradient-to-r from-slate-50 to-gray-50 border border-gray-200 mb-4">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${levelInfo.color} flex items-center justify-center shadow-lg`}>
                  {levelInfo.icon}
                </div>
                <div>
                  <p className="text-xs text-gray-500">Current Level</p>
                  <p className="font-bold text-gray-900">Level {playerLevel} - {levelInfo.title}</p>
                </div>
              </div>
            </div>
            
            {/* Rewards Button */}
            {onRewardsClick && (
              <button
                onClick={() => {
                  onRewardsClick();
                  setShowMobileMenu(false);
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-amber-400 to-orange-400 text-white font-bold shadow-lg hover:shadow-xl transition-all"
              >
                <Gift className="h-5 w-5" />
                <span>View Rewards</span>
                <Flame className="h-5 w-5" />
              </button>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
