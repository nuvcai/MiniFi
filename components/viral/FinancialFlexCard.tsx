'use client';

/**
 * 💎 FINANCIAL FLEX CARD - Instagram-worthy shareable achievement cards
 * 
 * These are designed to make users look SMART and ACCOMPLISHED
 * when shared on social media. The key insight: people share to
 * build their identity, not to help companies market.
 * 
 * Visual Design: Dark gradient aesthetic popular with Gen Z/Alpha
 */

import React, { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Download,
  Share2,
  Sparkles,
  Trophy,
  Flame,
  Crown,
} from 'lucide-react';

interface FinancialFlexCardProps {
  // User info
  userName: string;
  userAvatar?: string;
  userLevel: number;
  userStreak: number;
  
  // Achievement data
  achievementType: 'mission_complete' | 'level_up' | 'streak_milestone' | 'quiz_ace' | 'badge_earned';
  
  // Mission specific
  missionYear?: number;
  missionTitle?: string;
  returnPercent?: number;
  performance?: 'profit' | 'loss';
  
  // Badge specific
  badgeName?: string;
  badgeEmoji?: string;
  
  // Quote/wisdom learned
  wisdomQuote?: string;
  
  // Ranking
  percentileRank?: number; // e.g., 95 means top 5%
  
  // Callbacks
  onShare?: (platform: string) => void;
  onDownload?: () => void;
}

export function FinancialFlexCard({
  userName,
  userAvatar: _userAvatar,
  userLevel,
  userStreak,
  achievementType,
  missionYear,
  missionTitle,
  returnPercent = 0,
  performance = 'profit',
  badgeName,
  badgeEmoji,
  wisdomQuote,
  percentileRank,
  onShare,
  onDownload,
}: FinancialFlexCardProps) {
  // _userAvatar reserved for future custom avatar display
  void _userAvatar;
  
  const [showModal, setShowModal] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Generate achievement headline based on type
  const getHeadline = (): { main: string; sub: string; emoji: string } => {
    switch (achievementType) {
      case 'mission_complete':
        return {
          main: performance === 'profit' 
            ? `+${returnPercent?.toFixed(1)}% RETURN`
            : 'WISDOM EARNED',
          sub: `${missionYear} ${missionTitle}`,
          emoji: performance === 'profit' ? '📈' : '🧠',
        };
      case 'level_up':
        return {
          main: `LEVEL ${userLevel}`,
          sub: 'Investor Achieved',
          emoji: '🚀',
        };
      case 'streak_milestone':
        return {
          main: `${userStreak} DAYS`,
          sub: 'Learning Streak',
          emoji: '🔥',
        };
      case 'quiz_ace':
        return {
          main: '100% SCORE',
          sub: 'Perfect Quiz',
          emoji: '🎯',
        };
      case 'badge_earned':
        return {
          main: badgeName || 'Badge Earned',
          sub: 'Achievement Unlocked',
          emoji: badgeEmoji || '🏆',
        };
      default:
        return {
          main: 'ACHIEVEMENT',
          sub: 'Unlocked',
          emoji: '✨',
        };
    }
  };

  const headline = getHeadline();

  // Generate flex message (the "brag")
  const getFlexMessage = (): string => {
    if (wisdomQuote) return `"${wisdomQuote}"`;
    
    switch (achievementType) {
      case 'mission_complete':
        return performance === 'profit'
          ? 'Learning from history pays off 💰'
          : 'Every loss is a lesson learned 💎';
      case 'level_up':
        return 'Building financial wisdom, one level at a time';
      case 'streak_milestone':
        return 'Consistency is the key to wealth';
      case 'quiz_ace':
        return 'Knowledge is the best investment';
      case 'badge_earned':
        return 'Another step towards financial mastery';
      default:
        return 'Growing smarter about money';
    }
  };

  const handleShare = async (platform: string) => {
    onShare?.(platform);
    
    const shareText = `${headline.emoji} ${headline.main} on MiniFi!\n\n${getFlexMessage()}\n\nminifi.app - Learn investing through history`;
    
    if (platform === 'native' && navigator.share) {
      try {
        await navigator.share({
          title: `${headline.main} on MiniFi`,
          text: shareText,
          url: 'https://minifi.app',
        });
      } catch {
        // User cancelled
      }
    } else if (platform === 'twitter') {
      window.open(
        `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`,
        '_blank'
      );
    } else if (platform === 'instagram') {
      // For Instagram, we'd need to trigger download and prompt user
      handleDownload();
    }
  };

  const handleDownload = async () => {
    onDownload?.();
    // In production, this would use html-to-image or similar
    // For now, we'll show instructions
    alert('📸 Screenshot this card to save and share on Instagram!');
  };

  return (
    <>
      {/* Trigger Button */}
      <Button
        onClick={() => setShowModal(true)}
        variant="outline"
        className="border-purple-300 text-purple-700 hover:bg-purple-50"
      >
        <Sparkles className="h-4 w-4 mr-2" />
        Create Flex Card
      </Button>

      {/* Card Preview Modal */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="max-w-md p-0 bg-transparent border-0 shadow-none">
          <DialogHeader className="sr-only">
            <DialogTitle>Financial Flex Card</DialogTitle>
          </DialogHeader>

          {/* The Actual Flex Card */}
          <div
            ref={cardRef}
            className="relative w-full aspect-square rounded-2xl overflow-hidden shadow-2xl"
          >
            {/* Background Gradient - Gen Z aesthetic */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900" />
            
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl" />
            
            {/* Content */}
            <div className="relative h-full flex flex-col p-6 text-white">
              {/* Header - Logo & User */}
              <div className="flex items-center justify-between mb-auto">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-blue-500 flex items-center justify-center font-bold">
                    {userName.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-semibold text-sm">@{userName}</p>
                    <p className="text-xs text-gray-400">Level {userLevel}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                    minifi
                  </p>
                </div>
              </div>

              {/* Main Achievement */}
              <div className="text-center my-8">
                <div className="text-6xl mb-4">{headline.emoji}</div>
                <h2 className="text-4xl font-black tracking-tight mb-2">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400">
                    {headline.main}
                  </span>
                </h2>
                <p className="text-lg text-gray-300">{headline.sub}</p>
              </div>

              {/* Flex Quote */}
              <div className="text-center mb-6">
                <p className="text-sm text-gray-400 italic">
                  {getFlexMessage()}
                </p>
              </div>

              {/* Stats Footer */}
              <div className="flex items-center justify-center gap-6 mt-auto">
                {userStreak > 0 && (
                  <div className="flex items-center gap-1 text-orange-400">
                    <Flame className="h-4 w-4" />
                    <span className="text-sm font-semibold">{userStreak}d streak</span>
                  </div>
                )}
                {percentileRank && percentileRank >= 50 && (
                  <div className="flex items-center gap-1 text-emerald-400">
                    <Crown className="h-4 w-4" />
                    <span className="text-sm font-semibold">Top {100 - percentileRank}%</span>
                  </div>
                )}
                <div className="flex items-center gap-1 text-purple-400">
                  <Trophy className="h-4 w-4" />
                  <span className="text-sm font-semibold">Lvl {userLevel}</span>
                </div>
              </div>

              {/* Watermark */}
              <div className="absolute bottom-2 right-4 text-[10px] text-gray-500">
                minifi.app
              </div>
            </div>
          </div>

          {/* Share Actions - Below Card */}
          <div className="bg-white rounded-xl p-4 mt-4 space-y-3">
            <p className="text-sm text-gray-600 text-center">
              Share your achievement
            </p>
            
            <div className="grid grid-cols-3 gap-2">
              <Button
                onClick={() => handleShare('native')}
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white"
              >
                <Share2 className="h-4 w-4 mr-1" />
                Share
              </Button>
              <Button
                onClick={() => handleShare('twitter')}
                variant="outline"
                className="border-gray-300"
              >
                𝕏
              </Button>
              <Button
                onClick={handleDownload}
                variant="outline"
                className="border-gray-300"
              >
                <Download className="h-4 w-4" />
              </Button>
            </div>

            <p className="text-xs text-gray-400 text-center">
              +25 🪙 bonus for sharing!
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

// Quick helper to generate a flex card from mission result
export function MissionFlexCard({
  userName,
  userLevel,
  userStreak,
  missionYear,
  missionTitle,
  returnPercent,
  performance,
  onShare,
}: {
  userName: string;
  userLevel: number;
  userStreak: number;
  missionYear: number;
  missionTitle: string;
  returnPercent: number;
  performance: 'profit' | 'loss';
  onShare?: (platform: string) => void;
}) {
  return (
    <FinancialFlexCard
      userName={userName}
      userLevel={userLevel}
      userStreak={userStreak}
      achievementType="mission_complete"
      missionYear={missionYear}
      missionTitle={missionTitle}
      returnPercent={returnPercent}
      performance={performance}
      onShare={onShare}
    />
  );
}

export default FinancialFlexCard;
