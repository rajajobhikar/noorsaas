import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib-wkt3/wkt3db/mongo";
import { ObjectId } from "mongodb";

export async function GET(req: NextRequest) {
  try {
    const sessionId = req.cookies.get("wkt3-session")?.value;

    const client = await clientPromise;
    const db = client.db("wkt3");

    let userId: ObjectId | null = null;

    if (sessionId) {
      const session = await db
        .collection("sessions")
        .findOne({ _id: new ObjectId(sessionId) });
      if (session) {
        userId = session.userId;
      }
    }

    const bots = await db
      .collection("bots")
      .find({ verified: true })
      .project({
        _id: 1,
        name: 1,
        type: 1,
        avatar: 1,
        description: 1,
        trustScore: 1,
        ownerId: 1,
        isBookable: 1,
      })
      .toArray();

    return NextResponse.json({
      bots,
      viewer: userId ? userId.toHexString() : null,
    });
  } catch (err) {
    console.error("❌ Bot list error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
