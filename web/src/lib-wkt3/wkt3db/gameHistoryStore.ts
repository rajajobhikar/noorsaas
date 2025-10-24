export type GameRecord = {
  id: string;
  userId: string;
  game: string;
  result: "win" | "loss" | "draw";
  opponentId?: string;
  timestamp: number;
};

export const gameHistory: GameRecord[] = [];

export function logGame(record: GameRecord) {
  gameHistory.push(record);
}
