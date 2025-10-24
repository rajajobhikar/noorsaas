const tokens: Record<string, string> = {};

export function generateVerificationToken(userId: string): string {
  const token = `t${Date.now()}-${Math.floor(Math.random() * 100000)}`;
  tokens[token] = userId;
  return token;
}

export function verifyToken(token: string): string | null {
  return tokens[token] || null;
}
