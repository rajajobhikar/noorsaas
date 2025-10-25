"use client";
import { socket } from "@/lib-wkt3/socket/client";

export default function SuperadminPanel() {
  const triggerBadge = () => {
    socket.emit("badge_update", {
      userId: "abc123",
      badge: "verified",
    });
  };

  const triggerSession = () => {
    socket.emit("session_update", {
      _id: "sess456",
      userId: "abc123",
      method: "email",
      audit: {
        ip: "127.0.0.1",
        language: "en",
        device: "Chrome",
      },
      fairness: "trusted",
      expiresAt: new Date().toISOString(),
      createdAt: new Date(),
    });
  };

  const triggerBotStatus = () => {
    socket.emit("bot_status", {
      _id: "bot-001",
      name: "wkt3-bot",
      status: "online",
      task: "auditing",
      lastPing: new Date().toISOString(),
    });
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1 style={{ fontSize: "2rem", marginBottom: "1.5rem" }}>
        Superadmin Panel
      </h1>

      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
        <button
          onClick={triggerBadge}
          style={{
            padding: "0.75rem 1.5rem",
            backgroundColor: "#00b894",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          🏅 Push Verified Badge
        </button>

        <button
          onClick={triggerSession}
          style={{
            padding: "0.75rem 1.5rem",
            backgroundColor: "#0984e3",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          🪞 Push Session Update
        </button>

        <button
          onClick={triggerBotStatus}
          style={{
            padding: "0.75rem 1.5rem",
            backgroundColor: "#6c5ce7",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          🤖 Trigger Bot Status
        </button>
      </div>
    </div>
  );
}
