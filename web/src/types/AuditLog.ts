export interface AuditLog {
  _id: string;
  botId: string;
  userId: string;
  event: "booking" | "chat" | "service";
  detail: string;
  timestamp: string;
  verified?: boolean;
}
