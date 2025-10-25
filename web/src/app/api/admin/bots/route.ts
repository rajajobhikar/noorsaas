import { NextResponse } from "next/server";
import clientPromise from "@/lib-wkt3/wkt3db/mongo";

export async function GET() {
  const client = await clientPromise;
  const db = client.db("wkt3db"); // ✅ Confirmed
  const bots = await db.collection("status").find().toArray();

  const serializedBots = bots.map(bot => ({ ...bot, _id: bot._id.toString() }));

  return NextResponse.json(serializedBots);
}
