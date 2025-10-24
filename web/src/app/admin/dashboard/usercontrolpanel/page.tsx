/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from "react";
import FairnessBadge from "@/components/FairnessBadge";

export default function UserControlPanel() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("/api/admin/users")
      .then((res) => res.json())
      .then((data) => setUsers(data.users));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">
        👩‍💻 User Control Panel
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((user: any) => {
          const displayName = user.name || user.email?.split("@")[0] || "User";

          return (
            <div
              key={user.id}
              className="bg-gradient-to-br from-pink-100 to-blue-100 p-6 rounded-xl shadow-lg hover:shadow-2xl transition transform hover:scale-105"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white text-xl font-bold">
                  {displayName[0]?.toUpperCase()}
                </div>
                <div>
                  <p className="font-semibold text-lg">{displayName}</p>
                  <p className="text-sm text-gray-700">{user.email}</p>
                </div>
              </div>

              <FairnessBadge fairness={user.fairness} />

              <div className="mt-4 text-sm text-gray-600">
                <p>
                  <strong>Role:</strong> {user.role}
                </p>
                <p>
                  <strong>Serial:</strong> {user.serial}
                </p>
                <p>
                  <strong>Verified:</strong>{" "}
                  {user.verified ? "✅ Yes" : "❌ No"}
                </p>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                <button className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">
                  Verify
                </button>
                <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
                  Ban
                </button>
                <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
                  Promote
                </button>
                <button className="bg-purple-500 text-white px-3 py-1 rounded hover:bg-purple-600">
                  Make Admin
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
