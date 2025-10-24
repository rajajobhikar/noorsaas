/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from "react";

export default function NotificationsPanel() {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    fetch("/api/admin/notifications")
      .then((res) => res.json())
      .then((data) => setAlerts(data.notifications));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">
        🔔 Admin Notifications
      </h1>
      <ul className="space-y-4">
        {alerts.map((n: any) => (
          <li
            key={n.id}
            className="bg-white p-4 rounded shadow border-l-4 border-blue-500"
          >
            <p className="text-sm text-gray-500">
              {new Date(n.timestamp).toLocaleString()}
            </p>
            <p className="text-lg">{n.message}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
