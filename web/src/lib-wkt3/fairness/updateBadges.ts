import { users } from "@/lib-wkt3/wkt3db/userStore";
import { gameHistory } from "@/lib-wkt3/wkt3db/gameHistoryStore";

export function updateFairness(userId: string) {
  const user = users.find((u) => u.id === userId);
  if (!user) return;

  const history = gameHistory.filter((g) => g.userId === userId);
  const wins = history.filter((h) => h.result === "win").length;

  if (wins >= 50) user.fairness.skillLevel = "legend";
  else if (wins >= 20) user.fairness.skillLevel = "pro";
  else user.fairness.skillLevel = "rookie";
}
