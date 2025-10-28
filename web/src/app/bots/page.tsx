import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function BotsPage() {
  const session = (await cookies()).get("wkt3-session")?.value;
  if (!session) redirect("/login");

  return (
    <div className="p-8">
      <h1 className="text-xl font-bold">Your Bots</h1>
      {/* ✅ Secure content */}
    </div>
  );
}
