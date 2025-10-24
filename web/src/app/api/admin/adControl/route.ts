import { NextRequest, NextResponse } from "next/server";
import { users } from "@/lib-wkt3/wkt3db/userStore";
import { logAudit } from "@/lib-wkt3/wkt3db/auditLogStore";

export async function POST(req: NextRequest) {
  const { userId, action, value } = await req.json();
  const user = users.find((u) => u.id === userId);
  if (!user)
    return NextResponse.json({ error: "User not found" }, { status: 404 });

  if (!user.manualOverride) user.manualOverride = {};

  switch (action) {
    case "verify":
      user.manualOverride.verified = value;
      break;
    case "promote":
      user.manualOverride.skillLevel = value;
      break;
    case "role":
      user.manualOverride.role = value;
      break;
    default:
      return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  }

  logAudit({
    id: `a${Date.now()}`,
    actorId: "admin",
    action,
    targetId: userId,
    context: `Manual override: ${action} → ${value}`,
    timestamp: Date.now(),
  });

  return NextResponse.json({ success: true });
}
