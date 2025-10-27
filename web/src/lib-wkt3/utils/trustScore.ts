import { AuditLog } from "@/types/AuditLog";


export function calculateTrustScore(logs: AuditLog[]): number {
  const verifiedEvents = logs.filter((log) => log.verified);
  return Math.min(verifiedEvents.length * 10, 100);
}