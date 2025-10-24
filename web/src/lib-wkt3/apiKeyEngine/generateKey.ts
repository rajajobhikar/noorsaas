import { updateUser } from "../userManager/updateProfile";

export function generateApiKey(userId: string): string {
  const key = `key-${userId}-${Math.random().toString(36).slice(2, 10)}`;
  const secret = `secret-${Math.random().toString(36).slice(2, 12)}`;
  updateUser(userId, { apiKey: `${key}:${secret}` });
  return `${key}:${secret}`;
}
