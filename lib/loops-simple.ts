/**
 * 🚀 SIMPLEST LOOPS.SO SETUP
 * 
 * ONE file. ONE API key. FULLY automated.
 * 
 * Setup time: 5 minutes
 * 1. Get API key from loops.so/settings/api
 * 2. Add LOOPS_API_KEY to .env.local
 * 3. Done!
 */

const LOOPS_API_KEY = process.env.LOOPS_API_KEY || '';
const LOOPS_URL = 'https://app.loops.so/api/v1';

// =============================================================================
// THE ONLY 3 FUNCTIONS YOU NEED
// =============================================================================

/**
 * 1️⃣ ADD USER TO NEWSLETTER
 * Call this when someone signs up
 */
export async function addToNewsletter(
  email: string, 
  firstName?: string,
  source?: string
) {
  if (!LOOPS_API_KEY) {
    console.log('📧 [DEV] Would add to newsletter:', email);
    return { success: true, mock: true };
  }

  const res = await fetch(`${LOOPS_URL}/contacts/create`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${LOOPS_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      firstName: firstName || '',
      source: source || 'app',
      subscribed: true,
      userGroup: 'newsletter',
    }),
  });

  return { success: res.ok };
}

/**
 * 2️⃣ TRIGGER AN EVENT
 * Loops auto-sends emails based on events you define in dashboard
 * 
 * Pre-made events to create in Loops dashboard:
 * - "signup" → Welcome email
 * - "mission_complete" → Celebration email  
 * - "inactive_7d" → Re-engagement email
 */
export async function triggerEvent(
  email: string,
  eventName: string,
  data?: Record<string, string | number>
) {
  if (!LOOPS_API_KEY) {
    console.log('📧 [DEV] Would trigger event:', eventName, email);
    return { success: true, mock: true };
  }

  const res = await fetch(`${LOOPS_URL}/events/send`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${LOOPS_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      eventName,
      eventProperties: data || {},
    }),
  });

  return { success: res.ok };
}

/**
 * 3️⃣ UPDATE USER DATA
 * Call this when user progresses (Loops auto-segments)
 */
export async function updateUser(
  email: string,
  data: Record<string, string | number | boolean>
) {
  if (!LOOPS_API_KEY) {
    console.log('📧 [DEV] Would update user:', email, data);
    return { success: true, mock: true };
  }

  const res = await fetch(`${LOOPS_URL}/contacts/update`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${LOOPS_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, ...data }),
  });

  return { success: res.ok };
}

// =============================================================================
// CONVENIENCE HELPERS (optional but nice)
// =============================================================================

/** User just signed up */
export const onSignup = (email: string, name?: string) => {
  addToNewsletter(email, name, 'signup');
  triggerEvent(email, 'signup', { firstName: name || '' });
};

/** User completed a mission */
export const onMissionComplete = (email: string, missionName: string, xp: number) => {
  triggerEvent(email, 'mission_complete', { missionName, xp });
  updateUser(email, { lastMission: missionName, totalXp: xp });
};

/** User leveled up */
export const onLevelUp = (email: string, level: number) => {
  triggerEvent(email, 'level_up', { level });
  updateUser(email, { playerLevel: level });
};

/** User earned achievement */
export const onAchievement = (email: string, achievement: string) => {
  triggerEvent(email, 'achievement', { achievement });
};

/** User inactive for X days (called by cron) */
export const onInactive = (email: string, days: number) => {
  triggerEvent(email, `inactive_${days}d`, { daysSinceActive: days });
};

// =============================================================================
// USAGE EXAMPLES
// =============================================================================

/*
// In your signup handler:
import { onSignup } from '@/lib/loops-simple';
onSignup('user@email.com', 'John');

// After mission complete:
import { onMissionComplete } from '@/lib/loops-simple';
onMissionComplete('user@email.com', 'First Investment', 100);

// When user levels up:
import { onLevelUp } from '@/lib/loops-simple';
onLevelUp('user@email.com', 5);

That's it! Loops handles everything else automatically.
*/

