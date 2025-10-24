"use client";
import { useEffect, useState } from "react";
import io from "socket.io-client";

export default function AuditList() {
  const [sessions, setSessions] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/superadmin/sessions")
      .then((res) => res.json())
      .then((data) => setSessions(data));

    const socket = io(undefined, { path: "/api/socketio" });

    socket.on("new-session", (newSession) => {
      setSessions((prev) => [newSession, ...prev]);
    });

    // changed: ensure cleanup returns void (no implicit return of socket.disconnect())
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">🧾 Superadmin Audit</h2>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th>Email</th>
            <th>Provider</th>
            <th>IP</th>
            <th>Device</th>
            <th>Country</th>
            <th>Currency</th>
            <th>Login Time</th>
          </tr>
        </thead>
        <tbody>
          {sessions.map((s, i) => (
            <tr key={i} className="border-t">
              <td>{s.email || "—"}</td>
              <td>{s.provider}</td>
              <td>{s.audit?.ip}</td>
              <td>{s.audit?.device}</td>
              <td>{s.audit?.country}</td>
              <td>{s.audit?.currency}</td>
              <td>{new Date(s.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
