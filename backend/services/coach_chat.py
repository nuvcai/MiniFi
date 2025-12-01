from __future__ import annotations
import os
import random
import asyncio
from typing import Dict, Optional

from openai import AsyncOpenAI, RateLimitError, APIStatusError, AuthenticationError

from models import CoachReplyRequest, CoachReplyResponse


class CoachChatService:

    PERSONALITY_NOTES: Dict[str, str] = {
        "Conservative Coach": (
            "You are Steady Sam, the Conservative Family Office Advisor. "
            "REWARD effort in exploring defensive asset classes (bonds, gold, REITs). "
            "Praise: 'You're exploring like a wealth manager!' 'Family offices think in generations!' "
            "Focus: Capital preservation across multiple asset classes. "
            "Celebrate trying new defensive assets, even if returns are modest."
        ),
        "Balanced Coach": (
            "You are Wise Wendy, the Balanced Family Office Strategist. "
            "REWARD effort in exploring different asset class combinations. "
            "Praise: 'You're thinking like a family office CIO!' 'Great effort diversifying!' "
            "Focus: Strategic allocation across 4-6 asset classes. "
            "Celebrate curiosity about asset class correlations."
        ),
        "Aggressive Coach": (
            "You are Adventure Alex, the Growth Family Office Advisor. "
            "REWARD effort in exploring high-growth asset classes (crypto, tech, emerging markets). "
            "Praise: 'Family offices built wealth exploring new frontiers!' 'Bold effort!' "
            "Focus: Calculated risks in growth assets. "
            "Celebrate trying innovative asset classes early."
        ),
        "Tech Coach": (
            "You are Tech Taylor, the Technology Family Office Expert. "
            "REWARD effort in exploring tech-focused asset classes. "
            "Praise: 'You're exploring the future like family offices do!' 'Great tech diversification effort!' "
            "Focus: Tech stocks, crypto, AI/cloud ETFs, but diversify within tech. "
            "Celebrate exploring different tech sectors."
        ),
    }

    MOCK_TEMPLATES = {
        "Conservative Coach": [
            "Great effort exploring defensive assets! Family offices preserve wealth by trying different asset classes like you just did. Keep exploring bonds, gold, and REITs!",
            "I love your curiosity! Trying this asset class shows you're thinking like a wealth manager. Family offices reward exploration, not just returns.",
            "Excellent effort! You're learning how this asset behaves - that's exactly what family offices do. Now try another defensive asset to compare!",
            "Your exploration effort is impressive! Family offices build knowledge across asset classes. Keep trying different defensive investments!",
        ],
        "Balanced Coach": [
            "Fantastic effort diversifying! You're exploring asset classes like a family office CIO. Try mixing this with 2-3 other asset classes next!",
            "Great strategic thinking! Family offices master asset allocation by trying everything. Your exploration effort is exactly right!",
            "I'm impressed by your curiosity! Exploring different asset classes is how family offices optimize. Keep experimenting with combinations!",
            "Excellent effort! You're building knowledge across asset classes. Family offices aim for 4-6 classes - keep exploring!",
        ],
        "Aggressive Coach": [
            "Bold exploration! Family offices built wealth by trying new asset classes early. Your effort in exploring growth assets is commendable!",
            "Love the courage! You're exploring like wealthy families do - trying high-growth assets. Keep that exploration energy going!",
            "Great effort! Family offices weren't afraid to explore crypto and tech early. Your curiosity about growth assets is spot-on!",
            "Impressive exploration! You're learning how growth assets behave. Family offices reward this kind of bold effort!",
        ],
        "Tech Coach": [
            "Excellent tech exploration! Family offices diversify within tech by trying different sectors. Your effort shows forward thinking!",
            "Great effort exploring tech assets! You're learning how innovation-focused investments work. Keep exploring AI, cloud, and semis!",
            "I love your curiosity about tech! Family offices explore all tech sectors. Your effort in learning is exactly right!",
            "Fantastic exploration! You're building knowledge of tech asset classes. Family offices reward this kind of strategic effort!",
        ],
        "default": [
            "Great effort exploring this asset class! Family offices learn by trying everything. Keep up the curiosity!",
            "Excellent exploration! You're building knowledge across asset classes. That's how family offices think!",
            "I love your effort! Trying different assets is how you learn. Family offices reward exploration!",
        ],
    }

    def __init__(self, api_key: Optional[str] = None, model: Optional[str] = None):
        api_key = api_key or os.getenv("OPENAI_API_KEY")
        self.model = model or os.getenv("OPENAI_MODEL", "gpt-4o-mini")

        self.client: Optional[AsyncOpenAI] = None
        if api_key:
            self.client = AsyncOpenAI(api_key=api_key)
        else:
            print("[CoachChat] OPENAI_API_KEY not set → will use mock replies")

    def build_system_prompt(self, style: Optional[str], name: Optional[str]) -> str:
        base = (
            "You are an AI financial coach teaching Australian teenagers (12–18) to invest like a family office.\n\n"
            "YOUR MISSION: Reward effort and exploration across asset classes.\n\n"
            "CORE PRINCIPLES:\n"
            "- REWARD EFFORT over outcomes - praise trying new asset classes\n"
            "- Teach FAMILY OFFICE thinking: multi-asset diversification, long-term wealth\n"
            "- Encourage EXPLORATION of stocks, bonds, ETFs, crypto, REITs, commodities\n"
            "- Celebrate CURIOSITY and STRATEGIC THINKING\n"
            "- Use phrases: 'You're thinking like a family office!' 'Great exploration effort!'\n"
            "- Focus on LEARNING through trying different asset classes\n"
            "- Keep responses 2-4 sentences, encouraging and educational\n\n"
            "FAMILY OFFICE PHILOSOPHY:\n"
            "- Diversify across 4-6+ asset classes, not just within one\n"
            "- Learn by exploring each asset class's behavior\n"
            "- Reward curiosity and experimentation\n"
            "- Think in decades, preserve capital, seek growth\n\n"
        )
        note = self.PERSONALITY_NOTES.get(style or name or "", 
            "REWARD effort in exploring different asset classes. Praise curiosity and strategic thinking.")
        return f"{base}{note}"

    def build_context_text(self, payload: CoachReplyRequest) -> str:
        positions = []
        total_value = payload.cash or 0.0
        
        if payload.portfolio:
            for asset, pos in payload.portfolio.items():
                if (pos.shares or 0) > 0:
                    price = pos.currentPrice if pos.currentPrice is not None else pos.avgPrice
                    value = (pos.shares or 0) * price
                    total_value += value
                    positions.append(f"{asset}: {pos.shares:.4f} @ ${price:.2f} (${value:.2f})")
        
        pos_str = "; ".join(positions) if positions else "(no positions)"
        cash_str = f"Cash: ${(payload.cash or 0.0):.2f}"
        total_str = f"Total Portfolio Value: ${total_value:.2f}"

        if payload.action:
            a = payload.action
            action_str = f"Latest: {a.type.upper()} {a.amount} {a.asset} @ ${(a.price or 0.0):.2f}"
        else:
            action_str = "(no recent trade)"

        return f"{total_str}. {cash_str}. Holdings: {pos_str}. {action_str}"

    def mock_reply(self, payload: CoachReplyRequest) -> str:
        style_key = payload.selectedCoach.style or payload.selectedCoach.name or "default"
        bank = self.MOCK_TEMPLATES.get(style_key, self.MOCK_TEMPLATES["default"]).copy()

        parts = []
        if payload.action:
            a = payload.action
            parts.append(f"You {a.type} {a.amount} {a.asset} at ${(a.price or 0.0):.2f}.")

        random.shuffle(bank)
        parts.append(bank[0])
        if len(bank) > 1 and random.random() < 0.5:
            parts.append(bank[1])

        if payload.userMessage and payload.userMessage.strip():
            tips = [
                "Think long-term: define a simple rule for entries and exits.",
                "Diversify across sectors or asset types to reduce single-position risk.",
                "Size positions so a single loss won't derail your plan.",
                "Review your portfolio weekly and rebalance if needed.",
            ]
            parts.append(random.choice(tips))

        return " ".join(parts)

    async def generate_reply(self, payload: CoachReplyRequest) -> CoachReplyResponse:
        if not self.client:
            print("[CoachChat] source=mock (no api key/client)")
            return CoachReplyResponse(reply=self.mock_reply(payload))

        system = self.build_system_prompt(payload.selectedCoach.style, payload.selectedCoach.name)
        context = self.build_context_text(payload)

        user_block = f"COACH: {payload.selectedCoach.style or payload.selectedCoach.name}\n\n"
        user_block += f"PORTFOLIO STATUS:\n{context}\n\n"
        
        if payload.userMessage and payload.userMessage.strip():
            user_block += f"PLAYER ASKS: {payload.userMessage.strip()}\n\n"
            user_block += "Respond in your unique coaching voice. Be specific, actionable, and educational. Keep it 2-4 sentences unless they need more detail."
        else:
            user_block += "The player just made a trade. Give a quick reaction in your coaching style (2-3 sentences) and one actionable tip."

        for attempt in range(3):
            try:
                resp = await self.client.chat.completions.create(
                    model=self.model,
                    temperature=0.8,
                    max_tokens=200,
                    presence_penalty=0.6,
                    frequency_penalty=0.3,
                    messages=[
                        {"role": "system", "content": system},
                        {"role": "user", "content": user_block},
                    ],
                )
                text = (resp.choices[0].message.content or "").strip()
                if not text:
                    print("[CoachChat] source=mock (empty openai content)")
                    return CoachReplyResponse(reply=self.mock_reply(payload))
                print("[CoachChat] source=openai")
                return CoachReplyResponse(reply=text)

            except RateLimitError as e:
                print(f"[CoachChat] rate_limit attempt={attempt+1} error={e}")
                if getattr(e, "code", None) == "insufficient_quota" or "insufficient_quota" in str(e).lower():
                    break
                await asyncio.sleep(1.5 ** attempt + random.random())

            except AuthenticationError as e:
                print(f"[CoachChat] auth error: {e}")
                break

            except APIStatusError as e:
                print(f"[CoachChat] api status error attempt={attempt+1} http={getattr(e, 'status_code', None)} {e}")
                await asyncio.sleep(1.2 ** attempt + 0.2)

            except Exception as e:
                print(f"[CoachChat] unexpected error: {e}")
                break

        print("[CoachChat] source=mock (fallback after retries)")
        return CoachReplyResponse(reply=self.mock_reply(payload))
