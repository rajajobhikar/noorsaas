type TeenPattiGame = {
  id: string;
  table: string;
  players: string[];
  pot: number;
  bets: { playerId: string; amount: number }[];
  cards: { playerId: string; hand: string[] }[];
};

const teenPattiGames: Record<string, TeenPattiGame> = {};

export function createTeenPattiGame(players: string[]): TeenPattiGame {
  const id = `tp-${Date.now()}`;
  const game: TeenPattiGame = {
    id,
    table: "Royal Table",
    players,
    pot: 0,
    bets: [],
    cards: [],
  };
  teenPattiGames[id] = game;
  return game;
}

export function dealTeenPattiCards(gameId: string): void {
  const game = teenPattiGames[gameId];
  if (!game) return;

  for (const playerId of game.players) {
    const hand = ["A♠", "K♦", "Q♣"]; // Simulated hand
    game.cards.push({ playerId, hand });
  }
}

export function placeTeenPattiBet(
  gameId: string,
  playerId: string,
  amount: number
): void {
  const game = teenPattiGames[gameId];
  if (!game) return;
  game.bets.push({ playerId, amount });
  game.pot += amount;
}
