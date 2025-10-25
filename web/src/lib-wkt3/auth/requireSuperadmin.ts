import { getSession } from "@/lib-wkt3/auth/getSession";

export async function requireSuperadmin() {
  const session = await getSession();
  if (!session || session.user.role !== "superadmin") {
    throw new Error("❌ Forbidden: Superadmin only");
  }
  return session;
}
