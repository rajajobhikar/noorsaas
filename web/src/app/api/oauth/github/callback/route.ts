import { addUser, findUserByEmail } from "@/lib-wkt3/wkt3db/userStore";
import clientPromise from "@/lib-wkt3/wkt3db/mongo";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const code = url.searchParams.get("code");
  if (!code) return new Response("Missing code", { status: 400 });

  // 🔁 GitHub se access token lo
  const tokenRes = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: { Accept: "application/json" },
    body: new URLSearchParams({
      client_id: process.env.GITHUB_CLIENT_ID!,
      client_secret: process.env.GITHUB_CLIENT_SECRET!,
      code,
    }),
  });

  const tokenData = await tokenRes.json();
  const accessToken = tokenData.access_token;
  if (!accessToken)
    return new Response("Failed to get access token", { status: 500 });

  // 👤 GitHub profile fetch karo
  const profileRes = await fetch("https://api.github.com/user", {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  const profile = await profileRes.json();

  // 📬 Primary email fetch karo
  const emailRes = await fetch("https://api.github.com/user/emails", {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  const emails = await emailRes.json();
  const primaryEmail = emails.find((e: any) => e.primary)?.email;
  const email = primaryEmail || profile.email;
  if (!email) return new Response("Email not found", { status: 400 });

  // 🔍 User find karo
  let user = await findUserByEmail(email);

  // 🔐 Provider conflict check — agar user mil gaya aur provider match nahi karta
  if (user && (user as any).provider !== "github") {
      return NextResponse.redirect("http://localhost:3000/login-block");

  }

  // 👤 Agar user nahi mila toh naya user banao
  if (!user) {
    user = await addUser({
      name: profile.name || "GitHub User",
      email,
      password: "",
      verified: true,
      role: "user",
      provider: "github", // ✅ provider bind karo
      serial: `WKT3-${Date.now().toString().slice(-6)}-${Math.floor(
        Math.random() * 1000
      )}`,
      skillRating: 1000,
      fairness: {
        verified: false,
        cleanRecord: true,
        skillLevel: "rookie",
        activeSince: Date.now(),
      },
    });
  }

  // 🧠 Session save karo
  const client = await clientPromise;
  const sessionDb = client.db("authSaaS");
  const sessionId = new ObjectId();

  await sessionDb.collection("sessions").insertOne({
    _id: sessionId,
    userId: user._id.toString(),
    createdAt: new Date(),
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    method: "social",
    provider: "github",
    audit: {
      ip: req.headers.get("x-forwarded-for") || "unknown",
      language: req.headers.get("accept-language") || "en",
      device: req.headers.get("user-agent") || "unknown",
      country: "IN",
      currency: "INR",
    },
  });

  // 🍪 Cookie set karo aur redirect karo
  const response = NextResponse.redirect("http://localhost:3000/dashboard");
  response.cookies.set("wkt3-session", sessionId.toHexString(), {
    httpOnly: true,
    secure: false, // ✅ true in production
    path: "/",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
  });
  return response;
}
