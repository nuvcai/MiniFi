/**
 * Mini.Fi Timeline Page
 * Minimalist game interface
 * © 2025 NUVC.AI. All Rights Reserved.
 */

"use client";

import { useState, useEffect, useRef } from "react";

// Components
import { GameHeader } from "@/components/game/GameHeader";
import { CoachSidebar } from "@/components/game/CoachSidebar";
import { TimelineSection } from "@/components/game/TimelineSection";
import { EventDetailModal } from "@/components/modals/EventDetailModal";
import { MissionModal } from "@/components/modals/MissionModal";
import { SummaryModal } from "@/components/modals/SummaryModal";
import { RewardsModal } from "@/components/modals/RewardsModal";
import { LevelUpCelebration } from "@/components/gamification/LevelUpCelebration";

// Data
import { financialEvents, FinancialEvent } from "@/components/data/events";
import { aiCoaches } from "@/components/data/coaches";
import { missionData } from "@/components/data/missions";

export default function TimelinePage() {
  // State
  const [selectedEvent, setSelectedEvent] = useState<FinancialEvent | null>(null);
  const [missionEvent, setMissionEvent] = useState<FinancialEvent | null>(null);
  const [selectedCoach, setSelectedCoach] = useState(aiCoaches[0]);
  const [gameStarted, setGameStarted] = useState(false);
  const [playerLevel, setPlayerLevel] = useState(1);
  const [playerXP, setPlayerXP] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [showSummary, setShowSummary] = useState(false);
  const [summaryDismissed, setSummaryDismissed] = useState(false);
  const summaryTimerRef = useRef<number | null>(null);
  const [completedMissions, setCompletedMissions] = useState<string[]>([]);
  const [competitionUnlocked, setCompetitionUnlocked] = useState(false);
  const [showRewardsStore, setShowRewardsStore] = useState(false);
  const [redeemedRewards, setRedeemedRewards] = useState<string[]>([]);
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [levelUpInfo, setLevelUpInfo] = useState({ newLevel: 1, previousLevel: 0 });
  const [missionStep, setMissionStep] = useState<"intro" | "decision" | "result">("intro");
  const [selectedInvestment, setSelectedInvestment] = useState<string | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [missionResult, setMissionResult] = useState<any>(null);

  const updateUnlockStatus = () => {
    financialEvents.forEach((event) => {
      if (event.unlockRequirements.length > 0) {
        const allRequirementsMet = event.unlockRequirements.every((requiredYear) => {
          const requiredEvent = financialEvents.find((e) => e.year === requiredYear);
          return requiredEvent?.completed === true;
        });
        event.unlocked = allRequirementsMet;
      }
    });
  };

  const allMissionsCompleted = financialEvents.every((event) => event.completed);

  useEffect(() => {
    updateUnlockStatus();
  }, []);

  useEffect(() => {
    if (allMissionsCompleted && !showSummary && !summaryDismissed) {
      summaryTimerRef.current = window.setTimeout(() => {
        setShowSummary(true);
      }, 1000);
    }
    return () => {
      if (summaryTimerRef.current) {
        clearTimeout(summaryTimerRef.current);
        summaryTimerRef.current = null;
      }
    };
  }, [allMissionsCompleted, showSummary, summaryDismissed]);

  const handleEventClick = async (event: FinancialEvent) => {
    if (event.unlocked) {
      setSelectedEvent(event);
    }
  };

  const startMission = (event: FinancialEvent) => {
    setSelectedEvent(null);
    setMissionEvent(event);
    setGameStarted(true);
    setMissionStep("intro");
  };

  const makeInvestment = async (optionId: string) => {
    if (!missionEvent) return;
    const mission = missionData[missionEvent.year as keyof typeof missionData];
    const option = mission?.options.find((opt) => opt.id === optionId);

    if (option) {
      setSelectedInvestment(optionId);

      const getCoachAdjustedReturn = (baseReturn: number, coachPersonality: string) => {
        const adjustmentFactors: Record<string, number> = {
          "Conservative Coach": 0.8,
          "Balanced Coach": 1.0,
          "Aggressive Coach": 1.3,
          "Income Coach": 0.9,
        };
        const factor = adjustmentFactors[coachPersonality] || 1.0;
        const randomFactor = 0.9 + Math.random() * 0.2;
        const adjustedReturn = baseReturn * factor * randomFactor;
        return Math.max(-0.8, Math.min(2.0, adjustedReturn));
      };

      const adjustedReturn = getCoachAdjustedReturn(option.actualReturn, selectedCoach.personality);
      const finalAmount = 10000 * (1 + adjustedReturn);
      const performance = adjustedReturn > 0 ? "profit" : "loss";

      setMissionResult({
        option,
        actualReturn: adjustedReturn,
        finalAmount,
        performance,
      });

      setMissionStep("result");
    }
  };

  const completeMission = () => {
    if (missionEvent && missionResult) {
      const missionReward = missionEvent.reward;

      setPlayerXP((prev) => prev + missionReward);
      setTotalScore((prev) => prev + missionReward);
      setCompletedMissions((prev) => [...prev, missionEvent.title]);

      const eventIndex = financialEvents.findIndex((e) => e.year === missionEvent.year);
      if (eventIndex !== -1) {
        financialEvents[eventIndex].completed = true;
        updateUnlockStatus();
      }

      const newLevel = Math.floor((playerXP + missionReward) / 1000) + 1;
      if (newLevel > playerLevel) {
        setLevelUpInfo({ newLevel, previousLevel: playerLevel });
        setPlayerLevel(newLevel);
        setTimeout(() => setShowLevelUp(true), 500);
      }

      if (missionEvent.year === 2025 && missionEvent.title === "Current Challenges") {
        setCompetitionUnlocked(true);
      }

      closeMissionModal();
    }
  };

  const startCompetition = () => {
    window.location.href = "/competition";
  };

  const redeemReward = (reward: { id: string; cost: number }) => {
    if (playerXP >= reward.cost && !redeemedRewards.includes(reward.id)) {
      setPlayerXP((prev) => prev - reward.cost);
      setRedeemedRewards((prev) => [...prev, reward.id]);
    }
  };

  const handleXpEarned = (amount: number) => {
    setPlayerXP((prev) => prev + amount);
    setTotalScore((prev) => prev + amount);
  };

  const closeMissionModal = () => {
    setGameStarted(false);
    setMissionEvent(null);
    setMissionStep("intro");
    setSelectedInvestment(null);
    setMissionResult(null);
  };

  const currentMission = missionEvent
    ? missionData[missionEvent.year as keyof typeof missionData]
    : null;

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      {/* Subtle gradient */}
      <div className="fixed inset-0 bg-gradient-to-b from-indigo-950/10 via-transparent to-violet-950/5 pointer-events-none" />
      
      <div className="relative">
        <GameHeader
          playerLevel={playerLevel}
          playerXP={playerXP}
          totalScore={totalScore}
          onRewardsClick={() => setShowRewardsStore(true)}
        />

        <div className="container mx-auto px-4 sm:px-6 py-8">
          <div className="grid lg:grid-cols-4 gap-6 lg:gap-8">
            
            {/* Sidebar - Simplified */}
            <div className="lg:col-span-1 space-y-4">
              <CoachSidebar
                coaches={aiCoaches}
                selectedCoach={selectedCoach}
                onCoachSelect={setSelectedCoach}
              />

              {/* Progress Summary - Clean */}
              <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5">
                <h3 className="text-sm font-medium text-white/50 mb-4">Progress</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-white/40 text-sm">Completed</span>
                    <span className="text-white font-medium">
                      {financialEvents.filter((e) => e.completed).length} / {financialEvents.length}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/40 text-sm">Available</span>
                    <span className="text-indigo-400 font-medium">
                      {financialEvents.filter((e) => e.unlocked && !e.completed).length}
                    </span>
                  </div>
                  <div className="h-px bg-white/5 my-2" />
                  <div className="flex justify-between">
                    <span className="text-white/40 text-sm">Total XP</span>
                    <span className="text-white font-semibold">{playerXP.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="lg:col-span-3">
              <TimelineSection
                events={financialEvents}
                competitionUnlocked={competitionUnlocked}
                onEventClick={handleEventClick}
                onStartCompetition={startCompetition}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <EventDetailModal
        event={selectedEvent}
        selectedCoach={selectedCoach}
        onClose={() => setSelectedEvent(null)}
        onStartMission={() => selectedEvent && startMission(selectedEvent)}
      />

      <MissionModal
        open={gameStarted}
        event={missionEvent}
        selectedCoach={selectedCoach}
        missionData={currentMission}
        missionStep={missionStep}
        selectedInvestment={selectedInvestment}
        missionResult={missionResult}
        simulationResult={null}
        playerLevel={playerLevel}
        completedMissions={completedMissions}
        onClose={closeMissionModal}
        onStepChange={setMissionStep}
        onInvestmentSelect={setSelectedInvestment}
        onInvestmentConfirm={makeInvestment}
        onMissionComplete={completeMission}
        onXpEarned={handleXpEarned}
      />

      <SummaryModal
        open={showSummary}
        playerXP={playerXP}
        totalScore={totalScore}
        events={financialEvents}
        onClose={() => {
          setShowSummary(false);
          setSummaryDismissed(true);
        }}
        onRestart={() => window.location.reload()}
      />

      <RewardsModal
        open={showRewardsStore}
        onOpenChange={setShowRewardsStore}
        playerXP={playerXP}
        redeemedRewards={redeemedRewards}
        onRedeemReward={redeemReward}
      />

      <LevelUpCelebration
        open={showLevelUp}
        newLevel={levelUpInfo.newLevel}
        previousLevel={levelUpInfo.previousLevel}
        onClose={() => setShowLevelUp(false)}
      />
    </div>
  );
}
