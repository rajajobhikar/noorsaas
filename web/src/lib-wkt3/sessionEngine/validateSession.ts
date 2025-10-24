export function validateSession(token: string): string | null {
  console.log("🔍 Raw token:", token);
  const parts = token.split("-");
  if (parts[0] !== "session") {
    console.log("❌ Invalid prefix");
    return null;
  }
  console.log("✅ UID extracted:", parts[1]);
  return parts[1];
}