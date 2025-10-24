import { matchLogs } from './logMatch';

export function getReplay(matchId: string): string | null {
  const match = matchLogs.find((m) => m.matchId === matchId);
  return match?.replayUrl || null;
}