import Link from "next/link";
import clientPromise from "@/lib-wkt3/wkt3db/mongo";
import { BotStatus } from "@/types/Bot";

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
          {bots.map((bot) => (
            <li key={bot._id.toString()}>
              <Link
                href={`/bot/${bot._id.toString()}`}
                className="block p-3 border rounded hover:bg-gray-50"
              >
                <div className="text-lg font-semibold">{bot.name}</div>
                <div className="text-sm text-gray-600">
                  Status: {bot.status} — Flair:{" "}
                  {bot.personality?.flair ?? "None"}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
