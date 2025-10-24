import { randomBytes, scryptSync, timingSafeEqual } from "crypto";

// Hash a password with a random salt
export function hashPassword(password: string): string {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

// Verify a password against a stored salt:hash
export function verifyPassword(password: string, stored: string): boolean {
  try {
    const [salt, hash] = stored.split(":");
    if (!salt || !hash) return false;

    const hashedInput = scryptSync(password, salt, 64);
    const storedBuffer = Buffer.from(hash, "hex");

    if (hashedInput.length !== storedBuffer.length) return false;

    return timingSafeEqual(hashedInput, storedBuffer);
  } catch (err) {
    console.error("❌ Password verification failed:", err);
    return false;
  }
}
