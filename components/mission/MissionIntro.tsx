"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  History, 
  Target, 
  ChevronRight, 
  ChevronLeft,
  Sparkles,
  AlertTriangle,
  Brain,
  Flame,
} from "lucide-react";
import { MissionData } from "@/components/data/missions";
import { AICoach } from "@/components/data/coaches";

interface MissionIntroProps {
  missionData: MissionData;
  selectedCoach: AICoach;
  onNext: () => void;
  onExit: () => void;
}

// Philosophy-driven crisis wisdom quotes
const crisisWisdomQuotes = [
  { quote: "In the middle of difficulty lies opportunity.", author: "Albert Einstein" },
  { quote: "The market is a device for transferring money from the impatient to the patient.", author: "Warren Buffett" },
  { quote: "Be fearful when others are greedy, and greedy when others are fearful.", author: "Warren Buffett" },
  { quote: "The four most dangerous words in investing are: 'This time it's different.'", author: "Sir John Templeton" },
  { quote: "Risk comes from not knowing what you're doing.", author: "Warren Buffett" },
];

export function MissionIntro({
  missionData,
  selectedCoach,
  onNext,
  onExit,
}: MissionIntroProps) {
  const [step, setStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [wisdomQuote] = useState(() => 
    crisisWisdomQuotes[Math.floor(Math.random() * crisisWisdomQuotes.length)]
  );

  // Trigger animation on step change
  useEffect(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => setIsAnimating(false), 300);
    return () => clearTimeout(timer);
  }, [step]);

  // Get the full coach tip (already shortened in missions.ts)
  const getCoachTip = () => {
    return missionData.coachAdvice[selectedCoach.id] || "Trust your instincts!";
  };

  const handleContinue = () => {
    if (step < 2) {
      setStep(step + 1);
    } else {
      onNext();
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
    } else {
      onExit();
    }
  };

  const stepLabels = ["Crisis", "Challenge", "Conviction"];
  const stepIcons = [AlertTriangle, Target, Brain];

  return (
    <div className="space-y-4">
      {/* Philosophy Banner - Crisis Learning */}
      <div className="bg-gradient-to-r from-amber-500/15 to-red-500/10 border border-amber-500/30 rounded-xl p-3 sm:p-4">
        <div className="flex items-start gap-3">
          <div className="p-1.5 rounded-lg bg-amber-500/20 flex-shrink-0">
            <Flame className="h-4 w-4 text-amber-500" />
          </div>
          <div>
            <p className="text-xs sm:text-sm font-medium text-amber-700 dark:text-amber-300 leading-relaxed">
              "{wisdomQuote.quote}"
            </p>
            <p className="text-[10px] sm:text-xs text-amber-600/70 dark:text-amber-400/70 mt-1">
              — {wisdomQuote.author}
            </p>
          </div>
        </div>
      </div>

      {/* Progress bar with labels - Mobile optimized */}
      <div className="flex items-center justify-center gap-1 mb-4">
        {[0, 1, 2].map((i) => {
          const StepIcon = stepIcons[i];
          return (
            <div key={i} className="flex items-center">
              <div className="flex flex-col items-center">
                <div
                  className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                    i === step 
                      ? "bg-gradient-to-r from-indigo-500 to-violet-500 text-white scale-110 shadow-lg shadow-indigo-500/30" 
                      : i < step 
                        ? "bg-emerald-500 text-white"
                        : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {i < step ? (
                    <span className="text-sm">✓</span>
                  ) : (
                    <StepIcon className="h-4 w-4" />
                  )}
                </div>
                <span className={`text-[9px] sm:text-[10px] mt-1.5 font-semibold uppercase tracking-wide ${
                  i === step ? "text-indigo-600" : i < step ? "text-emerald-600" : "text-gray-400"
                }`}>
                  {stepLabels[i]}
                </span>
              </div>
              {i < 2 && (
                <div className={`w-6 sm:w-10 h-0.5 mx-0.5 sm:mx-1 mt-[-16px] transition-colors ${
                  i < step ? "bg-emerald-400" : "bg-gray-200"
                }`} />
              )}
            </div>
          );
        })}
      </div>

      {/* Step Content */}
      <div className={`transition-all duration-300 ${isAnimating ? "opacity-0 translate-x-4" : "opacity-100 translate-x-0"}`}>
        {/* Step 0: The Crisis - Emphasize emotional stakes */}
        {step === 0 && (
          <Card className="border-2 border-red-200 bg-gradient-to-br from-red-50/50 via-orange-50/30 to-white overflow-hidden shadow-lg">
            <CardContent className="p-4 sm:p-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 rounded-xl bg-gradient-to-br from-red-500 to-orange-600 shadow-lg">
                  <AlertTriangle className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h4 className="text-base sm:text-lg font-bold text-gray-900">The Crisis Moment</h4>
                  <p className="text-[10px] sm:text-xs text-red-600/70 font-medium">History is about to test your conviction</p>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed text-sm">{missionData.context}</p>
              
              {/* Emotional Stakes Callout */}
              <div className="mt-4 p-3 rounded-xl bg-red-500/10 border border-red-200">
                <p className="text-xs text-red-700 font-medium flex items-center gap-2">
                  <span className="text-base">⚠️</span>
                  Every crisis separates the disciplined from the reactive. What will you choose?
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 1: Your Challenge - High conviction language */}
        {step === 1 && (
          <Card className="border-2 border-violet-200 bg-gradient-to-br from-violet-50/50 via-purple-50/30 to-white overflow-hidden shadow-lg">
            <CardContent className="p-4 sm:p-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 shadow-lg">
                  <Target className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h4 className="text-base sm:text-lg font-bold text-gray-900">Your Challenge</h4>
                  <p className="text-[10px] sm:text-xs text-violet-600/70 font-medium">Time to challenge the status quo</p>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed text-sm">{missionData.situation}</p>
              
              {/* Conviction Callout */}
              <div className="mt-4 p-3 rounded-xl bg-violet-500/10 border border-violet-200">
                <p className="text-xs text-violet-700 font-medium flex items-center gap-2">
                  <span className="text-base">💎</span>
                  Quick failures teach more than slow indecision. Make bold moves with high conviction.
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Generational Wisdom - Long-term thinking */}
        {step === 2 && (
          <Card className="border-2 border-amber-200 bg-gradient-to-br from-amber-50/50 via-yellow-50/30 to-white overflow-hidden shadow-lg">
            <CardContent className="p-4 sm:p-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="relative">
                  <Image
                    src={selectedCoach.avatar}
                    alt={selectedCoach.name}
                    width={48}
                    height={48}
                    className="rounded-full ring-2 ring-amber-300 ring-offset-2 shadow-lg"
                  />
                  <div className="absolute -bottom-1 -right-1 p-1 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full shadow">
                    <Brain className="h-3 w-3 text-white" />
                  </div>
                </div>
                <div>
                  <h4 className="text-base sm:text-lg font-bold text-gray-900">{selectedCoach.name}'s Wisdom</h4>
                  <p className="text-[10px] sm:text-xs text-amber-600/70 font-medium">Generational thinking for lasting wealth</p>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed text-sm">
                {getCoachTip()}
              </p>
              
              {/* Emotional Intelligence Callout */}
              <div className="mt-4 p-3 rounded-xl bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-200">
                <p className="text-xs text-amber-700 font-medium flex items-center gap-2">
                  <span className="text-base">🧠</span>
                  Master your emotions. The market tests psychology before it tests strategy.
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Navigation - Mobile optimized with larger touch targets */}
      <div className="flex gap-3 pt-3">
        <Button 
          variant="outline" 
          onClick={handleBack}
          className="px-4 min-h-[48px] touch-manipulation active:scale-[0.98]"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          {step === 0 ? "Exit" : "Back"}
        </Button>
        
        <Button 
          onClick={handleContinue} 
          className="flex-1 min-h-[48px] font-bold bg-gradient-to-r from-indigo-500 via-violet-500 to-purple-500 hover:from-indigo-600 hover:via-violet-600 hover:to-purple-600 text-white shadow-lg shadow-indigo-500/20 touch-manipulation active:scale-[0.98]"
        >
          {step < 2 ? (
            <>
              Continue
              <ChevronRight className="h-4 w-4 ml-1" />
            </>
          ) : (
            <>
              <Flame className="h-4 w-4 mr-2" />
              Invest with Conviction
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
