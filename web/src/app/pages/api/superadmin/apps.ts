// import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@/lib-wkt3/wkt3db/mongo";

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ): Promise<void> {
//   const client = await clientPromise;
//   const db = client.db("wkt3");
//   const apps = await db.collection("apps").find().toArray();
//   res.json(apps);
// }


export default async function handler(req:any, res:any) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const client = await clientPromise;
    const db = client.db("wkt3");
    const apps = await db.collection("apps").find().toArray();
    res.status(200).json(apps);
  } catch (err) {
    console.error("❌ DB error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
