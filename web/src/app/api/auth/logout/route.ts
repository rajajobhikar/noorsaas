import { cookies } from "next/headers";
import clientPromise from "@/lib-wkt3/wkt3db/mongo";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";
import { deleteSession } from "@/lib-wkt3/wkt3db/sessionStore";

export async function POST() {
  const sessionId = (await cookies()).get("wkt3-session")?.value;
  if (!sessionId) return NextResponse.json({ success: false });

  const client = await clientPromise;
  const sessionDb = client.db("authSaaS");

  // ✅ Find session by ID
  const session = await sessionDb.collection("sessions").findOne({
    _id: new ObjectId(sessionId),
  });

  if (!session) return NextResponse.json({ success: false });

  // ✅ Delete all sessions for this user
  await sessionDb.collection("sessions").deleteMany({
    userId: session.userId,
  });
  if (sessionId) await deleteSession(sessionId);
  return NextResponse.json({ success: true });

  // ✅ Expire cookie
  const response = NextResponse.json({ success: true });
  response.cookies.set("wkt3-session", "", {
    httpOnly: true,
    secure: false,
    path: "/",
    sameSite: "lax",
    expires: new Date(0),
  });

  return response;
}
