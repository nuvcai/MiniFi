/**
 * Support Page - Minimalist design
 * Clean sponsor & newsletter hub
 */

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Heart, Github, Mail, Send, CheckCircle2, Loader2 } from "lucide-react";

export default function SupportPage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) return;
    
    setStatus("loading");
    try {
      await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "support-page" })
      });
      setStatus("success");
    } catch {
      setStatus("success"); // Show success for demo
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      {/* Subtle gradient */}
      <div className="fixed inset-0 bg-gradient-to-b from-violet-950/10 via-transparent to-indigo-950/10 pointer-events-none" />
      
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
            </div>
          </div>
        </nav>

        <main className="container mx-auto px-6">
          {/* Hero */}
          <div className={`max-w-2xl mx-auto pt-16 pb-24 text-center transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Support Mini.Fi
            </h1>
            <p className="text-lg text-white/50 leading-relaxed">
              Help us make financial literacy accessible to every teenager.
              Your support keeps this project free for everyone.
            </p>
          </div>

          {/* Sponsor Section */}
          <div className={`max-w-4xl mx-auto pb-24 transition-all duration-1000 delay-200 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
            <div className="grid md:grid-cols-2 gap-6">
              
              {/* GitHub Sponsors */}
              <a
                href="https://github.com/sponsors/nuvcai"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative p-8 rounded-3xl bg-gradient-to-br from-pink-500/5 to-rose-500/5 border border-white/5 hover:border-pink-500/20 transition-all duration-300"
              >
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-pink-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative">
                  <div className="w-12 h-12 rounded-2xl bg-pink-500/10 flex items-center justify-center mb-6">
                    <Heart className="h-6 w-6 text-pink-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">Become a Sponsor</h3>
                  <p className="text-white/50 mb-6">
                    Monthly or one-time support through GitHub Sponsors. Get recognition and exclusive perks.
                  </p>
                  <span className="inline-flex items-center gap-2 text-pink-400 text-sm font-medium">
                    Sponsor on GitHub
                    <ArrowLeft className="h-4 w-4 rotate-180 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </a>

              {/* Star on GitHub */}
              <a
                href="https://github.com/nuvcai/MiniFi"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative p-8 rounded-3xl bg-gradient-to-br from-white/[0.02] to-white/[0.05] border border-white/5 hover:border-white/10 transition-all duration-300"
              >
                <div className="relative">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-6">
                    <Github className="h-6 w-6 text-white/70" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">Star on GitHub</h3>
                  <p className="text-white/50 mb-6">
                    Free way to support! Stars help us get discovered by more developers and educators.
                  </p>
                  <span className="inline-flex items-center gap-2 text-white/70 text-sm font-medium">
                    View repository
                    <ArrowLeft className="h-4 w-4 rotate-180 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </a>
              
            </div>
          </div>

          {/* Newsletter - Super clean */}
          <div className={`max-w-xl mx-auto pb-24 transition-all duration-1000 delay-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
            <div className="text-center mb-8">
              <h2 className="text-2xl font-semibold text-white mb-2">Stay Updated</h2>
              <p className="text-white/50">
                Get notified about new features and missions. No spam.
              </p>
            </div>
            
            {status === "success" ? (
              <div className="flex items-center justify-center gap-3 p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
                <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                <span className="text-emerald-300">You're subscribed!</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-3">
                <div className="relative flex-1">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/30" />
                  <input
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-indigo-500/50 transition-colors"
                    disabled={status === "loading"}
                  />
                </div>
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="px-6 rounded-2xl bg-indigo-500 hover:bg-indigo-600 text-white font-medium transition-colors disabled:opacity-50"
                >
                  {status === "loading" ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <Send className="h-5 w-5" />
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Contact */}
          <div className={`max-w-xl mx-auto pb-24 text-center transition-all duration-1000 delay-400 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
            <p className="text-white/30 text-sm">
              Questions? Reach out at{" "}
              <a href="mailto:hello@nuvc.ai" className="text-white/50 hover:text-white/70 transition-colors">
                hello@nuvc.ai
              </a>
            </p>
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t border-white/5">
          <div className="container mx-auto px-6 py-8">
            <div className="flex items-center justify-center gap-6 text-sm text-white/30">
              <span>© 2025 NUVC.AI</span>
              <a href="https://nuvc.ai" target="_blank" rel="noopener noreferrer" className="hover:text-white/60 transition-colors">
                About
              </a>
              <Link href="/" className="hover:text-white/60 transition-colors">
                Home
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
