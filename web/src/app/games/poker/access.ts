import { findSession } from "@/lib-wkt3/wkt3db/sessionStore";
import { users } from "@/lib-wkt3/wkt3db/userStore";

export function validateAccess(token: string) {
  const session = findSession(token);
  if (!session) return { valid: false };

  const user = users.find((u) => u.id === session.userId);
  if (!user || user.banned) return { valid: false };

  return {
    valid: true,
    user,
    fairness: user.fairness,
    skill: user.skillRating,
  };
}
