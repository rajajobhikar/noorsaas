import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@/lib-wkt3/wkt3db/mongo";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { name, status, role, visible } = req.body;
  const client = await clientPromise;
  const db = client.db("wkt3");

  await db.collection("apps").insertOne({
    name,
    status,
    role,
    visible,
    createdAt: new Date(),
  });

  res.json({ success: true });
}
