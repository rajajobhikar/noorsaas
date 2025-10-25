import { NextResponse } from "next/server";
import clientPromise from "@/lib-wkt3/wkt3db/mongo";

export async function GET() {
  const client = await clientPromise;
  const db = client.db("wkt3");
  const logs = await db.collection("auditLogs").find().toArray();
  return NextResponse.json({ logs });
}
