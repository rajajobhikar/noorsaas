import { cookies } from "next/headers";
import { validateSession } from "@/lib-wkt3/sessionEngine/validateSession";
import Dream11Client from "./Dream11Client";

export default async function Dream11Page() {
  const cookie = (await cookies()).get("session")?.value;
  console.log("🍪 Cookie value:", cookie);

  const uid = cookie ? validateSession(cookie) : null;
  console.log("🧠 UID from session:", uid);

  if (!uid) {
    console.log("🚫 Access Denied");
    return (
      <div className="p-6 text-red-600">
        ❌ Access Denied or Dream11 is disabled
      </div>
    );
  }

  console.log("✅ Access Granted to:", uid);
  return <Dream11Client />;
}
