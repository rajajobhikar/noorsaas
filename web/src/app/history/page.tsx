/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from "react";

export default function HistoryPage() {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("wkt3-session");
    if (!token) return;

    fetch("/api/auth/session-check", {
      method: "POST",
      body: JSON.stringify({ token }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.valid) {
          fetch(`/api/history/${data.serial}`)
            .then((res) => res.json())
            .then((data) => setRecords(data.history));
        }
      });
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">🎮 Your Game History</h1>
      {records.length === 0 ? (
        <p>No matches played yet.</p>
      ) : (
        <ul className="space-y-2">
          {records.map((r: any) => (
            <li key={r.id} className="bg-white p-4 rounded shadow">
              <p>
                <strong>Game:</strong> {r.game}
              </p>
              <p>
                <strong>Result:</strong> {r.result}
              </p>
              <p>
                <strong>Opponent:</strong> {r.opponentId || "N/A"}
              </p>
              <p>
                <strong>Time:</strong> {new Date(r.timestamp).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
