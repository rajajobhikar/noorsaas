type LudoGame = {
  id: string;
  board: string;
  players: string[];
  moves: { playerId: string; position: number }[];
  pot: number;
};

const ludoGames: Record<string, LudoGame> = {};

export function deleteLudoGame(gameId: string): void {
  delete ludoGames[gameId];
}

export function createLudoGame(players: string[]): LudoGame {
  const id = `ludo-${Date.now()}`;
  const game: LudoGame = {
    id,
    board: "Classic Board",
    players,
    moves: [],
    pot: 0,
  };
  ludoGames[id] = game;
  return game;
}

export function makeMove(
  gameId: string,
  playerId: string,
  position: number
): void {
  const game = ludoGames[gameId];
  if (!game) return;
  
  // Check if player has already made a move
  const playerMove = game.moves.find(move => move.playerId === playerId);
  if (playerMove) return;
  
  game.moves.push({ playerId, position });
}

export function placeLudoBet(
  gameId: string,
  playerId: string,
  amount: number
): void {
  const game = ludoGames[gameId];
  if (!game) return;
  
  // Validate that player is part of the game
  if (!game.players.includes(playerId)) return;
  
  // Validate that amount is positive
  if (amount <= 0) return;
  
  game.pot += amount;
}
