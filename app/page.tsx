/**
 * Mini.Fi - Premium Financial Literacy Game
 * Minimalistic, Apple-inspired design
 * © 2025 NUVC.AI. All Rights Reserved.
 */

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Play, ChevronRight, ArrowRight } from "lucide-react";
import { aiCoaches } from "@/components/data/coaches";

export default function HomePage() {
  const [selectedCoachIndex, setSelectedCoachIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    const interval = setInterval(() => {
      setSelectedCoachIndex((prev) => (prev + 1) % aiCoaches.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const selectedCoach = aiCoaches[selectedCoachIndex];

  return (
    <div className="min-h-screen bg-[#0a0a0f] overflow-hidden">
      {/* Subtle gradient background */}
      <div className="fixed inset-0 bg-gradient-to-b from-indigo-950/20 via-transparent to-violet-950/10 pointer-events-none" />
      
      <div className="relative">
        {/* Navigation */}
        <nav className={`container mx-auto px-6 py-6 transition-all duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Image
                src="/favicon.png"
                alt="Mini.Fi"
                width={36}
                height={36}
                className="rounded-xl"
              />
              <span className="text-lg font-semibold text-white/90">Mini.Fi</span>
            </div>
            
            <div className="flex items-center gap-6">
              <Link href="/library" className="text-sm text-white/50 hover:text-white/90 transition-colors">
                Learn
              </Link>
              <Link href="/support" className="text-sm text-white/50 hover:text-white/90 transition-colors">
                Support
              </Link>
              <Link 
                href="/timeline"
                className="text-sm px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/80 hover:bg-white/10 transition-all"
              >
                Play Now
              </Link>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <main className="container mx-auto px-6">
          <div className={`max-w-4xl mx-auto pt-20 pb-32 text-center transition-all duration-1000 delay-100 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 mb-8">
              <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
              <span className="text-sm text-indigo-300/90">Free • No Sign-up Required</span>
            </div>

            {/* Main headline */}
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight mb-6">
              <span className="text-white">Learn to invest.</span>
              <br />
              <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-purple-400 bg-clip-text text-transparent">
                Through play.
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg sm:text-xl text-white/50 max-w-2xl mx-auto mb-12 leading-relaxed">
              Travel through history's greatest financial moments. 
              Make decisions. Learn what works. Build real-world skills.
            </p>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <Link href="/timeline">
                <button className="group flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-500 to-violet-500 text-white font-semibold text-lg shadow-2xl shadow-indigo-500/20 hover:shadow-indigo-500/30 hover:scale-[1.02] transition-all duration-300">
                  <Play className="h-5 w-5" />
                  Start Playing
                  <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
              <Link 
                href="/library"
                className="flex items-center gap-2 px-6 py-4 text-white/60 hover:text-white/90 transition-colors"
              >
                Explore the library
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {/* Coach preview - minimal */}
            <div className={`transition-all duration-1000 delay-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
              <p className="text-sm text-white/30 mb-6">Choose your AI coach</p>
              <div className="flex justify-center gap-4">
                {aiCoaches.map((coach, index) => (
                  <button
                    key={coach.id}
                    onClick={() => setSelectedCoachIndex(index)}
                    className={`relative transition-all duration-500 ${
                      index === selectedCoachIndex 
                        ? 'scale-110 ring-2 ring-indigo-500/50 ring-offset-4 ring-offset-[#0a0a0f]' 
                        : 'opacity-40 hover:opacity-70 grayscale hover:grayscale-0'
                    }`}
                  >
                    <Image
                      src={coach.avatar}
                      alt={coach.name}
                      width={56}
                      height={56}
                      className="rounded-full"
                    />
                  </button>
                ))}
              </div>
              <p className="mt-4 text-sm text-white/50">
                <span className="text-indigo-400">{selectedCoach.name}</span>
                {" • "}
                {selectedCoach.personality}
              </p>
            </div>
          </div>

          {/* Features - Ultra minimal */}
          <div className={`max-w-5xl mx-auto pb-32 transition-all duration-1000 delay-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="grid md:grid-cols-3 gap-px bg-white/5 rounded-3xl overflow-hidden">
              
              <div className="bg-[#0a0a0f] p-10">
                <div className="text-4xl font-bold text-white mb-2">6</div>
                <div className="text-white/90 font-medium mb-2">Historic Missions</div>
                <p className="text-sm text-white/40 leading-relaxed">
                  From Japan 1990 to 2008 crisis. Experience real market events.
                </p>
              </div>
              
              <div className="bg-[#0a0a0f] p-10">
                <div className="text-4xl font-bold text-white mb-2">4</div>
                <div className="text-white/90 font-medium mb-2">AI Coaches</div>
                <p className="text-sm text-white/40 leading-relaxed">
                  Each with unique strategies. Find the one that matches you.
                </p>
              </div>
              
              <div className="bg-[#0a0a0f] p-10">
                <div className="text-4xl font-bold text-white mb-2">∞</div>
                <div className="text-white/90 font-medium mb-2">Risk-Free Learning</div>
                <p className="text-sm text-white/40 leading-relaxed">
                  No real money. Learn from mistakes without consequences.
                </p>
              </div>
              
            </div>
          </div>

          {/* Mission statement - Clean and focused */}
          <div className={`max-w-3xl mx-auto text-center pb-32 transition-all duration-1000 delay-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
            <p className="text-2xl sm:text-3xl font-light text-white/70 leading-relaxed">
              "70% of Australian teens have no financial education. 
              <span className="text-white font-normal"> We're changing that.</span>"
            </p>
            <div className="flex items-center justify-center gap-3 mt-8">
              <Image
                src="/nuvc-logo.png"
                alt="NUVC.AI"
                width={32}
                height={32}
                className="rounded-lg opacity-60"
              />
              <span className="text-sm text-white/40">A NUVC.AI initiative</span>
            </div>
          </div>

        </main>

        {/* Footer - Minimal */}
        <footer className="border-t border-white/5">
          <div className="container mx-auto px-6 py-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-6 text-sm text-white/30">
                <span>© 2025 NUVC.AI</span>
                <a href="https://nuvc.ai" target="_blank" rel="noopener noreferrer" className="hover:text-white/60 transition-colors">
                  About
                </a>
                <Link href="/support" className="hover:text-white/60 transition-colors">
                  Support
                </Link>
              </div>
              <div className="flex items-center gap-4">
                <a 
                  href="https://github.com/nuvcai/MiniFi" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-white/30 hover:text-white/60 transition-colors"
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
