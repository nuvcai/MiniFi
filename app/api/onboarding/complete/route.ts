/**
 * Onboarding Completion API Endpoint
 * Stores user profile and syncs with marketing systems
 */

import { NextRequest, NextResponse } from 'next/server';
import { loopsHelpers, LOOPS_EVENTS } from '@/lib/loops';
import { MARKETING_EVENTS } from '@/components/data/marketingData';

interface OnboardingPayload {
  // Core profile
  ageRange: "12-14" | "15-16" | "17-18";
  country: string;
  
  // Financial background
  hasPartTimeJob: boolean;
  hasSavingsGoal: boolean;
  familyDiscussesFinances: boolean;
  
  // Risk profile
  riskPersonality: string;
  riskScore: number;
  
  // Learning preferences
  learningStyle: string;
  preferredSessionLength: string;
  
  // Coach
  selectedCoach: string;
  
  // Consent
  termsAccepted: boolean;
  marketingConsent: boolean;
  
  // Metadata
  completedAt: string;
  source: string;
  
  // UTM tracking
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  ref?: string;
  
  // Optional email (if collected)
  email?: string;
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body: OnboardingPayload = await request.json();
    
    // Validate required fields
    if (!body.ageRange || !body.termsAccepted) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Log onboarding completion for analytics
    console.log('📋 Onboarding completed:', {
      event: MARKETING_EVENTS.ONBOARDING_COMPLETED,
      ageRange: body.ageRange,
      riskPersonality: body.riskPersonality,
      learningStyle: body.learningStyle,
      selectedCoach: body.selectedCoach,
      marketingConsent: body.marketingConsent,
      source: body.source,
      utm_source: body.utm_source
    });

    // If user provided email and consented to marketing, sync to Loops
    if (body.email && body.marketingConsent) {
      try {
        await loopsHelpers.onAppSignup(body.email, {
          firstName: undefined, // Would need to collect in onboarding
          coach: body.selectedCoach
        });
        
        // Also update with profile data
        const { loops } = await import('@/lib/loops');
        await loops.updateContact(body.email, {
          ageRange: body.ageRange,
          country: body.country,
          riskPersonality: body.riskPersonality,
          riskScore: body.riskScore,
          learningStyle: body.learningStyle,
          preferredSessionLength: body.preferredSessionLength,
          hasPartTimeJob: body.hasPartTimeJob,
          hasSavingsGoal: body.hasSavingsGoal,
          userGroup: 'onboarded_users'
        });
        
        console.log('✅ Synced to Loops.so');
      } catch (loopsError) {
        console.warn('⚠️ Loops sync failed:', loopsError);
      }
    }

    // Generate user segment based on profile
    const userSegment = determineUserSegment(body);

    // Send Discord notification if configured
    if (process.env.DISCORD_WEBHOOK_URL) {
      try {
        await fetch(process.env.DISCORD_WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            embeds: [{
              title: '🎯 New User Onboarded!',
              color: 0x10b981, // Emerald
              fields: [
                { name: 'Age Range', value: body.ageRange, inline: true },
                { name: 'Personality', value: `${body.riskPersonality} (${body.riskScore}%)`, inline: true },
                { name: 'Coach', value: body.selectedCoach, inline: true },
                { name: 'Learning Style', value: body.learningStyle, inline: true },
                { name: 'Session Length', value: body.preferredSessionLength, inline: true },
                { name: 'Marketing Consent', value: body.marketingConsent ? '✅ Yes' : '❌ No', inline: true },
                { name: 'Source', value: body.utm_source || body.source || 'direct', inline: true }
              ],
              timestamp: new Date().toISOString()
            }]
          }),
        });
      } catch (webhookError) {
        console.warn('Discord webhook failed:', webhookError);
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Onboarding completed successfully!',
      data: {
        userSegment,
        riskPersonality: body.riskPersonality,
        selectedCoach: body.selectedCoach
      }
    });

  } catch (error) {
    console.error('Onboarding API error:', error);
    return NextResponse.json(
      { success: false, message: 'An error occurred' },
      { status: 500 }
    );
  }
}

// Determine user segment based on profile
function determineUserSegment(data: OnboardingPayload): string {
  // Age-based segments
  const ageSegments: Record<string, string> = {
    '12-14': 'teens_early',
    '15-16': 'teens_mid',
    '17-18': 'teens_late'
  };
  
  // Risk-based modifier
  const riskModifier = data.riskScore >= 70 ? 'high_risk' : 
                       data.riskScore >= 40 ? 'moderate_risk' : 
                       'conservative';
  
  return `${ageSegments[data.ageRange]}_${riskModifier}`;
}

