# 🏆 MiniFi - Financial Literacy for the Next Generation

> **Empowering Australian Teens (12-18) with AI-Powered Investment Education**

A gamified investment education platform by **Tick.AI** that takes young learners on a journey through financial history, teaching real investment strategies through interactive missions and AI-powered coaching.

## 🎯 Project Overview

**MiniFi** is an innovative educational platform designed specifically for Australian teenagers aged 12-18. Players navigate through major financial events in history, make investment decisions, and learn from AI coaches while competing in real-time investment competitions.

Built for **NextGen AI Hackathon 2025** by Tick.AI.

### 🌟 Key Features

- **📚 Historical Financial Missions**: Journey through 35+ years of financial history (1990-2025)
- **🤖 AI-Powered Coaching**: Personalized investment advice teaching family office strategies
- **📊 Real-Time Trading Simulation**: Practice with virtual capital
- **🏆 Competitive Leaderboards**: Compete with players globally
- **📈 Advanced Analytics**: Performance charts and risk analysis
- **🎮 Gamified Learning**: XP system, achievements, and progressive unlocking
- **🎁 Real Rewards System**: Exchange XP for Australian brand gift cards
- **📱 Mobile-First Design**: Optimized for all devices

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
├── PerformanceChart.tsx      # Investment performance visualization
├── AICoach.tsx              # AI coaching interface
├── investment-competition.tsx # Competition setup
├── trading-dashboard.tsx    # Real-time trading interface
└── competition-results.tsx  # Results and leaderboards

backend/
├── main.py                  # FastAPI application
├── models.py               # Pydantic data models
├── database.py             # Database management
└── services/               # Business logic services
    ├── coach_service.py    # AI coaching (family office approach)
    └── coach_chat.py       # Real-time chat
```

## 🎯 AI Coaching - Family Office Approach

MiniFi teaches teens to invest like wealthy families:

### Core Philosophy
- **Reward Effort** over outcomes
- **Explore Asset Classes** (stocks, bonds, ETFs, crypto, REITs, commodities)
- **Think Long-Term** like family offices managing multi-generational wealth
- **Diversify Strategically** across 4-6+ asset classes

### AI Coach Personalities

#### Steady Sam (Conservative) 🛡️
- Focus: Capital preservation, defensive assets
- Language: "Steady as she goes," "Family offices think in generations"
- Teaches: Bonds, gold, dividend stocks, REITs

#### Wise Wendy (Balanced) ⚖️
- Focus: Strategic allocation, risk-adjusted returns
- Language: "Balance is key," "Diversification protects"
- Teaches: Mixed portfolios, asset correlations

#### Adventure Alex (Aggressive) 🚀
- Focus: Growth opportunities, calculated risks
- Language: "Go big," "Innovation pays off"
- Teaches: Growth stocks, crypto, emerging markets

#### Tech Taylor (Technology) 💻
- Focus: Tech-focused diversification
- Language: "Focus on the future," "Innovation drives wealth"
- Teaches: AI, cloud, semiconductors

## 📊 Performance Metrics

- **Total Return**: Overall portfolio performance
- **Sharpe Ratio**: Risk-adjusted returns
- **Volatility**: Portfolio risk measurement
- **Max Drawdown**: Maximum loss from peak
- **Annualized Return**: Yearly performance rate
- **Asset Class Exploration**: Track diversification progress

## 🚀 Recent Updates

### v1.0.0 - Family Office Edition
- ✅ AI Coach rewards effort and exploration
- ✅ Backend caching (10x faster price data)
- ✅ Mobile-optimized UI (44x44px touch targets)
- ✅ Request ID tracking for debugging
- ✅ Improved health checks
- ✅ Comprehensive documentation

---

## 🗺️ Product Roadmap

### Current: v1.0 MVP (December 2025)
> *Hackathon Release - Foundation*

| Feature | Status | Description |
|---------|--------|-------------|
| Historical Missions | ✅ Complete | 6 major financial events (1990-2025) |
| AI Coach System | ✅ Complete | 4 personalities with GPT-4o-mini |
| Trading Simulation | ✅ Complete | Real-time portfolio management |
| Performance Analytics | ✅ Complete | Sharpe ratio, volatility, drawdown |
| Mobile-First UI | ✅ Complete | Responsive design, touch-optimized |
| Leaderboards | ✅ Complete | Global competition rankings |

---

### v1.1 - Enhanced Learning (Q1 2026)
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
