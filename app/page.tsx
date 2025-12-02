/**
 * Mini.Fi - Premium Financial Literacy Game
 * Where History Meets Wealth Wisdom
 * © 2025 NUVC.AI. All Rights Reserved.
 */

"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  Play, ChevronRight, ArrowRight, BookOpen, Target, 
  Shield, TrendingUp, Sparkles, Users, Clock, Award,
  GraduationCap, Lightbulb, Building2, History
} from "lucide-react";
import { aiCoaches } from "@/components/data/coaches";
import { wealthEras, foPrinciples, investorWisdom } from "@/components/data/wealthWisdom";

export default function HomePage() {
  const [selectedCoachIndex, setSelectedCoachIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeEraIndex, setActiveEraIndex] = useState(0);
  const [activePrincipleIndex, setActivePrincipleIndex] = useState(0);
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});

  useEffect(() => {
    setIsLoaded(true);
    const coachInterval = setInterval(() => {
      setSelectedCoachIndex((prev) => (prev + 1) % aiCoaches.length);
    }, 4000);
    
    const eraInterval = setInterval(() => {
      setActiveEraIndex((prev) => (prev + 1) % wealthEras.length);
    }, 5000);
    
    return () => {
      clearInterval(coachInterval);
      clearInterval(eraInterval);
    };
  }, []);

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set([...prev, entry.target.id]));
          }
        });
      },
      { threshold: 0.1, rootMargin: "-50px" }
    );

    Object.values(sectionRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const selectedCoach = aiCoaches[selectedCoachIndex];
  const activeEra = wealthEras[activeEraIndex];

  const stats = [
    { value: "70%", label: "of Australian teens lack financial education" },
    { value: "250+", label: "years of wealth wisdom curated" },
    { value: "6", label: "historic market moments to master" },
    { value: "4", label: "Family Office-trained AI coaches" },
  ];

  const differentiators = [
    {
      icon: <History className="h-6 w-6" />,
      title: "Learn from History",
      description: "Experience Japan's 1990 bubble, the 2008 crash, and more. Real events, real lessons.",
      gradient: "from-amber-500 to-orange-500"
    },
    {
      icon: <Building2 className="h-6 w-6" />,
      title: "Family Office Wisdom",
      description: "Strategies used by wealthy families for generations - now accessible to everyone.",
      gradient: "from-indigo-500 to-violet-500"
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Risk-Free Learning",
      description: "Make decisions with virtual money. Learn from mistakes without real consequences.",
      gradient: "from-emerald-500 to-teal-500"
    },
    {
      icon: <Sparkles className="h-6 w-6" />,
      title: "AI-Powered Coaching",
      description: "Four unique AI mentors teach different investment philosophies - find your style.",
      gradient: "from-purple-500 to-pink-500"
    }
  ];

  return (
    <div className="min-h-screen bg-[#050507] overflow-hidden">
      {/* Animated background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/20 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-[500px] bg-gradient-to-t from-violet-950/30 to-transparent" />
        {/* Floating orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-violet-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>
      
      <div className="relative">
        {/* Navigation */}
        <nav className={`container mx-auto px-6 py-6 transition-all duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Image
                src="/favicon.png"
                alt="Mini.Fi"
                width={40}
                height={40}
                className="rounded-xl"
              />
              <span className="text-xl font-bold text-white/90 tracking-tight">Mini.Fi</span>
            </div>
            
            <div className="flex items-center gap-6">
              <Link href="/library" className="text-sm text-white/50 hover:text-white/90 transition-colors hidden sm:block">
                Learn
              </Link>
              <Link href="/support" className="text-sm text-white/50 hover:text-white/90 transition-colors hidden sm:block">
                Support
              </Link>
              <Link 
                href="/timeline"
                className="group text-sm px-5 py-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 text-white font-medium hover:shadow-lg hover:shadow-indigo-500/25 hover:scale-105 transition-all duration-300"
              >
                Start Free
                <ChevronRight className="inline-block h-4 w-4 ml-1 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>
        </nav>

        {/* Hero Section - Mission First */}
        <main className="container mx-auto px-6">
          <div className={`max-w-5xl mx-auto pt-12 pb-20 text-center transition-all duration-1000 delay-100 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            
            {/* Mission Statement - HERO FOCUS */}
            <div className="relative mb-12">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-full max-w-3xl h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />
              </div>
              <div className="relative inline-flex items-center gap-3 px-6 py-3 rounded-full bg-red-500/10 border border-red-500/30">
                <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
                <span className="text-sm font-medium text-red-300/90">The Problem We're Solving</span>
              </div>
            </div>

            {/* The Big Mission Quote */}
            <div className="relative mb-16">
              <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500/5 via-violet-500/5 to-purple-500/5 rounded-3xl blur-xl" />
              <blockquote className="relative">
                <p className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
                  <span className="text-white/90">"</span>
                  <span className="bg-gradient-to-r from-amber-300 via-orange-300 to-red-300 bg-clip-text text-transparent">70%</span>
                  <span className="text-white/80"> of Australian teens have </span>
                  <span className="text-white/90">no financial education.</span>
                </p>
                <p className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mt-4 tracking-tight">
                  <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-purple-400 bg-clip-text text-transparent">
                    We're changing that.
                  </span>
                  <span className="text-white/90">"</span>
                </p>
              </blockquote>
            </div>

            {/* Tagline */}
            <p className="text-lg sm:text-xl text-white/70 max-w-2xl mx-auto mb-10 leading-relaxed">
              Not just another finance app. Mini.Fi brings <span className="text-white font-medium">250 years of wealth wisdom</span> from 
              history's greatest investors and <span className="text-white font-medium">Family Office strategies</span> — 
              all through an immersive game experience.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
              <Link href="/timeline">
                <button className="group flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-500 via-violet-500 to-purple-500 text-white font-semibold text-lg shadow-2xl shadow-violet-500/20 hover:shadow-violet-500/40 hover:scale-[1.02] transition-all duration-300">
                  <Play className="h-5 w-5" />
                  Play Free Now
                  <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
              <div className="flex items-center gap-2 text-white/60 text-sm">
                <Shield className="h-4 w-4 text-emerald-400" />
                No sign-up required • 100% free
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {stats.map((stat, index) => (
                <div 
                  key={index}
                  className={`p-6 rounded-2xl bg-white/[0.02] border border-white/5 transition-all duration-500 delay-${index * 100} ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                >
                  <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-white/40 leading-tight">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* What Makes Us Different */}
          <section 
            id="differentiators"
            ref={(el) => { sectionRefs.current['differentiators'] = el; }}
            className={`max-w-6xl mx-auto py-24 transition-all duration-1000 ${visibleSections.has('differentiators') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
          >
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 text-sm font-medium mb-6">
                Why Mini.Fi is Different
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 tracking-tight">
                Not Just Another App
              </h2>
              <p className="text-lg text-white/50 max-w-2xl mx-auto">
                Curated from the wisdom of history's greatest market moments and the strategies 
                used by Family Offices to preserve wealth across generations.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {differentiators.map((item, index) => (
                <div 
                  key={index}
                  className="group relative p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all duration-500 hover:-translate-y-1"
                >
                  <div className={`inline-flex p-3 rounded-2xl bg-gradient-to-r ${item.gradient} mb-6`}>
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">{item.title}</h3>
                  <p className="text-white/50 leading-relaxed">{item.description}</p>
                  <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${item.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                </div>
              ))}
            </div>
          </section>

          {/* Historic Eras Timeline */}
          <section 
            id="eras"
            ref={(el) => { sectionRefs.current['eras'] = el; }}
            className={`max-w-6xl mx-auto py-24 transition-all duration-1000 ${visibleSections.has('eras') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
          >
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-sm font-medium mb-6">
                <History className="inline-block h-4 w-4 mr-2" />
                Wealth Through History
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 tracking-tight">
                Every Generation Has Their Moment
              </h2>
              <p className="text-lg text-white/50 max-w-2xl mx-auto">
                From the Industrial Revolution to AI — learn how wealth was built across 250 years of history.
              </p>
            </div>

            {/* Era Showcase */}
            <div className="relative">
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                {/* Era Selector */}
                <div className="space-y-3">
                  {wealthEras.slice(0, 5).map((era, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveEraIndex(index)}
                      className={`w-full text-left p-4 rounded-2xl transition-all duration-300 ${
                        index === activeEraIndex
                          ? 'bg-gradient-to-r from-amber-500/20 to-orange-500/10 border border-amber-500/30'
                          : 'bg-white/[0.02] border border-white/5 hover:bg-white/[0.04]'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <span className="text-3xl">{era.emoji}</span>
                        <div>
                          <div className={`font-semibold ${index === activeEraIndex ? 'text-amber-300' : 'text-white/80'}`}>
                            {era.era}
                          </div>
                          <div className="text-sm text-white/40">{era.period}</div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>

                {/* Active Era Details */}
                <div className="relative p-8 rounded-3xl bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-transparent border border-amber-500/20">
                  <div className="absolute top-4 right-4 text-6xl opacity-20">{activeEra.emoji}</div>
                  <h3 className="text-2xl font-bold text-white mb-2">{activeEra.era}</h3>
                  <p className="text-amber-400/80 text-sm mb-4">{activeEra.transformativeTrend}</p>
                  <p className="text-white/60 mb-6 leading-relaxed">{activeEra.whatChanged}</p>
                  
                  <div className="space-y-3">
                    <div className="text-sm font-medium text-white/40 uppercase tracking-wider">Wealth Creators</div>
                    {activeEra.wealthCreators.slice(0, 2).map((creator, i) => (
                      <div key={i} className="flex items-start gap-2 text-white/70 text-sm">
                        <Award className="h-4 w-4 text-amber-400 mt-0.5 flex-shrink-0" />
                        <span>{creator}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 p-4 rounded-xl bg-black/30 border border-amber-500/10">
                    <p className="text-sm text-amber-300/80 leading-relaxed">
                      {activeEra.forTeens}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* AI Coaches Section */}
          <section 
            id="coaches"
            ref={(el) => { sectionRefs.current['coaches'] = el; }}
            className={`max-w-6xl mx-auto py-24 transition-all duration-1000 ${visibleSections.has('coaches') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
          >
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-sm font-medium mb-6">
                <Users className="inline-block h-4 w-4 mr-2" />
                Your AI Mentors
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 tracking-tight">
                Learn from Family Office Strategies
              </h2>
              <p className="text-lg text-white/50 max-w-2xl mx-auto">
                Four AI coaches, each trained on different investment philosophies used by the world's wealthiest families.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {aiCoaches.map((coach, index) => (
                <div 
                  key={coach.id}
                  onClick={() => setSelectedCoachIndex(index)}
                  className={`relative p-6 rounded-3xl cursor-pointer transition-all duration-500 ${
                    index === selectedCoachIndex
                      ? 'bg-gradient-to-br from-indigo-500/20 via-violet-500/10 to-transparent border border-indigo-500/30 scale-[1.02]'
                      : 'bg-white/[0.02] border border-white/5 hover:bg-white/[0.04]'
                  }`}
                >
                  <div className="flex flex-col items-center text-center">
                    <div className={`relative mb-4 ${index === selectedCoachIndex ? 'scale-110' : ''} transition-transform duration-500`}>
                      <Image
                        src={coach.avatar}
                        alt={coach.name}
                        width={80}
                        height={80}
                        className="rounded-full"
                      />
                      {index === selectedCoachIndex && (
                        <div className="absolute inset-0 rounded-full ring-2 ring-indigo-500 ring-offset-2 ring-offset-[#050507] animate-pulse" />
                      )}
                    </div>
                    <h3 className="font-semibold text-white mb-1">{coach.name}</h3>
                    <p className="text-sm text-indigo-400/80 mb-3">{coach.personality}</p>
                    <span className={`text-xs px-3 py-1 rounded-full ${
                      coach.riskTolerance === 'conservative' ? 'bg-blue-500/20 text-blue-300' :
                      coach.riskTolerance === 'moderate' ? 'bg-green-500/20 text-green-300' :
                      coach.riskTolerance === 'aggressive' ? 'bg-orange-500/20 text-orange-300' :
                      'bg-red-500/20 text-red-300'
                    }`}>
                      {coach.riskTolerance.charAt(0).toUpperCase() + coach.riskTolerance.slice(1)}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Selected Coach Detail */}
            <div className="mt-8 p-8 rounded-3xl bg-gradient-to-r from-indigo-500/10 via-violet-500/5 to-purple-500/10 border border-indigo-500/20">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">{selectedCoach.name}</h3>
                  <p className="text-indigo-400/80 mb-4">{selectedCoach.description}</p>
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <Target className="h-5 w-5 text-indigo-400 mt-0.5" />
                      <div>
                        <div className="text-sm font-medium text-white/60">Investment Philosophy</div>
                        <div className="text-white/80">{selectedCoach.investmentPhilosophy}</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-black/30">
                    <div className="text-sm font-medium text-white/40 mb-2">Historical Hero</div>
                    <p className="text-white/70 text-sm">{selectedCoach.historicalHero}</p>
                  </div>
                  <div className="p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/20">
                    <div className="text-sm font-medium text-indigo-300 mb-2">Favorite Quote</div>
                    <p className="text-white/80 italic text-sm">{selectedCoach.favoriteQuote}</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Family Office Principles */}
          <section 
            id="principles"
            ref={(el) => { sectionRefs.current['principles'] = el; }}
            className={`max-w-6xl mx-auto py-24 transition-all duration-1000 ${visibleSections.has('principles') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
          >
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-sm font-medium mb-6">
                <Building2 className="inline-block h-4 w-4 mr-2" />
                Family Office Secrets
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 tracking-tight">
                Wisdom of Generational Wealth
              </h2>
              <p className="text-lg text-white/50 max-w-2xl mx-auto">
                The exact principles used by Family Offices to preserve and grow wealth across generations.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {foPrinciples.map((principle, index) => (
                <div 
                  key={index}
                  className="group p-6 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-emerald-500/20 transition-all duration-500"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 flex items-center justify-center text-white font-bold">
                      {principle.number}
                    </div>
                    <h3 className="font-semibold text-white group-hover:text-emerald-300 transition-colors">{principle.principle}</h3>
                  </div>
                  <p className="text-white/50 text-sm leading-relaxed mb-4">{principle.explanation}</p>
                  <div className="p-3 rounded-xl bg-emerald-500/5 border border-emerald-500/10">
                    <div className="text-xs font-medium text-emerald-400/60 mb-1">For Teens</div>
                    <p className="text-white/60 text-sm">{principle.howTeensCanApplyIt}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Investor Wisdom Quotes */}
          <section 
            id="quotes"
            ref={(el) => { sectionRefs.current['quotes'] = el; }}
            className={`max-w-4xl mx-auto py-24 transition-all duration-1000 ${visibleSections.has('quotes') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
          >
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-sm font-medium mb-6">
                <Lightbulb className="inline-block h-4 w-4 mr-2" />
                Words of Wisdom
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 tracking-tight">
                From the World's Greatest Investors
              </h2>
            </div>

            <div className="space-y-6">
              {investorWisdom.slice(0, 3).map((wisdom, index) => (
                <div 
                  key={index}
                  className="p-8 rounded-3xl bg-gradient-to-r from-purple-500/10 via-violet-500/5 to-indigo-500/10 border border-purple-500/20"
                >
                  <blockquote className="text-xl sm:text-2xl font-medium text-white/90 mb-4 italic">
                    "{wisdom.quote}"
                  </blockquote>
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div>
                      <div className="font-semibold text-purple-300">{wisdom.investor}</div>
                      <div className="text-sm text-white/40">{wisdom.backgroundStory}</div>
                    </div>
                    <div className="text-sm text-white/50 max-w-md">
                      <span className="text-purple-400">Lesson:</span> {wisdom.lesson}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Final CTA */}
          <section 
            id="cta"
            ref={(el) => { sectionRefs.current['cta'] = el; }}
            className={`max-w-4xl mx-auto py-24 text-center transition-all duration-1000 ${visibleSections.has('cta') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
          >
            <div className="relative p-12 rounded-[40px] bg-gradient-to-br from-indigo-500/20 via-violet-500/10 to-purple-500/20 border border-indigo-500/30 overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute top-0 left-0 w-40 h-40 bg-indigo-500/20 rounded-full blur-3xl" />
              <div className="absolute bottom-0 right-0 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl" />
              
              <div className="relative">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8">
                  <GraduationCap className="h-4 w-4 text-indigo-400" />
                  <span className="text-sm text-white/70">Your financial future starts now</span>
                </div>

                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 tracking-tight">
                  Join the Next Generation
                  <br />
                  <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-purple-400 bg-clip-text text-transparent">
                    of Wealth Builders
                  </span>
                </h2>

                <p className="text-lg text-white/50 max-w-xl mx-auto mb-10">
                  Every great investor started somewhere. Today, you have access to 250 years of 
                  wealth wisdom — completely free, no sign-up required.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link href="/timeline">
                    <button className="group flex items-center gap-3 px-10 py-5 rounded-2xl bg-white text-[#050507] font-semibold text-lg hover:bg-white/90 hover:scale-[1.02] transition-all duration-300">
                      <Play className="h-5 w-5" />
                      Start Your Journey
                      <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </Link>
                  <Link 
                    href="/library"
                    className="flex items-center gap-2 px-6 py-5 text-white/70 hover:text-white transition-colors"
                  >
                    <BookOpen className="h-5 w-5" />
                    Explore Wisdom Library
                  </Link>
                </div>

                <div className="flex items-center justify-center gap-8 mt-10 text-sm text-white/40">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>5 min to start</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4" />
                    <span>100% free forever</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    <span>No account needed</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Mission Reminder */}
          <div className="max-w-3xl mx-auto text-center pb-24">
            <div className="p-8 rounded-3xl border border-white/5">
              <p className="text-xl sm:text-2xl font-light text-white/60 leading-relaxed mb-6">
                "The best time to start investing was 20 years ago.
                <br />
                <span className="text-white font-medium">The second best time is NOW.</span>"
              </p>
              <div className="flex items-center justify-center gap-3">
                <Image
                  src="/nuvc-logo.png"
                  alt="NUVC.AI"
                  width={32}
                  height={32}
                  className="rounded-lg opacity-70"
                />
                <span className="text-sm text-white/40">A NUVC.AI initiative for financial literacy</span>
              </div>
            </div>
          </div>

        </main>

        {/* Footer */}
        <footer className="border-t border-white/5 bg-black/20">
          <div className="container mx-auto px-6 py-12">
            <div className="grid md:grid-cols-4 gap-8 mb-8">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <Image
                    src="/favicon.png"
                    alt="Mini.Fi"
                    width={32}
                    height={32}
                    className="rounded-lg"
                  />
                  <span className="text-lg font-semibold text-white/90">Mini.Fi</span>
                </div>
                <p className="text-sm text-white/40 leading-relaxed">
                  Teaching the next generation of Australians to build wealth through interactive, 
                  history-based financial education.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-white/80 mb-4">Learn</h4>
                <div className="space-y-2">
                  <Link href="/timeline" className="block text-sm text-white/40 hover:text-white/70 transition-colors">Start Playing</Link>
                  <Link href="/library" className="block text-sm text-white/40 hover:text-white/70 transition-colors">Wisdom Library</Link>
                  <Link href="/competition" className="block text-sm text-white/40 hover:text-white/70 transition-colors">Competition Mode</Link>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-white/80 mb-4">Support</h4>
                <div className="space-y-2">
                  <Link href="/support" className="block text-sm text-white/40 hover:text-white/70 transition-colors">Help Center</Link>
                  <a href="mailto:support@nuvc.ai" className="block text-sm text-white/40 hover:text-white/70 transition-colors">Contact Us</a>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-white/80 mb-4">About</h4>
                <div className="space-y-2">
                  <a href="https://nuvc.ai" target="_blank" rel="noopener noreferrer" className="block text-sm text-white/40 hover:text-white/70 transition-colors">NUVC.AI</a>
                  <a href="https://github.com/nuvcai/MiniFi" target="_blank" rel="noopener noreferrer" className="block text-sm text-white/40 hover:text-white/70 transition-colors">GitHub</a>
                </div>
              </div>
            </div>
            <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-sm text-white/30">
                © 2025 NUVC.AI. All Rights Reserved. Made with ❤️ for Australian teens.
              </div>
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
        </footer>
      </div>
    </div>
  );
}
