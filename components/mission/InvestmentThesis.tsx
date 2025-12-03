/**
 * ╔══════════════════════════════════════════════════════════════════════════════╗
 * ║   📝 INVESTMENT THESIS - Pre-Decision Reasoning                              ║
 * ║   Forces deliberate thinking before investment decisions                     ║
 * ║   FO Principle: "If you can't explain it simply, you don't understand it"   ║
 * ║   Copyright (c) 2025 NUVC.AI. All Rights Reserved.                          ║
 * ╚══════════════════════════════════════════════════════════════════════════════╝
 */

"use client";

import React, { useState, useCallback, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  PenLine,
  Brain,
  Sparkles,
  CheckCircle2,
  Lightbulb,
  Target,
  MessageSquare,
  Award,
} from "lucide-react";
import { InvestmentOption } from "@/components/data/missions";
import { AICoach } from "@/components/data/coaches";

interface InvestmentThesisProps {
  selectedOption: InvestmentOption;
  coach: AICoach;
  eventTitle: string;
  eventYear: number;
  onSubmit: (thesis: string) => void;
  onSkip: () => void;
  onXpEarned?: (amount: number) => void;
}

// Thesis quality indicators
interface ThesisQuality {
  hasReason: boolean;
  mentionsRisk: boolean;
  mentionsTimeframe: boolean;
  mentionsCoach: boolean;
  isThoughtful: boolean;
}

// Evaluate thesis quality
const evaluateThesis = (thesis: string): ThesisQuality => {
  const lower = thesis.toLowerCase();
  return {
    hasReason: thesis.length > 20,
    mentionsRisk: /risk|safe|volatile|conservative|aggressive|danger|protect/.test(lower),
    mentionsTimeframe: /long.?term|short.?term|year|time|hold|wait|future/.test(lower),
    mentionsCoach: /coach|advice|recommend|suggest|sam|guru|alex|yoda/.test(lower),
    isThoughtful: thesis.length > 60 && thesis.split(" ").length > 10,
  };
};

// Thesis prompts based on investment type
const getThesisPrompts = (option: InvestmentOption, eventYear: number): string[] => {
  const prompts: string[] = [];
  
  if (option.risk.toLowerCase() === "extreme" || option.risk.toLowerCase() === "high") {
    prompts.push("Why are you comfortable with this level of risk?");
  }
  if (option.assetClass === "cryptocurrency") {
    prompts.push("How does this fit with traditional Family Office strategies?");
  }
  if (option.assetClass === "fixed_income") {
    prompts.push("What role do bonds play in protecting your portfolio?");
  }
  if (eventYear >= 2020) {
    prompts.push("How might recent market changes affect this investment?");
  }
  
  // Default prompts
  prompts.push("What outcome are you expecting and why?");
  prompts.push("How does your coach's philosophy influence this choice?");
  
  return prompts.slice(0, 3);
};

// Coach reactions based on thesis
const getCoachReaction = (
  coach: AICoach, 
  option: InvestmentOption, 
  quality: ThesisQuality
): string => {
  const coachName = coach.name.split(" ")[0]; // First name only
  
  if (quality.isThoughtful && quality.mentionsRisk) {
    switch (coach.riskTolerance) {
      case "conservative":
        return `${coachName} nods approvingly: "I love that you're thinking about risk management! This is exactly how Family Offices preserve wealth across generations."`;
      case "moderate":
        return `${coachName} smiles: "Great balanced thinking! You're weighing both upside and downside - that's the hallmark of a mature investor."`;
      case "aggressive":
      case "very_aggressive":
        return `${coachName} grins: "Bold reasoning! Taking calculated risks with clear thinking is how fortunes are made."`;
      default:
        return `${coachName} says: "Excellent reasoning! You're thinking like a real investor."`;
    }
  }
  
  if (quality.hasReason) {
    return `${coachName} considers your thesis: "Good start! The best investors always know WHY they're making a decision."`;
  }
  
  return `${coachName} encourages you: "Every thesis is a learning opportunity. Let's see how your thinking plays out!"`;
};

export function InvestmentThesis({
  selectedOption,
  coach,
  eventTitle,
  eventYear,
  onSubmit,
  onSkip,
  onXpEarned,
}: InvestmentThesisProps) {
  const [thesis, setThesis] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showCoachReaction, setShowCoachReaction] = useState(false);
  
  const quality = evaluateThesis(thesis);
  const qualityScore = Object.values(quality).filter(Boolean).length;
  const prompts = getThesisPrompts(selectedOption, eventYear);
  
  // Calculate XP bonus based on thesis quality
  const xpBonus = useMemo(() => {
    let bonus = 10; // Base XP for writing thesis
    if (quality.hasReason) bonus += 5;
    if (quality.mentionsRisk) bonus += 10;
    if (quality.mentionsTimeframe) bonus += 5;
    if (quality.isThoughtful) bonus += 15;
    return bonus;
  }, [quality]);
  
  const handleSubmit = useCallback(() => {
    setIsSubmitted(true);
    setShowCoachReaction(true);
    
    if (onXpEarned) {
      onXpEarned(xpBonus);
    }
    
    // Delay to show reaction before continuing
    setTimeout(() => {
      onSubmit(thesis);
    }, 2500);
  }, [thesis, xpBonus, onXpEarned, onSubmit]);
  
  const coachReaction = getCoachReaction(coach, selectedOption, quality);

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-violet-500/20 to-purple-500/20 border border-violet-500/30 mb-3">
          <Brain className="h-4 w-4 text-violet-400" />
          <span className="text-sm font-medium text-violet-300">Investment Thesis</span>
        </div>
        <h3 className="text-lg font-bold text-white mb-1">
          Why are you choosing {selectedOption.name}? 📝
        </h3>
        <p className="text-sm text-slate-400">
          Family Office Principle: "If you can't explain it, you don't understand it."
        </p>
      </div>

      {/* Selected Investment Summary */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center">
                <Target className="h-5 w-5 text-indigo-400" />
              </div>
              <div>
                <p className="font-medium text-white">{selectedOption.name}</p>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">
                    {selectedOption.risk} Risk
                  </Badge>
                  <span className="text-xs text-slate-400">
                    Expected: {selectedOption.expectedReturn}
                  </span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs text-slate-400">Mission</p>
              <p className="text-sm font-medium text-indigo-300">{eventYear}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Thesis Input */}
      {!isSubmitted ? (
        <div className="space-y-4">
          {/* Writing Area */}
          <div className="relative">
            <Textarea
              placeholder="Write your investment thesis here... Why did you choose this option? What do you expect to happen?"
              value={thesis}
              onChange={(e) => setThesis(e.target.value)}
              className="min-h-[120px] bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 resize-none"
              maxLength={500}
            />
            <div className="absolute bottom-2 right-2 text-xs text-slate-500">
              {thesis.length}/500
            </div>
          </div>

          {/* Prompts to help */}
          <div className="p-3 bg-amber-500/10 rounded-lg border border-amber-500/30">
            <p className="text-xs font-medium text-amber-300 mb-2 flex items-center gap-1">
              <Lightbulb className="h-3 w-3" />
              Consider these questions:
            </p>
            <ul className="space-y-1">
              {prompts.map((prompt, i) => (
                <li key={i} className="text-xs text-slate-300 flex items-start gap-2">
                  <span className="text-amber-400">•</span>
                  {prompt}
                </li>
              ))}
            </ul>
          </div>

          {/* Quality Indicators */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400">Thesis Quality</span>
              <span className="text-indigo-400 font-medium">+{xpBonus} XP potential</span>
            </div>
            <Progress value={(qualityScore / 5) * 100} className="h-2" />
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {[
                { key: "hasReason", label: "Has Reason", icon: "✏️" },
                { key: "mentionsRisk", label: "Addresses Risk", icon: "⚖️" },
                { key: "mentionsTimeframe", label: "Timeframe", icon: "⏱️" },
                { key: "mentionsCoach", label: "Coach Insight", icon: "🧠" },
                { key: "isThoughtful", label: "Thorough", icon: "💎" },
              ].map(({ key, label, icon }) => (
                <div 
                  key={key}
                  className={`p-2 rounded-lg text-center text-xs transition-all ${
                    quality[key as keyof ThesisQuality]
                      ? "bg-emerald-500/20 border border-emerald-500/40 text-emerald-300"
                      : "bg-slate-800 border border-slate-700 text-slate-500"
                  }`}
                >
                  <span className="block text-lg mb-0.5">{icon}</span>
                  {label}
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <Button
              onClick={handleSubmit}
              disabled={thesis.length < 10}
              className="flex-1 bg-gradient-to-r from-violet-500 to-purple-500 hover:from-violet-600 hover:to-purple-600"
            >
              <PenLine className="h-4 w-4 mr-2" />
              Submit Thesis (+{xpBonus} XP)
            </Button>
            <Button
              variant="ghost"
              onClick={onSkip}
              className="text-slate-400 hover:text-slate-300"
            >
              Skip for now
            </Button>
          </div>
          
          <p className="text-xs text-slate-500 text-center">
            Tip: Thoughtful theses earn more XP and help you learn faster!
          </p>
        </div>
      ) : (
        /* Coach Reaction */
        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
          {/* XP Earned Banner */}
          <div className="p-4 bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-xl border border-amber-500/40 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Sparkles className="h-5 w-5 text-amber-400 animate-pulse" />
              <span className="text-xl font-bold text-amber-300">+{xpBonus} XP Earned!</span>
              <Sparkles className="h-5 w-5 text-amber-400 animate-pulse" />
            </div>
            <p className="text-xs text-amber-200/70">For taking time to reason through your decision</p>
          </div>

          {/* Your Thesis */}
          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center flex-shrink-0">
                  <MessageSquare className="h-4 w-4 text-indigo-400" />
                </div>
                <div>
                  <p className="text-xs text-slate-400 mb-1">Your Investment Thesis</p>
                  <p className="text-sm text-white leading-relaxed italic">"{thesis}"</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Coach Reaction */}
          {showCoachReaction && (
            <Card className="bg-gradient-to-r from-indigo-500/15 to-violet-500/15 border-indigo-500/40 animate-in fade-in slide-in-from-bottom-2 duration-300 delay-500">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center flex-shrink-0">
                    <span className="text-lg">🧠</span>
                  </div>
                  <div>
                    <p className="text-xs text-indigo-300 mb-1 font-medium">{coach.name} responds:</p>
                    <p className="text-sm text-white leading-relaxed">
                      {coachReaction}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Quality Badges Earned */}
          <div className="flex flex-wrap justify-center gap-2">
            {quality.isThoughtful && (
              <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/40">
                <Award className="h-3 w-3 mr-1" /> Thoughtful Investor
              </Badge>
            )}
            {quality.mentionsRisk && (
              <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/40">
                <CheckCircle2 className="h-3 w-3 mr-1" /> Risk-Aware
              </Badge>
            )}
          </div>

          <p className="text-xs text-slate-500 text-center animate-pulse">
            Processing your decision...
          </p>
        </div>
      )}
    </div>
  );
}

export default InvestmentThesis;

