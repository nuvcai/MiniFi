/**
 * ╔══════════════════════════════════════════════════════════════════════════════╗
 * ║   🎮 MISSION MODAL - Enhanced Learning Flow                                  ║
 * ║   Integrated with Investment Thesis, What-If Analysis & Knowledge Quiz       ║
 * ║   FO Principle: "Deliberate practice builds mastery"                         ║
 * ║   Copyright (c) 2025 NUVC.AI. All Rights Reserved.                          ║
 * ╚══════════════════════════════════════════════════════════════════════════════╝
 */

import React, { useState, useCallback } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { TrendingUp, TrendingDown, Brain, BarChart3, GraduationCap, PenLine } from "lucide-react";
import { MissionIntro } from "@/components/mission/MissionIntro";
import { InvestmentDecision } from "@/components/mission/InvestmentDecision";
import { MissionResult } from "@/components/mission/MissionResult";
import { InvestmentThesis } from "@/components/mission/InvestmentThesis";
import { WhatIfAnalysis } from "@/components/mission/WhatIfAnalysis";
import { KnowledgeQuiz } from "@/components/mission/KnowledgeQuiz";
import { FinancialEvent } from "@/components/data/events";
import { AICoach } from "@/components/data/coaches";
import { MissionData, InvestmentOption } from "@/components/data/missions";

// Enhanced mission step types
type MissionStep = "intro" | "decision" | "thesis" | "result" | "whatif" | "quiz";

interface MissionModalProps {
  open: boolean;
  event: FinancialEvent | null;
  selectedCoach: AICoach;
  missionData: MissionData | null;
  missionStep: MissionStep;
  selectedInvestment: string | null;
  missionResult: {
    option: InvestmentOption;
    actualReturn: number;
    finalAmount: number;
    performance: "profit" | "loss";
  } | null;
  simulationResult: any;
  playerLevel: number;
  completedMissions: string[];
  onClose: () => void;
  onStepChange: (step: MissionStep) => void;
  onInvestmentSelect: (optionId: string) => void;
  onInvestmentConfirm: (optionId: string) => void;
  onMissionComplete: () => void;
  onXpEarned?: (amount: number) => void;
}

// Initial investment amount for missions
const INITIAL_INVESTMENT = 100000;

export function MissionModal({
  open,
  event,
  selectedCoach,
  missionData,
  missionStep,
  selectedInvestment,
  missionResult,
  simulationResult,
  playerLevel,
  completedMissions,
  onClose,
  onStepChange,
  onInvestmentSelect,
  onInvestmentConfirm,
  onMissionComplete,
  onXpEarned,
}: MissionModalProps) {
  // Local state for enhanced features
  const [investmentThesis, setInvestmentThesis] = useState<string>("");
  const [quizCompleted, setQuizCompleted] = useState(false);

  if (!event || !missionData) return null;

  // Get selected option for thesis
  const selectedOption = selectedInvestment 
    ? missionData.options.find(o => o.id === selectedInvestment)
    : null;

  // Handle moving from decision to thesis step
  const handleDecisionConfirm = useCallback(() => {
    if (selectedInvestment) {
      onStepChange("thesis");
    }
  }, [selectedInvestment, onStepChange]);

  // Handle thesis submission - proceed to confirm investment
  const handleThesisSubmit = useCallback((thesis: string) => {
    setInvestmentThesis(thesis);
    if (selectedInvestment) {
      onInvestmentConfirm(selectedInvestment);
    }
  }, [selectedInvestment, onInvestmentConfirm]);

  // Handle thesis skip - directly confirm investment
  const handleThesisSkip = useCallback(() => {
    if (selectedInvestment) {
      onInvestmentConfirm(selectedInvestment);
    }
  }, [selectedInvestment, onInvestmentConfirm]);

  // Handle transition from result to What-If
  const handleResultContinue = useCallback(() => {
    onStepChange("whatif");
  }, [onStepChange]);

  // Handle What-If continue - go to quiz
  const handleWhatIfContinue = useCallback(() => {
    onStepChange("quiz");
  }, [onStepChange]);

  // Handle Quiz completion
  const handleQuizComplete = useCallback((score: number, totalXp: number) => {
    setQuizCompleted(true);
    // Note: XP is awarded incrementally during quiz, not here
    // After quiz, complete the mission
    onMissionComplete();
  }, [onMissionComplete]);

  // Dynamic dialog title based on step
  const getDialogTitle = () => {
    switch (missionStep) {
      case "intro":
        return `Crisis Mode: ${event.year}`;
      case "decision":
        return "High Conviction Moment";
      case "thesis":
        return "Investment Thesis 📝";
      case "result":
        return missionResult?.performance === "loss" 
          ? "Wisdom Earned 💎" 
          : "Victory Achieved 🏆";
      case "whatif":
        return "Parallel Universes 🔮";
      case "quiz":
        return "Knowledge Check 🎓";
      default:
        return `${event.year} - ${event.title}`;
    }
  };

  // Dynamic dialog description based on step
  const getDialogDescription = () => {
    switch (missionStep) {
      case "intro":
        return `${event.title} — History is about to test your discipline`;
      case "decision":
        return "Make bold moves with conviction. Quick failures teach more than slow indecision.";
      case "thesis":
        return "Family Office Principle: Document your reasoning before every major decision";
      case "result":
        return missionResult?.performance === "loss"
          ? "Every loss builds the emotional intelligence that separates great investors"
          : "Your discipline and conviction paid off. This wisdom spans generations.";
      case "whatif":
        return "Explore how each option actually performed in history";
      case "quiz":
        return "Validate your understanding of this market event";
      default:
        return event.description;
    }
  };

  // Get icon for current step
  const getStepIcon = () => {
    switch (missionStep) {
      case "thesis":
        return <PenLine className="h-5 w-5 sm:h-6 sm:w-6 text-violet-500" />;
      case "whatif":
        return <BarChart3 className="h-5 w-5 sm:h-6 sm:w-6 text-indigo-500" />;
      case "quiz":
        return <GraduationCap className="h-5 w-5 sm:h-6 sm:w-6 text-amber-500" />;
      case "result":
        return missionResult?.performance === "profit" 
          ? <TrendingUp className="h-5 w-5 sm:h-6 sm:w-6 text-emerald-500" />
          : <Brain className="h-5 w-5 sm:h-6 sm:w-6 text-violet-500" />;
      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent 
        variant="mobile-sheet"
        className="max-w-4xl max-h-[90vh] overflow-y-auto max-sm:max-w-full max-sm:px-4"
      >
        <DialogHeader className="max-sm:pt-2">
          <DialogTitle className="font-serif text-xl sm:text-2xl flex items-center gap-2">
            {getStepIcon()}
            {getDialogTitle()}
          </DialogTitle>
          <DialogDescription className="text-sm sm:text-base">
            {getDialogDescription()}
          </DialogDescription>
        </DialogHeader>

        {/* Step 1: Mission Introduction */}
        {missionStep === "intro" && (
          <MissionIntro
            missionData={missionData}
            selectedCoach={selectedCoach}
            onNext={() => onStepChange("decision")}
            onExit={onClose}
          />
        )}

        {/* Step 2: Investment Decision */}
        {missionStep === "decision" && (
          <InvestmentDecision
            options={missionData.options}
            selectedInvestment={selectedInvestment}
            onInvestmentSelect={onInvestmentSelect}
            onConfirm={handleDecisionConfirm}
            onBack={() => onStepChange("intro")}
            selectedCoach={selectedCoach}
          />
        )}

        {/* Step 3: Investment Thesis (NEW - Forces deliberate thinking) */}
        {missionStep === "thesis" && selectedOption && (
          <InvestmentThesis
            selectedOption={selectedOption}
            coach={selectedCoach}
            eventTitle={event.title}
            eventYear={event.year}
            onSubmit={handleThesisSubmit}
            onSkip={handleThesisSkip}
            onXpEarned={onXpEarned}
          />
        )}

        {/* Step 4: Mission Results */}
        {missionStep === "result" && missionResult && (
          <MissionResult
            selectedOption={missionResult.option}
            actualReturn={missionResult.actualReturn}
            finalAmount={missionResult.finalAmount}
            performance={missionResult.performance}
            outcome={missionData.outcome}
            event={event}
            simulationResult={simulationResult}
            playerLevel={playerLevel}
            completedMissions={completedMissions}
            selectedCoach={selectedCoach}
            onComplete={handleResultContinue}
            onXpEarned={onXpEarned}
          />
        )}

        {/* Step 5: What-If Analysis (NEW - Shows all possible outcomes) */}
        {missionStep === "whatif" && missionResult && (
          <WhatIfAnalysis
            options={missionData.options}
            selectedOptionId={missionResult.option.id}
            initialInvestment={INITIAL_INVESTMENT}
            onContinue={handleWhatIfContinue}
            onXpEarned={onXpEarned}
          />
        )}

        {/* Step 6: Knowledge Quiz (NEW - Validates understanding) */}
        {missionStep === "quiz" && missionResult && (
          <KnowledgeQuiz
            missionData={missionData}
            eventYear={event.year}
            eventTitle={event.title}
            selectedOption={missionResult.option}
            actualPerformance={missionResult.performance}
            onComplete={handleQuizComplete}
            onXpEarned={onXpEarned}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
