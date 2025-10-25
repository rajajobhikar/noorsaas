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

  return (
    <div>
      <h1>Superadmin Panel</h1>
      <button onClick={triggerBadge}>Push Verified Badge</button>
      <button onClick={triggerSession}>Push Session Update</button>
    </div>
  );
}
