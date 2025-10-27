import { ObjectId } from "mongodb";
import { FairnessData } from "@/types/fairness";
import { AuditLog } from "./audit";

type User = {
  _id?: ObjectId;
  name: string;
  email: string;
  password: string;
  verified: boolean;
  resetToken?: string;
  verifyToken?: string;
  verifyExpires?: number;
  resetExpires?: number;
  provider?: "github" | "google";
  banned?: boolean;
  skillRating: number;
  serial: string;
  role: "user" | "admin" | "superadmin" | "mod ";
  fairness: FairnessData;
  flair?: string;
  trustLevel?: string;
  interests?: string[];
  auditLogs?: AuditLog[];
  manualOverride?: {
  verified?: boolean;
  skillLevel?: "rookie" | "pro" | "legend";
    role?: "user" | "admin" | "mod";
  };
  createdAt?: number;
};
export type { User };