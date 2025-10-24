"use client";

import { useEffect } from "react";
import SuperadminGuard from "@/components/SuperadminGuard";
import SuperadminDashboard from "@/modules/superadmin/SuperAdminDashboard";

export default function Page() {

  useEffect(() => {
    fetch("/api/socketio")
      .then(() => console.log("✅ Socket server pinged"))
      .catch((err) => console.error("❌ Socket ping failed:", err));
  }, []);

  return (
    <SuperadminGuard>
      <SuperadminDashboard />
    </SuperadminGuard>
  );
}
