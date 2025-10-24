import { randomBytes } from "crypto";
import { findUserByEmail } from "./userStore";

export function generateResetToken(email: string): string {
  const token = randomBytes(16).toString("hex");
  const user = findUserByEmail(email);
  if (user) {
    user.resetToken = token;
    user.resetExpires = Date.now() + 10 * 60 * 1000;
    console.log("🔑 Reset token stored for:", email, token);
  }
  return token;
}
