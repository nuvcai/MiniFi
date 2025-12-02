/**
 * Library Page - Wealth Wisdom
 * Minimalist Apple-inspired design
 */

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ChevronRight } from "lucide-react";
import { DailyWisdom } from "@/components/library/DailyWisdom";
import { WisdomLibrary } from "@/components/library/WisdomLibrary";

export default function LibraryPage() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      {/* Subtle gradient */}
      <div className="fixed inset-0 bg-gradient-to-b from-amber-950/5 via-transparent to-indigo-950/10 pointer-events-none" />
      
      <div className="relative">
        {/* Navigation */}
        <nav className={`container mx-auto px-6 py-6 transition-all duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
          <div className="flex items-center justify-between">
            <Link 
              href="/"
              className="flex items-center gap-2 text-white/50 hover:text-white/90 transition-colors group"
            >
              <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              <span className="text-sm">Back</span>
            </Link>
            
            <div className="flex items-center gap-3">
              <Image
                src="/favicon.png"
                alt="Mini.Fi"
                width={32}
                height={32}
                className="rounded-lg"
              />
              <span className="text-white/70 font-medium">Library</span>
            </div>
            
            <Link 
              href="/timeline"
              className="text-sm px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/70 hover:bg-white/10 transition-all"
            >
              Play
            </Link>
          </div>
        </nav>

        <main className="container mx-auto px-6">
          {/* Hero */}
          <div className={`max-w-2xl mx-auto pt-12 pb-16 text-center transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Wealth Wisdom
            </h1>
            <p className="text-lg text-white/50 leading-relaxed">
              Timeless insights from history's greatest investors.
              Learn the principles that built fortunes.
            </p>
          </div>

          {/* Daily Wisdom - Featured */}
          <div className={`max-w-2xl mx-auto pb-16 transition-all duration-1000 delay-200 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
            <DailyWisdom />
          </div>
          
          {/* Main Library */}
          <div className={`pb-16 transition-all duration-1000 delay-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
            <WisdomLibrary />
          </div>

          {/* CTA */}
          <div className={`max-w-xl mx-auto pb-24 text-center transition-all duration-1000 delay-400 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
            <p className="text-white/40 mb-6">Ready to apply this wisdom?</p>
            <Link href="/timeline">
              <button className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 hover:bg-indigo-500/20 transition-all">
                Start a mission
                <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t border-white/5">
          <div className="container mx-auto px-6 py-8">
            <div className="flex items-center justify-center gap-6 text-sm text-white/30">
              <span>© 2025 NUVC.AI</span>
              <Link href="/" className="hover:text-white/60 transition-colors">Home</Link>
              <Link href="/support" className="hover:text-white/60 transition-colors">Support</Link>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
