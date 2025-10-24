import clientPromise from "@/lib-wkt3/wkt3db/mongo";

// ✅ Session list API — superadmin ke liye
export default async function handler(req:any, res:any) {
  const client = await clientPromise;
  const db = client.db("wkt3");

  const sessions = await db
    .collection("sessions")
    .find({})
    .sort({ createdAt: -1 })
    .limit(50)
    .toArray();

  res.json(sessions);
}
