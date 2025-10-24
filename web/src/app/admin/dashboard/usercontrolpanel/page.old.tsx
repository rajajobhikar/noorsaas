"use client";
import { banUser, unbanUser, isBanned } from "@/lib-wkt3/adminControls/banUser";
import { useState } from "react";

export default function UserControlPanel() {
  const [userId, setUserId] = useState("");
  const [status, setStatus] = useState("");

  const handleBan = () => {
    banUser(userId);
    setStatus("User banned");
  };

  const handleUnban = () => {
    unbanUser(userId);
    setStatus("User unbanned");
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">User Controls</h2>
      <input
        type="text"
        placeholder="User ID"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        className="border p-2 rounded w-full"
      />
      <div className="flex space-x-2">
        <button
          onClick={handleBan}
          className="bg-red-600 text-white px-4 py-1 rounded"
        >
          Ban
        </button>
        <button
          onClick={handleUnban}
          className="bg-green-600 text-white px-4 py-1 rounded"
        >
          Unban
        </button>
      </div>
      <p className="text-sm text-gray-700">{status}</p>
      {userId && <p>Status: {isBanned(userId) ? "❌ Banned" : "✅ Active"}</p>}
    </div>
  );
}
