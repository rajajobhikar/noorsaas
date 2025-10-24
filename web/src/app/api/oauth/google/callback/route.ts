import { addUser, findUserByEmail } from "@/lib-wkt3/wkt3db/userStore";
import clientPromise from "@/lib-wkt3/wkt3db/mongo";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const code = url.searchParams.get("code");
  if (!code) return new Response("Missing code", { status: 400 });

  const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code,
      client_id: process.env.GOOGLE_CLIENT_ID!,
      client_secret: process.env.GOOGLE_CLIENT_SECRET!,
      redirect_uri: "http://localhost:3000/api/oauth/google/callback",
      grant_type: "authorization_code",
    }),
  });

  const tokenData = await tokenRes.json();
  const accessToken = tokenData.access_token;

  const profileRes = await fetch(
    "https://www.googleapis.com/oauth2/v2/userinfo",
    {
      headers: { Authorization: `Bearer ${accessToken}` },
    }
  );

  const profile = await profileRes.json();
  const email = profile.email;
  if (!email) return new Response("Email not found", { status: 400 });

  // ✅ User lookup
  let user = await findUserByEmail(email);

  // ✅ Provider conflict check — agar user mil gaya aur provider match nahi karta
  if (user && (user as any).provider !== "google") {
 return NextResponse.redirect("http://localhost:3000/login-block");

  }

  // ✅ Agar user nahi mila toh create karo
  if (!user) {
    await addUser({
      name: profile.name || "Google User",
      email,
      password: "",
      verified: true,
      role: "user",
      provider: "google", // ✅ provider bind karo
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
    user = await findUserByEmail(email);
    if (!user) return new Response("User creation failed", { status: 500 });
  }

  const client = await clientPromise;
  const sessionDb = client.db("authSaaS");
  const sessionId = new ObjectId();

  await sessionDb.collection("sessions").insertOne({
    _id: sessionId,
    userId: user._id.toString(),
    createdAt: new Date(),
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    method: "social",
    provider: "google",
    audit: {
      ip: req.headers.get("x-forwarded-for") || "unknown",
      language: req.headers.get("accept-language") || "en",
      device: req.headers.get("user-agent") || "unknown",
      country: "IN",
      currency: "INR",
    },
  });

  const response = NextResponse.redirect("http://localhost:3000/dashboard");
  response.cookies.set("wkt3-session", sessionId.toHexString(), {
    httpOnly: true,
    secure: false,
    path: "/",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
  });
  return response;
}
