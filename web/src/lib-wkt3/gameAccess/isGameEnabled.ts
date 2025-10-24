const gameStatus: Record<string, boolean> = {
  dream11: true,
  poker: true,
  teenPatti: true,
  ludo: true,
  kabaddi: true, // ✅ correct spelling
};

export function isGameEnabled(game: string): boolean {
  return gameStatus[game] ?? false; // fallback to false if undefined
}
