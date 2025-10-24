import { User } from "../analyticsEngine/userStats";
import { users } from "../authEngine/userStore";

export function updateUser(id: string, updates: Partial<User>): boolean {
  const user = users.find(u => u.id === id);
  if (!user) return false;
  Object.assign(user, updates);
  return true;
}