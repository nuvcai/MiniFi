/**
 * CompetitionCard - Light, fun design
 * Boss level unlocked card
 */

import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trophy, Star, Sparkles } from "lucide-react";

interface CompetitionCardProps {
  unlocked: boolean;
  onStartCompetition: () => void;
}

export function CompetitionCard({ unlocked, onStartCompetition }: CompetitionCardProps) {
  if (!unlocked) return null;

  return (
    <div className="relative flex items-start gap-5">
      {/* Competition Node */}
      <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-2xl border-2 bg-gradient-to-br from-amber-400 to-orange-500 border-amber-300 text-white shadow-xl shadow-amber-200">
        <Trophy className="h-6 w-6" />
        <div className="absolute -top-2 -right-2">
          <Sparkles className="h-5 w-5 text-amber-500" />
        </div>
      </div>

      {/* Competition Card */}
      <div className="flex-1">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-50 via-white to-orange-50 border-2 border-amber-200 shadow-xl shadow-amber-100">
          <div className="p-5">
            {/* Header */}
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-2xl font-bold bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
                    🏆 BOSS LEVEL
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Investment Competition
                </h3>
              </div>
              <div className="flex gap-2">
                <Badge className="bg-gradient-to-r from-amber-100 to-orange-100 text-amber-700 border-amber-300">
                  <Star className="h-3 w-3 mr-1" />
                  Special
                </Badge>
              </div>
            </div>

            {/* Description */}
            <p className="text-sm text-gray-600 mb-4 leading-relaxed">
              You crushed all the history missions! 🎉 Now it's time to prove yourself 
              against other players. Think you've got what it takes to top the leaderboard?
            </p>

            {/* Features */}
            <div className="mb-4 p-4 bg-white/80 rounded-xl border border-amber-200">
              <div className="flex items-center gap-2 text-sm font-semibold text-gray-900 mb-2">
                <Trophy className="h-4 w-4 text-amber-500" />
                Competition Features
              </div>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Live market action - feels like real trading! 📊</li>
                <li>• Battle players worldwide for the top spot 🌍</li>
                <li>• Epic rewards and flex-worthy achievements 🏅</li>
                <li>• Next-level investment challenges await 🧠</li>
              </ul>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-amber-100 to-orange-100 border border-amber-300">
                <Star className="h-4 w-4 text-amber-500" />
                <span className="text-sm font-semibold text-amber-700">Unlimited XP! ⭐</span>
              </div>
              <Button
                className="font-semibold bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-lg shadow-amber-200"
                onClick={onStartCompetition}
              >
                <Trophy className="h-5 w-5 mr-2" />
                Start Competition
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
