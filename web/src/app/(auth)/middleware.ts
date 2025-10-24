import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ObjectId } from "mongodb";
import clientPromise from "@/lib-wkt3/wkt3db/mongo";

export async function middleware(req: NextRequest) {
  const sessionId = req.cookies.get("wkt3-session")?.value;
  const url = req.nextUrl;

  if (!sessionId) {
    console.log("❌ No session cookie");
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    const client = await clientPromise;
    const sessionDb = client.db("authSaaS");
    const userDb = client.db("wkt3");

    const session = await sessionDb.collection("sessions").findOne({
      _id: new ObjectId(sessionId),
    });

    if (!session || new Date() > new Date(session.expiresAt)) {
      console.log("❌ Invalid or expired session");
      return NextResponse.redirect(new URL("/login", req.url));
    }

    const user = await userDb.collection("users").findOne({
      _id: new ObjectId(session.userId), // ✅ Match ObjectId
    });

    if (!user) {
      console.log("❌ User not found in wkt3.users");
      return NextResponse.redirect(new URL("/login", req.url));
    }

    const role = user.role;
    if (role === "superadmin") {
      console.log("✅ Superadmin access granted");
      return NextResponse.next();
    }

    if (url.pathname.startsWith("/dashboard") && role === "user") {
      console.log("✅ User allowed to dashboard");
      return NextResponse.next();
    }

    if (url.pathname.startsWith("/admin") && role === "admin") {
      console.log("✅ Admin allowed to admin");
      return NextResponse.next();
    }

    console.log("❌ Role not allowed for this route");
    return NextResponse.redirect(new URL("/login", req.url));
  } catch (err) {
    console.error("❌ Middleware error:", err);
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
    matcher: [
    "/dashboard/:path*",
    "/admin/:path*",
    "/superadmin/:path*", // ✅ Protect new route
    "/login"
  ]
};
