/**
 * Mini.Fi Competition Results
 * Light, fun design
 * © 2025 NUVC.AI. All Rights Reserved.
 */

"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Loader2 } from "lucide-react";
import CompetitionResults from "@/components/competition-results";

function ResultsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [resultsData, setResultsData] = useState<{
    finalValue: number;
    totalReturn: number;
  } | null>(null);

  useEffect(() => {
    const finalValueParam = searchParams.get("finalValue");
    const totalReturnParam = searchParams.get("totalReturn");

    if (finalValueParam && totalReturnParam) {
      try {
        const finalValue = parseFloat(finalValueParam);
        const totalReturn = parseFloat(totalReturnParam);

        if (!isNaN(finalValue) && !isNaN(totalReturn)) {
          setResultsData({ finalValue, totalReturn });
        } else {
          router.push("/competition");
        }
      } catch (error) {
        console.error("Failed to parse results data:", error);
        router.push("/competition");
      }
    } else {
      router.push("/competition");
    }
  }, [searchParams, router]);

  const handleBackToHome = () => {
    router.push("/timeline");
  };

  if (!resultsData) {
    return (
      <div className="flex items-center justify-center pt-32">
        <div className="text-center">
          <Loader2 className="h-10 w-10 animate-spin text-amber-500 mx-auto mb-4" />
          <p className="text-gray-500 font-medium">Loading results...</p>
        </div>
      </div>
    );
  }

  return (
    <CompetitionResults
      finalValue={resultsData.finalValue}
      totalReturn={resultsData.totalReturn}
      onBackToHome={handleBackToHome}
    />
  );
}

export default function ResultsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-white to-yellow-50">
      {/* Background blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-amber-200/40 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-yellow-200/40 rounded-full blur-3xl" />
      </div>
      
      {/* Header */}
      <nav className="sticky top-0 z-50 border-b border-gray-100 bg-white/80 backdrop-blur-xl">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/timeline" className="flex items-center gap-2 text-gray-500 hover:text-amber-600 transition-colors group">
              <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              <span className="text-sm font-medium">Back</span>
            </Link>
            
            <div className="flex items-center gap-3">
              <Image
                src="/favicon.png"
                alt="Mini.Fi"
                width={36}
                height={36}
                className="rounded-xl shadow-lg"
              />
              <span className="text-lg font-bold bg-gradient-to-r from-amber-600 to-yellow-600 bg-clip-text text-transparent">
                Results 🏆
              </span>
            </div>
            
            <div className="w-16" />
          </div>
        </div>
      </nav>

      <div className="relative">
        <Suspense
          fallback={
            <div className="flex items-center justify-center pt-32">
              <div className="text-center">
                <Loader2 className="h-10 w-10 animate-spin text-amber-500 mx-auto mb-4" />
                <p className="text-gray-500 font-medium">Loading...</p>
              </div>
            </div>
          }
        >
          <ResultsContent />
        </Suspense>
      </div>
    </div>
  );
}
