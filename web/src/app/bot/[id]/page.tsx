import { notFound } from "next/navigation";
import clientPromise from "@/lib-wkt3/wkt3db/mongo";
import { ObjectId } from "mongodb";


export default async function BotProfile({
  params,
}: {
  params: { id: string };
}) {
  const client = await clientPromise;
    const db = client.db("wkt3db");
    const bot = await db.collection("status").findOne({
      _id: new ObjectId(params.id),
    });

  if (!bot) return notFound();

  return (
    <div className="p-6 space-y-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold">{bot.name}</h1>
      <div className="text-4xl">{bot.avatar ?? "🤖"}</div>
      <div className="text-sm text-gray-600">Status: {bot.status}</div>
      <div className="text-sm text-gray-600">Task: {bot.task ?? "Idle"}</div>
      <div className="text-sm text-gray-600">
        Flair: {bot.personality?.flair ?? "None"}
      </div>
      <div className="text-sm text-gray-600">
        Trust Level: {bot.personality?.trustLevel ?? "Unverified"}
      </div>
      <div className="text-sm text-gray-600">
        Interests: {bot.personality?.interests?.join(", ") ?? "None"}
      </div>
      <div className="text-xs text-gray-400">
        Last Ping: {new Date(bot.lastPing).toLocaleString()}
      </div>
    </div>
  );
}
