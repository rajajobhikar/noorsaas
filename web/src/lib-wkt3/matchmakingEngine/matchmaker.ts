import { getRating } from "./rating";
import { getFairnessBoost } from "./fairnessBoost";

type MatchCandidate = { userId: string; region: string };

export function findMatch(
  player: MatchCandidate,
  pool: MatchCandidate[]
): string | null {
  const targetRating =
    getRating(player.userId) + getFairnessBoost(player.userId);
  const candidates = pool.filter(
    (p) => p.region === player.region && p.userId !== player.userId
  );

  let bestMatch: string | null = null;
  let smallestDiff = Infinity;

  for (const c of candidates) {
    const rating = getRating(c.userId) + getFairnessBoost(c.userId);
    const diff = Math.abs(rating - targetRating);
    if (diff < smallestDiff) {
      bestMatch = c.userId;
      smallestDiff = diff;
    }
  }

  return bestMatch;
}
