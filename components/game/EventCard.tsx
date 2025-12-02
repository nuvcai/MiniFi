/**
 * EventCard - Light, fun mission cards
 * Teen-friendly with colorful accents
 */

import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DifficultyMeter } from "./DifficultyMeter";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Trophy,
  Play,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  Lock,
} from "lucide-react";
import { FinancialEvent } from "@/components/data/events";

interface EventCardProps {
  event: FinancialEvent;
  onEventClick: (event: FinancialEvent) => void;
}

export function EventCard({ event, onEventClick }: EventCardProps) {
  const getImpactIcon = () => {
    switch (event.impact) {
      case "negative":
        return <TrendingDown className="h-5 w-5" />;
      case "mixed":
        return <DollarSign className="h-5 w-5" />;
      default:
        return <TrendingUp className="h-5 w-5" />;
    }
  };

  const getNodeStyle = () => {
    if (event.completed) {
      return "bg-gradient-to-br from-emerald-400 to-green-500 border-emerald-300 text-white shadow-lg shadow-emerald-200";
    }
    if (event.unlocked) {
      return "bg-white border-indigo-300 text-indigo-500 hover:border-indigo-400 hover:shadow-lg hover:shadow-indigo-100 cursor-pointer";
    }
    return "bg-gray-100 border-gray-300 text-gray-400";
  };

  const isNewEvent = event.unlocked && !event.completed;

  const getStatusBadge = () => {
    if (event.completed) {
      return (
        <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200">
          ✓ Completed
        </Badge>
      );
    }
    if (event.unlocked) {
      return (
        <Badge className="bg-indigo-100 text-indigo-700 border-indigo-200">
          Available
        </Badge>
      );
    }
    return (
      <Badge className="bg-gray-100 text-gray-500 border-gray-200">
        <Lock className="h-3 w-3 mr-1" />
        Locked
      </Badge>
    );
  };

  return (
    <div className="relative flex items-start gap-5">
      {/* Timeline Node */}
      <div
        className={`relative z-10 flex h-16 w-16 items-center justify-center rounded-2xl border-2 ${getNodeStyle()} transition-all duration-300`}
        onClick={() => onEventClick(event)}
      >
        {event.completed ? <Trophy className="h-5 w-5" /> : getImpactIcon()}
        
        {/* NEW Badge */}
        {isNewEvent && (
          <div className="absolute -top-2 -right-2 z-20">
            <Badge 
              className="px-2 py-0.5 text-[10px] font-bold bg-gradient-to-r from-amber-400 to-orange-400 text-white border-0 shadow-lg"
            >
              <Sparkles className="h-3 w-3 mr-1" />
              NEW
            </Badge>
          </div>
        )}
      </div>

      {/* Event Card */}
      <div className={`flex-1 ${!event.unlocked ? "opacity-60" : ""}`}>
        <div
          className={`relative overflow-hidden rounded-2xl transition-all duration-300 bg-white border-2
            ${event.unlocked
              ? "border-indigo-100 hover:border-indigo-300 hover:shadow-xl hover:shadow-indigo-100 hover:-translate-y-1 cursor-pointer"
              : "border-gray-200"
            }
            ${isNewEvent ? "ring-2 ring-amber-300 ring-offset-2" : ""}
          `}
          onClick={() => onEventClick(event)}
        >
          <div className="p-5">
            {/* Header */}
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-2xl font-bold text-indigo-600">{event.year}</span>
                  {getStatusBadge()}
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {event.title}
                </h3>
              </div>
              <DifficultyMeter 
                difficulty={event.difficulty as "beginner" | "intermediate" | "advanced" | "expert"} 
                size="sm"
              />
            </div>

            {/* Description */}
            <p className="text-sm text-gray-600 mb-4 leading-relaxed">
              {event.description}
            </p>

            {/* Unlock message */}
            {!event.unlocked && event.unlockDescription && (
              <div className="mb-4 p-3 bg-amber-50 rounded-xl border border-amber-200">
                <p className="text-xs text-amber-700 flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4" />
                  {event.unlockDescription}
                </p>
              </div>
            )}

            {/* Footer */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-50 border border-amber-200">
                <Trophy className="h-4 w-4 text-amber-500" />
                <span className="text-sm font-semibold text-amber-700">{event.reward} XP</span>
              </div>
              
              {/* New Mission */}
              {event.unlocked && !event.completed && (
                <Button
                  size="sm"
                  className="font-semibold bg-gradient-to-r from-indigo-500 to-violet-500 hover:from-indigo-600 hover:to-violet-600 text-white shadow-lg shadow-indigo-200"
                  onClick={(e) => {
                    e.stopPropagation();
                    onEventClick(event);
                  }}
                >
                  <Play className="h-4 w-4 mr-1" />
                  Start Mission
                </Button>
              )}
              
              {/* Completed Mission */}
              {event.completed && (
                <Button
                  size="sm"
                  variant="outline"
                  className="font-semibold border-emerald-200 text-emerald-600 hover:bg-emerald-50"
                  onClick={(e) => {
                    e.stopPropagation();
                    onEventClick(event);
                  }}
                >
                  <RotateCcw className="h-4 w-4 mr-1" />
                  Replay
                </Button>
              )}
              
              {/* Locked Mission */}
              {!event.unlocked && (
                <Button
                  size="sm"
                  variant="outline"
                  disabled
                  className="font-semibold border-gray-200 text-gray-400"
                >
                  <Lock className="h-4 w-4 mr-1" />
                  Locked
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
