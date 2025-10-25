import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib-wkt3/wkt3db/mongo";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log("📱 Device registration payload:", body);

    // ✅ Optional: Save to DB
    const client = await clientPromise;
    const db = client.db("devices");
    await db.collection("registry").insertOne({
      ...body,
      registeredAt: new Date(),
    });
    return NextResponse.json({
      success: true,
      message: "Device registered successfully",
    });
  } catch (err) {
    console.error("❌ Device registration error:", err);
    return NextResponse.json(
      { success: false, error: "Failed to register device" },
      { status: 500 }
    );
  }
}
