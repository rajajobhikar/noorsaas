import { protectRoute } from "@/lib-wkt3/middleware/session";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const redirect = await protectRoute(req);
  if (redirect) return redirect;

  // ✅ Continue with secure logic
}
