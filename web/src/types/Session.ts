import { User } from "./User";

export interface Session {
  _id: string;
  userId: string;
  expiresAt: string;
  serial?: string;
  user?: User;

  method: "social" | "email" | "magic";
  provider?: "google" | "github";
  audit: {
    ip: string;
    language: string;
    device: string;
    country?: string;
    currency?: string;
  };
  fairness: User["fairness"];
  createdAt: Date;
}
