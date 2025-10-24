import { NextRequest, NextResponse } from "next/server";
import { users } from "@/lib-wkt3/wkt3db/userStore";
import { hashPassword } from "@/lib-wkt3/wkt3db/hashPassword";

export async function POST(req: NextRequest) {
  const { token, password } = await req.json();

  const user = users.find(
    (u) =>
      u.resetToken === token && u.resetExpires && u.resetExpires > Date.now()
  );

  if (!user) {
    return NextResponse.json(
      { error: "Invalid or expired token" },
      { status: 400 }
    );
  }

  user.password = hashPassword(password);
  user.resetToken = undefined;
  user.resetExpires = undefined;

  return NextResponse.json({ success: true });
}
