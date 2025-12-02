"use client";

import React, { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RefreshCw, Bookmark, Sparkles } from "lucide-react";
import {
  wealthPillars,
  investorWisdom,
  hopeMessages,
  foPrinciples,
  getRandomHopeMessage,
  getRandomInvestorWisdom
} from "@/components/data/wealthWisdom";

type WisdomType = "pillar" | "investor" | "hope" | "principle";

interface DailyWisdomContent {
  type: WisdomType;
  title: string;
  content: string;
  source?: string;
  forTeens?: string;
}

function getDailyWisdom(): DailyWisdomContent {
  const today = new Date();
  const dayOfYear = Math.floor(
    (today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 
    (1000 * 60 * 60 * 24)
  );
  
  const types: WisdomType[] = ["pillar", "investor", "hope", "principle"];
  const typeIndex = dayOfYear % types.length;
  const type = types[typeIndex];
  
  switch (type) {
    case "pillar": {
      const pillar = wealthPillars[dayOfYear % wealthPillars.length];
      return {
        type: "pillar",
        title: pillar.name,
        content: pillar.foWisdom,
        forTeens: pillar.forTeens
      };
    }
    case "investor": {
      const investor = investorWisdom[dayOfYear % investorWisdom.length];
      return {
        type: "investor",
        title: investor.investor,
        content: `"${investor.quote}"`,
        source: investor.era,
        forTeens: investor.forTeens
      };
    }
    case "hope": {
      const hope = hopeMessages[dayOfYear % hopeMessages.length];
      return {
        type: "hope",
        title: hope.title,
        content: hope.message,
        forTeens: hope.callToAction
      };
    }
    case "principle": {
      const principle = foPrinciples[dayOfYear % foPrinciples.length];
      return {
        type: "principle",
        title: `Principle #${principle.number}`,
        content: principle.principle,
        forTeens: principle.howTeensCanApplyIt
      };
    }
  }
}

function getRandomWisdom(): DailyWisdomContent {
  const types: WisdomType[] = ["pillar", "investor", "hope", "principle"];
  const type = types[Math.floor(Math.random() * types.length)];
  
  switch (type) {
    case "pillar": {
      const pillar = wealthPillars[Math.floor(Math.random() * wealthPillars.length)];
      return {
        type: "pillar",
        title: pillar.name,
        content: pillar.foWisdom,
        forTeens: pillar.forTeens
      };
    }
    case "investor": {
      const investor = getRandomInvestorWisdom();
      return {
        type: "investor",
        title: investor.investor,
        content: `"${investor.quote}"`,
        source: investor.era,
        forTeens: investor.forTeens
      };
    }
    case "hope": {
      const hope = getRandomHopeMessage();
      return {
        type: "hope",
        title: hope.title,
        content: hope.message,
        forTeens: hope.callToAction
      };
    }
    case "principle": {
      const principle = foPrinciples[Math.floor(Math.random() * foPrinciples.length)];
      return {
        type: "principle",
        title: `Principle #${principle.number}`,
        content: principle.principle,
        forTeens: principle.howTeensCanApplyIt
      };
    }
  }
}

const typeStyles = {
  pillar: {
    bg: "from-amber-50 to-orange-50",
    border: "border-amber-200",
    badge: "bg-amber-100 text-amber-700 border-amber-200",
    accent: "text-amber-600"
  },
  investor: {
    bg: "from-violet-50 to-purple-50",
    border: "border-violet-200",
    badge: "bg-violet-100 text-violet-700 border-violet-200",
    accent: "text-violet-600"
  },
  hope: {
    bg: "from-rose-50 to-pink-50",
    border: "border-rose-200",
    badge: "bg-rose-100 text-rose-700 border-rose-200",
    accent: "text-rose-600"
  },
  principle: {
    bg: "from-indigo-50 to-blue-50",
    border: "border-indigo-200",
    badge: "bg-indigo-100 text-indigo-700 border-indigo-200",
    accent: "text-indigo-600"
  }
};

const typeLabels = {
  pillar: "💰 Wealth Pillar",
  investor: "🏆 Investor Wisdom",
  hope: "✨ Daily Inspiration",
  principle: "💡 Principle"
};

interface DailyWisdomProps {
  showControls?: boolean;
  compact?: boolean;
}

export function DailyWisdom({ showControls = true, compact = false }: DailyWisdomProps) {
  const [wisdom, setWisdom] = useState<DailyWisdomContent | null>(null);
  const [isBookmarked, setIsBookmarked] = useState(false);
  
  useEffect(() => {
    setWisdom(getDailyWisdom());
  }, []);
  
  const refreshWisdom = () => {
    setWisdom(getRandomWisdom());
    setIsBookmarked(false);
  };
  
  if (!wisdom) return null;
  
  const style = typeStyles[wisdom.type];
  
  return (
    <div className={`rounded-2xl bg-gradient-to-br ${style.bg} border ${style.border} shadow-lg ${compact ? "p-4" : "p-6"}`}>
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <Badge className={`${style.badge} mb-3 text-xs font-semibold`}>
            {typeLabels[wisdom.type]}
          </Badge>
          <h3 className="text-lg font-bold text-gray-900">{wisdom.title}</h3>
          {wisdom.source && (
            <p className="text-gray-500 text-sm mt-1">{wisdom.source}</p>
          )}
        </div>
        {showControls && (
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-400 hover:text-gray-600 hover:bg-white/50 h-8 w-8 p-0"
              onClick={refreshWisdom}
            >
              <RefreshCw className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className={`text-gray-400 hover:text-gray-600 hover:bg-white/50 h-8 w-8 p-0 ${isBookmarked ? "text-amber-500 bg-amber-50" : ""}`}
              onClick={() => setIsBookmarked(!isBookmarked)}
            >
              <Bookmark className={`h-4 w-4 ${isBookmarked ? "fill-current" : ""}`} />
            </Button>
          </div>
        )}
      </div>
      
      {/* Content */}
      <p className={`text-gray-700 ${wisdom.type === "investor" ? "italic text-lg" : ""} ${compact ? "text-sm" : ""} leading-relaxed`}>
        {wisdom.content}
      </p>
      
      {/* For Teens */}
      {wisdom.forTeens && !compact && (
        <div className="mt-4 pt-4 border-t border-gray-200/50">
          <p className="text-sm text-gray-600">
            <span className={`font-semibold ${style.accent}`}>🎯 Takeaway: </span>
            {wisdom.forTeens}
          </p>
        </div>
      )}
    </div>
  );
}

export default DailyWisdom;
