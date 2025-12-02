/**
 * Feedback Collection API Endpoint
 * Collects user feedback for product improvement
 * 
 * Integration options:
 * - Notion Database
 * - Airtable
 * - Google Sheets
 * - Discord Webhook
 * - Your own database
 */

import { NextRequest, NextResponse } from 'next/server';

// Types
interface FeedbackRequest {
  type: 'love' | 'idea' | 'issue' | 'general';
  message: string;
  rating?: number;
  pageContext?: string;
  timestamp?: string;
  userAgent?: string;
}

interface FeedbackResponse {
  success: boolean;
  message: string;
  feedbackId?: string;
}

// In-memory storage for demo (replace with database in production)
const feedbackStore: Map<string, FeedbackRequest & { id: string; createdAt: string }> = new Map();

// Generate simple ID
function generateId(): string {
  return `fb_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

export async function POST(request: NextRequest): Promise<NextResponse<FeedbackResponse>> {
  try {
    const body: FeedbackRequest = await request.json();
    const { type, message, rating, pageContext, userAgent } = body;

    // Validate required fields
    if (!type || !message?.trim()) {
      return NextResponse.json(
        { success: false, message: 'Type and message are required' },
        { status: 400 }
      );
    }

    // Validate type
    const validTypes = ['love', 'idea', 'issue', 'general'];
    if (!validTypes.includes(type)) {
      return NextResponse.json(
        { success: false, message: 'Invalid feedback type' },
        { status: 400 }
      );
    }

    // Create feedback record
    const id = generateId();
    const createdAt = new Date().toISOString();
    const feedback = {
      id,
      type,
      message: message.trim(),
      rating,
      pageContext: pageContext || 'unknown',
      userAgent,
      createdAt
    };

    // Store feedback (replace with actual storage)
    feedbackStore.set(id, feedback);

    // === INTEGRATION OPTIONS ===

    // Option 1: Discord Webhook (recommended for real-time alerts)
    /*
    if (process.env.DISCORD_FEEDBACK_WEBHOOK) {
      const typeEmojis = {
        love: '💖',
        idea: '💡',
        issue: '🐛',
        general: '💬'
      };
      
      await fetch(process.env.DISCORD_FEEDBACK_WEBHOOK, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          embeds: [{
            title: `${typeEmojis[type]} New ${type.charAt(0).toUpperCase() + type.slice(1)} Feedback`,
            description: message,
            color: type === 'love' ? 0xff69b4 : type === 'idea' ? 0xffa500 : type === 'issue' ? 0xff0000 : 0x00bfff,
            fields: [
              { name: 'Rating', value: rating ? '⭐'.repeat(rating) : 'N/A', inline: true },
              { name: 'Page', value: pageContext || 'Unknown', inline: true },
              { name: 'Time', value: new Date().toLocaleString(), inline: true }
            ],
            footer: { text: `Feedback ID: ${id}` }
          }]
        }),
      });
    }
    */

    // Option 2: Notion Database
    /*
    if (process.env.NOTION_API_KEY && process.env.NOTION_FEEDBACK_DB) {
      await fetch('https://api.notion.com/v1/pages', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.NOTION_API_KEY}`,
          'Content-Type': 'application/json',
          'Notion-Version': '2022-06-28'
        },
        body: JSON.stringify({
          parent: { database_id: process.env.NOTION_FEEDBACK_DB },
          properties: {
            'Type': { select: { name: type } },
            'Message': { rich_text: [{ text: { content: message } }] },
            'Rating': { number: rating || null },
            'Page': { rich_text: [{ text: { content: pageContext || '' } }] },
            'Date': { date: { start: createdAt } }
          }
        }),
      });
    }
    */

    // Option 3: Airtable
    /*
    if (process.env.AIRTABLE_API_KEY && process.env.AIRTABLE_BASE_ID) {
      await fetch(`https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/Feedback`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.AIRTABLE_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          fields: {
            'Type': type,
            'Message': message,
            'Rating': rating,
            'Page Context': pageContext,
            'Created At': createdAt
          }
        }),
      });
    }
    */

    // Option 4: Google Sheets via Apps Script
    /*
    if (process.env.GOOGLE_SHEETS_FEEDBACK_WEBHOOK) {
      await fetch(process.env.GOOGLE_SHEETS_FEEDBACK_WEBHOOK, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id,
          type,
          message,
          rating,
          pageContext,
          timestamp: createdAt
        }),
      });
    }
    */

    // Option 5: Email notification
    /*
    if (process.env.FEEDBACK_EMAIL && process.env.SENDGRID_API_KEY) {
      await fetch('https://api.sendgrid.com/v3/mail/send', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.SENDGRID_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          personalizations: [{ to: [{ email: process.env.FEEDBACK_EMAIL }] }],
          from: { email: 'feedback@minifi.app' },
          subject: `[${type.toUpperCase()}] New Feedback from Legacy Guardians`,
          content: [{
            type: 'text/plain',
            value: `Type: ${type}\nRating: ${rating || 'N/A'}\nPage: ${pageContext}\n\nMessage:\n${message}`
          }]
        }),
      });
    }
    */

    console.log(`📝 New feedback [${type}]: ${message.substring(0, 50)}...`);

    return NextResponse.json({
      success: true,
      message: 'Thank you for your feedback! 🙏',
      feedbackId: id
    });

  } catch (error) {
    console.error('Feedback submission error:', error);
    return NextResponse.json(
      { success: false, message: 'An error occurred. Please try again.' },
      { status: 500 }
    );
  }
}

// GET endpoint to retrieve feedback stats (for admin)
export async function GET(request: NextRequest): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type');

  const allFeedback = Array.from(feedbackStore.values());
  const filteredFeedback = type 
    ? allFeedback.filter(f => f.type === type)
    : allFeedback;

  const stats = {
    total: allFeedback.length,
    byType: {
      love: allFeedback.filter(f => f.type === 'love').length,
      idea: allFeedback.filter(f => f.type === 'idea').length,
      issue: allFeedback.filter(f => f.type === 'issue').length,
      general: allFeedback.filter(f => f.type === 'general').length
    },
    averageRating: allFeedback
      .filter(f => f.rating)
      .reduce((sum, f) => sum + (f.rating || 0), 0) / allFeedback.filter(f => f.rating).length || 0
  };

  return NextResponse.json({
    success: true,
    stats,
    recent: filteredFeedback.slice(-10).reverse()
  });
}

