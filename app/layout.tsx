import type React from "react";
import type { Metadata, Viewport } from "next";
import { Outfit, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { MobileBottomNav, MobileNavSpacer } from "@/components/shared/MobileBottomNav";
import { ThemeProvider } from "@/components/theme-provider";

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

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: "NUVC Financial Literacy App",
  description: "Empowering Australian teens with AI-powered investment education through gamified learning",
  icons: {
    icon: '/favicon.svg',
    apple: '/favicon.svg',
  },
  authors: [{ name: "NUVC.AI", url: "https://nuvc.ai" }],
  creator: "NUVC.AI",
  keywords: ["financial literacy", "investment education", "game", "teens", "AI"],
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Mini.Fi",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${plusJakarta.variable} antialiased`}
      suppressHydrationWarning
    >
      <body 
        className="font-sans min-h-screen bg-background text-foreground" 
        suppressHydrationWarning={true}
      >
        <ThemeProvider>
          {children}
          {/* Mobile bottom navigation - hidden on desktop */}
          <MobileBottomNav />
          <MobileNavSpacer />
        </ThemeProvider>
      </body>
    </html>
  );
}
