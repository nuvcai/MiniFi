export interface Reward {
  id: string;
  name: string;
  description: string;
  cost: number;
  image: string;
  partner: string;
}

export const rewardsStore: Reward[] = [
  {
    id: "jbhifi-20",
    name: "JB Hi-Fi Gift Card",
    description: "$20 to spend on tech, games, music - whatever you want! 🎮",
    cost: 200,
    image: "🎮",
    partner: "JB Hi-Fi",
  },
  {
    id: "woolworths-25",
    name: "Woolworths Gift Card",
    description: "$25 for snacks, drinks, or whatever munchies you're craving 🛒",
    cost: 250,
    image: "🛒",
    partner: "Woolworths",
  },
  {
    id: "spotify-premium",
    name: "Spotify Premium",
    description: "3 months of ad-free music - your playlists, your way 🎵",
    cost: 300,
    image: "🎵",
    partner: "Spotify",
  },
  {
    id: "event-cinemas",
    name: "Event Cinemas Tickets",
    description: "2 movie tickets - grab a friend and catch the latest blockbuster! 🎬",
    cost: 400,
    image: "🎬",
    partner: "Event Cinemas",
  },
  {
    id: "guzman-gomez",
    name: "Guzman y Gomez Meal",
    description: "Free burrito or bowl at GYG - treat yourself! 🌯",
    cost: 150,
    image: "🌯",
    partner: "Guzman y Gomez",
  },
  {
    id: "cotton-on-30",
    name: "Cotton On Voucher",
    description: "$30 to upgrade your fit with some fresh threads 👕",
    cost: 350,
    image: "👕",
    partner: "Cotton On",
  },
  {
    id: "boost-juice",
    name: "Boost Juice Cards",
    description: "5 free smoothies - that's a whole week of healthy vibes! 🥤",
    cost: 180,
    image: "🥤",
    partner: "Boost Juice",
  },
  {
    id: "rebel-sport-40",
    name: "Rebel Sport Voucher",
    description: "$40 for kicks, gear, or whatever keeps you moving ⚽",
    cost: 450,
    image: "⚽",
    partner: "Rebel Sport",
  },
];
