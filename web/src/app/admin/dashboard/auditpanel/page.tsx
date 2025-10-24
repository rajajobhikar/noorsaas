/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from "react";

export default function AuditPanel() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    fetch("/api/admin/audit")
      .then((res) => res.json())
      .then((data) => setLogs(data.logs));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">🕵️ Admin Audit Panel</h1>
      <ul className="space-y-2">
        {logs.map((log: any) => (
          <li key={log.id} className="bg-white p-4 rounded shadow">
            <p>
              <strong>Action:</strong> {log.action}
            </p>
            <p>
              <strong>By:</strong> {log.actorId}
            </p>
            <p>
              <strong>Target:</strong> {log.targetId || "—"}
            </p>
            <p>
              <strong>Context:</strong> {log.context}
            </p>
            <p>
              <strong>Time:</strong> {new Date(log.timestamp).toLocaleString()}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
