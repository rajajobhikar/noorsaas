import { findMatch } from "@/lib-wkt3/wkt3db/matchmaking/findMatch";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { userId, tolerance } = await req.json();
  const match = findMatch(userId, tolerance || 100);

  if (!match) {
    return NextResponse.json(
      { error: "No suitable match found" },
      { status: 404 }
    );
  }
  return NextResponse.json({ match });
}
