import { randomBytes } from "crypto";

export function generateSerial(): string {
  return randomBytes(4).toString("hex");
}
