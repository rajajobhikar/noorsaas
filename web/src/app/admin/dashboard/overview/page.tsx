"use client";
import { useEffect, useState } from "react";

export default function OverviewDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalMatches: 0,
    activeDisputes: 0,
    topSkill: 0,
  });

  useEffect(() => {
    fetch("/api/admin/overview")
      .then((res) => res.json())
      .then((data) => setStats(data));
  }, []);

  const cards = [
    {
      label: "👥 Total Users",
      value: stats.totalUsers,
      color: "from-blue-500 to-indigo-500",
    },
    {
      label: "🎮 Total Matches",
      value: stats.totalMatches,
      color: "from-green-500 to-teal-500",
    },
    {
      label: "🛡️ Active Disputes",
      value: stats.activeDisputes,
      color: "from-red-500 to-pink-500",
    },
    {
      label: "🏆 Top Skill Rating",
      value: stats.topSkill,
      color: "from-purple-500 to-fuchsia-500",
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">📊 Admin Overview</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, i) => (
          <div
            key={i}
            className={`bg-gradient-to-br ${card.color} text-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition transform hover:scale-105`}
          >
            <p className="text-lg font-semibold">{card.label}</p>
            <p className="text-3xl font-bold mt-2">{card.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
