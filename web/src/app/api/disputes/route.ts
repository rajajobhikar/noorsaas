import { NextRequest, NextResponse } from "next/server";
import { addDispute } from "@/lib-wkt3/wkt3db/disputeStore";
import { pushNotification } from "@/lib-wkt3/wkt3db/notificationStore";

export async function POST(req: NextRequest) {
  const { userId, reason } = await req.json();

  const dispute = {
    id: `d${Date.now()}`,
    userId,
    reason,
    timestamp: Date.now(),
    resolved: false,
  };

  addDispute(dispute);

  pushNotification({
    id: `n${Date.now()}`,
    type: "dispute",
    message: `🚨 Dispute raised by ${userId}: ${reason}`,
    timestamp: Date.now(),
  });

  return NextResponse.json({ success: true });
}
