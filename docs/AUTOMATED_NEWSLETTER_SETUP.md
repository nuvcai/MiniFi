# 📰 Automated Newsletter Setup Guide

## How It Works

Your Render backend now automatically generates and sends newsletters:

```
┌─────────────────────────────────────────────────────────────────┐
│                     AUTOMATIC NEWSLETTER FLOW                    │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐       │
│  │ Cron Trigger │ -> │ API Endpoint │ -> │  Newsletter  │       │
│  │ (External)   │    │ /cron/news.. │    │   Service    │       │
│  └──────────────┘    └──────────────┘    └──────────────┘       │
│                                                 │                │
│                                                 v                │
│                      ┌──────────────┐    ┌──────────────┐       │
│                      │   Loops.so   │ <- │  Generated   │       │
│                      │  (Sending)   │    │   Content    │       │
│                      └──────────────┘    └──────────────┘       │
│                            │                                     │
│                            v                                     │
│                      ┌──────────────┐                           │
│                      │  📧 Email    │                           │
│                      │  Delivered!  │                           │
│                      └──────────────┘                           │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

## Step 1: Set Up Loops.so

1. **Create account** at [loops.so](https://loops.so)
2. **Get API Key** from Settings → API
3. **Create Email Templates** (or use Loops' built-in):
   - `weekly-digest` - Your main newsletter
   - `welcome` - For new subscribers
   - `achievement` - For gamification rewards
4. **Note the Transactional IDs** for each template

## Step 2: Configure Environment Variables

Add these to your Render service:

```bash
# Required
LOOPS_API_KEY=your_loops_api_key_here
CRON_SECRET=generate_a_secure_random_string

# Optional (from Loops dashboard)
LOOPS_WEEKLY_DIGEST_ID=your_template_id
LOOPS_WELCOME_ID=your_welcome_template_id
```

To generate a secure CRON_SECRET:
```bash
openssl rand -hex 32
```

## Step 3: Set Up Cron Trigger

### Option A: Free External Cron Service (Recommended for Free Tier)

#### Using [cron-job.org](https://cron-job.org) (100% Free)

1. Create free account at cron-job.org
2. Add new cron job:
   - **URL**: `https://your-api.onrender.com/cron/newsletter?secret=YOUR_CRON_SECRET`
   - **Method**: POST
   - **Schedule**: `0 10 * * 2` (Tuesday 10am UTC)
3. Add another for re-engagement:
   - **URL**: `https://your-api.onrender.com/cron/reengagement?secret=YOUR_CRON_SECRET`
   - **Schedule**: `0 9 * * *` (Daily 9am UTC)

#### Using GitHub Actions (Free)

Create `.github/workflows/newsletter-cron.yml`:

```yaml
name: Newsletter Cron

on:
  schedule:
    # Every Tuesday at 10:00 AM UTC
    - cron: '0 10 * * 2'
  workflow_dispatch: # Allow manual trigger

jobs:
  send-newsletter:
    runs-on: ubuntu-latest
    steps:
      - name: Trigger Newsletter
        run: |
          curl -X POST "https://your-api.onrender.com/cron/newsletter?secret=${{ secrets.CRON_SECRET }}"
```

Add `CRON_SECRET` to your GitHub repo secrets.

#### Using Vercel Cron (If you have Vercel frontend)

Your Vercel frontend can also trigger the backend cron. Add to `vercel.json`:

```json
{
  "crons": [{
    "path": "/api/trigger-newsletter",
    "schedule": "0 10 * * 2"
  }]
}
```

Then create `/app/api/trigger-newsletter/route.ts`:

```typescript
export async function GET() {
  const response = await fetch(
    `${process.env.BACKEND_URL}/cron/newsletter?secret=${process.env.CRON_SECRET}`,
    { method: 'POST' }
  );
  return Response.json(await response.json());
}
```

### Option B: Render Paid Plan Cron

If you upgrade to Render's paid plan ($7/month), the cron jobs in `render.yaml` will work automatically.

## Step 4: Test the Setup

### Preview Newsletter (No Sending)
```bash
curl https://your-api.onrender.com/cron/newsletter/preview
```

### Send Test Newsletter (Requires Secret)
```bash
curl -X POST "https://your-api.onrender.com/cron/newsletter?secret=YOUR_CRON_SECRET"
```

### Subscribe Test Email
```bash
curl -X POST "https://your-api.onrender.com/api/newsletter/subscribe?email=test@example.com&first_name=Test"
```

## API Endpoints Reference

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/cron/newsletter` | POST | Send weekly digest to all subscribers |
| `/cron/newsletter/preview` | GET | Preview this week's content |
| `/cron/reengagement` | POST | Check for inactive users |
| `/api/newsletter/subscribe` | POST | Subscribe new user |

## Newsletter Content

The newsletter automatically rotates through:

### Week N: Wealth Wisdom
- 4 Wealth Pillars rotating weekly
- Teen-friendly explanations
- Actionable tips

### Investor Spotlights
- Warren Buffett quotes
- Peter Lynch wisdom
- Charlie Munger insights
- Ray Dalio principles

### Tips
- 8 rotating financial tips
- Simple, actionable advice

## Loops.so Template Variables

When creating your Loops email templates, these variables are available:

```
{{firstName}} - Subscriber's first name
{{subject}} - Email subject
{{preheader}} - Email preheader text

{{wisdom_emoji}} - Current pillar emoji
{{wisdom_title}} - Pillar name
{{wisdom_principle}} - Main principle
{{wisdom_content}} - Teen explanation

{{investor_name}} - Featured investor
{{investor_quote}} - Their quote
{{investor_lesson}} - Key lesson
{{investor_for_teens}} - Teen explanation

{{tip}} - Weekly tip

{{cta_text}} - Call to action text
{{cta_url}} - Call to action URL
{{closing}} - Closing message
```

## Monitoring

### Check Render Logs
```bash
# View backend logs
render logs minifi-backend
```

### Loops.so Dashboard
- See email delivery stats
- Open rates, click rates
- Unsubscribes

## Troubleshooting

### Newsletter Not Sending?
1. Check LOOPS_API_KEY is set correctly
2. Verify CRON_SECRET matches in Render and cron service
3. Check Render logs for errors

### No Contacts in Loops?
1. Ensure users subscribe via `/api/newsletter/subscribe`
2. Import existing contacts to Loops dashboard

### Cron Not Triggering?
1. Verify cron service is active (check cron-job.org dashboard)
2. Test endpoint manually first
3. Check for 403 errors (wrong secret)

## Cost Summary

| Service | Cost |
|---------|------|
| Render Backend (Free) | $0 |
| cron-job.org | $0 |
| Loops.so (1,000 contacts) | $0 |
| **Total** | **$0/month** |

For scale:
- Loops.so: $49/month for 5,000 contacts
- Render Cron: $7/month (optional)

