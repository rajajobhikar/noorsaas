import { NextRequest, NextResponse } from "next/server";
import { setOTP } from "@/lib-wkt3/wkt3db/otpStore";

export async function POST(req: NextRequest) {
  const { mobile } = await req.json();
  if (!mobile) {
    return NextResponse.json(
      { error: "Mobile number required" },
      { status: 400 }
    );
  }

  const code = setOTP(mobile);
  console.log(`📲 OTP for ${mobile}: ${code}`); // Replace with bot delivery later

  return NextResponse.json({ success: true, otp: code });
}
