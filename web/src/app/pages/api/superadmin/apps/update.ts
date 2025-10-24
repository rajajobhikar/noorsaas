import clientPromise from "@/lib-wkt3/wkt3db/mongo";
import { ObjectId } from "mongodb";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const { id, name, status, role, visible } = req.body;
  const client = await clientPromise;
  const db = client.db("wkt3");

  await db
    .collection("apps")
    .updateOne(
      { _id: new ObjectId(id) },
      { $set: { name, status, role, visible } }
    );

  res.json({ success: true });
}
