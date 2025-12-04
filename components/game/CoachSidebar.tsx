/**
 * CoachSidebar — Apple-inspired Design
 * 
 * Clean coach selection with minimal decoration
 */

"use client";

import React, { useState } from "react";
import Image from "next/image";
import { AICoach } from "@/components/data/coaches";
import { Check, ChevronDown } from "lucide-react";

interface CoachSidebarProps {
  coaches: AICoach[];
  selectedCoach: AICoach;
  onCoachSelect: (coach: AICoach) => void;
}

const riskColors = {
  conservative: "bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400",
  moderate: "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  aggressive: "bg-orange-50 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400",
  "very-aggressive": "bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400",
};

export function CoachSidebar({
  coaches,
  selectedCoach,
  onCoachSelect,
}: CoachSidebarProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="rounded-2xl bg-white dark:bg-[#1A1A1A] border border-black/[0.04] dark:border-white/[0.06] shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.3)] overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-black/[0.04] dark:border-white/[0.06]">
        <h3 className="font-semibold text-gray-900 dark:text-white text-sm">Your AI Coach</h3>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Choose your investment guide</p>
      </div>
      
      {/* Selected Coach */}
      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-4 flex items-center gap-3 hover:bg-gray-50 dark:hover:bg-white/[0.02] transition-colors lg:cursor-default"
      >
        <div className="relative flex-shrink-0">
          <Image
            src={selectedCoach.avatar}
            alt={selectedCoach.name}
            width={48}
            height={48}
            className="rounded-full ring-2 ring-violet-500 ring-offset-2 ring-offset-white dark:ring-offset-[#1A1A1A]"
          />
          <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white dark:border-[#1A1A1A]" />
        </div>
        
        <div className="flex-1 text-left min-w-0">
          <p className="font-semibold text-gray-900 dark:text-white truncate">{selectedCoach.name}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{selectedCoach.personality}</p>
        </div>
        
        <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform lg:hidden ${isExpanded ? 'rotate-180' : ''}`} />
      </button>
      
      {/* Coach Grid */}
      <div className={`p-4 pt-0 ${isExpanded ? 'block' : 'hidden lg:block'}`}>
        <div className="grid grid-cols-2 gap-2">
          {coaches.map((coach) => {
            const isSelected = selectedCoach.id === coach.id;
            
            return (
              <button
                key={coach.id}
                onClick={() => onCoachSelect(coach)}
                className={`relative p-3 rounded-xl transition-all ${
                  isSelected 
                    ? 'bg-violet-50 dark:bg-violet-500/10 border-2 border-violet-500' 
                    : 'bg-gray-50 dark:bg-white/[0.02] border border-gray-100 dark:border-white/[0.04] hover:border-gray-200 dark:hover:border-white/[0.08]'
                }`}
              >
                {isSelected && (
                  <div className="absolute top-2 right-2 w-4 h-4 bg-violet-500 rounded-full flex items-center justify-center">
                    <Check className="h-2.5 w-2.5 text-white" strokeWidth={3} />
                  </div>
                )}
                
                <div className="flex flex-col items-center text-center">
                  <Image
                    src={coach.avatar}
                    alt={coach.name}
                    width={40}
                    height={40}
                    className={`rounded-full mb-2 ${isSelected ? 'ring-2 ring-violet-500' : ''}`}
                  />
                  
                  <p className={`font-medium text-xs truncate w-full ${
                    isSelected ? 'text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-400'
                  }`}>
                    {coach.name}
                  </p>
                  
                  <span className={`mt-1.5 text-[10px] font-medium px-2 py-0.5 rounded-full ${
                    riskColors[coach.riskTolerance as keyof typeof riskColors] || riskColors.moderate
                  }`}>
                    {coach.riskTolerance}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
