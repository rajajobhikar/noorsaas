/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";

export default function BotsClient() {
  const [bots, setBots] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/bots/list")
      .then((res) => res.json())
      .then((data) => {
        setBots(data.bots || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  async function bookBot(botId: string) {
    const res = await fetch("/api/bots/book", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ botId }),
    });

    const result = await res.json();
    if (result.success) {
      alert("✅ Bot booked successfully!");
    } else {
      alert("❌ Booking failed: " + result.error);
    }
  }

  if (loading) return <p>Loading bots...</p>;

  return (
    <ul className="space-y-4">
      {bots.map((bot) => (
        <li key={bot._id} className="border p-4 rounded shadow">
          <h2 className="text-lg font-semibold">{bot.name}</h2>
          <p className="text-sm text-gray-600">{bot.description}</p>
          <button
            className="mt-2 px-4 py-1 bg-blue-600 text-white rounded"
            onClick={() => bookBot(bot._id)}
          >
            Book Bot
          </button>
        </li>
      ))}
    </ul>
  );
}
