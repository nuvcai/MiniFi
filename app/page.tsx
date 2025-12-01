/**
 * ╔══════════════════════════════════════════════════════════════════════════════╗
 * ║   MiniFi - Financial Literacy Platform (MVP - Hackathon Edition)            ║
 * ║   ✨ Vibe-coded by Tick.AI for AWS AI Hackathon 2025 ✨                      ║
 * ║   Copyright (c) 2025 NUVC.AI / Tick.AI. All Rights Reserved.                ║
 * ║   PROPRIETARY - NO COMMERCIAL USE | https://nuvc.ai                         ║
 * ╚══════════════════════════════════════════════════════════════════════════════╝
 */

"use client";

import Link from "next/link";
import Image from "next/image";
import { Play } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 flex items-center justify-center">
      <div className="container mx-auto sm:px-4 py-4 sm:py-8">
        <div className="max-w-5xl mx-auto text-center space-y-6 sm:space-y-8 px-4 sm:px-0">
          {/* Game Logo and Title */}
          <div className="space-y-3 sm:space-y-4">
            <h1 className="text-4xl sm:text-6xl font-serif font-black text-primary mb-2 flex flex-col sm:flex-row items-center justify-center gap-2">
              <Image
                src="/favicon.png"
                alt="NUVC Icon"
                width={88}
                height={88}
                className="object-contain w-16 h-16 sm:w-22 sm:h-22"
              />
              <span className="leading-tight">Legacy Guardians</span>
            </h1>
            <p className="text-lg sm:text-2xl font-medium text-muted-foreground">
              Time-Warp Wealth Adventure
            </p>
          </div>

          {/* Game Description */}
          <div className="max-w-2xl mx-auto bg-card rounded-lg shadow-lg p-6 sm:p-8">
            <div className="space-y-4 sm:space-y-6">
              <h2 className="text-xl sm:text-2xl font-serif font-semibold text-foreground">
                Master Wealth Wisdom Through Time Travel
              </h2>
              <p className="text-base sm:text-lg leading-relaxed text-muted-foreground">
                Welcome to the financial history time adventure! You'll travel
                to key moments of major financial events, learn investment
                strategies with AI coaches, and experience real financial
                decisions in a risk-free environment.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6 sm:mt-8">
                <div className="text-center p-3 sm:p-4 rounded-lg hover:bg-primary/5 transition-colors">
                  <div className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary/10 mb-2 sm:mb-3">
                    <div className="h-5 w-5 sm:h-6 sm:w-6 text-primary text-lg sm:text-xl">
                      📈
                    </div>
                  </div>
                  <h3 className="font-semibold mb-1 sm:mb-2 text-sm sm:text-base text-foreground">
                    Learn Investing
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    Master risk management and asset allocation
                  </p>
                </div>

                <div className="text-center p-3 sm:p-4 rounded-lg hover:bg-secondary/5 transition-colors">
                  <div className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-secondary/10 mb-2 sm:mb-3">
                    <div className="h-5 w-5 sm:h-6 sm:w-6 text-secondary text-lg sm:text-xl">
                      📚
                    </div>
                  </div>
                  <h3 className="font-semibold mb-1 sm:mb-2 text-sm sm:text-base text-foreground">
                    Historical Insights
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    Understand the causes and effects of financial crises
                  </p>
                </div>

                <div className="text-center p-3 sm:p-4 rounded-lg hover:bg-primary/5 transition-colors">
                  <div className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary/15 mb-2 sm:mb-3">
                    <div className="h-5 w-5 sm:h-6 sm:w-6 text-primary text-lg sm:text-xl">
                      🤖
                    </div>
                  </div>
                  <h3 className="font-semibold mb-1 sm:mb-2 text-sm sm:text-base text-foreground">
                    AI Coaches
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    Professional coaches provide personalized guidance
                  </p>
                </div>

                <div className="text-center p-3 sm:p-4 rounded-lg hover:bg-accent/10 transition-colors">
                  <div className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-accent/20 mb-2 sm:mb-3">
                    <div className="h-5 w-5 sm:h-6 sm:w-6 text-accent-foreground text-lg sm:text-xl">
                      🎁
                    </div>
                  </div>
                  <h3 className="font-semibold mb-1 sm:mb-2 text-sm sm:text-base text-foreground">
                    Real Rewards
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    Exchange XP for gift cards from partner brands
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Start Game Button */}
          <div className="text-center pt-6 sm:pt-8">
            <Link href="/timeline">
              <button className="bg-primary hover:bg-primary/90 text-primary-foreground text-base sm:text-lg px-8 sm:px-10 py-3 sm:py-4 font-semibold rounded-lg transition-colors">
                <Play className="inline-block h-5 w-5 sm:h-6 sm:w-6 mr-2 sm:mr-3" />
                Start Time Adventure
              </button>
            </Link>
            <p className="text-xs sm:text-sm text-muted-foreground mt-3 sm:mt-4">
              Ready to travel through time and become a wealth guardian?
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
