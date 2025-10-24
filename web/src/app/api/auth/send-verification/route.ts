import { sendVerificationEmail } from "@/lib-wkt3/wkt3db/sendVerificationEmail";
import { findUserByEmail } from "@/lib-wkt3/wkt3db/userStore";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { email } = await req.json();
  const user = await findUserByEmail(email);

  if (!user || !user.verifyToken) {
    return NextResponse.json({ error: "User not found or already verified" }, { status: 404 });
  }

  await sendVerificationEmail(email, user.verifyToken);
  return NextResponse.json({ success: true });
}