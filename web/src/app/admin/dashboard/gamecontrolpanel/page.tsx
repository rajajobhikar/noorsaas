"use client";
import Link from "next/link";

const games = [
  {
    name: "Dream11",
    href: "/games/dream11",
    icon: "⚽",
    color: "bg-gradient-to-r from-green-400 to-blue-500",
  },
  {
    name: "Poker",
    href: "/games/poker",
    icon: "🃏",
    color: "bg-gradient-to-r from-purple-500 to-pink-500",
  },
  {
    name: "Teen Patti",
    href: "/games/teenpatti",
    icon: "🎴",
    color: "bg-gradient-to-r from-yellow-400 to-red-500",
  },
  {
    name: "Ludo",
    href: "/games/ludo",
    icon: "🎲",
    color: "bg-gradient-to-r from-indigo-500 to-cyan-500",
  },
  {
    name: "Kabaddi",
    href: "/games/kabaddi",
    icon: "🤼",
    color: "bg-gradient-to-r from-orange-400 to-rose-500",
  },
];

export default function GameControlPanel() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">
        🎮 Game Control Panel
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {games.map((game) => (
          <Link
            key={game.name}
            href={game.href}
            className={`${game.color} text-white rounded-xl p-6 shadow-lg transform transition hover:scale-105 hover:shadow-2xl`}
          >
            <div className="text-5xl mb-2">{game.icon}</div>
            <div className="text-xl font-semibold">{game.name}</div>
            <p className="text-sm mt-1 opacity-80">
              Manage settings, matches, and fairness
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
