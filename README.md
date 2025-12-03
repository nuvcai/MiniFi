# 🏆 MiniFi - Financial Literacy for the Next Generation

> **Empowering Australian Teens (12-18) with AI-Powered Investment Education**

A gamified investment education platform by **Tick.AI** that takes young learners on a journey through financial history, teaching real investment strategies through interactive missions and AI-powered coaching.

## 🎯 Project Overview

**MiniFi** is an innovative educational platform designed specifically for Australian teenagers aged 12-18. Players navigate through major financial events in history, make investment decisions, and learn from AI coaches while competing in real-time investment competitions.

Built for **NextGen AI Hackathon 2025** by Tick.AI.

### 🌟 Key Features

- **📚 Historical Financial Missions**: Journey through 35+ years of financial history (1990-2025)
- **🤖 AI-Powered Coaching**: 4 specialized coaches teaching Family Office investment strategies
- **📊 Real-Time Trading Simulation**: Practice with virtual capital and real market data
- **🏆 Competitive Leaderboards**: Compete with players globally
- **📈 Advanced Analytics**: Performance charts, Sharpe ratio, volatility, and drawdown metrics
- **🎮 Gamified Learning**: XP system, achievements, and progressive unlocking
- **🎁 Real Rewards System**: Exchange XP for Australian brand gift cards
- **📱 Mobile-First Design**: Optimized for all devices

### 🆕 Latest Features (v1.2)

- **🎯 Crisis-Based Learning**: Mission flow aligned with "learning through crisis" philosophy
- **💎 High Conviction Investing**: Celebrate bold decisions and quick failures as growth
- **🧠 Emotional Intelligence**: Loss results show "Wisdom Earned" with learning-focused messaging
- **📱 Mobile-First UX**: Bottom sheet modals, 44px touch targets, bottom navigation
- **🎮 Enhanced Gamification**:
  - Knowledge Quiz after missions
  - What-If Analysis for exploring alternate outcomes
  - Points System with Flybuys-style rewards
  - League System for competitive progression
  - Investor Journey with milestone tracking
- **🎲 Infinite Gameplay**: Random scenario generation after completing historical missions
- **📊 Asset Class System**: 6 distinct asset classes with FO-aligned categorization
- **🎓 FO Certification Path**: Capital Guardian → Balanced Investor → FO Fellow

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- Python 3.8+
- npm or yarn
- Git

### 1. Clone the Repository

```bash
git clone git@gitlab.com:tick.ai/minifi.git
cd minifi
```

### 2. Environment Setup

Create a `.env.local` file in the root directory:

```bash
# Backend API URL
NEXT_PUBLIC_API_URL=http://localhost:8000

# OpenAI API Key (for AI Coach functionality)
OPENAI_API_KEY=your_openai_api_key_here
```

### 3. Install Dependencies

**Frontend:**

```bash
npm install
```

**Backend:**

```bash
cd backend
pip install -r requirements.txt
cd ..
```

### 4. Start the Application

**Start Backend:**

```bash
cd backend
./start_backend.sh
```

**Start Frontend (in a new terminal):**

```bash
npm run dev
```

### 5. Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **API Documentation**: http://localhost:8000/docs

## 🎮 How to Play

### 1. Historical Missions

- Start with the Japanese Bubble Economy (1990)
- Complete missions chronologically to unlock new events
- Make investment decisions based on historical context
- Learn from AI coaches about market dynamics

### 2. Investment Competition

- Unlock after completing all historical missions
- Allocate your starting capital across various assets
- Choose from 4 specialized AI coaches
- Trade in real-time with market simulation

### 3. Performance Tracking

- View detailed performance charts
- Analyze risk metrics (Sharpe ratio, volatility, max drawdown)
- Compare your results with global leaderboards
- Earn XP and achievements

## 🏗️ Architecture

### Frontend (React/Next.js)

- **Framework**: Next.js 15 with TypeScript
- **UI Components**: shadcn/ui with Tailwind CSS
- **Charts**: Recharts for data visualization
- **State Management**: React hooks and context

### Backend (FastAPI)

- **Framework**: FastAPI with Python
- **Database**: SQLite with thread-safe connections
- **AI Integration**: OpenAI API (GPT-4o-mini) for coaching
- **Caching**: 1-hour TTL for price data (10x performance boost)

### Key Components

```
components/
├── data/
│   ├── missions.ts          # Historical missions with asset class metadata
│   ├── coaches.ts           # AI coach profiles with FO strategies
│   ├── assetClasses.ts      # Comprehensive asset class reference
│   ├── randomScenarios.ts   # Procedural scenario generation
│   └── events.ts            # Financial events data
├── features/
│   ├── UpcomingFeatures.tsx # Coming soon feature teasers
│   ├── AssetClassMastery.tsx # Asset class progress tracking
│   ├── RiskSpectrum.tsx     # Risk/return visualization
│   └── FOCertificationTeaser.tsx # Certification path preview
├── mission/
│   ├── MissionIntro.tsx     # Crisis → Challenge → Conviction flow
│   ├── InvestmentDecision.tsx # High conviction investment choice
│   ├── InvestmentThesis.tsx # Document reasoning before decisions
│   ├── MissionResult.tsx    # Wisdom-focused results (wins & learning)
│   ├── KnowledgeQuiz.tsx    # Post-mission comprehension validation
│   └── WhatIfAnalysis.tsx   # Explore alternate outcomes
├── gamification/
│   ├── InvestorJourney.tsx  # Visual milestone progression
│   ├── LeagueSystem.tsx     # Competitive tier rankings
│   ├── RewardsStore.tsx     # XP redemption marketplace
│   ├── FlybuysRewards.tsx   # Partner rewards integration
│   ├── SavingsVault.tsx     # Goal-based savings game
│   ├── StakingCard.tsx      # XP staking for bonuses
│   └── pointsSystem.ts      # Points calculation utilities
├── shared/
│   └── MobileBottomNav.tsx  # Fixed mobile navigation
├── ui/
│   └── dialog.tsx           # Bottom sheet modal variants
├── PerformanceChart.tsx     # Investment performance visualization
├── AICoach.tsx              # AI coaching interface
├── trading-dashboard.tsx    # Real-time trading with asset classes
└── competition-results.tsx  # Results and leaderboards

backend/
├── main.py                  # FastAPI application
├── models.py               # Pydantic data models
├── database.py             # Database management
└── services/
    ├── coach_service.py    # AI coaching (family office approach)
    ├── coach_chat.py       # Real-time chat
    ├── price_service.py    # Yahoo Finance price data
    └── investment_metrics_service.py # Historical performance
```

## 🎯 AI Coaching - Family Office Approach

MiniFi teaches teens to invest like wealthy families:

### Core Philosophy
- **Reward Effort** over outcomes
- **Explore Asset Classes** (equities, fixed income, commodities, alternatives, cash, crypto)
- **Think Long-Term** like family offices managing multi-generational wealth
- **Diversify Strategically** across 6 asset classes with proper allocation

### AI Coach Personalities & FO Strategies

#### 🛡️ Steady Sam (Conservative)
- **Risk Tolerance**: Conservative
- **Target Allocation**: 40-50% Bonds, 20-30% Equities, 10-15% Commodities, 10-15% Cash
- **Philosophy**: "Capital preservation first! Focus on stable income and protecting your principal."
- **Best For**: Short to medium-term goals (1-5 years), risk-averse investors

#### ⚖️ Growth Guru (Balanced)
- **Risk Tolerance**: Moderate
- **Target Allocation**: 40-50% Equities, 25-35% Bonds, 10-15% Alternatives, 5-10% Cash
- **Philosophy**: "Diversification is key! Balance growth potential with downside protection."
- **Best For**: Medium to long-term goals (5-15 years), moderate risk tolerance

#### 🚀 Adventure Alex (Aggressive)
- **Risk Tolerance**: Very Aggressive
- **Target Allocation**: 60-75% Equities, 15-25% Alternatives, 5-15% Bonds, 0-5% Crypto
- **Philosophy**: "High risk, high reward! Stay invested through volatility for long-term gains."
- **Best For**: Long-term goals (10+ years), young investors in wealth accumulation phase

#### 💰 Yield Yoda (Income Master)
- **Risk Tolerance**: Moderate
- **Target Allocation**: 30-40% Equities, 30-40% Bonds, 15-25% Alternatives (REITs), 5-10% Cash
- **Philosophy**: "Let your money work for you! Focus on dividend-paying assets and regular income."
- **Best For**: Income generation, passive income streams, semi-retirement

## 📊 Performance Metrics & Asset Class Data

### Investment Metrics
- **Total Return**: Overall portfolio performance
- **Sharpe Ratio**: Risk-adjusted returns
- **Volatility**: Portfolio risk measurement (with historical ranges)
- **Max Drawdown**: Maximum loss from peak
- **Annualized Return**: Yearly performance rate

### Asset Class Framework

| Asset Class | Risk Level | Time Horizon | FO Allocation |
|-------------|------------|--------------|---------------|
| 📈 **Equities** | Medium-High | Long (5+ yr) | 25-60% |
| 📊 **Fixed Income** | Low | Medium (1-5 yr) | 15-50% |
| 🥇 **Commodities** | Medium | Long | 5-15% |
| 🏢 **Alternatives** | Medium | Long | 10-25% |
| 💵 **Cash** | None | Short (0-1 yr) | 5-15% |
| ₿ **Cryptocurrency** | Extreme | Long (speculative) | 0-5% |

### Asset Class Mastery System
- Track exploration across all 6 asset classes
- Earn badges for completing missions in each class
- Progress toward "Diversification Pro" achievement
- Unlock FO Certification levels

## 🚀 Recent Updates

### v1.2.0 - Crisis Learning & Mobile UX Update (December 2025)
- ✅ **Philosophy-Aligned Mission Flow**: "Crisis Mode" → "High Conviction" → "Wisdom Earned"
- ✅ **Learning from Failures**: Losses celebrated as growth opportunities with violet confetti
- ✅ **Mobile Bottom Navigation**: Fixed nav bar with safe area support
- ✅ **Bottom Sheet Modals**: Native mobile dialog experience
- ✅ **Enhanced Touch Targets**: All interactive elements meet 44px minimum
- ✅ **Knowledge Quiz**: Post-mission comprehension validation
- ✅ **What-If Analysis**: Explore alternate investment outcomes
- ✅ **Points System**: Flybuys-style rewards with tier progression
- ✅ **Rewards Store**: Redeem XP for rewards and perks
- ✅ **League System**: Competitive rankings (Bronze → Diamond)
- ✅ **Investor Journey**: Visual milestone progression tracker
- ✅ **Random Scenarios**: Infinite gameplay with procedurally generated events
- ✅ **Homepage Mobile Menu**: Hamburger navigation with responsive typography

### v1.1.0 - Asset Class & Financial Literacy Update (December 2025)
- ✅ **Asset Class System**: 6 FO-aligned asset classes with full metadata
- ✅ **Risk/Return Profiles**: Volatility, correlation, and FO allocation ranges
- ✅ **Time Horizon Guidance**: Short/Medium/Long investment recommendations
- ✅ **Asset Class Mastery UI**: Track progress across all asset classes
- ✅ **FO Certification Teaser**: 3-level certification path preview
- ✅ **Risk Spectrum Visualization**: Interactive risk/return chart component

### v1.0.0 - Family Office Edition
- ✅ AI Coach rewards effort and exploration
- ✅ Backend caching (10x faster price data)
- ✅ Mobile-optimized UI
- ✅ Comprehensive documentation

---

## 🗺️ Product Roadmap

### Current: v1.2 (December 2025)
> *Crisis Learning & Mobile UX Update*

| Feature | Status | Description |
|---------|--------|-------------|
| Historical Missions | ✅ Complete | 6 major financial events (1990-2025) |
| AI Coach System | ✅ Complete | 4 FO-aligned coaches with strategies |
| Trading Simulation | ✅ Complete | Real-time portfolio with asset classes |
| Performance Analytics | ✅ Complete | Real Yahoo Finance data integration |
| Mobile-First UI | ✅ Complete | Bottom nav, bottom sheets, 44px targets |
| Leaderboards | ✅ Complete | Global competition rankings |
| **Crisis-Based Learning** | ✅ Complete | Philosophy-aligned mission flow |
| **Knowledge Quiz** | ✅ Complete | Post-mission comprehension checks |
| **What-If Analysis** | ✅ Complete | Explore alternate outcomes |
| **Points & Rewards** | ✅ Complete | Flybuys-style points system |
| **League System** | ✅ Complete | Competitive tier progression |
| **Investor Journey** | ✅ Complete | Visual milestone tracker |
| **Random Scenarios** | ✅ Complete | Infinite procedural gameplay |

---

### v1.2 - Interactive Features (Q1 2026)
> *Engaging Learning Tools*

| Feature | Priority | Description |
|---------|----------|-------------|
| 🎯 Risk Profile Quiz | High | Personalized coach matching |
| 📊 Portfolio Builder | High | Drag-drop portfolio construction |
| 🎲 Risk Roulette | High | Daily prediction mini-game |
| 🎓 FO Certification | High | 3-level credential system |
| ⏱️ Time Horizon Challenges | Medium | Goal-matching gameplay |
| 📈 Asset Comparison Tool | Medium | Side-by-side analysis |

---

### v1.3 - Enhanced Learning (Q2 2026)
> *Deepening Educational Impact*

| Feature | Priority | Description |
|---------|----------|-------------|
| 📚 Extended Missions | High | Expand to 20+ historical events |
| 🧠 Adaptive Difficulty | High | AI-adjusted challenges based on skill |
| 📊 Learning Analytics | High | Track knowledge gaps & progress |
| 🎯 Micro-Lessons | Medium | Bite-sized financial concepts |
| 🏅 Achievement System | Medium | Badges for milestones & exploration |
| 🌏 ASX Integration | Medium | Real Australian market data |

---

### v1.2 - Social & Gamification (Q2 2026)
> *Building Community*

| Feature | Priority | Description |
|---------|----------|-------------|
| 👥 Friend Competitions | High | Challenge friends, private leagues |
| 💬 Social Feed | High | Share achievements, strategies |
| 🏫 Classroom Mode | High | Teacher dashboards, class competitions |
| 🎁 Rewards Marketplace | Medium | Australian brand gift cards (Woolworths, JB Hi-Fi) |
| 📱 Push Notifications | Medium | Market alerts, challenge reminders |
| 🤝 Mentorship Pairing | Low | Connect beginners with advanced users |

---

### v1.3 - Advanced Trading (Q3 2026)
> *Professional-Grade Features*

| Feature | Priority | Description |
|---------|----------|-------------|
| 📈 Advanced Charts | High | Candlesticks, technical indicators |
| ⚡ Options Trading Sim | High | Learn derivatives safely |
| 🔄 Auto-Rebalancing | Medium | Portfolio optimization suggestions |
| 📉 Short Selling Sim | Medium | Understand market mechanics |
| 🌐 Global Markets | Medium | US, UK, Asian market simulations |
| 🤖 AI Strategy Builder | Low | Create & backtest custom strategies |

---

### v2.0 - Platform Expansion (Q4 2026)
> *Scaling Impact*

| Feature | Priority | Description |
|---------|----------|-------------|
| 📱 Native Mobile Apps | High | iOS & Android with offline mode |
| 🏦 Real Micro-Investing | High | Connect to real brokerage (supervised) |
| 🎓 School Curriculum API | High | LMS integration for educators |
| 👨‍👩‍👧 Parent Portal | Medium | Progress tracking, parental controls |
| 🌏 APAC Expansion | Medium | Localized for Singapore, NZ, HK |
| 🏆 National Competitions | Medium | School vs school tournaments |

---

### v3.0 - AI Evolution (2027)
> *Next-Gen Intelligence*

| Feature | Vision | Description |
|---------|--------|-------------|
| 🧠 Personalized AI Tutors | Planned | Custom AI trained on user learning style |
| 🎮 VR Trading Floor | Planned | Immersive market experience |
| 🔮 Predictive Analytics | Planned | AI-powered market scenario modeling |
| 🌍 Global Launch | Planned | Multi-language, multi-currency |
| 📜 Certification Program | Planned | Industry-recognized credentials |
| 🤝 Fintech Partnerships | Planned | Bank & broker integrations |

---

### 📊 Success Metrics & KPIs

| Metric | v1.0 Target | v2.0 Target |
|--------|-------------|-------------|
| Active Users | 1,000 | 50,000 |
| School Partnerships | 5 | 200 |
| Mission Completion Rate | 70% | 85% |
| Financial Literacy Improvement | 40% | 60% |
| User Retention (30-day) | 35% | 55% |
| NPS Score | 40+ | 60+ |

---

### 🎯 Strategic Priorities

1. **Education First**: Every feature must have measurable learning outcomes
2. **Teen-Centric Design**: UI/UX optimized for Gen Z engagement patterns  
3. **AI-Native**: Leverage AI throughout, not as an afterthought
4. **Australian Focus**: Local market context, brands, and regulations
5. **Responsible Growth**: Build trust with parents, schools, regulators

---

## 📚 Documentation

- [Technical Architecture](docs/TECHNICAL_ARCHITECTURE.md) - System design, API, database
- [AWS AI Usage](docs/AWS_AI_USAGE.md) - How we used Amazon Q & Kiro
- [Hackathon Submission](docs/HACKATHON_SUBMISSION.md) - Full project documentation

## 🚀 Deployment

### Production Build

```bash
# Build frontend
npm run build

# Set production environment variables
NEXT_PUBLIC_API_URL=https://your-api-domain.com
OPENAI_API_KEY=your_production_api_key

# Start production server
npm start
```

### Environment Variables

| Variable              | Description                    | Required |
| --------------------- | ------------------------------ | -------- |
| `NEXT_PUBLIC_API_URL` | Backend API URL                | Yes      |
| `OPENAI_API_KEY`      | OpenAI API key for AI coaching | Yes      |

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Merge Request

## 📄 License

Private - NextGen AI Hackathon 2025

## 🛠️ Built with Amazon Q Developer / Kiro

This project was developed using **Amazon Q Developer CLI** and **Kiro** throughout the development process:

### How We Used AWS AI Coding Tools:
- **Code Generation**: Used Amazon Q to scaffold React components, FastAPI endpoints, and database models
- **Debugging**: Leveraged Q Developer for identifying and fixing issues in real-time trading simulation
- **Documentation**: Generated comprehensive documentation and code comments
- **Refactoring**: Improved code quality and architecture with AI-assisted suggestions
- **Testing**: Created test cases and validation logic with AI assistance

### Key Features Built with AI Assistance:
- 🤖 AI Coach personalities and response system
- 📊 Performance metrics calculation (Sharpe ratio, volatility, drawdown)
- 🎮 Gamification logic (XP system, achievements)
- 📈 Real-time trading simulation engine
- 🔐 Backend caching and optimization

## 🎉 Acknowledgments

- **Built by**: Tick.AI / NUVC.AI
- **For**: AWS AI Hackathon 2025 (Global Vibe)
- **Track**: 📚 AI in Education & Learning
- **Target**: Australian teenagers aged 12-18
- **Powered by**: OpenAI GPT-4o-mini, Amazon Q Developer, Kiro
- **Inspired by**: Real financial market events and family office strategies

### 🙏 Special Thanks

We gratefully acknowledge the contributions of our early development team members who helped build the foundation of MiniFi. Their work on the initial prototype, UI/UX design, and core features was instrumental in bringing this vision to life.

*Contributors preferred to remain anonymous but their efforts are deeply appreciated.*

---

## 💚 Support Our Mission

<p align="center">
  <img src="https://img.shields.io/badge/Mission-Democratize%20Financial%20Education-00C853?style=for-the-badge" alt="Mission Badge"/>
</p>

### 🌍 Why This Matters

> *"Financial literacy shouldn't be a privilege of the wealthy. Every teenager deserves to learn how money works."*

**The Reality Today:**
- 📉 **70% of Australian teens** receive no formal investment education
- 💸 Young adults make costly financial mistakes due to lack of knowledge
- 🏦 Wealthy families teach their children to invest; everyone else is left behind
- 📱 Social media promotes get-rich-quick schemes instead of real education

**Our Vision:**
We're building a world where **every young person**, regardless of background, learns to invest like a family office — thinking generationally, diversifying strategically, and building lasting wealth.

---

### 🤝 How You Can Help

#### 💰 Investment Opportunities

We're seeking **$500K seed funding** to scale MiniFi across Australia and Asia-Pacific:

| Use of Funds | Allocation | Impact |
|--------------|------------|--------|
| 🧑‍💻 Engineering Team | 40% | Native mobile apps, AI enhancements |
| 🏫 School Partnerships | 25% | Curriculum integration, teacher tools |
| 📣 Marketing & Growth | 20% | Reach 100K students in Year 1 |
| 🔒 Infrastructure | 15% | Scale, security, compliance |

**What Investors Get:**
- 📈 Equity in a high-growth EdTech startup
- 🌏 Access to the $15B+ global financial literacy market
- 🎯 First-mover advantage in teen investment education
- 💡 Social impact + financial returns

---

#### 🎁 Donations Welcome

Not looking to invest? **Donations of any size** help us:

| Amount | Impact |
|--------|--------|
| ☕ $10 | Provides 1 student with premium features for 1 month |
| 📚 $50 | Sponsors a classroom competition |
| 🏫 $250 | Funds 1 school partnership setup |
| 🚀 $1,000 | Enables 100 students to access full curriculum |
| 🌟 $5,000 | Names a historical mission module |

**Every dollar goes directly to expanding access.**

---

### 📊 The Opportunity

| Market | Size | Our Target |
|--------|------|------------|
| 🇦🇺 Australia (12-18) | 1.8M teens | 100K users by 2027 |
| 🌏 Asia-Pacific | 200M+ teens | 1M users by 2028 |
| 🌍 Global | 1.2B teens | 10M users by 2030 |

**Projected Impact:**
- 💡 **$10,000+** average lifetime savings per educated teen
- 📈 **45%** improvement in financial literacy scores
- 🎓 **Millions** of young investors making smarter decisions

---

### 💖 Sponsor Us on GitHub

<p align="center">
  <a href="https://github.com/sponsors/nuvc-ai">
    <img src="https://img.shields.io/badge/Sponsor_on_GitHub-💖_Support_MiniFi-EA4AAA?style=for-the-badge&logo=github-sponsors&logoColor=white" alt="GitHub Sponsors"/>
  </a>
</p>

<p align="center">
  <strong>🎉 GitHub covers all fees — 100% of your donation goes to MiniFi!</strong>
</p>

**Sponsorship Tiers:**

| Tier | Amount | Perks |
|------|--------|-------|
| ☕ **Supporter** | $5/month | Shoutout on README, early feature access |
| 🌟 **Champion** | $10/month | Above + monthly progress updates |
| 🚀 **Patron** | $25/month | Above + name in app credits |
| 💎 **Benefactor** | $50/month | Above + quarterly video call with team |
| 🏆 **Founding Sponsor** | $100/month | Above + input on roadmap priorities |

**One-Time Donations:** Also available via GitHub Sponsors!

---

**Other Ways to Support:**
- 🤝 **In-Kind:** Cloud credits, design work, mentorship welcome!
- 📧 **Contact:** hello@nuvc.ai

---

### 📬 Get In Touch

<p align="center">

| Purpose | Contact |
|---------|---------|
| 💼 **Investment Inquiries** | hello@nuvc.ai |
| 🤝 **Partnerships** | hello@nuvc.ai |
| 🎁 **Donations** | hello@nuvc.ai |
| 📧 **General** | hello@nuvc.ai |

</p>

---

### 🌟 Join the Movement

> *"The best time to teach someone to invest was 20 years ago. The second best time is now."*

Whether you're an **investor**, **educator**, **parent**, or **someone who believes in equal opportunity** — we'd love to hear from you.

**Together, we can democratize investment education and change the financial future for an entire generation.** 🚀

<p align="center">
  <a href="mailto:hello@nuvc.ai">
    <img src="https://img.shields.io/badge/📩_Contact_Us-hello@nuvc.ai-blue?style=for-the-badge" alt="Contact"/>
  </a>
</p>

---

## 🏢 About NUVC.AI

<p align="center">
  <strong>Where AI Meets Investment Intelligence</strong>
</p>

**[NUVC.AI](https://nuvc.ai)** is an **Entrepreneur in Residence (EiR)** at the prestigious **[Wade Institute of Entrepreneurship](https://wadeinstitute.org.au)**, serving as mentors and advisors specializing in **AI and robotic applications** and their **commercialization pathways**.

### 🤝 Our Ecosystem

NUVC.AI partners with **leading wealth management platforms for Family Offices**, applying cutting-edge AI to:
- 🎯 **Deal Making Intelligence** — AI-powered deal sourcing and evaluation
- 📊 **Private Investment Analytics** — Alternative investment intelligence
- 🔮 **Portfolio Optimization** — Data-driven wealth management strategies

### 👥 The Team

| | Founder | Role | Connect |
|---|---------|------|---------|
| 🚀 | **Tick** | Founder & CEO — AI/ML strategist with deep expertise in fintech and wealth management | [![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=flat&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/tickj/) |
| 🌟 | **Duan** | Co-Founder & CMO — Leading UX and Creative Director for world leading Brands and Marketing | [![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=flat&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/duantianyi/) |

### 💡 Our Mission

Beyond building products, **Tick** and **Duan** are deeply committed to **giving back** to the startup, venture capital, and broader innovation ecosystem. MiniFi represents this mission — **making family office investment strategies accessible to everyone**, starting with the next generation.

> *"We believe financial literacy shouldn't be a privilege. Every young person deserves the knowledge to build generational wealth."*

---

## 📄 License

**© 2025 NUVC.AI / Tick.AI. All Rights Reserved.**

This is an **MVP (Minimum Viable Product)** version created for the AWS AI Hackathon 2025.

This software is proprietary and confidential. Unauthorized copying, modification, distribution, or commercial use is strictly prohibited without explicit written permission from NUVC.AI.

See [LICENSE](LICENSE) for full terms.

---

**Start your investment journey today with MiniFi!** 🚀💰

*Empowering the next generation of investors through AI-powered education.*

---

<p align="center">
  <strong>✨ Vibe-coded by <a href="https://tick.ai">Tick.AI</a> for <a href="https://nuvc.ai">NUVC.AI</a> ✨</strong><br>
  <sub>MVP Version • AWS AI Hackathon 2025 • Proprietary & Confidential</sub><br>
  <sub>Built with Amazon Q Developer & Kiro CLI</sub>
</p>
