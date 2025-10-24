import { matchLogs, MatchLog } from './logMatch';

export function getMatchHistory(userId: string): MatchLog[] {
  return matchLogs.filter((m) => m.players.includes(userId));
}
