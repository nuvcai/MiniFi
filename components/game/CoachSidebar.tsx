/**
 * CoachSidebar - Fun coach selection
 * Light, teen-friendly design
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
    <div className="p-5 rounded-2xl bg-white shadow-lg shadow-indigo-100 border border-indigo-100">
      <h3 className="text-sm font-semibold text-gray-500 mb-4">🤖 Your Coach</h3>
      
      {/* Selected Coach Preview */}
      <div className="flex items-center gap-3 mb-5 pb-5 border-b border-gray-100">
        <div className="relative">
          <Image
            src={selectedCoach.avatar}
            alt={selectedCoach.name}
            width={56}
            height={56}
            className="rounded-full ring-4 ring-indigo-100 shadow-lg"
          />
          <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-400 rounded-full border-2 border-white" />
        </div>
        <div>
          <p className="font-bold text-gray-900">{selectedCoach.name}</p>
          <p className="text-sm text-indigo-500 font-medium">{selectedCoach.personality}</p>
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
                ? "bg-gradient-to-r from-indigo-50 to-violet-50 border-2 border-indigo-200 shadow-md"
                : "hover:bg-gray-50 border-2 border-transparent"
            }`}
          >
            <div className="flex items-center gap-3">
              <Image
                src={coach.avatar}
                alt={coach.name}
                width={40}
                height={40}
                className={`rounded-full transition-all ${
                  selectedCoach.id === coach.id ? "ring-2 ring-indigo-300" : "opacity-70"
                }`}
              />
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-semibold ${
                  selectedCoach.id === coach.id ? "text-gray-900" : "text-gray-600"
                }`}>
                  {coach.name}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  {coach.personality}
                </p>
              </div>
              {selectedCoach.id === coach.id && (
                <span className="text-lg">✓</span>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
