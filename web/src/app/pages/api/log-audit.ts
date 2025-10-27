import { NextApiRequest, NextApiResponse } from "next";
import { UpdateFilter } from "mongodb";
import clientPromise from "@/lib-wkt3/wkt3db/mongo";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { botId, event, verified, source } = req.body;

    if (!botId || !event) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const client = await clientPromise;
    const db = client.db("wkt3db");

    const auditEntry = {
      event,
      timestamp: new Date().toISOString(),
      verified: !!verified,
      source: source ?? "manual",
    };

    await db.collection("status").updateOne(
      { _id: botId },
      {
        $push: {
          auditLogs: auditEntry,
        },
      } as unknown as UpdateFilter<any> // eslint-disable-line @typescript-eslint/no-explicit-any
    );

    return res.status(200).json({ success: true, audit: auditEntry });
  } catch (error) {
    console.error("Audit log error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
