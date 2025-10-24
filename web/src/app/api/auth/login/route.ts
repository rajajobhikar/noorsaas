export const runtime = "nodejs"; // ✅ Required for bcrypt, crypto, MongoDB

import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib-wkt3/wkt3db/mongo";
import bcrypt from "bcryptjs";
import { ObjectId } from "mongodb";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password required" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const userDb = client.db("wkt3");
    const users = userDb.collection("users");

    const user = await users.findOne({ email: email.toLowerCase() });
    if (!user || !user.verified) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    const sessionDb = client.db("authSaaS");
    const sessionId = new ObjectId();
    const now = new Date();
    const expires = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

    await sessionDb.collection("sessions").insertOne({
      _id: sessionId,
      userId: user._id,
      createdAt: now,
      expiresAt: expires,
    });

    const response = NextResponse.json({
      success: true,
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
      },
    });

    response.cookies.set("wkt3-session", sessionId.toHexString(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (err) {
    console.error("❌ Login error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
