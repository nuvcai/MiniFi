/**
 * ╔══════════════════════════════════════════════════════════════════════════════╗
 * ║   MiniFi - Financial Literacy Platform (MVP - Hackathon Edition)            ║
 * ║   ✨ Vibe-coded by Tick.AI for AWS AI Hackathon 2025 ✨                      ║
 * ║   Copyright (c) 2025 NUVC.AI / Tick.AI. All Rights Reserved.                ║
 * ║   PROPRIETARY - NO COMMERCIAL USE | https://nuvc.ai                         ║
 * ╚══════════════════════════════════════════════════════════════════════════════╝
 */

import type React from "react";
import type { Metadata } from "next";
import { Montserrat, Open_Sans } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat",
  weight: ["400", "600", "700", "900"], // Including Black weight for headings
});

const openSans = Open_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-open-sans",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "MiniFi by NUVC.AI - Financial Literacy Platform",
  description: "Empowering Australian teens with AI-powered investment education through gamified learning. © 2025 NUVC.AI / Tick.AI",
  icons: {
    icon: '/favicon.png',
    apple: '/favicon.png',
  },
  authors: [{ name: "NUVC.AI / Tick.AI", url: "https://nuvc.ai" }],
  creator: "NUVC.AI",
  publisher: "Tick.AI",
  keywords: ["financial literacy", "investment education", "AI coaching", "NUVC.AI", "Tick.AI", "Australian teens"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} ${openSans.variable} antialiased`}
    >
      <body className="font-sans min-h-screen flex flex-col" suppressHydrationWarning={true}>
        <main className="flex-1">
          {children}
        </main>
        {/* NUVC.AI Watermark Footer */}
        <footer className="w-full py-3 px-4 text-center text-xs text-muted-foreground/60 border-t border-border/30 bg-background/50">
          <p>
            ✨ Vibe-coded by <a href="https://tick.ai" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors font-medium">Tick.AI</a> • MVP for AWS AI Hackathon 2025 • © <a href="https://nuvc.ai" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">NUVC.AI</a>
          </p>
        </footer>
      </body>
    </html>
  );
}
