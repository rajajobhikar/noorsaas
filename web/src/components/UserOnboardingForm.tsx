"use client";
import { useState } from "react";

export default function UserOnboardingForm() {
  const [name, setName] = useState("");
  const [flair, setFlair] = useState("");
  const [interests, setInterests] = useState("");

  const handleSubmit = async () => {
    const payload = {
      name,
      flair,
      interests: interests.split(",").map((i) => i.trim()),
    };
    await fetch("/api/onboard-user", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">User Onboarding</h2>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Your name"
        className="border px-3 py-2 rounded w-full"
      />
      <input
        value={flair}
        onChange={(e) => setFlair(e.target.value)}
        placeholder="Flair (e.g. girl going college)"
        className="border px-3 py-2 rounded w-full"
      />
      <input
        value={interests}
        onChange={(e) => setInterests(e.target.value)}
        placeholder="Interests (comma separated)"
        className="border px-3 py-2 rounded w-full"
      />
      <button
        onClick={handleSubmit}
        className="bg-indigo-600 text-white px-4 py-2 rounded"
      >
        Submit
      </button>
    </div>
  );
}
