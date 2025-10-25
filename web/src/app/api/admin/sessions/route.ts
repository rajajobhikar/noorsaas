import { NextResponse } from "next/server";
import clientPromise from "@/lib-wkt3/wkt3db/mongo";

export async function GET() {
  const client = await clientPromise;
  const db = client.db("sessions");
  const sessions = await db.collection("active").find().toArray();

  return NextResponse.json(sessions);
}
