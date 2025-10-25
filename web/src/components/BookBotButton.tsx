"use client";
import { socket } from "@/lib-wkt3/socket/client";

export function BookBotButton({ botId }: { botId: string }) {
  const handleBooking = () => {
    socket.emit("bot_booking", {
      botId,
      userId: "abc123", // Replace with session user
      service: "auditing",
      timestamp: new Date().toISOString(),
    });
  };

  return (
    <button
      onClick={handleBooking}
      className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
    >
      📅 Book This Bot
    </button>
  );
}
