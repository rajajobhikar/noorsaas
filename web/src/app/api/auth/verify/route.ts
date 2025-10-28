import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib-wkt3/wkt3db/mongo";
import { ObjectId } from "mongodb"; // ✅ FIXED: Import ObjectId

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const token = searchParams.get("token");

    if (!token) {
      return NextResponse.json({ error: "Missing token" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("wkt3");

    const record = await db.collection("emailTokens").findOne({ token });
    if (!record || record.expiresAt < new Date()) {
      return NextResponse.json(
        { error: "Invalid or expired token" },
        { status: 400 }
      );
    }

    // ✅ Update user verification
    const users = db.collection("users");
    const user = await users.findOne({ email: record.email }); // ✅ FIXED: Get user before using user._id
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    await users.updateOne(
      { email: record.email },
      { $set: { verified: true } }
    );

    // ✅ Create session
    const sessionId = new ObjectId();
    await db.collection("sessions").insertOne({
      _id: sessionId,
      userId: user._id, // ✅ FIXED: user is defined
      createdAt: new Date(),
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });

    // ✅ Delete token after use
    await db.collection("emailTokens").deleteOne({ token });

    // ✅ Redirect with session cookie
    const response = NextResponse.redirect(
      "http://localhost:3000/login?verified=true"
    );
    response.cookies.set("wkt3-session", sessionId.toHexString(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (err) {
    console.error("❌ Verification error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
