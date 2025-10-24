import { users } from "@/lib-wkt3/wkt3db/userStore";

export function findPokerMatch(userId: string, tolerance = 100) {
  const user = users.find((u) => u.id === userId);
  if (!user) return null;

  const candidates = users.filter(
    (u) =>
      u.id !== userId &&
      u.verified &&
      !u.banned &&
      Math.abs(u.skillRating - user.skillRating) <= tolerance
  );

  candidates.sort(
    (a, b) =>
      Math.abs(a.skillRating - user.skillRating) -
      Math.abs(b.skillRating - user.skillRating)
  );

  return candidates[0] || null;
}
