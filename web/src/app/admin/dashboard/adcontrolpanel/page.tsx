/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from "react";

export default function AdControlPanel() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("/api/admin/users")
      .then((res) => res.json())
      .then((data) => setUsers(data.users));
  }, []);

  async function update(userId: string, action: string, value: any) {
    await fetch("/api/admin/adControl", {
      method: "POST",
      body: JSON.stringify({ userId, action, value }),
      headers: { "Content-Type": "application/json" },
    });
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">🛠️ Admin Control Panel</h1>
      <div className="space-y-4">
        {users.map((u: any) => (
          <div key={u.id} className="bg-white p-4 rounded shadow">
            <p>
              <strong>{u.email}</strong>
            </p>
            <div className="flex gap-2 mt-2">
              <button
                onClick={() => update(u.id, "verify", true)}
                className="bg-green-600 text-white px-3 py-1 rounded"
              >
                ✅ Verify
              </button>
              <button
                onClick={() => update(u.id, "verify", false)}
                className="bg-red-600 text-white px-3 py-1 rounded"
              >
                ❌ Unverify
              </button>
              <button
                onClick={() => update(u.id, "promote", "pro")}
                className="bg-blue-600 text-white px-3 py-1 rounded"
              >
                🎯 Promote to Pro
              </button>
              <button
                onClick={() => update(u.id, "promote", "legend")}
                className="bg-purple-600 text-white px-3 py-1 rounded"
              >
                🏆 Promote to Legend
              </button>
              <button
                onClick={() => update(u.id, "role", "admin")}
                className="bg-black text-white px-3 py-1 rounded"
              >
                👑 Make Admin
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
