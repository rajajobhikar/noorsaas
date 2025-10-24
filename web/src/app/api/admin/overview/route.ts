import { NextResponse } from "next/server";
import { users } from "@/lib-wkt3/wkt3db/userStore";
import { gameHistory } from "@/lib-wkt3/wkt3db/gameHistoryStore";
import { disputes } from "@/lib-wkt3/wkt3db/disputeStore";

export async function GET() {
  const totalUsers = users.length;
  const totalMatches = gameHistory.length;
  const activeDisputes = disputes.filter((d) => !d.resolved).length;
  const topSkill = Math.max(...users.map((u) => u.skillRating || 0));

  return NextResponse.json({
    totalUsers,
    totalMatches,
    activeDisputes,
    topSkill,
  });
}
