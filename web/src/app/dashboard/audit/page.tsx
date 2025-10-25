"use client";
import { useState, useEffect } from "react";
import { useAuditSocket } from "@/lib-wkt3/socket/hooks/useAuditSocket";
import { AuditLog } from "@/types/audit";

export default function AuditDashboard() {
  const [auditList, setAuditList] = useState<AuditLog[]>([]);

  // ✅ Inject here: under useState
  useAuditSocket(setAuditList);

  useEffect(() => {
    // Optional: fetch initial audits
    fetch("/api/admin/audit")
      .then((res) => res.json())
      .then((data) => setAuditList(data.logs));
  }, []);

  return (
    <div>
      <h1>Audit Logs</h1>
      <ul>
        {auditList.map((log, i) => (
          <li key={i}>
            {log.action} — {log.actorId}
          </li>
        ))}
      </ul>
    </div>
  );
}
