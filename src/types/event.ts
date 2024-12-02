export type Event = {
  description: string;
  date: string;
  type: "Concert Event" | "Live Event" | "Event Week" | "Esports Event" | "Mini Event" | "Map Change" | "Seasonal Event" | "Collaboration" | "Game Mode Launch" | "Season Launch";
  image: string;
  source: string;
  concurrentPlayers?: number; // in millions
} 