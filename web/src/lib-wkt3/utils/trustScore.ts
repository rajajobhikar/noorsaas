import { AuditLog } from "@/types/AuditLog";

export function calculateTrustScore(logs: AuditLog[]): number {
  const verifiedEvents = logs.filter((log) => log.verified).length;
  const totalEvents = logs.length;
  if (totalEvents === 0) return 0;
  const score = (verifiedEvents / totalEvents) * 100;
  return Math.round(score);
}
