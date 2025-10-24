import { randomBytes } from "crypto";

type EmailToken = { email: string; token: string; expires: number };
export const emailTokens: EmailToken[] = [];

export function generateEmailToken(email: string): string {
  const token = randomBytes(16).toString("hex");
  emailTokens.push({ email, token, expires: Date.now() + 10 * 60 * 1000 });
  return token;
}

export function verifyEmailToken(token: string): string | null {
  const entry = emailTokens.find(
    (t) => t.token === token && t.expires > Date.now()
  );
  return entry?.email || null;
}
