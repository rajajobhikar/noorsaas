"use client";
import { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io(undefined, { path: "/api/socketio" });

// Add a minimal type for audit entries so the state is typed properly
type AuditLog = {
  action: string;
  targetId?: string;
  context?: string;
  timestamp: string | number;
  [key: string]: any;
};

export default function AuditMirror() {
  // use a typed array instead of untyped [] to avoid never[] inference
  const [logs, setLogs] = useState<AuditLog[]>([]);

  useEffect(() => {
    fetch("/api/superadmin/audit")
      .then((res) => res.json())
      // tell TS this is an AuditLog[] (adjust if your API shape differs)
      .then((data: AuditLog[]) => setLogs(data));

    // type the incoming socket entry
    socket.on("new-audit", (entry: AuditLog) => {
      setLogs((prev) => [entry, ...prev]);
    });

    return () => {
      socket.off("new-audit");
    };
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">🪞 Audit Mirror</h1>
      <ul className="space-y-2">
        {logs.map((log: any, i) => (
          <li key={i} className="border p-3 rounded bg-gray-50">
            <div className="font-semibold">
              {log.action} → {log.targetId}
            </div>
            <div className="text-sm text-gray-600">{log.context}</div>
            <div className="text-xs text-gray-400">
              {new Date(log.timestamp).toLocaleString()}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
