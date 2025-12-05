"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Gift, Check, Lock, CheckCircle, QrCode } from "lucide-react";
import { Reward, rewardsStore } from "@/components/data/rewards";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface RewardsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  playerXP: number;
  redeemedRewards: string[];
  onRedeemReward: (reward: Reward) => void;
}

export function RewardsModal({
  open,
  onOpenChange,
  playerXP,
  redeemedRewards,
  onRedeemReward,
}: RewardsModalProps) {
  const canAfford = (cost: number) => playerXP >= cost;
  const isRedeemed = (rewardId: string) => redeemedRewards.includes(rewardId);
  const [redeemMode, setRedeemMode] = useState<"list" | "redeem" | "success">(
    "list"
  );
  const [selectedReward, setSelectedReward] = useState<Reward | null>(null);
  const [email, setEmail] = useState("");
  const [isRedeeming, setIsRedeeming] = useState(false);
  const [couponCode, setCouponCode] = useState("");

  const handleRedeemClick = (reward: Reward) => {
    setSelectedReward(reward);
    setRedeemMode("redeem");
  };

  const handleConfirmRedeem = async () => {
    if (!selectedReward || !email) return;

    setIsRedeeming(true);

    try {
      // Call the backend API to redeem reward
      const response = await fetch(
        `${
          process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"
        }/rewards/redeem`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_email: email,
            reward_name: selectedReward.name,
            partner: selectedReward.partner,
            reward_description: selectedReward.description,
            player_xp: playerXP,
            reward_cost: selectedReward.cost,
          }),
        }
      );

      const result = await response.json();

      if (result.success) {
        // Call the parent function to update XP and redeemed rewards
        onRedeemReward(selectedReward);

        // Set the coupon code from the API response
        setCouponCode(result.coupon_code);

        // Show success message
        setRedeemMode("success");

        console.log(
          `✅ Reward redeemed successfully! Email ${
            result.simulated ? "simulated" : "sent"
          } to ${email}`
        );
      } else {
        // Handle error
        alert(`Failed to redeem reward: ${result.message}`);
        setRedeemMode("redeem"); // Stay in redeem mode
      }
    } catch (error) {
      console.error("Error redeeming reward:", error);
      alert("Failed to connect to server. Please try again.");
      setRedeemMode("redeem"); // Stay in redeem mode
    } finally {
      setIsRedeeming(false);
    }
  };

  const handleBackToList = () => {
    setRedeemMode("list");
    setSelectedReward(null);
    setEmail("");
    setIsRedeeming(false);
    setCouponCode("");
  };

  const handleClose = () => {
    onOpenChange(false);
    setRedeemMode("list");
    setSelectedReward(null);
    setEmail("");
    setIsRedeeming(false);
    setCouponCode("");
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl w-[95vw] max-h-[90vh] overflow-y-auto p-4 sm:p-6">
        {redeemMode === "list" && (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-xl sm:text-2xl">
                <Gift className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-600" />
                Rewards Store
              </DialogTitle>
              <DialogDescription className="text-sm">
                Exchange your XP for amazing rewards from our partner brands!
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              {/* Current XP Display */}
              <div className="bg-gradient-to-r from-green-50 to-blue-50 p-3 sm:p-4 rounded-lg border">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Your Available XP
                    </p>
                    <p className="text-xl sm:text-2xl font-bold text-primary">
                      {playerXP} XP
                    </p>
                  </div>
                  <div className="text-left sm:text-right">
                    <p className="text-sm text-muted-foreground">
                      Rewards Redeemed
                    </p>
                    <p className="text-lg font-semibold text-secondary">
                      {redeemedRewards.length}
                    </p>
                  </div>
                </div>
              </div>

              {/* Rewards List */}
              <div className="space-y-4">
                {rewardsStore.map((reward) => (
                  <Card
                    key={reward.id}
                    className={`relative ${
                      isRedeemed(reward.id) ? "opacity-60" : ""
                    }`}
                  >
                    <CardContent className="p-3 sm:p-4">
                      <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
                        {/* Icon */}
                        <div className="text-3xl sm:text-4xl flex-shrink-0">
                          {reward.image}
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-2 gap-2">
                            <div className="flex-1">
                              <h3 className="font-semibold text-base sm:text-lg">
                                {reward.name}
                              </h3>
                              <p className="text-xs text-muted-foreground">
                                Partner: {reward.partner}
                              </p>
                            </div>
                            <Badge
                              variant={
                                canAfford(reward.cost) ? "default" : "secondary"
                              }
                              className="self-start sm:ml-2"
                            >
                              {reward.cost} XP
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">
                            {reward.description}
                          </p>
                        </div>

                        {/* Action Button */}
                        <div className="flex-shrink-0 w-full sm:w-auto">
                          <Button
                            onClick={() => handleRedeemClick(reward)}
                            disabled={
                              !canAfford(reward.cost) || isRedeemed(reward.id)
                            }
                            variant={
                              isRedeemed(reward.id) ? "outline" : "default"
                            }
                            size="sm"
                            className="w-full sm:w-auto"
                          >
                            {isRedeemed(reward.id) ? (
                              <>
                                <Check className="h-4 w-4 mr-2" />
                                Redeemed
                              </>
                            ) : canAfford(reward.cost) ? (
                              <>
                                <Gift className="h-4 w-4 mr-2" />
                                Redeem
                              </>
                            ) : (
                              <>
                                <Lock className="h-4 w-4 mr-2" />
                                Need {reward.cost - playerXP} more
                              </>
                            )}
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                    {isRedeemed(reward.id) && (
                      <div className="absolute top-2 right-2">
                        <Badge
                          variant="secondary"
                          className="bg-green-100 text-green-800"
                        >
                          ✓ Claimed
                        </Badge>
                      </div>
                    )}
                  </Card>
                ))}
              </div>

              {/* How it works section */}
              <Card className="bg-blue-50 border-blue-200">
                <CardHeader>
                  <CardTitle className="text-lg text-blue-800">
                    How Rewards Work
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-blue-700 space-y-2">
                  <p>• Complete missions to earn XP</p>
                  <p>• Exchange XP for real rewards from partner brands</p>
                  <p>
                    • Voucher codes will be sent to your email after redemption
                  </p>
                  <p>• Each reward can only be claimed once per account</p>
                </CardContent>
              </Card>
            </div>
          </>
        )}

        {redeemMode === "redeem" && selectedReward && (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-lg sm:text-xl">
                <Gift className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-600" />
                Redeem Reward
              </DialogTitle>
              <DialogDescription className="text-sm">
                Enter your email to receive your {selectedReward.name}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <Card className="bg-muted/30">
                <CardContent className="p-3 sm:p-4">
                  <div className="flex flex-col sm:flex-row items-start gap-3">
                    <div className="text-2xl sm:text-3xl">
                      {selectedReward.image}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-base sm:text-lg">
                        {selectedReward.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {selectedReward.description}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Partner: {selectedReward.partner}
                      </p>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-amber-600 text-center font-medium">
                  {nextMilestone.xp - playerXP} 🪙 to {nextMilestone.label}
                </p>
              </div>

          {/* Coming Soon - Light Card */}
          <Card className="bg-gradient-to-br from-indigo-50 via-violet-50 to-purple-50 border-2 border-indigo-200 shadow-lg shadow-indigo-100 overflow-hidden relative">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-0 right-0 w-40 h-40 bg-violet-200/30 rounded-full blur-2xl" />
            </div>
            <CardContent className="p-6 relative">
              <div className="text-center space-y-4">
                {/* Animated rocket icon */}
                <div className="relative mx-auto w-24 h-24">
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-300 to-violet-300 rounded-full blur-xl opacity-50 animate-pulse" />
                  <div className="relative w-24 h-24 bg-gradient-to-br from-indigo-500 via-violet-500 to-purple-500 rounded-full flex items-center justify-center shadow-xl shadow-indigo-200">
                    <Rocket className="h-12 w-12 text-white animate-bounce" style={{ animationDuration: '3s' }} />
                  </div>
                  <div className="absolute -top-2 -right-2 px-2.5 py-1 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full shadow-lg">
                    <span className="text-xs font-bold text-white">NEW</span>
                  </div>
                </div>
                
                <div>
                  <Badge className="bg-gradient-to-r from-indigo-500 via-violet-500 to-purple-500 text-white border-0 px-4 py-1.5 text-sm font-bold mb-3 shadow-lg">
                    <Clock className="h-3.5 w-3.5 mr-1.5" />
                    Launching Soon
                  </Badge>
                  <h3 className="text-xl font-black text-gray-900 mb-2">
                    Real Rewards Incoming! 🎁
                  </h3>
                  <p className="text-sm text-gray-600 max-w-sm mx-auto">
                    Trade your 🪙 iii for real gift cards, subscriptions, and exclusive experiences. 
                    Keep stacking that iii!
                  </p>
                )}
              </div>

          {/* How It Works - Light Theme */}
          <Card className="bg-white border-2 border-gray-200 shadow-md">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2 text-gray-700">
                <Target className="h-4 w-4 text-indigo-500" />
                How to Earn Rewards
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-3 text-sm">
              {[
                { icon: <Trophy className="h-4 w-4 text-amber-500" />, text: "Complete missions", bg: "bg-amber-50 border-amber-200" },
                { icon: <Zap className="h-4 w-4 text-orange-500" />, text: "Daily streaks", bg: "bg-orange-50 border-orange-200" },
                { icon: <Star className="h-4 w-4 text-violet-500" />, text: "Earn iii badges", bg: "bg-violet-50 border-violet-200" },
                { icon: <TrendingUp className="h-4 w-4 text-emerald-500" />, text: "Level up faster", bg: "bg-emerald-50 border-emerald-200" },
              ].map((item, i) => (
                <div key={i} className={`flex items-center gap-2 p-2.5 rounded-xl border ${item.bg}`}>
                  {item.icon}
                  <span className="text-gray-700 text-xs font-medium">{item.text}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* CTA Button */}
          <Button 
            onClick={() => onOpenChange(false)}
            className="w-full py-6 bg-gradient-to-r from-indigo-500 via-violet-500 to-purple-500 hover:from-indigo-600 hover:via-violet-600 hover:to-purple-600 text-white font-bold text-lg shadow-xl shadow-indigo-200 relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
            <Sparkles className="h-5 w-5 mr-2" />
            Keep Earning 🪙!
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
