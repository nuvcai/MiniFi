"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { 
  Gift, 
  Clock, 
  Star, 
  Sparkles, 
  Bell, 
  Zap, 
  Trophy,
  TrendingUp,
  Target,
  Rocket,
} from "lucide-react";
import { Reward, rewardsStore } from "@/components/data/rewards";

interface RewardsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  playerXP: number;
  redeemedRewards: string[];
  onRedeemReward: (reward: Reward) => void;
}

// Level progression thresholds
const XP_MILESTONES = [
  { xp: 100, label: "First Steps", icon: "🌱" },
  { xp: 500, label: "Getting Started", icon: "🚀" },
  { xp: 1000, label: "On Track", icon: "⭐" },
  { xp: 2500, label: "Rising Star", icon: "🌟" },
  { xp: 5000, label: "Investor Pro", icon: "💎" },
  { xp: 10000, label: "Market Master", icon: "👑" },
];

export function RewardsModal({
  open,
  onOpenChange,
  playerXP,
}: RewardsModalProps) {
  const [animatedXP, setAnimatedXP] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  
  // Animate XP counter on open
  useEffect(() => {
    if (open) {
      setAnimatedXP(0);
      const duration = 1500;
      const steps = 60;
      const stepValue = playerXP / steps;
      let current = 0;
      
      const interval = setInterval(() => {
        current++;
        if (current >= steps) {
          setAnimatedXP(playerXP);
          clearInterval(interval);
          if (playerXP >= 1000) setShowConfetti(true);
        } else {
          setAnimatedXP(Math.round(stepValue * current));
        }
      }, duration / steps);
      
      return () => clearInterval(interval);
    }
  }, [open, playerXP]);
  
  // Get current milestone
  const currentMilestone = XP_MILESTONES.reduce((acc, milestone) => {
    return playerXP >= milestone.xp ? milestone : acc;
  }, XP_MILESTONES[0]);
  
  const nextMilestone = XP_MILESTONES.find(m => m.xp > playerXP) || XP_MILESTONES[XP_MILESTONES.length - 1];
  const progressToNext = Math.min(100, ((playerXP - (currentMilestone?.xp || 0)) / (nextMilestone.xp - (currentMilestone?.xp || 0))) * 100);
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg w-[95vw] p-0 overflow-hidden bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-900 border-0">
        {/* Animated background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-violet-500/20 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
          
          {/* Floating particles */}
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white/30 rounded-full animate-particle-float"
              style={{
                left: `${(i * 8.3) % 100}%`,
                top: `${(i * 12.5) % 100}%`,
                animationDelay: `${i * 0.3}s`,
                animationDuration: `${4 + (i % 3)}s`,
              }}
            />
          ))}
        </div>
        
        <div className="relative p-4 sm:p-6 space-y-5">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-center gap-3 text-2xl sm:text-3xl">
              <div className="relative">
                <Gift className="h-8 w-8 text-amber-400 animate-bounce" style={{ animationDuration: '2s' }} />
                <Sparkles className="absolute -top-1 -right-1 h-4 w-4 text-yellow-400 animate-pulse" />
              </div>
              <span className="font-black bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-300 bg-clip-text text-transparent">
                Rewards Vault
              </span>
            </DialogTitle>
          </DialogHeader>

          {/* XP Treasury - Enhanced */}
          <div className="relative rounded-2xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 via-orange-500/20 to-yellow-500/20" />
            <div className="relative p-5 backdrop-blur-sm border border-amber-500/30 rounded-2xl">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-amber-300/80 text-sm font-medium flex items-center gap-2">
                    <Zap className="h-4 w-4" />
                    Your XP Treasury
                  </p>
                  <p className="text-4xl sm:text-5xl font-black text-white mt-1 tabular-nums">
                    {animatedXP.toLocaleString()}
                    <span className="text-amber-400 text-2xl ml-2">XP</span>
                  </p>
                </div>
                <div className="relative">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 via-orange-500 to-amber-600 flex items-center justify-center shadow-2xl shadow-amber-500/30 animate-heartbeat">
                    <Star className="h-8 w-8 text-white fill-white" />
                  </div>
                  {playerXP >= 1000 && (
                    <Trophy className="absolute -bottom-1 -right-1 h-6 w-6 text-yellow-400 fill-yellow-400" />
                  )}
                </div>
              </div>
              
              {/* Progress to next milestone */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-amber-300/70 flex items-center gap-1">
                    <span>{currentMilestone.icon}</span>
                    {currentMilestone.label}
                  </span>
                  <span className="text-amber-300/70 flex items-center gap-1">
                    {nextMilestone.icon}
                    {nextMilestone.label}
                  </span>
                </div>
                <div className="h-3 bg-slate-800/80 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-amber-400 via-orange-400 to-yellow-400 rounded-full transition-all duration-1000 relative"
                    style={{ width: `${progressToNext}%` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
                  </div>
                </div>
                <p className="text-xs text-amber-300/60 text-center">
                  {nextMilestone.xp - playerXP} XP to {nextMilestone.label}
                </p>
              </div>
            </div>
          </div>

          {/* Coming Soon - Premium Card */}
          <Card className="bg-gradient-to-br from-slate-800/80 via-indigo-900/50 to-slate-800/80 border border-indigo-500/30 backdrop-blur-sm overflow-hidden relative">
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-violet-500/10 rounded-full blur-2xl" />
            </div>
            <CardContent className="p-6 relative">
              <div className="text-center space-y-4">
                {/* Animated rocket icon */}
                <div className="relative mx-auto w-24 h-24">
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-violet-500 rounded-full blur-xl opacity-40 animate-pulse" />
                  <div className="relative w-24 h-24 bg-gradient-to-br from-indigo-500 via-violet-500 to-purple-600 rounded-full flex items-center justify-center shadow-2xl">
                    <Rocket className="h-12 w-12 text-white animate-bounce" style={{ animationDuration: '3s' }} />
                  </div>
                  <div className="absolute -top-2 -right-2 px-2 py-1 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full shadow-lg">
                    <span className="text-xs font-bold text-white">NEW</span>
                  </div>
                </div>
                
                <div>
                  <Badge className="bg-gradient-to-r from-indigo-500 via-violet-500 to-purple-500 text-white border-0 px-4 py-1.5 text-sm font-bold mb-3 shadow-lg">
                    <Clock className="h-3.5 w-3.5 mr-1.5" />
                    Launching Soon
                  </Badge>
                  <h3 className="text-xl font-black text-white mb-2">
                    Real Rewards Incoming! 🎁
                  </h3>
                  <p className="text-sm text-slate-300 max-w-sm mx-auto">
                    Trade your XP for real gift cards, subscriptions, and exclusive experiences. 
                    Keep stacking that XP!
                  </p>
                </div>

                {/* Animated reward previews */}
                <div className="flex justify-center gap-3 pt-3">
                  {rewardsStore.slice(0, 5).map((reward, index) => (
                    <div 
                      key={reward.id}
                      className="w-14 h-14 rounded-xl bg-slate-700/50 backdrop-blur border border-slate-600/50 flex items-center justify-center text-2xl shadow-lg hover:scale-110 hover:border-indigo-400/50 transition-all cursor-pointer group"
                      style={{ 
                        animationDelay: `${index * 100}ms`,
                        animation: 'float 3s ease-in-out infinite',
                        animationDelay: `${index * 0.2}s`
                      }}
                    >
                      <span className="group-hover:scale-125 transition-transform">{reward.image}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* How It Works - Game Style */}
          <Card className="bg-slate-800/50 border border-slate-700/50 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2 text-slate-300">
                <Target className="h-4 w-4 text-indigo-400" />
                How to Earn Rewards
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-3 text-sm">
              {[
                { icon: <Trophy className="h-4 w-4 text-amber-400" />, text: "Complete missions" },
                { icon: <Zap className="h-4 w-4 text-yellow-400" />, text: "Daily streaks" },
                { icon: <Star className="h-4 w-4 text-purple-400" />, text: "Earn XP badges" },
                { icon: <TrendingUp className="h-4 w-4 text-emerald-400" />, text: "Level up faster" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 p-2 rounded-lg bg-slate-700/30">
                  {item.icon}
                  <span className="text-slate-300 text-xs">{item.text}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* CTA Button */}
          <Button 
            onClick={() => onOpenChange(false)}
            className="w-full py-6 bg-gradient-to-r from-indigo-500 via-violet-500 to-purple-500 hover:from-indigo-600 hover:via-violet-600 hover:to-purple-600 text-white font-bold text-lg shadow-xl shadow-indigo-500/25 relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
            <Sparkles className="h-5 w-5 mr-2" />
            Keep Earning XP!
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
