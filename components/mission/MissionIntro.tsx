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
} from "lucide-react";
import { MissionData } from "@/components/data/missions";
import { AICoach } from "@/components/data/coaches";

interface MissionIntroProps {
  missionData: MissionData;
  selectedCoach: AICoach;
  onNext: () => void;
  onExit: () => void;
}

export function MissionIntro({
  missionData,
  selectedCoach,
  onNext,
  onExit,
}: MissionIntroProps) {
  const [step, setStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

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

  const stepLabels = ["Story", "Mission", "Tip"];

  return (
    <div className="space-y-4">
      {/* Progress bar with labels */}
      <div className="flex items-center justify-center gap-1 mb-4">
        {[0, 1, 2].map((i) => (
          <div key={i} className="flex items-center">
            <div className="flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                  i === step 
                    ? "bg-gradient-to-r from-indigo-500 to-violet-500 text-white scale-110 shadow-lg" 
                    : i < step 
                      ? "bg-emerald-500 text-white"
                      : "bg-gray-200 text-gray-500"
                }`}
              >
                {i < step ? "✓" : i + 1}
              </div>
              <span className={`text-[10px] mt-1 font-medium ${
                i === step ? "text-indigo-600" : i < step ? "text-emerald-600" : "text-gray-400"
              }`}>
                {stepLabels[i]}
              </span>
            </div>
            {i < 2 && (
              <div className={`w-8 h-0.5 mx-1 mt-[-12px] ${
                i < step ? "bg-emerald-400" : "bg-gray-200"
              }`} />
            )}
          </div>
        ))}
      </div>

      {/* Step Content */}
      <div className={`transition-all duration-300 ${isAnimating ? "opacity-0 translate-x-4" : "opacity-100 translate-x-0"}`}>
        {/* Step 0: The Story */}
        {step === 0 && (
          <Card className="border-2 border-indigo-100 bg-gradient-to-br from-indigo-50/50 to-white overflow-hidden">
            <CardContent className="p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 shadow-lg">
                  <History className="h-5 w-5 text-white" />
                </div>
                <h4 className="text-lg font-bold text-gray-900">The Story</h4>
              </div>
              <p className="text-gray-700 leading-relaxed text-sm">{missionData.context}</p>
            </CardContent>
          </Card>
        )}

        {/* Step 1: Your Mission */}
        {step === 1 && (
          <Card className="border-2 border-violet-100 bg-gradient-to-br from-violet-50/50 to-white overflow-hidden">
            <CardContent className="p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 shadow-lg">
                  <Target className="h-5 w-5 text-white" />
                </div>
                <h4 className="text-lg font-bold text-gray-900">Your Mission</h4>
              </div>
              <p className="text-gray-700 leading-relaxed text-sm">{missionData.situation}</p>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Coach Tip */}
        {step === 2 && (
          <Card className="border-2 border-amber-100 bg-gradient-to-br from-amber-50/50 to-white overflow-hidden">
            <CardContent className="p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="relative">
                  <Image
                    src={selectedCoach.avatar}
                    alt={selectedCoach.name}
                    width={44}
                    height={44}
                    className="rounded-full ring-2 ring-amber-200 ring-offset-2"
                  />
                  <div className="absolute -bottom-1 -right-1 p-0.5 bg-amber-400 rounded-full">
                    <Sparkles className="h-3 w-3 text-white" />
                  </div>
                </div>
                <h4 className="text-lg font-bold text-gray-900">{selectedCoach.name}'s Tip</h4>
              </div>
              <p className="text-gray-700 leading-relaxed text-sm">
                {getCoachTip()}
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Navigation */}
      <div className="flex gap-3 pt-2">
        <Button 
          variant="outline" 
          onClick={handleBack}
          className="px-4"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          {step === 0 ? "Exit" : "Back"}
        </Button>
        
        <Button 
          onClick={handleContinue} 
          className="flex-1 font-bold bg-gradient-to-r from-indigo-500 via-violet-500 to-purple-500 hover:from-indigo-600 hover:via-violet-600 hover:to-purple-600 text-white shadow-lg"
        >
          {step < 2 ? (
            <>
              Continue
              <ChevronRight className="h-4 w-4 ml-1" />
            </>
          ) : (
            <>
              Let's Invest!
              <Sparkles className="h-4 w-4 ml-2" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
