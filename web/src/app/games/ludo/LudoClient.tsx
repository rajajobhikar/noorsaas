"use client";
import {
  createLudoGame,
  makeMove,
  placeLudoBet,
} from "@/lib-wkt3/gameEngine/ludo";
import { calculateLudoWinnings } from "@/lib-wkt3/bettingLogic/ludoBetting";

export default function LudoClient() {
  const game = createLudoGame(["u2", "u3"]);
  placeLudoBet(game.id, "u2", 300);
  placeLudoBet(game.id, "u3", 300);

  makeMove(game.id, "u2", 42);
  makeMove(game.id, "u3", 38);

  const winnings = calculateLudoWinnings(game.pot);

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-xl font-bold">Ludo Microservice</h1>
      <p>Board: {game.board}</p>
      <p>Pot: ₹{game.pot}</p>
      <p>Winnings after 15% commission: ₹{winnings}</p>
      <ul className="mt-4">
        {game.moves.map((m, i) => (
          <li key={i}>
            Player {m.playerId} moved to position {m.position}
          </li>
        ))}
      </ul>
    </div>
  );
}
