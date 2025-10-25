export interface BotStatus {
  _id: string;
  name: string;
  status: "online" | "offline" | "idle" | "busy";
  task?: string;
  lastPing: string;
  avatar?: string; // URL or emoji
  personality?: {
    flair: string;
    interests: string[];
    trustLevel: "verified" | "fair" | "trusted";
  };
}
