export interface IProfile {
  userId?: string;
  clerkId: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;

  superpowers: string[]; 
  theme: "light" | "dark"; 
  starsGiven: number; 
  carsHelped: number;
  welcomeMessages: string[];
  leaderboardRank: number | null;

  createdAt?: Date;
  updatedAt?: Date;
}