export interface AICoach {
  id: string;
  name: string;
  personality: string;
  description: string;
  avatar: string;
  color: string;
  animatedAvatar: string;
}

export const aiCoaches: AICoach[] = [
  {
    id: "steady-sam",
    name: "Steady Sam",
    personality: "Safety First",
    description: "Your chill guide to safe investments - bonds, gold, and keeping your money secure 🛡️",
    avatar: "/avatars/conservative.png",
    color: "bg-blue-100 text-blue-800",
    animatedAvatar: "/gifs/conservative.gif",
  },
  {
    id: "growth-guru",
    name: "Growth Guru",
    personality: "Smart Mixer",
    description: "All about balance - mixing stocks, ETFs, and REITs like a pro DJ 🎧",
    avatar: "/avatars/balanced.png",
    color: "bg-green-100 text-green-800",
    animatedAvatar: "/gifs/balanced.gif",
  },
  {
    id: "adventure-alex",
    name: "Adventure Alex",
    personality: "Risk Taker",
    description: "Go big or go home! Crypto, growth stocks, and chasing those moonshots 🚀",
    avatar: "/avatars/aggressive.png",
    color: "bg-purple-100 text-purple-800",
    animatedAvatar: "/gifs/aggressive.gif",
  },
  {
    id: "yield-yoda",
    name: "Yield Yoda",
    personality: "Money Multiplier",
    description: "Master of passive income - let your money work while you sleep 💰",
    avatar: "/avatars/master.png",
    color: "bg-yellow-100 text-yellow-800",
    animatedAvatar: "/gifs/master.gif",
  },
];
