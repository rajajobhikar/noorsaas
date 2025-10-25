import { cookies } from "next/headers";
import clientPromise from "@/lib-wkt3/wkt3db/mongo";
import { ObjectId } from "mongodb";

export async function getSession() {
  const token = (await cookies()).get("wkt3-session")?.value;
  console.log("🔍 Session token from cookie:", token);

  if (!token) return null;

  const client = await clientPromise;
  const sessionDb = client.db("authSaaS");
  const userDb = client.db("wkt3");

  const session = await sessionDb.collection("sessions").findOne({
    _id: new ObjectId(token),
  });

  console.log("🔍 Session from DB:", session);

  if (!session || session.expiresAt < new Date()) return null;

  const user = await userDb.collection("users").findOne({
    _id: new ObjectId(session.userId),
  });
  console.log("🔍 User from DB:", user);
  if (!user) return null;
  return {
    user: {
      id: user._id,
      email: user.email,
      role: user.role,
      name: user.name,
    },
    session: {
      createdAt: session.createdAt,
      expiresAt: session.expiresAt,
    },
  };
}
