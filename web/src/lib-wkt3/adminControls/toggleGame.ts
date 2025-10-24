type GameStatus = Record<string, boolean>; // e.g., { dream11: true, poker: false }

export const gameStatus: GameStatus = {
  dream11: true,
  poker: true,
  teenPatti: true,
  kabaddi: true,
};

export function toggleGame(game: string): void {
  gameStatus[game] = !gameStatus[game];
}
