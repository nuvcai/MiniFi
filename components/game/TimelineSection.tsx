/**
 * TimelineSection - Light, fun design
 * Teen-friendly with indigo/violet theme
 */

import React from "react";
import { Clock, Sparkles } from "lucide-react";
import { FinancialEvent } from "@/components/data/events";
import { EventCard } from "./EventCard";
import { CompetitionCard } from "./CompetitionCard";

interface TimelineSectionProps {
  events: FinancialEvent[];
  competitionUnlocked: boolean;
  onEventClick: (event: FinancialEvent) => void;
  onStartCompetition: () => void;
}

export function TimelineSection({ 
  events, 
  competitionUnlocked, 
  onEventClick, 
  onStartCompetition 
}: TimelineSectionProps) {
  return (
    <div className="p-6 rounded-3xl bg-white shadow-xl shadow-indigo-100 border border-indigo-100">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <div className="p-2 rounded-xl bg-gradient-to-br from-indigo-100 to-violet-100">
            <Clock className="h-5 w-5 text-indigo-600" />
          </div>
          <h2 className="text-xl font-bold text-gray-900">
            Financial History Timeline
          </h2>
          <Sparkles className="h-5 w-5 text-amber-500" />
        </div>
        <p className="text-gray-500">
          Travel through time and experience major financial events.
          Click on events to start your investment missions! 🚀
        </p>
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Timeline Line */}
        <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-indigo-300 via-violet-300 to-purple-300 rounded-full"></div>

        {/* Timeline Events */}
        <div className="space-y-6">
          {events.map((event) => (
            <EventCard
              key={event.year}
              event={event}
              onEventClick={onEventClick}
            />
          ))}

          <CompetitionCard
            unlocked={competitionUnlocked}
            onStartCompetition={onStartCompetition}
          />
        </div>
      </div>
    </div>
  );
}
