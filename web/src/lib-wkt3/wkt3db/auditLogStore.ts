import clientPromise from "./mongo";

export type AuditLog = {
  id: string;
  actorId: string;
  action: string;
  targetId?: string;
  context?: string;
  timestamp: number;
};

export const auditLogs: AuditLog[] = [];

// export function logAudit(entry: AuditLog) {
//   auditLogs.push(entry);
// }
export async function logAudit(entry: AuditLog) {
  const client = await clientPromise;
  const db = client.db("wkt3");
  await db.collection("auditLogs").insertOne(entry);

  // ✅ Emit to superadmin
  const io = (global as any).io;
  if (io) {
    io.emit("audit_update", entry);
    console.log("📡 Emitted audit:", entry.context);
  }
}