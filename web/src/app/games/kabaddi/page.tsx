"use client";
import { createKabaddiTeam, recordRaid } from "@/lib-wkt3/gameEngine/kabaddi";
import { calculateKabaddiWinnings } from "@/lib-wkt3/bettingLogic/kabaddiBetting";

export default function KabaddiPage() {
  const players = [
    { id: "p1", name: "Suraj", raids: 0, points: 0 },
    { id: "p2", name: "Manoj", raids: 0, points: 0 },
  ];

  const team = createKabaddiTeam("Raiders", players);
  recordRaid(team.id, "p1", true);
  recordRaid(team.id, "p2", false);
  recordRaid(team.id, "p1", true);

  const winnings = calculateKabaddiWinnings(team.totalPoints);

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-xl font-bold">Kabaddi Microservice</h1>
      <p>Team: {team.name}</p>
      <p>Total Points: {team.totalPoints}</p>
      <p>Winnings after 15% commission: ₹{winnings}</p>
      <ul className="mt-4">
        {team.players.map((p) => (
          <li key={p.id}>
            {p.name} - Raids: {p.raids} - Points: {p.points}
          </li>
        ))}
      </ul>
    </div>
  );
}
