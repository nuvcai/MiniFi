/**
 * ╔══════════════════════════════════════════════════════════════════════════════╗
 * ║   MiniFi Competition Card (MVP - Hackathon Edition)                          ║
 * ║   ✨ Vibe-coded by Tick.AI ✨                                                ║
 * ║   Copyright (c) 2025 NUVC.AI / Tick.AI. All Rights Reserved.                ║
 * ╚══════════════════════════════════════════════════════════════════════════════╝
 */

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
      <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full border-4 bg-gradient-to-r from-accent to-primary border-accent text-accent-foreground">
        <Trophy className="h-6 w-6" />
      </div>

      {/* Competition Card */}
      <div className="flex-1">
        <Card className="border-2 border-accent/50 bg-gradient-to-r from-accent/10 to-primary/10">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="font-serif text-lg text-primary">
                  Investment Competition
                </CardTitle>
                <CardDescription className="font-medium text-secondary mt-1">
                  Ultimate Boss Level 🏆
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <StatusBadge 
                  status="special"
                />
                <StatusBadge
                  status="expert"
                  variant="outline"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              You crushed all the history missions! 🎉 Now it&apos;s time to prove yourself 
              against other players. Think you&apos;ve got what it takes to top the leaderboard?
            </p>
            <div className="bg-card/50 rounded-lg p-3 mb-4 border border-border/50">
              <div className="flex items-center gap-2 text-sm font-medium text-foreground mb-2">
                <Trophy className="h-4 w-4 text-accent-foreground" />
                Competition Features
              </div>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>• Live market action - feels like real trading! 📊</li>
                <li>• Battle players worldwide for the top spot 🌍</li>
                <li>• Epic rewards and flex-worthy achievements 🏅</li>
                <li>• Next-level investment challenges await 🧠</li>
              </ul>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm">
                <Trophy className="h-4 w-4 text-accent-foreground" />
                <span className="text-primary font-medium">
                  Unlimited XP - Sky&apos;s the limit! ⭐
                </span>
              </div>
              <Button
                size="sm"
                className="font-medium bg-gradient-to-r from-accent to-primary hover:from-accent/90 hover:to-primary/90 text-primary-foreground border-0"
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
