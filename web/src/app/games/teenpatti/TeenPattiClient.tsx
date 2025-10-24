"use client";

import { calculateTeenPattiWinnings } from "@/lib-wkt3/bettingLogic/teenPattiBetting";
import { createTeenPattiGame, dealTeenPattiCards, placeTeenPattiBet } from "@/lib-wkt3/gameEngine/teenpatti";


export default function TeenPattiClient() {
  const game = createTeenPattiGame(["u2", "u3"]);
  dealTeenPattiCards(game.id);

  placeTeenPattiBet(game.id, "u2", 400);
  placeTeenPattiBet(game.id, "u3", 400);

  const winnings = calculateTeenPattiWinnings(game.pot);

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-xl font-bold">Teen Patti Microservice</h1>
      <p>Table: {game.table}</p>
      <p>Pot: ₹{game.pot}</p>
      <p>Winnings after 15% commission: ₹{winnings}</p>

      <h2 className="text-lg font-semibold mt-4">Cards:</h2>
      <ul>
        {game.cards.map((c, i) => (
          <li key={i}>
            Player {c.playerId}: {c.hand.join(", ")}
          </li>
        ))}
      </ul>

      <h2 className="text-lg font-semibold mt-4">Bets:</h2>
      <ul>
        {game.bets.map((b, i) => (
          <li key={i}>
            Player {b.playerId} bet ₹{b.amount}
          </li>
        ))}
      </ul>
    </div>
  );
}
