export async function registerDevice(userId: string, serial: string) {
  const res = await fetch("/api/backend/register-device", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user_id: userId, serial }),
  });
  console.log("🔥 register-device API HIT");
  return res.json();
}
