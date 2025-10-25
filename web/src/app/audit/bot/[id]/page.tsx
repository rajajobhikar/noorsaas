import clientPromise from "@/lib-wkt3/wkt3db/mongo";
import { AuditLog } from "@/types/AuditLog";

export default async function AuditBotPage({
  params,
}: {
  params: { id: string };
}) {
  const client = await clientPromise;
  const db = client.db("wkt3db");

  const logs = await db
    .collection<AuditLog>("audit")
    .find({ botId: params.id })
    .sort({ timestamp: -1 })
    .toArray();

  return (
    <div className="p-6 space-y-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold">Audit Trail for Bot</h1>
      {logs.length === 0 ? (
        <p>No audit logs found</p>
      ) : (
        <ul className="space-y-2">
          {logs.map((log) => (
            <li key={log._id} className="border p-3 rounded bg-white shadow">
              <div className="text-sm text-gray-700">
                [{log.event}] {log.detail}
              </div>
              <div className="text-xs text-gray-500">
                {new Date(log.timestamp).toLocaleString()}
                {log.verified && (
                  <span className="ml-2 text-green-600 font-semibold">
                    ✅ Verified
                  </span>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
