import clientPromise from "@/lib-wkt3/wkt3db/mongo";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  const client = await clientPromise;
  const db = client.db("wkt3");
  const apps = await db.collection("apps").find().toArray();
  res.status(200).json(apps);
}
