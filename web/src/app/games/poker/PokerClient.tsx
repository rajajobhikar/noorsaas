"use client";
import { createTable, dealHand, placeBet } from "@/lib-wkt3/gameEngine/poker";
import { calculatePokerWinnings } from "@/lib-wkt3/bettingLogic/pokerBetting";

export default function PokerClient() {
  const table = createTable("High Stakes Table", ["u2", "u3"]);
  dealHand(table.id);

  placeBet(table.id, "u2", 500);
  placeBet(table.id, "u3", 500);

  const winnings = calculatePokerWinnings(table.pot);

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-xl font-bold">Poker Microservice</h1>
      <p>Table: {table.name}</p>
      <p>Pot: ₹{table.pot}</p>
      <p>Winnings after 15% commission: ₹{winnings}</p>
      <ul className="mt-4">
        {table.bets.map((b, i) => (
          <li key={i}>
            Player {b.playerId} bet ₹{b.amount}
          </li>
        ))}
      </ul>
    </div>
  );
}
