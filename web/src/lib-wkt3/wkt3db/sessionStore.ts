import clientPromise from "./mongo";
import { ObjectId } from "mongodb";

export async function getAllSessions() {
  const client = await clientPromise;
  const db = client.db("authSaaS");
  return db.collection("sessions").find({}).toArray();
}

export async function createSession(
  userId: string,
  provider: string,
  audit: any
) {
  const client = await clientPromise;
  const db = client.db("authSaaS");
  const userDb = client.db("wkt3");

  const user = await userDb
    .collection("users")
    .findOne({ _id: new ObjectId(userId) });

  const session = {
    userId,
    email: user?.email,
    role: user?.role,
    provider,
    audit,
    createdAt: new Date(),
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
  };

  const result = await db.collection("sessions").insertOne(session);
  if (user?.role === "superadmin") {
    await db.collection("superSessions").insertOne(session);
  }

  // ✅ Emit to WebSocket server
  try {
    const io = (global as any).io;
    if (io) {
      io.emit("new-session", session);
      console.log("📡 Emitted new session to superadmin:", session.email);
    } else {
      console.log("⚠️ Socket.io server not initialized");
    }
  } catch (err) {
    console.error("❌ Emit failed:", err);
  }
  return result.insertedId;
}


export async function deleteSessionsByUser(userId: string) {
  const client = await clientPromise;
  const db = client.db("authSaaS");
  await db.collection("sessions").deleteMany({ userId });
}

export async function deleteSession(sessionId: string) {
  const client = await clientPromise;
  const db = client.db("wkt3");
  await db.collection("sessions").deleteOne({ _id: new ObjectId(sessionId) });

  const io = (global as any).io;
  if (io) {
    io.emit("session-logout", sessionId);
    console.log("📡 Emitted session logout:", sessionId);
  }
}

export async function cleanupExpiredSessions() {
  const client = await clientPromise;
  const db = client.db("wkt3");
  const now = Date.now();

  await db.collection("sessions").deleteMany({
    expiresAt: { $lt: now },
  });

  console.log("🧹 Expired sessions cleaned");
}