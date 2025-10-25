import { NextResponse } from "next/server";
import { gameHistory } from "@/lib-wkt3/wkt3db/gameHistoryStore";
import { users } from "@/lib-wkt3/authEngine/userStore";

export async function GET() {
  const totalUsers = users.length;
  const totalMatches = gameHistory.length;
  const wins = gameHistory.filter((g) => g.result === "win").length;
  const losses = gameHistory.filter((g) => g.result === "loss").length;

  return NextResponse.json({
    users: totalUsers,
    matches: totalMatches,
    wins,
    losses, 
  });
}
