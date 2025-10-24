// src/app/games/dream11/Dream11Client.tsx
"use client";
import {
  createDream11Team,
  simulateMatch,
} from "@/lib-wkt3/gameEngine/dream11";
import { calculateDream11Winnings } from "@/lib-wkt3/bettingLogic/dream11Betting";

export default function Dream11Client() {
  const players = [
    { id: "p1", name: "Virat", runs: 0 },
    { id: "p2", name: "Rohit", runs: 0 },
  ];

  const team = createDream11Team("Super Strikers", players);
  simulateMatch(team.id, "p1", 45);
  simulateMatch(team.id, "p2", 30);

  const winnings = calculateDream11Winnings(team.totalRuns);

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-xl font-bold">Dream11 Microservice</h1>
      <p>Team: {team.name}</p>
      <p>Total Runs: {team.totalRuns}</p>
      <p>Winnings after 15% commission: ₹{winnings}</p>
      <ul className="mt-4">
        {team.players.map((p) => (
          <li key={p.id}>
            {p.name} - Runs: {p.runs}
          </li>
        ))}
      </ul>
    </div>
  );
}
