import { notFound } from "next/navigation";
import clientPromise from "@/lib-wkt3/wkt3db/mongo";
import { BotServiceCard } from "@/components/BotServiceCard";
import { BookBotButton } from "@/components/BookBotButton";
import { BotStatus } from "@/types/Bot";
import { calculateTrustScore } from "@/lib-wkt3/utils/trustScore";
import { evolveFlair } from "@/lib-wkt3/utils/flair";
import { FlairTimeline } from "@/components/FlairTimeLine";
import { VerifiedBadge } from "@/components/VerifiedBadge";



export default async function BotProfile({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const client = await clientPromise;
  const db = client.db("wkt3db");

  const bot = await db
    .collection<BotStatus>("status")
    .findOne({ _id: id }); // ✅ string ID, no ObjectId

  if (!bot) return notFound();

  const trustScore = calculateTrustScore(bot.auditLogs ?? []);
  const flair = evolveFlair(trustScore);

  return (
    <div className="p-6 space-y-6 max-w-xl mx-auto font-sans">
      <div className="flex items-center gap-4">
        <BookBotButton botId={bot._id} />
        <div className="text-5xl">{bot.avatar ?? "🤖"}</div>
        <div>
          <h1 className="text-2xl font-bold">{bot.name}</h1>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            {bot.name}
            <VerifiedBadge trustScore={trustScore} />
          </h1>

          <p className="text-sm text-gray-600">
            Status: <span className="font-medium">{bot.status}</span> — Task:{" "}
            <span className="font-medium">{bot.task ?? "Idle"}</span>
          </p>
          <p className="text-xs text-gray-400">
            Last Ping: {new Date(bot.lastPing).toLocaleString()}
          </p>
        </div>
      </div>
      {bot.personality?.flairHistory && (
        <FlairTimeline history={bot.personality.flairHistory} />
      )}
      <div className="space-y-2">
        <h2 className="text-lg font-semibold">Personality</h2>
        <p className="text-sm text-gray-700">
          Flair: <span className="font-medium">{flair}</span>
        </p>
        <p className="text-sm text-gray-700">
          Trust Level:{" "}
          <span className="font-medium">
            {bot.personality?.trustLevel ?? "Unverified"}
          </span>
        </p>
        <p className="text-sm text-gray-700">
          Interests:{" "}
          <span className="font-medium">
            {bot.personality?.interests?.join(", ") ?? "None"}
          </span>
        </p>
        <p className="text-sm text-gray-700">
          Trust Score: <span className="font-medium">{trustScore} / 100</span>
        </p>
      </div>

      {bot.services && bot.services.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Services</h2>
          {bot.services.map((s, i) => (
            <BotServiceCard
              key={i}
              name={s.name}
              description={s.description}
              verified={s.verified}
            />
          ))}
        </div>
      )}
    </div>
  );
}
