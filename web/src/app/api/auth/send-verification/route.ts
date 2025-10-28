"use server";
import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib-wkt3/wkt3db/mongo";
import nodemailer from "nodemailer";
import crypto from "crypto";

const domain = process.env.NEXT_PUBLIC_APP_URL;

const SMTP_SERVER_HOST = process.env.EMAIL_SERVER_HOST;
const SMTP_SERVER_USERNAME = process.env.EMAIL_SERVER_USER;
const SMTP_SERVER_PASSWORD = process.env.EMAIL_SERVER_PASSWORD;
const SITE_MAIL_RECIEVER = process.env.EMAIL_MAIL_RECIEVER;


export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("wkt3");
    const users = db.collection("users");

    const user = await users.findOne({ email: email.toLowerCase() });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const token = crypto.randomBytes(32).toString("hex");
    const expires = new Date(Date.now() + 1000 * 60 * 60); // 1 hour

    await db.collection("emailTokens").insertOne({
      email: email.toLowerCase(),
      token,
      expiresAt: expires,
    });
  
    const verifyUrl = `${domain}/verify?token=${token}`;
    // const verifyUrl = `${domain}/verify?token=${token}`;

  const transporter = nodemailer.createTransport({
    service: "smtp.hostinger.com",
    host: SMTP_SERVER_HOST,
    port: 465,
    secure: true,
    requireTLS: true,
    tls: {
      ciphers: "SSLv3",
    },
    auth: {
      user: SMTP_SERVER_USERNAME,
      pass: SMTP_SERVER_PASSWORD,
    },
  });

    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: email||SITE_MAIL_RECIEVER,
      subject: "Verify your email for WKT3",
      html: `
        <h2>Welcome to WKT3 🎉</h2>
        <p>Click below to verify your email:</p>
        <a href="${verifyUrl}">Verify Email</a>
      `,
    });

    console.log("✅ Verification email sent to:", email);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("❌ Email send error:", err);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
