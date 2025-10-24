import { NextResponse } from "next/server";
import { users } from "@/lib-wkt3/wkt3db/userStore";

export async function GET() {
  const top = users
    .filter((u) => !u.banned)
    .sort((a, b) => b.skillRating - a.skillRating)
    .slice(0, 20);

  return NextResponse.json({ leaderboard: top });
}
