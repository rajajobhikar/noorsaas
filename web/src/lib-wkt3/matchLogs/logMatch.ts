export type MatchLog = {
  matchId: string;
  players: string[];
  winner: string;
  timestamp: number;
  replayUrl: string;
};

export const matchLogs: MatchLog[] = [];

export function logMatch(match: MatchLog): void {
  matchLogs.push(match);
}
