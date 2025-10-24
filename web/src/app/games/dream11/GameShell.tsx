"use client";
import { useEffect, useState } from "react";
import { validateSession } from "@/lib-wkt3/sessionEngine/validateSession";
import { isGameEnabled } from "@/lib-wkt3/gameAccess/isGameEnabled";

export default function GameShell({ game }: { game: string }) {
  const [userId, setUserId] = useState<string | null>(null);
  const [access, setAccess] = useState(false);

  useEffect(() => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("session="))
      ?.split("=")[1];
    const uid = token ? validateSession(token) : null;
    setUserId(uid);
    setAccess(uid !== null && isGameEnabled(game));
  }, [game]);

  if (!access)
    return <p className="text-red-600">❌ Access denied or game disabled</p>;

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">{game.toUpperCase()} Game</h2>
      <p>✅ Welcome, {userId}</p>
      <p>Game logic will load here...</p>
    </div>
  );
}
