import { NextRequest, NextResponse } from "next/server";
import { users } from "@/lib-wkt3/wkt3db/userStore";
import { generateResetToken } from "@/lib-wkt3/wkt3db/generateResetToken";
import { sendResetEmail } from "@/lib-wkt3/wkt3db/sendResetEmail";

export async function POST(req: NextRequest) {
  const { email } = await req.json();
  const user = users.find((u) => u.email === email);

  if (!user) {
    return NextResponse.json({
      redirect: "/signup",
      message:
        "You're not part of our platform yet 💙 Please sign up to continue.",
    });
  }

  if (!user.verified) {
    return NextResponse.json({
      redirect: "/verify",
      message: "Please verify your email before resetting your password.",
    });
  }

  const token = generateResetToken(email);
  if (!token) {
    return NextResponse.json(
      { error: "Failed to generate reset token" },
      { status: 500 }
    );
  }

  await sendResetEmail(email, token);
  return NextResponse.json({
    success: true,
    message: "Reset link sent to your email.",
  });
}
