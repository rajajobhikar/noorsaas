 interface AuditLog {
   id: string;
   actorId: string;
   action: string;
   userId: string;
   meta?: Record<string, string>;
   targetId?: string;
   context?: string;
   timestamp: number;
 }
export type { AuditLog };