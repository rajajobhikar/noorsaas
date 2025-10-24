const sessions: Record<string, string> = {};


// lib-wkt3/authEngine/session.ts
export function createSession(userId: string): string {
  return `session-${userId}-${Date.now()}`;
}

export function getUserFromSession(token: string): string | null {
  return sessions[token] || null;
}