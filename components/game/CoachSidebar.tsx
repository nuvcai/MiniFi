import React from "react";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Users } from "lucide-react";
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
    <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-slate-100">
          <Users className="h-5 w-5 text-emerald-400" />
          Your Squad 🤖
        </CardTitle>
        <CardDescription className="text-slate-400">Pick your vibe - who&apos;s got your back?</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {coaches.map((coach) => (
          <div
            key={coach.id}
            className={`p-3 rounded-lg border cursor-pointer transition-all ${
              selectedCoach.id === coach.id
                ? "border-emerald-500/50 bg-emerald-500/10 shadow-sm shadow-emerald-500/10"
                : "border-slate-700/50 hover:border-emerald-500/30 hover:bg-emerald-500/5"
            }`}
            onClick={() => onCoachSelect(coach)}
          >
            <div className="flex items-center gap-3">
              <Image
                src={coach.avatar}
                alt={coach.name}
                width={40}
                height={40}
                className="rounded-full"
              />
              <div className="flex-1">
                <p className="font-medium text-sm text-slate-100">{coach.name}</p>
                <p className="text-xs text-slate-400">
                  {coach.personality}
                </p>
              </div>
            </div>
            <p className="text-xs mt-2 text-slate-400">
              {coach.description}
            </p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
