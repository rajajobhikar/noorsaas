import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib-wkt3/wkt3db/mongo";
import { ObjectId } from "mongodb";

export async function POST(req: NextRequest) {
  try {
    const sessionId = req.cookies.get("wkt3-session")?.value;
    if (!sessionId)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const client = await clientPromise;
    const db = client.db("wkt3");

    const session = await db
      .collection("sessions")
      .findOne({ _id: new ObjectId(sessionId) });
    if (!session)
      return NextResponse.json({ error: "Invalid session" }, { status: 401 });

    const { name, type, description } = await req.json();
    if (!name || !type || !description) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const bot = {
      _id: new ObjectId(),
      name,
      type,
      description,
      ownerId: session.userId,
      verified: false,
      trustScore: 0,
      createdAt: new Date(),
    };

    await db.collection("bots").insertOne(bot);

    await db.collection("auditLogs").insertOne({
      _id: new ObjectId(),
      type: "bot_created",
      userId: session.userId,
      botId: bot._id,
      timestamp: new Date(),
      message: `User created bot "${name}"`,
    });

    return NextResponse.json({ success: true, botId: bot._id });
  } catch (err) {
    console.error("❌ Bot creation error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
