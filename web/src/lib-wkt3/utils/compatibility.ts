import { BotStatus } from "@/types/Bot";
import { calculateTrustScore } from "./trustScore";

export function calculateCompatibility(
  botA: BotStatus,
  botB: BotStatus
): number {
  let score = 0;

  // Flair match
  if (botA.personality?.flair === botB.personality?.flair) score += 30;

  // Shared interests
  const interestsA = botA.personality?.interests ?? [];
  const interestsB = botB.personality?.interests ?? [];
  const shared = interestsA.filter((i) => interestsB.includes(i));
  score += shared.length * 10;

  // Trust level match
  if (botA.personality?.trustLevel === botB.personality?.trustLevel)
    score += 20;

  // Trust score proximity
  const trustA = calculateTrustScore(botA.auditLogs ?? []);
  const trustB = calculateTrustScore(botB.auditLogs ?? []);
  const diff = Math.abs(trustA - trustB);
  score += Math.max(0, 20 - diff); // closer scores = higher compatibility

  return Math.min(score, 100);
}
