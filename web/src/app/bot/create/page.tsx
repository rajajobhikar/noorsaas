"use client";

import { useState } from "react";

export default function CreateBotPage() {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");

  async function handleCreate() {
    const res = await fetch("/api/bots/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, type, description }),
    });

    const result = await res.json();
    if (result.success) {
      alert("✅ Bot created!");
    } else {
      alert("❌ Error: " + result.error);
    }
  }

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">Create a Bot</h1>
      <input
        className="border p-2 w-full mb-2"
        placeholder="Bot Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        className="border p-2 w-full mb-2"
        placeholder="Bot Type"
        value={type}
        onChange={(e) => setType(e.target.value)}
      />
      <textarea
        className="border p-2 w-full mb-2"
        placeholder="Bot Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded"
        onClick={handleCreate}
      >
        Create Bot
      </button>
    </div>
  );
}
