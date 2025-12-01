# MiniFi Development Roadmap

## ✅ Completed Features

### v1.0 - MVP (November 2025)
- ✅ Basic AI Coach (OpenAI GPT-4o-mini)  
- ✅ Historical event simulations (6 missions: 1990-2025)
- ✅ Leaderboard system  
- ✅ Price data via yfinance  
- ✅ Portfolio simulation  
- ✅ Email rewards system
- ✅ Mobile-first responsive UI
- ✅ Backend caching (10x performance boost)

### v1.1 - Asset Class & Financial Literacy (December 2025)
- ✅ **Asset Class System**: 6 FO-aligned categories
  - Equities, Fixed Income, Commodities, Alternatives, Cash, Cryptocurrency
- ✅ **Risk/Return Profiles**: Volatility ranges, stock correlation
- ✅ **Time Horizon Guidance**: Short (0-1yr), Medium (1-5yr), Long (5+yr)
- ✅ **FO Allocation Ranges**: Typical Family Office percentages per asset
- ✅ **Liquidity Ratings**: High/Medium/Low for each asset
- ✅ **Coach Strategy Profiles**: Target allocations, investment philosophy
- ✅ **Asset Class Mastery UI**: Progress tracking component
- ✅ **Upcoming Features Preview**: Coming soon teasers
- ✅ **FO Certification Teaser**: 3-level path preview
- ✅ **Risk Spectrum Visualization**: Interactive risk/return chart
- ✅ **Real Data Integration**: All tickers linked to Yahoo Finance
- ✅ **Historical Ticker Proxies**: ETF alternatives for pre-2000 data

---

## 🚧 In Progress / Coming Soon

### v1.2 - Interactive Features (Q1 2026)
**Goal: Engaging, gamified learning tools**

| Feature | Priority | Status | Description |
|---------|----------|--------|-------------|
| 🎯 Risk Profile Quiz | High | 🔜 Coming | Onboarding quiz for coach matching |
| 📊 Portfolio Builder | High | 🔜 Coming | Drag-drop portfolio construction |
| 🎲 Risk Roulette | High | 🔜 Coming | Daily prediction mini-game |
| 🎓 FO Certification | High | 🔜 Coming | Functional 3-level credential system |
| ⏱️ Time Horizon Challenges | Medium | 🔜 Coming | Match investments to goals |
| 📈 Asset Comparison Tool | Medium | 🔜 Coming | Side-by-side asset analysis |
| 🌍 Global Events Simulator | Medium | 🔜 Coming | What-if scenario modeling |

---

## Phase 1: MVP+ (Post-Hackathon) - 2-3 weeks
**Goal: Production-ready core features**

### Database
- [ ] User authentication (email/password)
- [ ] Portfolio persistence (save holdings)
- [ ] Transaction history
- [ ] Session management
- [ ] Asset class exploration tracking

### Backend
- [ ] PostgreSQL migration (from SQLite)
- [ ] Redis caching for prices
- [ ] Rate limiting
- [ ] API key management

### AI
- [ ] Coach conversation memory
- [ ] Improved prompt engineering with asset class context

---

## Phase 2: Engagement - 2-3 weeks
**Goal: Keep users coming back**

### Database
- [ ] Achievements/badges table
- [ ] Daily streak tracking
- [ ] Learning progress tracking
- [ ] Asset class mastery persistence
- [ ] FO certification progress

### Features
- [ ] Badge unlock system
- [ ] Daily challenges (Risk Roulette)
- [ ] Progress dashboard
- [ ] Push notifications
- [ ] FO Certification functional implementation

### AI
- [ ] Personalized learning paths based on asset exploration
- [ ] Skill gap analysis per asset class

---

## Phase 3: AI Intelligence - 3-4 weeks
**Goal: Smarter AI features**

### AI Functions
- [ ] Natural language trading ("Buy $500 of Apple")
- [ ] Portfolio analysis & insights with FO benchmarks
- [ ] Concept explainer (ELI5 mode) for each asset class
- [ ] Weekly AI digest emails
- [ ] Quiz/assessment generator for certification
- [ ] Risk profile analyzer

### Database
- [ ] Conversation history persistence
- [ ] AI insights cache
- [ ] User preference learning
- [ ] Asset class affinity tracking

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
- [ ] Social sharing of certifications
- [ ] Referral system

---

## Phase 5: Advanced - 4-6 weeks
**Goal: Premium features**

### AI Functions
- [ ] Voice commands (Whisper)
- [ ] Chart/image analysis (Vision)
- [ ] Market sentiment analysis
- [ ] Real-time news integration
- [ ] Risk profiling AI with FO benchmarks

### Database
- [ ] Subscription tiers
- [ ] Premium features flags
- [ ] Usage analytics
- [ ] Certification credentials storage

---

## ✅ Quick Wins (Completed)

| Feature | Effort | Impact | Status |
|---------|--------|--------|--------|
| Asset class metadata | Medium | High | ✅ Done |
| FO allocation ranges | Low | High | ✅ Done |
| Time horizon guidance | Low | High | ✅ Done |
| Coach strategy profiles | Low | High | ✅ Done |
| Upcoming features UI | Medium | Medium | ✅ Done |
| Risk spectrum component | Medium | Medium | ✅ Done |
| Asset mastery tracking UI | Medium | High | ✅ Done |

## 🎯 Next Quick Wins

| Feature | Effort | Impact | Priority |
|---------|--------|--------|----------|
| Risk Profile Quiz | Medium | High | 🔥 P0 |
| Portfolio Builder sandbox | Medium | High | 🔥 P0 |
| Risk Roulette daily game | Low | Medium | ⭐ P1 |
| FO Certification functional | High | High | ⭐ P1 |
| Coach chat with asset context | Low | High | ⭐ P1 |

---

## Tech Stack Evolution

| Component | MVP | v1.1 | Production |
|-----------|-----|------|------------|
| Frontend | Vercel | Vercel | Vercel |
| Backend | Render (free) | Render (free) | Render (paid) |
| Database | SQLite | SQLite | PostgreSQL |
| Cache | In-memory | In-memory | Redis |
| Auth | None | None | JWT + OAuth |
| AI | OpenAI only | OpenAI | OpenAI + Bedrock |
| Market Data | Mock | Yahoo Finance | Yahoo Finance + Alpha Vantage |
| CDN | Vercel Edge | Vercel Edge | Vercel Edge |

---

## 📊 Data Architecture

### Asset Class Data Model
```typescript
interface InvestmentOption {
  id: string;
  name: string;
  assetClass: "equities" | "fixed_income" | "commodities" | "alternatives" | "cash" | "cryptocurrency";
  timeHorizon: "short" | "medium" | "long";
  riskReturnProfile: {
    riskLevel: "none" | "low" | "medium" | "high" | "extreme";
    historicalVolatility: string;
    correlationWithStocks: "negative" | "low" | "moderate" | "high";
  };
  foAllocationRange: string;
  liquidityRating: "high" | "medium" | "low";
}
```

### Coach Strategy Model
```typescript
interface AICoach {
  riskTolerance: "conservative" | "moderate" | "aggressive" | "very_aggressive";
  preferredAssetClasses: AssetClass[];
  targetAllocation: {
    equities: string;
    fixed_income: string;
    commodities: string;
    alternatives: string;
    cash: string;
  };
  investmentPhilosophy: string;
  bestFor: string;
  preferredTimeHorizon: "short" | "medium" | "long";
}
```

---

## 🏆 Success Metrics

| Metric | Current | v1.2 Target | v2.0 Target |
|--------|---------|-------------|-------------|
| Asset Classes Explored | - | 4+ per user | 6 per user |
| FO Certifications Earned | - | 1000 Level 1 | 5000 all levels |
| Daily Active Users | - | 500 | 5000 |
| Mission Completion Rate | - | 75% | 90% |
| Asset Mastery Completion | - | 30% | 60% |

---

*Last Updated: December 2025*
