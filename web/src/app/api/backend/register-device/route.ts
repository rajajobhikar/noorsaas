import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // ✅ Optional: Save device info to DB
    console.log("📱 Device registered:", body);

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
