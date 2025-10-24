import { getAllSessions } from "@/lib-wkt3/wkt3db/sessionStore";
import { NextResponse } from "next/server";

export async function GET() {
  const sessions = await getAllSessions();
  return NextResponse.json(sessions);
}
