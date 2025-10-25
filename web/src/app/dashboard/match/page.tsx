"use client";
import { matchBotToUser } from "@/lib-wkt3/matchEngine/match";
import { BotStatus } from "@/types/Bot";

const user = {
  interests: ["auditing", "gaming", "fairness"],
  fairness: "verified",
};

const bots: BotStatus[] = [
  {
    _id: "bot-001",
    name: "wkt3-bot",
    status: "online",
    lastPing: new Date().toISOString(),
    personality: {
      flair: "college-going girl",
      interests: ["auditing", "fairness"],
      trustLevel: "verified",
    },
  },
];

export default function MatchPage() {
  const matched = bots.filter((b) => matchBotToUser(b, user));

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-xl font-bold">Bot Matchmaking</h1>
      {matched.length === 0 ? (
        <p>🚫 No compatible bots found</p>
      ) : (
        matched.map((b) => (
          <div key={b._id} className="border p-4 rounded">
            <div className="font-bold">{b.name}</div>
            <div className="text-sm text-gray-600">
              Flair: {b.personality?.flair}
            </div>
            <div className="text-sm text-gray-600">
              Interests: {b.personality?.interests.join(", ")}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
