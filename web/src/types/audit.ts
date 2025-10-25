 interface AuditLog {
  id: string;
  actorId: string;
  action: string;
  targetId?: string;
  context?: string;
  timestamp: number;
}
export type { AuditLog };