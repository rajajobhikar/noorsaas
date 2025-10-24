import clientPromise from "@/lib-wkt3/wkt3db/mongo";
import { ObjectId } from "mongodb";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.body as { id: string };
  const client = await clientPromise;
  const db = client.db("wkt3");

  const app = await db.collection("apps").findOne({ _id: new ObjectId(id) });
  if (!app) return res.status(404).json({ error: "App not found" });

  await db
    .collection("apps")
    .updateOne({ _id: new ObjectId(id) }, { $set: { visible: !app.visible } });

  res.json({ success: true });
}
