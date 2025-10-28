export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib-wkt3/wkt3db/mongo";
import bcrypt from "bcryptjs";
import { ObjectId } from "mongodb";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, password, flair, interests } = body;

    if (
      !name ||
      typeof name !== "string" ||
      !email ||
      typeof email !== "string" ||
      !password ||
      typeof password !== "string" ||
      !flair ||
      typeof flair !== "string" ||
      !Array.isArray(interests)
    ) {
      console.log("❌ Invalid input format:", body);
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const userDb = client.db("wkt3");
    const users = userDb.collection("users");

    const existing = await users.findOne({ email: email.toLowerCase() });
    if (existing) {
      console.log("❌ Email already registered:", email);
      return NextResponse.json(
        { error: "Email already registered" },
        { status: 409 }
      );
    }

    const hashed = await bcrypt.hash(password, 10);
    const now = new Date();

    const newUser = {
      name,
      email: email.toLowerCase(),
      password: hashed,
      verified: false,
      role: "user",
      flair,
      interests,
      createdAt: now.toISOString(),
      auditLogs: [],
    };

    const result = await users.insertOne(newUser);
    const userId = result.insertedId;

    const sessionDb = client.db("authSaaS");
    const sessionId = new ObjectId();
    const expires = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

    await sessionDb.collection("sessions").insertOne({
      _id: sessionId,
      userId,
      createdAt: now,
      expiresAt: expires,
    });

    const response = NextResponse.json({
      success: true,
      user: {
        id: userId.toHexString(),
        email: newUser.email,
        role: newUser.role,
        flair: newUser.flair,
        interests: newUser.interests,
      },
    });
    //   httpOnly: true,
    //   secure: process.env.NODE_ENV === "production",
    //   path: "/",
    //   sameSite: "lax",
    //   maxAge: 60 * 60 * 24 * 7,
    // });
    console.log("✅ Custom user registered:", newUser.email);
    return response;
  } catch (err) {
    console.error("❌ Custom register error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}