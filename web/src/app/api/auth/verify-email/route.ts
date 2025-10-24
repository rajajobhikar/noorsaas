import clientPromise from "@/lib-wkt3/wkt3db/mongo";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const token = req.nextUrl.searchParams.get("token");
    console.log("🔍 Incoming token:", token);

    if (!token || token.length < 10) {
      return NextResponse.redirect(new URL("/error?msg=Missing+token", req.url));
    }

    const client = await clientPromise;
    const db = client.db("wkt3");
    const users = db.collection("users");

    const user = await users.findOne({ verifyToken: { $eq: token } });
    if (!user) {
      return NextResponse.redirect(new URL("/error?msg=Invalid+or+expired+token", req.url));
    }

    await users.updateOne(
      { verifyToken: token },
      {
        $set: { verified: true },
        $unset: { verifyToken: "", verifyExpires: "" },
      }
    );

    console.log("✅ Verified user:", user.email);
    return NextResponse.redirect(new URL("/login", req.url));
  } catch (err) {
    console.error("❌ Verification error:", err);
    return NextResponse.redirect(new URL("/error?msg=Server+error", req.url));
  }
}