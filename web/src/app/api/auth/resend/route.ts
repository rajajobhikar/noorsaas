/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from "next/server";
import { findUserByEmail } from "@/lib-wkt3/wkt3db/userStore";
import { pushNotification } from "@/lib-wkt3/wkt3db/notificationStore";
import { generateVerificationToken } from "@/lib-wkt3/wkt3db/tokenStore";

export async function POST(req: NextRequest) {
  const form = await req.formData();
  const email = form.get("email")?.toString();

  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  const user = findUserByEmail(email);
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const token = generateVerificationToken(user.id);

  // TODO: Send email with link like `/auth/verify?token=${token}`
  // You can use nodemailer or any custom mailer here

  pushNotification({
    id: `n${Date.now()}`,
    type: "admin",
    message: `🔁 Verification link re-sent to ${email}`,
    timestamp: Date.now(),
  });

  return NextResponse.json({ success: true, message: "New link sent" });
}
