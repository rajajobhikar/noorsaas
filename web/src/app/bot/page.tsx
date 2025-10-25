import Link from "next/link";
import clientPromise from "@/lib-wkt3/wkt3db/mongo";
import { BotStatus } from "@/types/Bot";
import { calculateTrustScore } from "@/lib-wkt3/utils/trustScore";
import { evolveFlair } from "@/lib-wkt3/utils/flair";

export default async function BotListPage() {
  const client = await clientPromise;
  const db = client.db("wkt3db");
  const bots = await db.collection<BotStatus>("status").find().toArray();

  return (
    <div className="p-6 space-y-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold">All Bots</h1>
      {bots.length === 0 ? (
        <p>No bots found</p>
      ) : (
        <ul className="space-y-2">
          {bots.map((bot) => {
            const trustScore = calculateTrustScore(bot.auditLogs ?? []);
            const flair = evolveFlair(trustScore);
            return (
              <li key={bot._id.toString()}>
                <Link
                  href={`/bot/${bot._id.toString()}`}
                  className="block p-3 border rounded hover:bg-gray-50"
                >
                  <div className="text-lg font-semibold">{bot.name}</div>
                  <div className="text-sm text-gray-600">
                    Status: {bot.status} — Task: {bot.task ?? "Idle"}
                  </div>
                  <div className="text-sm text-gray-600">
                    Flair: {bot.personality?.flair ?? "None"}
                    <p className="text-sm text-gray-700">
                      Trust Score Flair: <span className="font-medium">{flair}</span>
                    </p>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
