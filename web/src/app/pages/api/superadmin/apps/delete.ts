import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@/lib-wkt3/wkt3db/mongo";
import { ObjectId } from "mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const { id } = req.body;
  const client = await clientPromise;
  const db = client.db("wkt3");

  await db.collection("apps").deleteOne({ _id: new ObjectId(id) });

  res.json({ success: true });
}
