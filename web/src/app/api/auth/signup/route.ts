export const runtime = "nodejs";
import { NextRequest, NextResponse } from "next/server";
import { addUser, findUserByEmail } from "@/lib-wkt3/wkt3db/userStore";
import { createSession } from "@/lib-wkt3/wkt3db/sessionStore";
import { pushNotification } from "@/lib-wkt3/wkt3db/notificationStore";
import { User } from "@/types/User";
import bcrypt from "bcryptjs";
import crypto from "crypto";

function generateSerial(): string {
  const prefix = "WKT3";
  const timestamp = Date.now().toString().slice(-6);
  const random = Math.floor(Math.random() * 1000)
    .toString()
    .padStart(3, "0");
  return `${prefix}-${timestamp}-${random}`;
}

export async function POST(req: NextRequest) {
  try {
    const form = await req.formData();
    const name = form.get("name")?.toString();
    const email = form.get("email")?.toString()?.toLowerCase();
    const password = form.get("password")?.toString();
    const confirm = form.get("confirm")?.toString();
    const terms = form.get("terms")?.toString();

    if (!name || !email || !password || !confirm || terms !== "on") {
      return NextResponse.json(
        { error: "Missing fields or terms not accepted" },
        { status: 400 }
      );
    }

    if (password !== confirm) {
      return NextResponse.json(
        { error: "Passwords do not match" },
        { status: 400 }
      );
    }

    const existing = await findUserByEmail(email);
    if (existing) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 409 }
      );
    }

    const hashed = await bcrypt.hash(password, 10);
    const newUser: User = {
      id: `u${Date.now()}`,
      name,
      email,
      password: hashed,
      verified: false,
      verifyToken: crypto.randomUUID(),
      verifyExpires: Date.now() + 1000 * 60 * 60 * 24,
      role: email === "noorgoldfinance@gmail.com" ? "admin" : "user",
      serial: generateSerial(),
      skillRating: 1000,
      fairness: {
        verified: false,
        cleanRecord: true,
        skillLevel: "rookie",
        activeSince: Date.now(),
      },
    };

    await addUser(newUser);

    const token = await createSession(newUser.id, newUser.role);

    await pushNotification({
      id: `n${Date.now()}`,
      type: "signup",
      message: `🎉 New user signed up: ${email}`,
      timestamp: Date.now(),
    });

    return NextResponse.json({ success: true, token, user: newUser });
  } catch (err) {
    console.error("❌ Signup error:", err);
    return NextResponse.json({ error: "Signup failed" }, { status: 500 });
  }
}
