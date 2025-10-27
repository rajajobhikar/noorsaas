"use client";

import { useState } from "react";
import Link from "next/link";
import { BotStatus } from "@/types/Bot";
import { VerifiedBadge } from "@/components/VerifiedBadge";
import { calculateTrustScore } from "@/lib-wkt3/utils/trustScore";
import { evolveFlair } from "@/lib-wkt3/utils/flair";

export default function BotListClient({ bots }: { bots: BotStatus[] }) {
  const [flairFilter, setFlairFilter] = useState("");

  const filtered = flairFilter
    ? bots.filter(
        (b) =>
          evolveFlair(calculateTrustScore(b.auditLogs ?? [])) === flairFilter
      )
    : bots;

  return (
    <div className="space-y-4">
      <select
        value={flairFilter}
        onChange={(e) => setFlairFilter(e.target.value)}
        className="border px-3 py-2 rounded"
      >
        <option value="">All Flairs</option>
        <option value="auti going college">Auti Going College</option>
        <option value="girl going college">Girl Going College</option>
        <option value="verified mentor">Verified Mentor</option>
      </select>

      <ul className="space-y-2">
        {filtered.map((bot) => {
          const trustScore = calculateTrustScore(bot.auditLogs ?? []);
          const flair = evolveFlair(trustScore);

          return (
            <li key={bot._id.toString()}>
              <Link
                href={`/bot/${bot._id.toString()}`}
                className="block p-4 border rounded hover:bg-gray-50 transition"
              >
                <div className="flex items-center justify-between">
                  <div className="text-lg font-semibold">
                    {bot.name ?? "Unnamed Bot"}
                  </div>
                  <VerifiedBadge trustScore={trustScore} />
                </div>

                <div className="text-sm text-gray-600">
                  Flair (stored):{" "}
                  <span className="font-medium">
                    {bot.personality?.flair ?? "None"}
                  </span>
                </div>

                <div className="text-sm text-gray-600">
                  Flair (by Trust Score):{" "}
                  <span className="font-medium">{flair}</span>
                </div>

                <div className="text-sm text-gray-600">
                  Trust Score:{" "}
                  <span className="font-medium">{trustScore} / 100</span>
                </div>

                {bot.bookings && (
                  <div className="text-sm text-gray-500 mt-1">
                    Booked {bot.bookings.length}×
                  </div>
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
