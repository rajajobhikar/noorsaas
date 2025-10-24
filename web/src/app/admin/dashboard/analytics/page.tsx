"use client";
import { useEffect, useState } from "react";

export default function AnalyticsPanel() {
  const [stats, setStats] = useState({
    users: 0,
    matches: 0,
    wins: 0,
    losses: 0,
  });

  useEffect(() => {
    fetch("/api/admin/analytics")
      .then((res) => res.json())
      .then((data) => setStats(data));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">📊 Platform Analytics</h1>
      <ul className="space-y-2 text-lg">
        <li>👥 Total Users: {stats.users}</li>
        <li>🎮 Total Matches: {stats.matches}</li>
        <li>🏆 Wins: {stats.wins}</li>
        <li>💔 Losses: {stats.losses}</li>
      </ul>
    </div>
  );
}
