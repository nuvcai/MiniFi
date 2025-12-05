"use client";

import React, { useState, useEffect, useMemo } from "react";
import { Sparkles, Quote, Brain, Heart } from "lucide-react";
import { InvestmentOption } from "@/components/data/missions";
import { FinancialEvent } from "@/components/data/events";
import { TeachingDialogue } from "@/components/mission/TeachingDialogue";
import { AICoach } from "@/components/data/coaches";
import { getRandomHopeMessage, type HopeMessage } from "@/components/data/wealthWisdom";
import { ShareResultCard } from "@/components/viral/ShareResultCard";

interface MissionResultProps {
  selectedOption: InvestmentOption;
  actualReturn: number;
  finalAmount: number;
  performance: "profit" | "loss";
  outcome: string;
  event: FinancialEvent;
  simulationResult?: any;
  playerLevel: number;
  completedMissions: string[];
  selectedCoach: AICoach; // Add selectedCoach prop
  onComplete: () => void;
  onXpEarned?: (amount: number) => void;
  streakDays?: number;
  totalXp?: number;
}

// Confetti particle colors - Different for wins vs learning moments
const CONFETTI_COLORS_WIN = [
  "bg-emerald-500",
  "bg-teal-500",
  "bg-amber-500",
  "bg-yellow-400",
  "bg-green-400",
  "bg-cyan-500",
];

const CONFETTI_COLORS_LEARN = [
  "bg-violet-500",
  "bg-purple-500",
  "bg-indigo-500",
  "bg-blue-500",
  "bg-pink-500",
  "bg-amber-500",
];

// Philosophy-driven loss encouragement messages
const lossWisdomMessages = [
  { 
    title: "Wisdom Through Experience 💎", 
    message: "Every great investor has a story of losses that taught them more than their wins. You're building that foundation now."
  },
  { 
    title: "Discipline Over Outcome 🎯", 
    message: "The decision-making process matters more than the result. You showed courage to commit with conviction."
  },
  { 
    title: "Quick Failure = Fast Learning ⚡", 
    message: "You learned in minutes what takes others years. This loss is now wisdom you'll carry for generations."
  },
  { 
    title: "Emotional Intelligence Unlocked 🧠", 
    message: "Feeling the sting of loss now teaches you to master your emotions when real stakes are involved."
  },
  { 
    title: "Challenge the Status Quo 🔥", 
    message: "Playing it safe teaches nothing. Your bold move—even in loss—builds the conviction muscles of great investors."
  },
];

// Individual confetti particle
function ConfettiParticle({ delay, left, color, size, rotation }: {
  delay: number;
  left: number;
  color: string;
  size: number;
  rotation: number;
}) {
  return (
    <div
      className={`absolute ${color} rounded-sm opacity-90 pointer-events-none`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        left: `${left}%`,
        top: "-20px",
        transform: `rotate(${rotation}deg)`,
        animation: `confetti-fall 3s ease-out ${delay}s forwards`,
      }}
    />
  );
}

export function MissionResult({
  selectedOption,
  actualReturn,
  finalAmount,
  performance,
  outcome,
  event,
  simulationResult,
  playerLevel,
  completedMissions,
  selectedCoach, // Add selectedCoach parameter
  onComplete,
  onXpEarned,
  streakDays = 0,
  totalXp = 0,
}: MissionResultProps) {
  const [showConfetti, setShowConfetti] = useState(true);
  const [wisdomTip, setWisdomTip] = useState<HopeMessage | null>(null);
  const [showShareSection, setShowShareSection] = useState(false);
  const isLoss = performance === "loss";

  // Load a hope message on mount - or loss wisdom for losses
  useEffect(() => {
    if (!isLoss) {
      setWisdomTip(getRandomHopeMessage());
    }
  }, [isLoss]);

  // Get random loss wisdom message
  const lossWisdom = useMemo(() => {
    return lossWisdomMessages[Math.floor(Math.random() * lossWisdomMessages.length)];
  }, []);

  // Pre-compute confetti particles - different colors for learning moments
  const confettiColors = isLoss ? CONFETTI_COLORS_LEARN : CONFETTI_COLORS_WIN;
  const confettiParticles = useMemo(() => {
    return Array.from({ length: 40 }, (_, i) => ({
      id: i,
      delay: (i * 0.02) % 0.6,
      left: (i * 2.5) % 100,
      color: confettiColors[i % confettiColors.length],
      size: 6 + (i % 6),
      rotation: (i * 9) % 360,
    }));
  }, [confettiColors]);

  // Auto-hide confetti after animation and show share section
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowConfetti(false);
      // Show share section after confetti
      setTimeout(() => setShowShareSection(true), 500);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="space-y-6 relative">
      {/* Celebration Confetti */}
      {showConfetti && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-50">
          {confettiParticles.map((particle) => (
            <ConfettiParticle key={particle.id} {...particle} />
          ))}
        </div>
      )}

      {/* Wisdom Banner - Shows after confetti settles */}
      {!showConfetti && (
        <div className={`rounded-2xl overflow-hidden mb-4 animate-bounce-in shadow-lg ${
          isLoss 
            ? "bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-50 dark:from-violet-500/20 dark:via-purple-500/15 dark:to-indigo-500/20 border-2 border-violet-200 dark:border-violet-500/30" 
            : "bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 dark:from-amber-500/15 dark:via-orange-500/10 dark:to-yellow-500/15 border-2 border-amber-200 dark:border-amber-500/30"
        }`}>
          {/* Header */}
          <div className={`px-4 py-2.5 ${
            isLoss 
              ? "bg-gradient-to-r from-violet-100 to-purple-100 dark:from-violet-500/30 dark:to-purple-500/20" 
              : "bg-gradient-to-r from-amber-100 to-orange-100 dark:from-amber-500/30 dark:to-orange-500/20"
          }`}>
            <div className="flex items-center gap-2">
              {isLoss ? (
                <Brain className="h-4 w-4 text-violet-600 dark:text-violet-400" />
              ) : (
                <Sparkles className="h-4 w-4 text-amber-600 dark:text-amber-400" />
              )}
              <span className={`text-xs font-bold uppercase tracking-wide ${
                isLoss ? "text-violet-700 dark:text-violet-300" : "text-amber-700 dark:text-amber-300"
              }`}>
                {isLoss ? "Wisdom Earned" : "Victory Insight"}
              </span>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="p-4">
            <div className="flex items-start gap-3">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md ${
                isLoss 
                  ? "bg-gradient-to-br from-violet-500 to-purple-600" 
                  : "bg-gradient-to-br from-amber-400 to-orange-500"
              }`}>
                <span className="text-2xl">{isLoss ? "💎" : "✨"}</span>
              </div>
              <div className="flex-1 min-w-0">
                {isLoss ? (
                  <>
                    <h4 className="font-bold text-violet-800 dark:text-violet-200 text-base mb-1.5">{lossWisdom.title}</h4>
                    <p className="text-sm text-violet-700/80 dark:text-violet-300/80 leading-relaxed">{lossWisdom.message}</p>
                  </>
                ) : wisdomTip ? (
                  <>
                    <h4 className="font-bold text-amber-800 dark:text-amber-200 text-base mb-1.5">{wisdomTip.title}</h4>
                    <p className="text-sm text-amber-700/80 dark:text-amber-300/80 leading-relaxed">{wisdomTip.callToAction}</p>
                  </>
                ) : null}
              </div>
            </div>
            
            {/* Loss-specific encouragement quote */}
            {isLoss && (
              <div className={`mt-4 p-3 rounded-xl ${
                "bg-white/60 dark:bg-black/20 border border-violet-200/50 dark:border-violet-500/20"
              }`}>
                <div className="flex items-start gap-2">
                  <Quote className="h-4 w-4 text-violet-400 dark:text-violet-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs text-violet-700 dark:text-violet-300 italic leading-relaxed">
                      "The stock market is a device for transferring money from the impatient to the patient."
                    </p>
                    <p className="text-[10px] text-violet-600/70 dark:text-violet-400/60 mt-1 font-medium">
                      — Warren Buffett
                    </p>
                  </div>
                </div>
              </div>
            )}
            
            {/* Win celebration message */}
            {!isLoss && wisdomTip && (
              <div className="mt-4 flex items-center gap-2 px-3 py-2 rounded-lg bg-emerald-100/80 dark:bg-emerald-500/20 border border-emerald-200 dark:border-emerald-500/30">
                <Heart className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                <p className="text-xs text-emerald-700 dark:text-emerald-300 font-medium">
                  Great decision! Your patience is building generational wealth habits.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Teaching AI Coach Dialogue */}
      <div className="mt-6">
        <TeachingDialogue
          coach={selectedCoach} // Use the selected coach instead of playerLevel-based coach
          selectedOption={selectedOption}
          actualReturn={actualReturn}
          finalAmount={finalAmount}
          performance={performance}
          outcome={outcome}
          event={event}
          simulationResult={simulationResult}
          onComplete={onComplete}
          onXpEarned={onXpEarned}
        />
      </div>

      {/* Share Results Section - Appears after dialogue */}
      {showShareSection && (
        <div className="mt-6 animate-in slide-in-from-bottom-4 duration-500">
          <ShareResultCard
            missionTitle={event.title}
            year={event.year}
            performance={performance}
            returnPercent={actualReturn * 100}
            finalAmount={finalAmount}
            lessonLearned={outcome}
            streakDays={streakDays}
            level={playerLevel}
            totalXp={totalXp}
            onShareComplete={(platform, xpEarned) => {
              if (onXpEarned) {
                onXpEarned(xpEarned);
              }
            }}
            compact={false}
          />
        </div>
      )}

      {/* CSS for confetti animation */}
      <style jsx>{`
        @keyframes confetti-fall {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(500px) rotate(720deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
