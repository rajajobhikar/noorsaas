import { cookies } from "next/headers";
import clientPromise from "@/lib-wkt3/wkt3db/mongo";
import { ObjectId } from "mongodb";

export type SessionUser = {
  id: string;
  email: string;
  role: string;
};

export async function getSessionUser(): Promise<SessionUser | null> {
  const sessionId = (await cookies()).get("wkt3-session")?.value;
  if (!sessionId) return null;

  const client = await clientPromise;
  const sessionDb = client.db("authSaaS");
  const userDb = client.db("wkt3");

  const session = await sessionDb.collection("sessions").findOne({
    _id: new ObjectId(sessionId),
  });

  if (!session || new Date() > new Date(session.expiresAt)) {
    console.log("❌ Session expired or not found");
    return null;
  }

  const user = await userDb.collection("users").findOne({
    _id: new ObjectId(session.userId),
  });

  if (!user) return null;

  return {
    id: user._id.toString(),
    email: user.email,
    role: user.role,
  };
}
