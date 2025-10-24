import clientPromise from "@/lib-wkt3/wkt3db/mongo";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email, name, provider } = await req.json();

    // ✅ Basic validation — email aur provider hona chahiye
    if (!email || !provider) {
      return NextResponse.json(
        { success: false, error: "Missing email or provider" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const userDb = client.db("wkt3");
    const sessionDb = client.db("authSaaS");

    // ✅ Pehle check karo ki user exist karta hai ya nahi
    let user = await userDb.collection("users").findOne({ email });

    // ✅ Agar user mil gaya, toh provider mismatch check karo
    if (user && user.provider !== provider) {
      // ❌ Agar user pehle se kisi aur method se bind hai, toh login block karo
      return NextResponse.json(
        {
          success: false,
          error:
            "❌ This email is already linked to another login method. Please use the same method.",
        },
        { status: 403 }
      );
    }

    // ✅ Agar user nahi mila, toh naya user create karo
    let userId: ObjectId;
    if (!user) {
      const insert = await userDb.collection("users").insertOne({
        email,
        name,
        role: "user",
        provider, // ✅ Login method bind karna zaroori hai
        createdAt: new Date(),
      });
      userId = insert.insertedId;
      user = await userDb.collection("users").findOne({ _id: userId });
    } else {
      userId = user._id as ObjectId;
    }

    // ✅ Session create karo — audit info ke saath
    const sessionId = new ObjectId();
    await sessionDb.collection("sessions").insertOne({
      _id: sessionId,
      userId: userId,
      createdAt: new Date(),
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      method: "social",
      provider,
      audit: {
        ip: req.headers.get("x-forwarded-for") || "unknown",
        language: req.headers.get("accept-language") || "en",
        device: req.headers.get("user-agent") || "unknown",
        country: "IN", // ✅ Optional: geo lookup later
        currency: "INR", // ✅ Optional: geo lookup later
      },
    });

    // ✅ Secure cookie set karo
    const response = NextResponse.json({ success: true });
    response.cookies.set("wkt3-session", sessionId.toHexString(), {
      httpOnly: true,
      secure: false, // ✅ true in production
      path: "/",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (err) {
    console.error("❌ Social login error:", err);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
