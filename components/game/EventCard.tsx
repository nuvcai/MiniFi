/**
 * EventCard - Enhanced mission cards with animations
 * Dynamic, engaging design with micro-interactions
 */

"use client";

import React, { useState } from "react";
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
  Clock,
  Zap,
  ChevronRight,
} from "lucide-react";
import { FinancialEvent } from "@/components/data/events";

interface EventCardProps {
  event: FinancialEvent;
  onEventClick: (event: FinancialEvent) => void;
}

export function EventCard({ event, onEventClick }: EventCardProps) {
  const [isHovered, setIsHovered] = useState(false);

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

  const getImpactGradient = () => {
    switch (event.impact) {
      case "negative":
        return "from-red-500 to-rose-600";
      case "mixed":
        return "from-amber-500 to-orange-500";
      default:
        return "from-emerald-500 to-teal-500";
    }
  };

  const getNodeStyle = () => {
    if (event.completed) {
      return "bg-gradient-to-br from-emerald-400 to-green-500 border-emerald-300 text-white shadow-xl shadow-emerald-200/50";
    }
    if (event.unlocked) {
      return `bg-gradient-to-br ${getImpactGradient()} border-white/50 text-white shadow-xl shadow-indigo-200/50`;
    }
    return "bg-gray-100 border-gray-300 text-gray-400";
  };

  const isNewEvent = event.unlocked && !event.completed;

  const getStatusBadge = () => {
    if (event.completed) {
      return (
        <Badge className="bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-700 border-emerald-200 shadow-sm">
          <Trophy className="h-3 w-3 mr-1" />
          Completed
        </Badge>
      );
    }
    if (event.unlocked) {
      return (
        <Badge className="bg-gradient-to-r from-indigo-100 to-violet-100 text-indigo-700 border-indigo-200 shadow-sm animate-pulse">
          <Zap className="h-3 w-3 mr-1" />
          Ready
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
    <div 
      className="relative flex items-start gap-5"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Timeline Node with Pulse Animation */}
      <div className="relative">
        {/* Pulse ring for unlocked events */}
        {isNewEvent && (
          <div className="absolute inset-0 rounded-2xl bg-indigo-400/30 animate-ping" />
        )}
        
        {/* Glow effect on hover */}
        {event.unlocked && isHovered && (
          <div 
            className={`absolute inset-0 rounded-2xl blur-xl opacity-50 bg-gradient-to-br ${getImpactGradient()}`}
          />
        )}
        
        <div
          className={`relative z-10 flex h-16 w-16 items-center justify-center rounded-2xl border-2 ${getNodeStyle()} transition-all duration-300 ${
            event.unlocked ? "cursor-pointer hover:scale-110" : ""
          }`}
          onClick={() => event.unlocked && onEventClick(event)}
        >
          {event.completed ? (
            <Trophy className="h-6 w-6 drop-shadow-lg" />
          ) : (
            getImpactIcon()
          )}
          
          {/* Completion checkmark */}
          {event.completed && (
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-lg border-2 border-emerald-400">
              <span className="text-emerald-500 text-xs font-bold">✓</span>
            </div>
          )}
        </div>
        
        {/* NEW Badge */}
        {isNewEvent && (
          <div className="absolute -top-2 -right-2 z-20">
            <Badge 
              className="px-2 py-0.5 text-[10px] font-bold bg-gradient-to-r from-amber-400 via-orange-400 to-red-400 text-white border-0 shadow-lg animate-bounce"
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
          className={`relative overflow-hidden rounded-2xl transition-all duration-500 bg-white border-2
            ${event.unlocked
              ? "border-indigo-100 hover:border-indigo-300 hover:shadow-2xl hover:shadow-indigo-100/50 hover:-translate-y-1 cursor-pointer"
              : "border-gray-200"
            }
            ${isNewEvent ? "ring-2 ring-indigo-300 ring-offset-2" : ""}
          `}
          onClick={() => event.unlocked && onEventClick(event)}
        >
          {/* Background gradient decoration */}
          {event.unlocked && (
            <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${getImpactGradient()} opacity-5 rounded-full blur-2xl -mr-16 -mt-16`} />
          )}
          
          {/* Animated border glow for new events */}
          {isNewEvent && (
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-violet-500/10 to-purple-500/10 animate-pulse" />
          )}
          
          <div className="relative p-5">
            {/* Header */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  {/* Year with era badge */}
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-black bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 bg-clip-text text-transparent">
                      {event.year}
                    </span>
                    <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-100">
                      <Clock className="h-3 w-3 text-slate-400" />
                      <span className="text-[10px] font-medium text-slate-500">
                        {Math.abs(new Date().getFullYear() - event.year)} years ago
                      </span>
                    </div>
                  </div>
                  {getStatusBadge()}
                </div>
                <h3 className="text-lg font-bold text-gray-900 leading-tight">
                  {event.title}
                </h3>
              </div>
              <DifficultyMeter 
                difficulty={event.difficulty as "beginner" | "intermediate" | "advanced" | "expert"} 
                size="md"
                showLabel
              />
            </div>

            {/* Description */}
            <p className="text-sm text-gray-600 mb-4 leading-relaxed">
              {event.description}
            </p>

            {/* Impact Preview */}
            {event.unlocked && !event.completed && (
              <div className={`mb-4 p-3 rounded-xl bg-gradient-to-r ${
                event.impact === "negative" 
                  ? "from-red-50 to-rose-50 border border-red-200" 
                  : event.impact === "mixed"
                    ? "from-amber-50 to-orange-50 border border-amber-200"
                    : "from-emerald-50 to-teal-50 border border-emerald-200"
              }`}>
                <div className="flex items-center gap-2">
                  {getImpactIcon()}
                  <span className={`text-xs font-semibold ${
                    event.impact === "negative" 
                      ? "text-red-700" 
                      : event.impact === "mixed"
                        ? "text-amber-700"
                        : "text-emerald-700"
                  }`}>
                    Market Impact: {event.impact === "negative" ? "Bearish 📉" : event.impact === "mixed" ? "Volatile 📊" : "Bullish 📈"}
                  </span>
                </div>
              </div>
            )}

            {/* Unlock message */}
            {!event.unlocked && event.unlockDescription && (
              <div className="mb-4 p-3 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border border-amber-200">
                <p className="text-xs text-amber-700 flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 flex-shrink-0" />
                  {event.unlockDescription}
                </p>
              </div>
            )}

            {/* Footer */}
            <div className="flex items-center justify-between">
              {/* XP Reward with animation */}
              <div className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-300 ${
                isHovered && event.unlocked
                  ? "bg-gradient-to-r from-amber-100 to-orange-100 border-amber-300 scale-105"
                  : "bg-amber-50 border-amber-200"
              }`}>
                <Trophy className={`h-4 w-4 text-amber-500 ${isHovered && event.unlocked ? "animate-bounce" : ""}`} />
                <span className="text-sm font-bold text-amber-700">{event.reward} XP</span>
                <Sparkles className="h-3 w-3 text-amber-400" />
              </div>
              
              {/* Action Buttons */}
              {event.unlocked && !event.completed && (
                <Button
                  size="sm"
                  className="font-bold bg-gradient-to-r from-indigo-500 via-violet-500 to-purple-500 hover:from-indigo-600 hover:via-violet-600 hover:to-purple-600 text-white shadow-lg shadow-indigo-200/50 hover:shadow-xl hover:shadow-indigo-300/50 transition-all duration-300 hover:scale-105"
                  onClick={(e) => {
                    e.stopPropagation();
                    onEventClick(event);
                  }}
                >
                  <Play className="h-4 w-4 mr-1" />
                  Start Mission
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              )}
              
              {event.completed && (
                <Button
                  size="sm"
                  variant="outline"
                  className="font-semibold border-emerald-200 text-emerald-600 hover:bg-emerald-50 hover:border-emerald-300 transition-all duration-300"
                  onClick={(e) => {
                    e.stopPropagation();
                    onEventClick(event);
                  }}
                >
                  <RotateCcw className="h-4 w-4 mr-1" />
                  Replay
                </Button>
              )}
              
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
