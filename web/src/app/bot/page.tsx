import clientPromise from "@/lib-wkt3/wkt3db/mongo";
import { BotStatus } from "@/types/Bot";
import BotListClient from "@/components/BotListClient";

export default async function BotListPage() {
  const client = await clientPromise;
  const db = client.db("wkt3db");
  const bots = await db.collection<BotStatus>("status").find().toArray();

  return (
    <div className="p-6 space-y-4 max-w-xl mx-auto font-sans">
      <h1 className="text-2xl font-bold">All Bots</h1>
      <BotListClient bots={bots} />
    </div>
  );
}
