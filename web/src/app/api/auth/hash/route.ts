import { NextRequest, NextResponse } from "next/server";
import { randomBytes, scryptSync } from "crypto";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { password } = body;

    if (!password || typeof password !== "string") {
      return NextResponse.json(
        { error: "Missing or invalid password" },
        { status: 400 }
      );
    }

    const salt = randomBytes(16).toString("hex");
    const hash = scryptSync(password, salt, 64).toString("hex");
    const result = `${salt}:${hash}`;

    return NextResponse.json({ hashedPassword: result });
  } catch (err) {
    console.error("❌ Hashing error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
