/**
 * CoachSidebar - Minimalist coach selection
 * Clean, focused design
 */

"use client";

import React from "react";
import Image from "next/image";
import { AICoach } from "@/components/data/coaches";

interface CoachSidebarProps {
  coaches: AICoach[];
  selectedCoach: AICoach;
  onCoachSelect: (coach: AICoach) => void;
}

export function CoachSidebar({
  coaches,
  selectedCoach,
  onCoachSelect,
}: CoachSidebarProps) {
  return (
    <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5">
      <h3 className="text-sm font-medium text-white/50 mb-4">Your Coach</h3>
      
      {/* Selected Coach Preview */}
      <div className="flex items-center gap-3 mb-5 pb-5 border-b border-white/5">
        <Image
          src={selectedCoach.avatar}
          alt={selectedCoach.name}
          width={48}
          height={48}
          className="rounded-full ring-2 ring-indigo-500/30"
        />
        <div>
          <p className="font-medium text-white">{selectedCoach.name}</p>
          <p className="text-xs text-indigo-400">{selectedCoach.personality}</p>
        </div>
      </div>

      {/* Coach List */}
      <div className="space-y-2">
        {coaches.map((coach) => (
          <button
            key={coach.id}
            onClick={() => onCoachSelect(coach)}
            className={`w-full p-3 rounded-xl transition-all text-left ${
              selectedCoach.id === coach.id
                ? "bg-indigo-500/10 border border-indigo-500/20"
                : "hover:bg-white/5 border border-transparent"
            }`}
          >
            <div className="flex items-center gap-3">
              <Image
                src={coach.avatar}
                alt={coach.name}
                width={36}
                height={36}
                className={`rounded-full transition-all ${
                  selectedCoach.id === coach.id ? "opacity-100" : "opacity-60"
                }`}
              />
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-medium ${
                  selectedCoach.id === coach.id ? "text-white" : "text-white/60"
                }`}>
                  {coach.name}
                </p>
                <p className="text-xs text-white/40 truncate">
                  {coach.personality}
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
