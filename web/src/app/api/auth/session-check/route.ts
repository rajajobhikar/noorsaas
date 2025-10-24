import { getSessionUser } from "@/lib/session/getSession";
import { NextResponse } from "next/server";

export async function POST() {
  const user = await getSessionUser();

  if (!user) return NextResponse.json({ valid: false });

  return NextResponse.json({
    valid: true,
    serial: user.id,
    email: user.email,
    role: user.role,
  });
}
