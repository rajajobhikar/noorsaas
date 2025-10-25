import { NextResponse } from "next/server";
import clientPromise from "@/lib-wkt3/wkt3db/mongo";

export async function GET() {
  const client = await clientPromise;
  const db = client.db("audit");
  const logs = await db
    .collection("logs")
    .find()
    .sort({ timestamp: -1 })
    .limit(50)
    .toArray();

  return NextResponse.json(logs);
}
