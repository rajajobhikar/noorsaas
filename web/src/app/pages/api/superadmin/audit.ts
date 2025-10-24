import clientPromise from "@/lib-wkt3/wkt3db/mongo";

export default async function handler(req:any, res:any) {
  const client = await clientPromise;
  const db = client.db("wkt3");
  const logs = await db
    .collection("auditLogs")
    .find()
    .sort({ timestamp: -1 })
    .limit(50)
    .toArray();
  res.json(logs);
}
