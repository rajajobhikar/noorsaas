// src/app/games/dream11/Dream11Server.tsx
import { cookies } from "next/headers";

export default async function Dream11Server() {
  const session = (await cookies()).get("session")?.value;
  return <div>Session: {session}</div>;
}
