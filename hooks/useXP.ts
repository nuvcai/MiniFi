/**
 * useXP - Unified XP System
 * 
 * SINGLE source of truth for all player progression.
 * Consolidates: effort rewards, courage XP, mission XP, streak bonuses.
 * 
 * Philosophy: One number to rule them all. Simple, clear, motivating.
 */

'use client';

import { useState, useCallback, useEffect, useMemo } from 'react';
import { LEAGUES, type League } from '@/components/gamification/LeagueSystem';

// =============================================================================
// XP REWARDS - Single source of truth for all XP values
// =============================================================================

export const XP_REWARDS = {
  // Mission rewards (base values)
  MISSION_COMPLETE: 100,
  MISSION_FIRST_TIME: 50, // Bonus for first completion
  
  // Courage/Action rewards
  FIRST_INVESTMENT: 50,
  HIGH_RISK_INVESTMENT: 20,
  EXTREME_RISK_INVESTMENT: 25,
  LOSS_LESSON: 30, // XP for experiencing a loss (learning!)
  INVEST_AFTER_LOSS: 40, // Resilience bonus
  
  // Exploration rewards
  NEW_ASSET_CLASS: 15,
  NEW_RISK_LEVEL: 15,
  COACH_ADVICE_VIEWED: 10,
  RISK_PREVIEW_VIEWED: 5,
  
  // Engagement rewards
  QUIZ_CORRECT: 10,
  QUIZ_PERFECT: 50, // All questions correct
  THESIS_WRITTEN: 25,
  
  // Streak multipliers
  STREAK_BASE: 10,
  STREAK_3_DAY: 25,
  STREAK_5_DAY: 40,
  STREAK_7_DAY: 75,
  STREAK_14_DAY: 150,
  STREAK_21_DAY: 250,
  STREAK_30_DAY: 500,
} as const;

// =============================================================================
// LEVEL SYSTEM
// =============================================================================

export const LEVEL_CONFIG = {
  XP_PER_LEVEL: 1000,
  MAX_LEVEL: 50,
} as const;

export function getLevel(xp: number): number {
  return Math.min(Math.floor(xp / LEVEL_CONFIG.XP_PER_LEVEL) + 1, LEVEL_CONFIG.MAX_LEVEL);
}

export function getXPInCurrentLevel(xp: number): number {
  return xp % LEVEL_CONFIG.XP_PER_LEVEL;
}

export function getXPToNextLevel(xp: number): number {
  return LEVEL_CONFIG.XP_PER_LEVEL - getXPInCurrentLevel(xp);
}

export function getLevelProgress(xp: number): number {
  return (getXPInCurrentLevel(xp) / LEVEL_CONFIG.XP_PER_LEVEL) * 100;
}

// =============================================================================
// LEAGUE HELPERS
// =============================================================================

export function getLeagueByXP(totalXP: number): League {
  for (let i = LEAGUES.length - 1; i >= 0; i--) {
    if (totalXP >= LEAGUES[i].minXpToEnter) {
      return LEAGUES[i];
    }
  }
  return LEAGUES[0];
}

export function getNextLeague(currentLeague: League): League | null {
  const currentIndex = LEAGUES.findIndex(l => l.id === currentLeague.id);
  if (currentIndex < LEAGUES.length - 1) {
    return LEAGUES[currentIndex + 1];
  }
  return null;
}

export function getXPToNextLeague(totalXP: number): number | null {
  const currentLeague = getLeagueByXP(totalXP);
  const nextLeague = getNextLeague(currentLeague);
  if (nextLeague) {
    return nextLeague.minXpToEnter - totalXP;
  }
  return null;
}

// =============================================================================
// ACHIEVEMENT BADGES (Cosmetic only - no separate currency)
// =============================================================================

export interface Badge {
  id: string;
  name: string;
  description: string;
  emoji: string;
  category: 'courage' | 'exploration' | 'mastery' | 'streak' | 'special';
  requirement: string;
  isEarned: (stats: PlayerStats) => boolean;
}

export const BADGES: Badge[] = [
  // Courage badges
  {
    id: 'first-risk',
    name: 'First Steps',
    description: 'Made your first investment',
    emoji: '🌱',
    category: 'courage',
    requirement: 'first_investment',
    isEarned: (stats) => stats.investmentsMade >= 1,
  },
  {
    id: 'bold-move',
    name: 'Bold Move',
    description: 'Made a high-risk investment',
    emoji: '⚡',
    category: 'courage',
    requirement: 'high_risk',
    isEarned: (stats) => stats.highRiskInvestments >= 1,
  },
  {
    id: 'fearless',
    name: 'Fearless Explorer',
    description: 'Made an extreme-risk investment',
    emoji: '🔥',
    category: 'courage',
    requirement: 'extreme_risk',
    isEarned: (stats) => stats.extremeRiskInvestments >= 1,
  },
  {
    id: 'resilient',
    name: 'Resilient Spirit',
    description: 'Invested again after a loss',
    emoji: '💪',
    category: 'courage',
    requirement: 'invest_after_loss',
    isEarned: (stats) => stats.investmentsAfterLoss >= 1,
  },
  {
    id: 'battle-tested',
    name: 'Battle Tested',
    description: 'Experienced 3 losses and kept going',
    emoji: '🛡️',
    category: 'courage',
    requirement: 'losses_experienced',
    isEarned: (stats) => stats.lossesExperienced >= 3,
  },
  
  // Exploration badges
  {
    id: 'diversifier',
    name: 'Diversifier',
    description: 'Explored 3 different asset classes',
    emoji: '🗺️',
    category: 'exploration',
    requirement: 'asset_classes',
    isEarned: (stats) => stats.assetClassesExplored >= 3,
  },
  {
    id: 'asset-master',
    name: 'Asset Master',
    description: 'Explored all 6 asset classes',
    emoji: '👑',
    category: 'exploration',
    requirement: 'all_assets',
    isEarned: (stats) => stats.assetClassesExplored >= 6,
  },
  {
    id: 'risk-spectrum',
    name: 'Full Spectrum',
    description: 'Tried all risk levels',
    emoji: '🌈',
    category: 'exploration',
    requirement: 'all_risks',
    isEarned: (stats) => stats.riskLevelsExplored >= 5,
  },
  {
    id: 'coach-collector',
    name: 'Open Minded',
    description: 'Got advice from all 4 coaches',
    emoji: '🧠',
    category: 'exploration',
    requirement: 'all_coaches',
    isEarned: (stats) => stats.coachesUsed >= 4,
  },
  
  // Mastery badges
  {
    id: 'mission-starter',
    name: 'Mission Starter',
    description: 'Completed your first mission',
    emoji: '🎯',
    category: 'mastery',
    requirement: 'missions_1',
    isEarned: (stats) => stats.missionsCompleted >= 1,
  },
  {
    id: 'mission-veteran',
    name: 'Mission Veteran',
    description: 'Completed 3 missions',
    emoji: '🎖️',
    category: 'mastery',
    requirement: 'missions_3',
    isEarned: (stats) => stats.missionsCompleted >= 3,
  },
  {
    id: 'history-scholar',
    name: 'History Scholar',
    description: 'Completed all 6 historical missions',
    emoji: '🎓',
    category: 'mastery',
    requirement: 'missions_6',
    isEarned: (stats) => stats.missionsCompleted >= 6,
  },
  
  // Streak badges
  {
    id: 'streak-3',
    name: '3-Day Streak',
    description: '3 days in a row!',
    emoji: '🔥',
    category: 'streak',
    requirement: 'streak_3',
    isEarned: (stats) => stats.longestStreak >= 3,
  },
  {
    id: 'streak-7',
    name: 'Weekly Warrior',
    description: '7 days in a row!',
    emoji: '⚔️',
    category: 'streak',
    requirement: 'streak_7',
    isEarned: (stats) => stats.longestStreak >= 7,
  },
  {
    id: 'streak-30',
    name: 'Monthly Legend',
    description: '30 days in a row!',
    emoji: '👑',
    category: 'streak',
    requirement: 'streak_30',
    isEarned: (stats) => stats.longestStreak >= 30,
  },
];

// =============================================================================
// TYPES
// =============================================================================

export interface PlayerStats {
  // Investments
  investmentsMade: number;
  highRiskInvestments: number;
  extremeRiskInvestments: number;
  lossesExperienced: number;
  investmentsAfterLoss: number;
  lastInvestmentWasLoss: boolean;
  
  // Exploration
  assetClassesExplored: number;
  assetClasses: Set<string>;
  riskLevelsExplored: number;
  riskLevels: Set<string>;
  coachesUsed: number;
  coaches: Set<string>;
  
  // Progress
  missionsCompleted: number;
  completedMissions: string[];
  quizzesPassed: number;
  thesesWritten: number;
  
  // Streaks
  currentStreak: number;
  longestStreak: number;
  totalDaysPlayed: number;
  lastPlayDate: string | null;
}

export interface XPTransaction {
  id: string;
  amount: number;
  source: string;
  description: string;
  timestamp: Date;
}

export interface UseXPReturn {
  // Core XP
  totalXP: number;
  level: number;
  xpInLevel: number;
  xpToNextLevel: number;
  levelProgress: number;
  
  // Weekly XP (for leagues)
  weeklyXP: number;
  
  // League
  league: League;
  nextLeague: League | null;
  xpToNextLeague: number | null;
  
  // Stats & Badges
  stats: PlayerStats;
  earnedBadges: Badge[];
  
  // Recent transactions
  recentTransactions: XPTransaction[];
  
  // Actions
  addXP: (amount: number, source: string, description?: string) => void;
  recordInvestment: (riskLevel: string, assetClass: string, wasLoss: boolean) => number;
  recordCoachAdvice: (coachId: string) => number;
  recordRiskPreview: () => number;
  recordMissionComplete: (missionTitle: string, baseReward: number) => number;
  recordQuizComplete: (correct: number, total: number) => number;
  recordThesis: () => number;
  recordStreakClaim: (streakDays: number) => number;
  
  // Helpers
  getStreakBonus: (days: number) => number;
}

// =============================================================================
// STORAGE
// =============================================================================

const STORAGE_KEY = 'minifi_xp_data';
const WEEKLY_STORAGE_KEY = 'minifi_weekly_xp';

const initialStats: PlayerStats = {
  investmentsMade: 0,
  highRiskInvestments: 0,
  extremeRiskInvestments: 0,
  lossesExperienced: 0,
  investmentsAfterLoss: 0,
  lastInvestmentWasLoss: false,
  assetClassesExplored: 0,
  assetClasses: new Set(),
  riskLevelsExplored: 0,
  riskLevels: new Set(),
  coachesUsed: 0,
  coaches: new Set(),
  missionsCompleted: 0,
  completedMissions: [],
  quizzesPassed: 0,
  thesesWritten: 0,
  currentStreak: 0,
  longestStreak: 0,
  totalDaysPlayed: 0,
  lastPlayDate: null,
};

// =============================================================================
// MAIN HOOK
// =============================================================================

export function useXP(): UseXPReturn {
  const [totalXP, setTotalXP] = useState(0);
  const [weeklyXP, setWeeklyXP] = useState(0);
  const [stats, setStats] = useState<PlayerStats>(initialStats);
  const [transactions, setTransactions] = useState<XPTransaction[]>([]);

  // Load from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const data = JSON.parse(saved);
        setTotalXP(data.totalXP || 0);
        setStats({
          ...initialStats,
          ...data.stats,
          assetClasses: new Set(data.stats?.assetClasses || []),
          riskLevels: new Set(data.stats?.riskLevels || []),
          coaches: new Set(data.stats?.coaches || []),
        });
        setTransactions(data.transactions?.slice(0, 50) || []);
      }
      
      // Load weekly XP separately (resets each week)
      const weeklyData = localStorage.getItem(WEEKLY_STORAGE_KEY);
      if (weeklyData) {
        const { xp, weekStart } = JSON.parse(weeklyData);
        const currentWeekStart = getWeekStart();
        if (weekStart === currentWeekStart) {
          setWeeklyXP(xp);
        } else {
          // New week, reset weekly XP
          localStorage.setItem(WEEKLY_STORAGE_KEY, JSON.stringify({ xp: 0, weekStart: currentWeekStart }));
        }
      }
    } catch (e) {
      console.error('Failed to load XP data:', e);
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    try {
      const data = {
        totalXP,
        stats: {
          ...stats,
          assetClasses: Array.from(stats.assetClasses),
          riskLevels: Array.from(stats.riskLevels),
          coaches: Array.from(stats.coaches),
        },
        transactions: transactions.slice(0, 50),
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      localStorage.setItem(WEEKLY_STORAGE_KEY, JSON.stringify({ xp: weeklyXP, weekStart: getWeekStart() }));
    } catch (e) {
      console.error('Failed to save XP data:', e);
    }
  }, [totalXP, weeklyXP, stats, transactions]);

  // Computed values
  const level = useMemo(() => getLevel(totalXP), [totalXP]);
  const xpInLevel = useMemo(() => getXPInCurrentLevel(totalXP), [totalXP]);
  const xpToNextLevel = useMemo(() => getXPToNextLevel(totalXP), [totalXP]);
  const levelProgress = useMemo(() => getLevelProgress(totalXP), [totalXP]);
  const league = useMemo(() => getLeagueByXP(totalXP), [totalXP]);
  const nextLeague = useMemo(() => getNextLeague(league), [league]);
  const xpToNextLeagueValue = useMemo(() => getXPToNextLeague(totalXP), [totalXP]);
  
  // Earned badges
  const earnedBadges = useMemo(() => {
    return BADGES.filter(badge => badge.isEarned(stats));
  }, [stats]);

  // Add XP (core function)
  const addXP = useCallback((amount: number, source: string, description?: string) => {
    const transaction: XPTransaction = {
      id: `tx_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
      amount,
      source,
      description: description || source,
      timestamp: new Date(),
    };
    
    setTotalXP(prev => prev + amount);
    setWeeklyXP(prev => prev + amount);
    setTransactions(prev => [transaction, ...prev].slice(0, 50));
  }, []);

  // Record investment
  const recordInvestment = useCallback((riskLevel: string, assetClass: string, wasLoss: boolean): number => {
    let xpEarned = 0;
    const normalizedRisk = riskLevel.toLowerCase();
    const normalizedAsset = assetClass.toLowerCase();
    
    setStats(prev => {
      const isFirstInvestment = prev.investmentsMade === 0;
      const isNewAssetClass = !prev.assetClasses.has(normalizedAsset);
      const isNewRiskLevel = !prev.riskLevels.has(normalizedRisk);
      const isHighRisk = normalizedRisk === 'high';
      const isExtremeRisk = normalizedRisk === 'extreme';
      const investedAfterLoss = prev.lastInvestmentWasLoss && !wasLoss;
      
      // Calculate XP
      if (isFirstInvestment) xpEarned += XP_REWARDS.FIRST_INVESTMENT;
      if (isNewAssetClass) xpEarned += XP_REWARDS.NEW_ASSET_CLASS;
      if (isNewRiskLevel) xpEarned += XP_REWARDS.NEW_RISK_LEVEL;
      if (isHighRisk) xpEarned += XP_REWARDS.HIGH_RISK_INVESTMENT;
      if (isExtremeRisk) xpEarned += XP_REWARDS.EXTREME_RISK_INVESTMENT;
      if (wasLoss) xpEarned += XP_REWARDS.LOSS_LESSON;
      if (investedAfterLoss) xpEarned += XP_REWARDS.INVEST_AFTER_LOSS;
      
      const newAssetClasses = new Set(prev.assetClasses);
      newAssetClasses.add(normalizedAsset);
      
      const newRiskLevels = new Set(prev.riskLevels);
      newRiskLevels.add(normalizedRisk);
      
      return {
        ...prev,
        investmentsMade: prev.investmentsMade + 1,
        highRiskInvestments: isHighRisk ? prev.highRiskInvestments + 1 : prev.highRiskInvestments,
        extremeRiskInvestments: isExtremeRisk ? prev.extremeRiskInvestments + 1 : prev.extremeRiskInvestments,
        lossesExperienced: wasLoss ? prev.lossesExperienced + 1 : prev.lossesExperienced,
        investmentsAfterLoss: investedAfterLoss ? prev.investmentsAfterLoss + 1 : prev.investmentsAfterLoss,
        lastInvestmentWasLoss: wasLoss,
        assetClasses: newAssetClasses,
        assetClassesExplored: newAssetClasses.size,
        riskLevels: newRiskLevels,
        riskLevelsExplored: newRiskLevels.size,
      };
    });
    
    if (xpEarned > 0) {
      addXP(xpEarned, 'investment', `Investment rewards`);
    }
    
    return xpEarned;
  }, [addXP]);

  // Record coach advice
  const recordCoachAdvice = useCallback((coachId: string): number => {
    let xpEarned = 0;
    
    setStats(prev => {
      const isNewCoach = !prev.coaches.has(coachId);
      if (isNewCoach) {
        xpEarned = XP_REWARDS.COACH_ADVICE_VIEWED;
      }
      
      const newCoaches = new Set(prev.coaches);
      newCoaches.add(coachId);
      
      return {
        ...prev,
        coaches: newCoaches,
        coachesUsed: newCoaches.size,
      };
    });
    
    if (xpEarned > 0) {
      addXP(xpEarned, 'coach', 'Coach advice viewed');
    }
    
    return xpEarned;
  }, [addXP]);

  // Record risk preview
  const recordRiskPreview = useCallback((): number => {
    addXP(XP_REWARDS.RISK_PREVIEW_VIEWED, 'preview', 'Risk preview viewed');
    return XP_REWARDS.RISK_PREVIEW_VIEWED;
  }, [addXP]);

  // Record mission complete
  const recordMissionComplete = useCallback((missionTitle: string, baseReward: number): number => {
    let xpEarned = baseReward;
    
    setStats(prev => {
      const isFirstTime = !prev.completedMissions.includes(missionTitle);
      if (isFirstTime) {
        xpEarned += XP_REWARDS.MISSION_FIRST_TIME;
      }
      
      return {
        ...prev,
        missionsCompleted: prev.missionsCompleted + 1,
        completedMissions: isFirstTime 
          ? [...prev.completedMissions, missionTitle]
          : prev.completedMissions,
      };
    });
    
    addXP(xpEarned, 'mission', `Mission: ${missionTitle}`);
    return xpEarned;
  }, [addXP]);

  // Record quiz complete
  const recordQuizComplete = useCallback((correct: number, total: number): number => {
    let xpEarned = correct * XP_REWARDS.QUIZ_CORRECT;
    
    if (correct === total && total > 0) {
      xpEarned += XP_REWARDS.QUIZ_PERFECT;
      setStats(prev => ({
        ...prev,
        quizzesPassed: prev.quizzesPassed + 1,
      }));
    }
    
    addXP(xpEarned, 'quiz', `Quiz: ${correct}/${total} correct`);
    return xpEarned;
  }, [addXP]);

  // Record thesis
  const recordThesis = useCallback((): number => {
    setStats(prev => ({
      ...prev,
      thesesWritten: prev.thesesWritten + 1,
    }));
    
    addXP(XP_REWARDS.THESIS_WRITTEN, 'thesis', 'Investment thesis written');
    return XP_REWARDS.THESIS_WRITTEN;
  }, [addXP]);

  // Get streak bonus
  const getStreakBonus = useCallback((days: number): number => {
    if (days >= 30) return XP_REWARDS.STREAK_30_DAY;
    if (days >= 21) return XP_REWARDS.STREAK_21_DAY;
    if (days >= 14) return XP_REWARDS.STREAK_14_DAY;
    if (days >= 7) return XP_REWARDS.STREAK_7_DAY;
    if (days >= 5) return XP_REWARDS.STREAK_5_DAY;
    if (days >= 3) return XP_REWARDS.STREAK_3_DAY;
    return XP_REWARDS.STREAK_BASE;
  }, []);

  // Record streak claim
  const recordStreakClaim = useCallback((streakDays: number): number => {
    const bonus = getStreakBonus(streakDays);
    
    setStats(prev => ({
      ...prev,
      currentStreak: streakDays,
      longestStreak: Math.max(prev.longestStreak, streakDays),
      totalDaysPlayed: prev.totalDaysPlayed + 1,
      lastPlayDate: new Date().toDateString(),
    }));
    
    addXP(bonus, 'streak', `${streakDays}-day streak bonus`);
    return bonus;
  }, [addXP, getStreakBonus]);

  return {
    // Core XP
    totalXP,
    level,
    xpInLevel,
    xpToNextLevel,
    levelProgress,
    
    // Weekly
    weeklyXP,
    
    // League
    league,
    nextLeague,
    xpToNextLeague: xpToNextLeagueValue,
    
    // Stats & Badges
    stats,
    earnedBadges,
    
    // Transactions
    recentTransactions: transactions,
    
    // Actions
    addXP,
    recordInvestment,
    recordCoachAdvice,
    recordRiskPreview,
    recordMissionComplete,
    recordQuizComplete,
    recordThesis,
    recordStreakClaim,
    
    // Helpers
    getStreakBonus,
  };
}

// =============================================================================
// HELPERS
// =============================================================================

function getWeekStart(): string {
  const now = new Date();
  const dayOfWeek = now.getDay();
  const diff = now.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
  const monday = new Date(now.setDate(diff));
  return monday.toISOString().split('T')[0];
}

export default useXP;

