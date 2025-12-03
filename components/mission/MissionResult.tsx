"use client";

import React, { useState, useEffect, useMemo } from "react";
import { InvestmentOption } from "@/components/data/missions";
import { FinancialEvent } from "@/components/data/events";
import { TeachingDialogue } from "@/components/mission/TeachingDialogue";
import { aiCoaches, AICoach } from "@/components/data/coaches";
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
        <div className={`rounded-xl p-4 mb-4 animate-bounce-in ${
          isLoss 
            ? "bg-gradient-to-r from-violet-500/15 via-purple-500/10 to-indigo-500/15 border border-violet-500/30" 
            : "bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/30"
        }`}>
          <div className="flex items-start gap-3">
            <span className="text-2xl flex-shrink-0">{isLoss ? "💎" : "✨"}</span>
            <div>
              {isLoss ? (
                <>
                  <h4 className="font-bold text-violet-300 text-sm mb-1">{lossWisdom.title}</h4>
                  <p className="text-xs text-violet-200/80 leading-relaxed">{lossWisdom.message}</p>
                </>
              ) : wisdomTip ? (
                <>
                  <h4 className="font-semibold text-amber-300 text-sm mb-1">{wisdomTip.title}</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">{wisdomTip.callToAction}</p>
                </>
              ) : null}
            </div>
          </div>
          
          {/* Loss-specific encouragement */}
          {isLoss && (
            <div className="mt-3 pt-3 border-t border-violet-500/20">
              <p className="text-[11px] text-violet-300/70 italic text-center">
                "The stock market is a device for transferring money from the impatient to the patient." — Warren Buffett
              </p>
            </div>
          )}
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
