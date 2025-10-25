"use client";
import { useState, useEffect } from "react";
import { BotStatus } from "@/types/Bot";
import Link from "next/link";

export default function MediaDashboard() {
  const [bots, setBots] = useState<BotStatus[]>([]);

  useEffect(() => {
    fetch("/api/admin/bots")
      .then((res) => res.json())
      .then((data: BotStatus[]) => setBots(data));
  }, []);

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Bot Showcase Gallery</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {bots.map((bot) => (
          <Link key={bot._id} href={`/bot/${bot._id}`}></Link>
        ))}
      </div>
    </div>
  );
}
