export interface LeaderboardEntry {
  id: string;
  username: string;
  targetPhrase: string;
  timeTaken: number; // in seconds
  generations: number;
  populationSize: number;
  timestamp: number;
}
