# MiniFi Development Roadmap

## Current State (MVP - Hackathon)
✅ Basic AI Coach (OpenAI GPT-4o-mini)  
✅ Historical event simulations  
✅ Leaderboard system  
✅ Price data via yfinance  
✅ Portfolio simulation  
✅ Email rewards system  

---

## Phase 1: MVP+ (Post-Hackathon) - 2-3 weeks
**Goal: Production-ready core features**

### Database
- [ ] User authentication (email/password)
- [ ] Portfolio persistence (save holdings)
- [ ] Transaction history
- [ ] Session management

### Backend
- [ ] PostgreSQL migration (from SQLite)
- [ ] Redis caching for prices
- [ ] Rate limiting
- [ ] API key management

### AI
- [ ] Coach conversation memory
- [ ] Improved prompt engineering

---

## Phase 2: Engagement - 2-3 weeks
**Goal: Keep users coming back**

### Database
- [ ] Achievements/badges table
- [ ] Daily streak tracking
- [ ] Learning progress tracking
- [ ] Skill levels per category

### Features
- [ ] Badge unlock system
- [ ] Daily challenges
- [ ] Progress dashboard
- [ ] Push notifications

### AI
- [ ] Personalized learning paths
- [ ] Skill gap analysis

---

## Phase 3: AI Intelligence - 3-4 weeks
**Goal: Smarter AI features**

### AI Functions
- [ ] Natural language trading ("Buy $500 of Apple")
- [ ] Portfolio analysis & insights
- [ ] Concept explainer (ELI5 mode)
- [ ] Weekly AI digest emails
- [ ] Quiz/assessment generator

### Database
- [ ] Conversation history persistence
- [ ] AI insights cache
- [ ] User preference learning

---

## Phase 4: Social - 4-6 weeks
**Goal: Community features**

### Database
- [ ] Friends system
- [ ] Teams/clubs
- [ ] Team leaderboards
- [ ] Chat/messaging

### Features
- [ ] Friend challenges
- [ ] Team competitions
- [ ] Social sharing
- [ ] Referral system

---

## Phase 5: Advanced - 4-6 weeks
**Goal: Premium features**

### AI Functions
- [ ] Voice commands (Whisper)
- [ ] Chart/image analysis (Vision)
- [ ] Market sentiment analysis
- [ ] Real-time news integration
- [ ] Risk profiling AI

### Database
- [ ] Subscription tiers
- [ ] Premium features flags
- [ ] Usage analytics

---

## Quick Wins (Do Anytime)
| Feature | Effort | Impact |
|---------|--------|--------|
| Portfolio persistence | Low | High |
| Coach chat memory | Low | High |
| Simple badges | Low | Medium |
| Better error handling | Low | Medium |
| API documentation | Low | Medium |

---

## Tech Stack Evolution

| Component | MVP | Production |
|-----------|-----|------------|
| Frontend | Vercel | Vercel |
| Backend | Render (free) | Render (paid) |
| Database | SQLite | PostgreSQL (Render/Supabase) |
| Cache | In-memory | Redis |
| Auth | None | JWT + OAuth |
| AI | OpenAI only | OpenAI + Bedrock |
| CDN | Vercel Edge | Vercel Edge |

---

*Last Updated: December 2025*

