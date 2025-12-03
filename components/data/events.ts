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
    title: "Japan Bubble Burst",
    description: "The bubble that started a lost decade 📉",
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
    title: "Asian Currency Crisis",
    description: "When currencies collapsed across Asia 🔥",
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
    title: "Dot-com Crash",
    description: "Internet hype meets reality 💥",
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
    title: "Global Financial Crisis",
    description: "Banks failed, markets crashed 🌍",
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
    title: "COVID Market Chaos",
    description: "Pandemic panic to tech rally 🦠🚀",
    impact: "mixed",
    difficulty: "advanced",
    unlocked: false,
    completed: false,
    reward: 250,
    unlockRequirements: [2008],
    unlockDescription: "Complete 2008 first",
    image: "/images/covid.png",
    imageAlt: "covid",
  },
  {
    year: 2025,
    title: "AI Revolution",
    description: "Your era, your choices 🤖",
    impact: "mixed",
    difficulty: "expert",
    unlocked: false,
    completed: false,
    reward: 300,
    unlockRequirements: [2020],
    unlockDescription: "Complete 2020 first",
    image: "/images/inflation.png",
    imageAlt: "inflation",
  },
];
