/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from "react";

export default function LeaderboardPage() {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    fetch("/api/leaderboard")
      .then((res) => res.json())
      .then((data) => setPlayers(data.leaderboard));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">🏆 Leaderboard</h1>
      <ol className="space-y-2">
        {players.map((p: any, i: number) => (
          <li key={p.id} className="bg-white p-4 rounded shadow">
            <strong>#{i + 1}</strong> {p.email} — 🎯 {p.skillRating}
          </li>
        ))}
      </ol>
    </div>
  );
}
