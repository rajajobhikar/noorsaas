import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib-wkt3/wkt3db/mongo";
import { ObjectId } from "mongodb";

export async function protectRoute(req: NextRequest) {
  const sessionId = req.cookies.get("wkt3-session")?.value;
  if (!sessionId) return NextResponse.redirect(new URL("/login", req.url));

  const client = await clientPromise;
  const db = client.db("wkt3");
  const session = await db
    .collection("sessions")
    .findOne({ _id: new ObjectId(sessionId) });

  if (!session) return NextResponse.redirect(new URL("/login", req.url));
  return null; // ✅ Session is valid
}
