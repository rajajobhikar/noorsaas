import { cookies } from "next/headers";
import { validateSession } from "@/lib-wkt3/sessionEngine/validateSession";
import LudoClient from "./LudoClient";

export default async function LudoPage() {
  const cookie = (await cookies()).get("session")?.value;
  const uid = cookie ? validateSession(cookie) : null;

  if (!uid) {
    return (
      <div className="p-6 text-red-600">
        ❌ Access Denied or Ludo is disabled
      </div>
    );
  }

  return <LudoClient />;
}
