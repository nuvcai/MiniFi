import React, { useState, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { DollarSign, BarChart3, InfoIcon, Clock, TrendingUp, Sparkles } from "lucide-react";
import { InvestmentOption, AssetClass, TimeHorizon } from "@/components/data/missions";
import { AICoach } from "@/components/data/coaches";
import { RiskPreviewCard } from "@/components/gamification/RiskPreviewCard";
import { CourageXpNotification } from "@/components/gamification/CourageXpNotification";
import { InlineFloatingXp } from "@/components/gamification/FloatingXp";
import { getCourageXpForRisk } from "@/components/gamification/effortRewards";

// Asset class display configuration
const assetClassDisplay: Record<AssetClass, { label: string; emoji: string; color: string }> = {
  equities: { label: "Stocks", emoji: "📈", color: "bg-blue-100 text-blue-800" },
  fixed_income: { label: "Bonds", emoji: "📊", color: "bg-green-100 text-green-800" },
  commodities: { label: "Commodities", emoji: "🥇", color: "bg-yellow-100 text-yellow-800" },
  alternatives: { label: "Alternatives", emoji: "🏢", color: "bg-purple-100 text-purple-800" },
  cash: { label: "Cash", emoji: "💵", color: "bg-slate-100 text-slate-800" },
  cryptocurrency: { label: "Crypto", emoji: "₿", color: "bg-orange-100 text-orange-800" },
};

// Time horizon display configuration
const timeHorizonDisplay: Record<TimeHorizon, { label: string; description: string }> = {
  short: { label: "Short-term", description: "0-1 years" },
  medium: { label: "Medium-term", description: "1-5 years" },
  long: { label: "Long-term", description: "5+ years" },
};

interface InvestmentDecisionProps {
  options: InvestmentOption[];
  selectedInvestment: string | null;
  onInvestmentSelect: (optionId: string) => void;
  onConfirm: () => void;
  onBack: () => void;
  onCourageXpEarned?: (xp: number, label: string) => void;
  selectedCoach?: AICoach;
}

export function InvestmentDecision({
  options,
  selectedInvestment,
  onInvestmentSelect,
  onConfirm,
  onBack,
  onCourageXpEarned,
  selectedCoach,
}: InvestmentDecisionProps) {
  const [showRiskPreview, setShowRiskPreview] = useState(false);
  const [courageNotification, setCourageNotification] = useState<{
    xp: number;
    label: string;
  } | null>(null);
  
  // Track which card is showing floating XP
  const [floatingXpCard, setFloatingXpCard] = useState<string | null>(null);

  const selectedOption = selectedInvestment
    ? options.find((o) => o.id === selectedInvestment)
    : null;
    
  // Handle card selection with floating XP feedback
  const handleCardSelect = useCallback((optionId: string) => {
    onInvestmentSelect(optionId);
    setFloatingXpCard(optionId);
  }, [onInvestmentSelect]);

  const getRiskBadgeVariant = (risk: string) => {
    switch (risk.toLowerCase()) {
      case "extreme":
        return "destructive" as const;
      case "high":
        return "secondary" as const;
      case "medium":
        return "outline" as const;
      case "low":
        return "default" as const;
      case "none":
        return "default" as const;
      default:
        return "default" as const;
    }
  };


  const handleConfirmClick = () => {
    if (selectedOption) {
      setShowRiskPreview(true);
    }
  };

  const handleRiskPreviewConfirm = () => {
    if (selectedOption) {
      // Award courage XP
      const reward = getCourageXpForRisk(selectedOption.risk);
      setCourageNotification(reward);
      
      if (onCourageXpEarned) {
        onCourageXpEarned(reward.xp, reward.label);
      }
      
      // Delay the actual confirm to show notification
      setTimeout(() => {
        setShowRiskPreview(false);
        onConfirm();
      }, 800);
    }
  };

  const handleRiskPreviewCancel = () => {
    setShowRiskPreview(false);
  };

  // Show risk preview when user confirms
  if (showRiskPreview && selectedOption) {
    return (
      <div className="space-y-4">
        {/* Courage XP Notification */}
        {courageNotification && (
          <CourageXpNotification
            xp={courageNotification.xp}
            label={courageNotification.label}
            onComplete={() => setCourageNotification(null)}
          />
        )}
        
        <RiskPreviewCard
          option={selectedOption}
          onConfirm={handleRiskPreviewConfirm}
          onCancel={handleRiskPreviewCancel}
          onCourageXpEarned={onCourageXpEarned}
          coach={selectedCoach}
        />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Courage XP Notification */}
      {courageNotification && (
        <CourageXpNotification
          xp={courageNotification.xp}
          label={courageNotification.label}
          onComplete={() => setCourageNotification(null)}
        />
      )}

      {/* Philosophy-Driven Conviction Banner */}
      <div className="bg-gradient-to-r from-violet-500/15 via-purple-500/10 to-indigo-500/15 border border-violet-500/30 rounded-xl p-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <div className="p-2 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 shadow-lg flex-shrink-0">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-bold text-violet-700 dark:text-violet-300 mb-1">
              High Conviction Moment 💎
            </p>
            <p className="text-xs text-violet-600/80 dark:text-violet-400/80 leading-relaxed">
              Quick failures teach more than slow indecision. Every bold choice earns Courage XP—even the "wrong" ones build wisdom that lasts generations.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
        {options.map((option) => {
          const courageReward = getCourageXpForRisk(option.risk);
          const isSelected = selectedInvestment === option.id;
          const showFloating = floatingXpCard === option.id;
          const isHighConviction = option.risk.toLowerCase() === "high" || option.risk.toLowerCase() === "extreme";
          
          return (
            <Card
              key={option.id}
              className={`cursor-pointer transition-all duration-200 relative touch-manipulation active:scale-[0.98] ${
                isSelected
                  ? "border-2 border-violet-500 bg-violet-50/50 dark:bg-violet-950/30 shadow-lg shadow-violet-500/20 ring-2 ring-violet-500/20"
                  : "hover:shadow-md hover:border-gray-300"
              }`}
              onClick={() => handleCardSelect(option.id)}
            >
              {/* High Conviction Badge */}
              {isHighConviction && (
                <div className="absolute -top-2 -right-2 z-10">
                  <span className="px-2 py-0.5 text-[9px] font-bold bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full shadow-lg uppercase tracking-wide">
                    Bold Move
                  </span>
                </div>
              )}
              
              {/* Floating XP on selection */}
              <InlineFloatingXp
                show={showFloating}
                amount={courageReward.xp}
                type="courage"
                onComplete={() => setFloatingXpCard(null)}
                className="z-10"
              />
              
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-bold text-base text-gray-900 dark:text-white leading-tight">{option.name}</h4>
                      <Badge 
                        variant={getRiskBadgeVariant(option.risk)}
                        className="flex-shrink-0 text-[10px] sm:text-xs"
                      >
                        {option.risk}
                      </Badge>
                    </div>
                    
                    {/* Courage XP Preview - Emphasized */}
                    <div className={`flex items-center gap-1.5 text-xs font-semibold transition-colors ${
                      isSelected ? "text-violet-600 dark:text-violet-400" : "text-amber-600 dark:text-amber-500"
                    }`}>
                      <Sparkles className={`h-3.5 w-3.5 ${isSelected ? "animate-pulse" : ""}`} />
                      <span>+{courageReward.xp} Courage XP for trying</span>
                    </div>
                    
                    {/* Asset Class & Time Horizon Badges - Mobile optimized */}
                    <div className="flex flex-wrap gap-1.5">
                      {option.assetClass && (
                        <Badge className={`text-[10px] sm:text-xs ${assetClassDisplay[option.assetClass].color}`}>
                          {assetClassDisplay[option.assetClass].emoji} {assetClassDisplay[option.assetClass].label}
                        </Badge>
                      )}
                      {option.timeHorizon && (
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Badge variant="outline" className="text-[10px] sm:text-xs cursor-help">
                              <Clock className="h-3 w-3 mr-1" />
                              {timeHorizonDisplay[option.timeHorizon].label}
                            </Badge>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="text-xs">
                              <strong>Generational thinking:</strong> {timeHorizonDisplay[option.timeHorizon].description}
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      )}
                      {option.foAllocationRange && (
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Badge variant="outline" className="text-[10px] sm:text-xs cursor-help bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300">
                              <TrendingUp className="h-3 w-3 mr-1" />
                              FO: {option.foAllocationRange}
                            </Badge>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="text-xs">
                              <strong>Family Office allocation:</strong> {option.foAllocationRange} — wisdom that spans generations
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      )}
                    </div>
                    
                    {/* Investment Insight - Tap to reveal */}
                    <div className="flex items-center justify-between">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button className="flex items-center gap-1 text-xs text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 transition-colors">
                            <InfoIcon className="h-3.5 w-3.5" />
                            <span className="underline decoration-dotted">Discipline insight</span>
                          </button>
                        </TooltipTrigger>
                        <TooltipContent className="max-w-xs">
                          <p className="text-xs">{option.investmentInsight}</p>
                          {option.riskReturnProfile && (
                            <p className="text-xs mt-1 pt-1 border-t border-slate-200 dark:border-slate-700">
                              <strong>Historical volatility:</strong> {option.riskReturnProfile.historicalVolatility}
                            </p>
                          )}
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  </div>
                  
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {option.description}
                  </p>
                  
                  <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-gray-800">
                    <div className="flex items-center gap-2 text-sm font-medium">
                      <BarChart3 className="h-4 w-4 text-indigo-500" />
                      <span className="text-gray-700 dark:text-gray-300">{option.expectedReturn}</span>
                    </div>
                    {isSelected && (
                      <span className="text-xs font-bold text-violet-600 dark:text-violet-400 animate-pulse">
                        Selected ✓
                      </span>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Action Buttons - Mobile optimized */}
      <div className="flex flex-col sm:flex-row gap-3 pt-2">
        <Button
          onClick={handleConfirmClick}
          disabled={!selectedInvestment}
          className="flex-1 min-h-[52px] font-bold text-base bg-gradient-to-r from-indigo-500 via-violet-500 to-purple-500 hover:from-indigo-600 hover:via-violet-600 hover:to-purple-600 shadow-lg shadow-violet-500/20 touch-manipulation active:scale-[0.98] disabled:opacity-50"
        >
          <DollarSign className="h-5 w-5 mr-2" />
          Commit with Conviction 💎
        </Button>
        <Button 
          variant="outline" 
          onClick={onBack}
          className="min-h-[48px] touch-manipulation active:scale-[0.98]"
        >
          Reconsider Strategy
        </Button>
      </div>
      
      {/* Learning Philosophy Footer */}
      <div className="text-center pt-2">
        <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 italic">
          "The best investors make decisions quickly and learn from outcomes faster."
        </p>
      </div>
    </div>
  );
}
