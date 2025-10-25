"use client";
import { useState, useEffect } from "react";
import { useBotSocket } from "@/lib-wkt3/socket/hooks/useBotSocket";
import { BotStatus } from "@/types/Bot";

export default function BotDashboard() {
  const [bots, setBots] = useState<BotStatus[]>([]);

  useBotSocket(setBots);

  useEffect(() => {
    fetch("/api/admin/bots")
      .then((res) => res.json())
      .then((data: BotStatus[]) => setBots(data));
  }, []);

  return (
    <div>
      <h1>Bot Status</h1>
      {bots.length === 0 ? (
        <p>🚫 No bots online</p>
      ) : (
        <ul>
          {bots.map((b) => (
            <li key={b._id}>
              {b.name} — {b.status} — {b.task ?? "Idle"} —{" "}
              {new Date(b.lastPing).toLocaleTimeString()}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
