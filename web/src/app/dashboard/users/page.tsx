"use client";
import { useState, useEffect } from "react";
import { useBadgeSocket } from "@/lib-wkt3/socket/hooks/useBadgeSocket";

interface User {
  _id: string;
  name: string;
  badge?: "verified" | "fair" | "trusted";
}

export default function UserDashboard() {
  const [users, setUsers] = useState<User[]>([]);

  useBadgeSocket(({ userId, badge }) => {
    setUsers((prev) =>
      prev.map((u) => (u._id === userId ? { ...u, badge } : u))
    );
  });

  useEffect(() => {
    fetch("/api/admin/users")
      .then((res) => res.json())
      .then((data) => {
        console.log("📦 Users response:", data);
        if (Array.isArray(data)) {
          setUsers(data);
        } else {
          console.warn("🚫 API did not return an array:", data);
          setUsers([]);
        }
      });
  }, []);

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map((u) => (
          <li key={u._id}>
            {u.name ?? u._id} — {u.badge ?? "⛔ Unverified"}
          </li>
        ))}
      </ul>
    </div>
  );
}
