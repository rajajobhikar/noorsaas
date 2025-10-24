import { NextResponse } from "next/server";
import { notifications } from "@/lib-wkt3/wkt3db/notificationStore";

export async function GET() {
  return NextResponse.json({ notifications });
}
