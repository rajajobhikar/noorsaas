import { randomBytes } from "crypto";

export function generateIdentity(name: string, email: string): string {
  const serial = randomBytes(4).toString("hex"); // 8-digit hex
  return `${name.trim()}#${serial}@${email}`;
}
