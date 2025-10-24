import { NextResponse } from "next/server";
import { auditLogs } from "@/lib-wkt3/wkt3db/auditLogStore";

export async function GET() {
  return NextResponse.json({ logs: auditLogs });
}
