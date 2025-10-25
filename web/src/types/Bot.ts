export interface BotStatus {
  _id: string;
  name: string;
  status: "online" | "offline" | "idle" | "busy";
  task?: string;
  lastPing: string;
}
