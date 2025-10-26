export interface FlairEvent {
  flair: string;
  timestamp: string;
  reason?: string;
}

export interface BotStatus {
  _id: string;
  name: string;
  status: "online" | "offline" | "idle" | "busy";
  task?: string;
  lastPing: string;
  avatar?: string; // URL or emoji
  personality?: {
    flair?: string;
    interests?: string[];
    trustLevel?: "verified" | "fair" | "trusted";
    flairHistory?: FlairEvent[]; // ✅ Add this
  };
  services?: {
    name: string;
    description: string;
    verified: boolean;
  }[];
  auditLogs?: import("@/types/AuditLog").AuditLog[];
}
