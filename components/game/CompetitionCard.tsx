import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Trophy } from "lucide-react";

interface CompetitionCardProps {
  unlocked: boolean;
  onStartCompetition: () => void;
}

export function CompetitionCard({ unlocked, onStartCompetition }: CompetitionCardProps) {
  if (!unlocked) return null;

  return (
    <div className="relative flex items-start gap-6">
      {/* Competition Node */}
      <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full border-4 bg-gradient-to-r from-yellow-400 to-orange-500 border-yellow-400 text-white">
        <Trophy className="h-6 w-6" />
      </div>

      {/* Competition Card */}
      <div className="flex-1">
        <Card className="border-2 border-yellow-400/50 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-950/20 dark:to-orange-950/20">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-amber-100 to-orange-100 border border-amber-300 shadow-inner">
                <Star className="h-4 w-4 text-amber-500 animate-spin" style={{ animationDuration: '3s' }} />
                <span className="text-sm font-bold text-amber-700">Unlimited 🪙 iii! ⭐</span>
              </div>
              <Button
                size="sm"
                className="font-medium bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white border-0"
                onClick={onStartCompetition}
              >
                <Trophy className="h-5 w-5 mr-2" />
                Start Competition
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}