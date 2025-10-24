"use client";
import { useEffect, useState } from "react";
import io from "socket.io-client";

// Add a Session type so the empty-array state isn't inferred as never[]
type Session = {
  _id: string;
  email: string;
  method: string;
  createdAt: string;
  role?: string;
  expiresAt: number;
};

const socket = io(undefined, { path: "/api/socketio" });

export default function SessionGuard() {
  // use a typed state instead of letting [] infer never[]
  const [sessions, setSessions] = useState<Session[]>([]);

  // ✅ Initial fetch + socket listener setup
  useEffect(() => {
    fetch("/api/superadmin/sessions")
      .then((res) => res.json())
      .then((data) => setSessions(data as Session[]));

    // type the incoming session so prev is correctly inferred
    socket.on("new-session", (session: Session) => {
      setSessions((prev) => [session, ...prev]);
    });

    // session-logout sends an id (string)
    socket.on("session-logout", (sessionId: string) => {
      setSessions((prev) => prev.filter((s) => s._id !== sessionId));
    });

    return () => {
      socket.off("new-session");
      socket.off("session-logout");
    };
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">🛡️ Session Guard</h1>
      <ul className="space-y-2">
        {sessions.map((s: Session) => (
          <li key={s._id} className="border p-3 rounded bg-gray-50">
            {/* ✅ User info dikhana */}
            <div className="font-semibold">{s.email}</div>
            <div className="text-sm text-gray-600">Method: {s.method}</div>
            <div className="text-xs text-gray-400">
              {new Date(s.createdAt).toLocaleString()}
            </div>

            {/* ✅ Status badge dikhana */}
            <div className="mt-2 flex gap-2">
              {s.role === "superadmin" && (
                <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded">
                  🔥 Superadmin
                </span>
              )}
              {s.expiresAt < Date.now() && (
                <span className="px-2 py-1 bg-gray-200 text-gray-600 text-xs rounded">
                  ⏳ Expired
                </span>
              )}
              {s.expiresAt >= Date.now() && (
                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">
                  ✅ Active
                </span>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
