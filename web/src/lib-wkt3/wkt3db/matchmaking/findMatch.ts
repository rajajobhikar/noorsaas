import { users } from "@/lib-wkt3/authEngine/userStore";

export function findMatch(userId: string, tolerance: number = 100) {
  const user = users.find((u) => u.id === userId);
  if (!user) return null;

  const candidates = users.filter(
    (u) =>
      u.id !== userId &&
      u.verified &&
      Math.abs(u.skillRating - user.skillRating) <= tolerance
  );

  if (candidates.length === 0) return null;

  // Sort by closest skill match
  candidates.sort(
    (a, b) =>
      Math.abs(a.skillRating - user.skillRating) -
      Math.abs(b.skillRating - user.skillRating)
  );

  return candidates[0]; // ✅ Best match
}
