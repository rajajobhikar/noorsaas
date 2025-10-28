import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib-wkt3/wkt3db/mongo";
import { ObjectId } from "mongodb";

export async function POST(req: NextRequest) {
  try {
    const sessionId = req.cookies.get("wkt3-session")?.value;
    if (!sessionId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const client = await clientPromise;
    const db = client.db("wkt3");

    const session = await db
      .collection("sessions")
      .findOne({ _id: new ObjectId(sessionId) });
    if (!session) {
      return NextResponse.json({ error: "Invalid session" }, { status: 401 });
    }

    const body = await req.json();
    const { botId } = body;

    if (!botId || botId.length < 10) {
      return NextResponse.json(
        { error: "Missing or invalid botId" },
        { status: 400 }
      );
    }

    const bot = await db
      .collection("bots")
      .findOne({ _id: new ObjectId(botId), verified: true });
    if (!bot) {
      return NextResponse.json(
        { error: "Bot not found or not verified" },
        { status: 404 }
      );
    }

    const booking = {
      _id: new ObjectId(),
      botId: bot._id,
      userId: session.userId,
      bookedAt: new Date(),
    };

    await db.collection("botBookings").insertOne(booking);

    await db.collection("auditLogs").insertOne({
      _id: new ObjectId(),
      type: "bot_booking",
      userId: session.userId,
      botId: bot._id,
      timestamp: new Date(),
      message: `User booked bot "${bot.name}"`,
    });

    return NextResponse.json({ success: true, bookingId: booking._id });
  } catch (err) {
    console.error("❌ Bot booking error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
