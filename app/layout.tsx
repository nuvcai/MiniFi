import type React from "react";
import type { Metadata, Viewport } from "next";
import { Outfit, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { MobileBottomNav, MobileNavSpacer } from "@/components/shared/MobileBottomNav";
import { ThemeProvider } from "@/components/theme-provider";

const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-outfit",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-plus-jakarta",
  weight: ["400", "500", "600", "700"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: "Minifi - Learn Investing Through History",
  description: "Master investing by trading through history's biggest market events. AI-powered financial education game for teens.",
  icons: {
    icon: '/favicon.svg',
    apple: '/minifi-icon.svg',
  },
  authors: [{ name: "NUVC.AI", url: "https://nuvc.ai" }],
  creator: "NUVC.AI",
  publisher: "Minifi",
  keywords: ["minifi", "financial literacy", "investment education", "trading game", "teens", "AI coach", "market history", "stock market"],
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Minifi",
  },
  openGraph: {
    type: "website",
    siteName: "Minifi",
    title: "Minifi - Learn Investing Through History",
    description: "Master investing by trading through history's biggest market events",
    images: ['/minifi-icon.svg'],
  },
  twitter: {
    card: "summary",
    title: "Minifi - Learn Investing Through History",
    description: "Master investing by trading through history's biggest market events",
    images: ['/minifi-icon.svg'],
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
