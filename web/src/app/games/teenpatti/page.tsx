import { cookies } from "next/headers";
import { validateSession } from "@/lib-wkt3/sessionEngine/validateSession";
import TeenPattiClient from "./TeenPattiClient";

export default async function TeenPattiPage() {
  const cookie = (await cookies()).get("session")?.value;
  const uid = cookie ? validateSession(cookie) : null;

  if (!uid) {
    return (
      <div className="p-6 text-red-600">
        ❌ Access Denied or Teen Patti is disabled
      </div>
    );
  }

  return <TeenPattiClient />;
}
