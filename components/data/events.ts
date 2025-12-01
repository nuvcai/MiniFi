export interface FinancialEvent {
  year: number;
  title: string;
  description: string;
  impact: "negative" | "positive" | "mixed";
  difficulty: "beginner" | "intermediate" | "advanced" | "expert";
  unlocked: boolean;
  completed: boolean;
  reward: number;
  unlockRequirements: number[];
  unlockDescription?: string;
  image?: string;
  imageAlt?: string;
}

export const financialEvents: FinancialEvent[] = [
  {
    year: 1990,
    title: "Japan's Epic Market Crash",
    description:
      "Japan's property and stock prices went absolutely wild, then crashed hard - starting their 'Lost Decade' 📉",
    impact: "negative",
    difficulty: "beginner",
    unlocked: true,
    completed: false,
    reward: 100,
    unlockRequirements: [],
    image: "/images/japan.png",
    imageAlt: "japan",
  },
  {
    year: 1997,
    title: "Asia's Money Meltdown",
    description:
      "A financial crisis that started in Thailand and spread across Asia like wildfire 🔥",
    impact: "negative",
    difficulty: "intermediate",
    unlocked: true,
    completed: false,
    reward: 150,
    unlockRequirements: [],
    image: "/images/asian.png",
    imageAlt: "asian",
  },
  {
    year: 2000,
    title: "Dot-com Bubble Goes Pop!",
    description: "Internet company stocks went from hero to zero - Nasdaq dropped 78%! 💥",
    impact: "negative",
    difficulty: "intermediate",
    unlocked: true,
    completed: false,
    reward: 150,
    unlockRequirements: [],
    image: "/images/bubble.png",
    imageAlt: "bubble",
  },
  {
    year: 2008,
    title: "The Big Bank Breakdown",
    description:
      "When risky home loans went bad, it triggered a worldwide financial earthquake 🌍",
    impact: "negative",
    difficulty: "advanced",
    unlocked: true,
    completed: false,
    reward: 200,
    unlockRequirements: [1997, 2000],
    image: "/images/global.png",
    imageAlt: "global",
  },
  {
    year: 2020,
    title: "COVID Chaos & Recovery",
    description:
      "The pandemic shut down the world, markets went crazy, but then tech stocks took off! 🦠➡️🚀",
    impact: "mixed",
    difficulty: "advanced",
    unlocked: false,
    completed: false,
    reward: 250,
    unlockRequirements: [2008],
    unlockDescription:
      "Beat the 2008 mission first to unlock this challenge!",
    image: "/images/covid.png",
    imageAlt: "covid",
  },
  {
    year: 2025,
    title: "Today's Wild Ride",
    description: "AI revolution, crypto drama, and global uncertainty - welcome to now! 🎢",
    impact: "mixed",
    difficulty: "expert",
    unlocked: false,
    completed: false,
    reward: 300,
    unlockRequirements: [2020],
    unlockDescription:
      "Complete the COVID mission to face today's challenges!",
    image: "/images/inflation.png",
    imageAlt: "inflation",
  },
];
