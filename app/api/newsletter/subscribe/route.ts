/**
 * Newsletter Subscription API Endpoint
 * Handles email capture for marketing automation
 * 
 * Integration options:
 * - Mailchimp (uncomment relevant section)
 * - Sendinblue/Brevo
 * - ConvertKit
 * - Your own database
 */

import { NextRequest, NextResponse } from 'next/server';

// Types
interface SubscribeRequest {
  email: string;
  firstName?: string;
  source?: string;
  timestamp?: string;
}

interface SubscribeResponse {
  success: boolean;
  message: string;
  subscriber?: {
    email: string;
    subscribedAt: string;
  };
}

// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// In-memory storage for demo (replace with database in production)
const subscribers: Map<string, { email: string; firstName?: string; source?: string; subscribedAt: string }> = new Map();

export async function POST(request: NextRequest): Promise<NextResponse<SubscribeResponse>> {
  try {
    const body: SubscribeRequest = await request.json();
    const { email, firstName, source } = body;

    // Validate email
    if (!email || !emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Normalize email
    const normalizedEmail = email.toLowerCase().trim();

    // Check for existing subscriber
    if (subscribers.has(normalizedEmail)) {
      return NextResponse.json(
        { success: true, message: 'You are already subscribed!' },
        { status: 200 }
      );
    }

    // Create subscriber record
    const subscribedAt = new Date().toISOString();
    const subscriber = {
      email: normalizedEmail,
      firstName: firstName?.trim(),
      source: source || 'website',
      subscribedAt
    };

    // Store subscriber (replace with actual storage)
    subscribers.set(normalizedEmail, subscriber);

    // === INTEGRATION OPTIONS ===
    
    // Option 1: Mailchimp Integration
    // Uncomment and configure for production
    /*
    if (process.env.MAILCHIMP_API_KEY && process.env.MAILCHIMP_LIST_ID) {
      const MAILCHIMP_DC = process.env.MAILCHIMP_API_KEY.split('-')[1];
      await fetch(
        `https://${MAILCHIMP_DC}.api.mailchimp.com/3.0/lists/${process.env.MAILCHIMP_LIST_ID}/members`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${process.env.MAILCHIMP_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email_address: normalizedEmail,
            status: 'subscribed',
            merge_fields: {
              FNAME: firstName || '',
              SOURCE: source || 'website',
            },
            tags: ['legacy-guardians', source || 'website'],
          }),
        }
      );
    }
    */

    // Option 2: Sendinblue/Brevo Integration
    /*
    if (process.env.BREVO_API_KEY) {
      await fetch('https://api.brevo.com/v3/contacts', {
        method: 'POST',
        headers: {
          'api-key': process.env.BREVO_API_KEY,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: normalizedEmail,
          attributes: {
            FIRSTNAME: firstName || '',
            SOURCE: source || 'website',
          },
          listIds: [parseInt(process.env.BREVO_LIST_ID || '1')],
          updateEnabled: true,
        }),
      });
    }
    */

    // Option 3: ConvertKit Integration
    /*
    if (process.env.CONVERTKIT_API_KEY && process.env.CONVERTKIT_FORM_ID) {
      await fetch(`https://api.convertkit.com/v3/forms/${process.env.CONVERTKIT_FORM_ID}/subscribe`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          api_key: process.env.CONVERTKIT_API_KEY,
          email: normalizedEmail,
          first_name: firstName || '',
          tags: [source || 'website'],
        }),
      });
    }
    */

    // Option 4: Discord Webhook (for instant notifications)
    /*
    if (process.env.DISCORD_WEBHOOK_URL) {
      await fetch(process.env.DISCORD_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: `🎉 New Newsletter Subscriber!\n**Email:** ${normalizedEmail}\n**Name:** ${firstName || 'Not provided'}\n**Source:** ${source || 'website'}`,
        }),
      });
    }
    */

    // Option 5: Google Sheets via Apps Script
    /*
    if (process.env.GOOGLE_SHEETS_WEBHOOK) {
      await fetch(process.env.GOOGLE_SHEETS_WEBHOOK, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: normalizedEmail,
          firstName: firstName || '',
          source: source || 'website',
          timestamp: subscribedAt,
        }),
      });
    }
    */

    console.log(`✅ New subscriber: ${normalizedEmail} from ${source || 'website'}`);

    return NextResponse.json({
      success: true,
      message: 'Successfully subscribed! Welcome to Legacy Guardians 🎉',
      subscriber: {
        email: normalizedEmail,
        subscribedAt
      }
    });

  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return NextResponse.json(
      { success: false, message: 'An error occurred. Please try again.' },
      { status: 500 }
    );
  }
}

// GET endpoint to check subscription status (for debugging)
export async function GET(request: NextRequest): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get('email');

  if (!email) {
    return NextResponse.json({
      success: true,
      totalSubscribers: subscribers.size,
      message: 'Newsletter API is running'
    });
  }

  const normalizedEmail = email.toLowerCase().trim();
  const isSubscribed = subscribers.has(normalizedEmail);

  return NextResponse.json({
    success: true,
    isSubscribed,
    message: isSubscribed ? 'Email is subscribed' : 'Email is not subscribed'
  });
}

