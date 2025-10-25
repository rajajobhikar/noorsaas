"use client";
import { useState, useEffect } from "react";
import { useSessionSocket } from "@/lib-wkt3/socket/hooks/useSessionSocket";
import { Session } from "@/types/Session";

export default function SessionDashboard() {
  const [sessions, setSessions] = useState<Session[]>([]);

  useSessionSocket(setSessions); // ✅ Injected here

   useEffect(() => {
     fetch("/api/admin/sessions")
       .then((res) => res.json())
       .then((data: Session[]) => {
         console.log("📦 Initial sessions:", data); // ✅ Add this
         setSessions(data);
       });
   }, []);
  return (
    <div>
      <h1>Sessions</h1>
      {sessions.length === 0 ? (
        <p>🚫 No active sessions</p>
      ) : (
        <ul>
          {sessions.map((s) => (
            <li key={s._id}>
              {s.user?.name ?? s.userId} — {s.method} — {s.audit.device}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
