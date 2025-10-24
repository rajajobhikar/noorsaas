import { randomBytes } from "crypto";
import { findUserByEmail } from "./userStore";

export function generateEmailToken(email: string): string {
  const token = randomBytes(16).toString("hex");
  const user = findUserByEmail(email);
  if (!user) {
    console.log("❌ No user found for email:", email);
    return "";
  }
  user.verifyToken = token;
  user.verifyExpires = Date.now() + 10 * 60 * 1000;
  console.log("✅ Token stored for:", email, token);
  return token;
}
