import Link from "next/link";
import clientPromise from "@/lib-wkt3/wkt3db/mongo";
import { AuditLog } from "@/types/AuditLog";

export default async function AuditListPage() {
  const client = await clientPromise;
  const db = client.db("wkt3db");
  const logs = await db.collection<AuditLog>("audit").find().toArray();

  const grouped = logs.reduce((acc, log) => {
    acc[log.botId] = acc[log.botId] || [];
    acc[log.botId].push(log);
    return acc;
  }, {} as Record<string, AuditLog[]>);

  return (
    <div className="p-6 space-y-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold">Audit Logs by Bot</h1>
      {Object.keys(grouped).length === 0 ? (
        <p>No audit logs found</p>
      ) : (
        <ul className="space-y-2">
          {Object.entries(grouped).map(([botId, logs]) => (
            <li key={botId}>
              <Link
                href={`/audit/bot/${botId}`}
                className="block p-3 border rounded hover:bg-gray-50"
              >
                <div className="text-lg font-semibold">Bot ID: {botId}</div>
                <div className="text-sm text-gray-600">
                  {logs.length} events — Last:{" "}
                  {new Date(logs[0].timestamp).toLocaleString()}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
