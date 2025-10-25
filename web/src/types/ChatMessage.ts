export interface ChatMessage {
  _id: string;
  from: "user" | "bot";
  userId: string;
  botId: string;
  text: string;
  timestamp: string;
  verified?: boolean;
}
