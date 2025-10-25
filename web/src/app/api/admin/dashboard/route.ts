import { getSession } from "@/lib-wkt3/auth/getSession";

export async function POST() {
  const session = await getSession();
  if (!session || session.user.role !== "superadmin") {
    return Response.json(
      { error: "❌ Forbidden: Superadmin only" },
      { status: 403 }
    );
  }

  console.log("✅ Verified superadmin:", session.user);

  // Continue with dashboard logic...
  return Response.json({
    success: true,
    message: "Superadmin dashboard data loaded",
    user: session.user,
  });
}
