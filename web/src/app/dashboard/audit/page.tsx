"use client";
import { useState, useEffect } from "react";
import { useAuditSocket } from "@/lib-wkt3/socket/hooks/useAuditSocket";
import { AuditLog } from "@/types/audit";

export default function AuditDashboard() {
  const [auditList, setAuditList] = useState<AuditLog[]>([]);

  // ✅ Inject here: under useState
  useAuditSocket(setAuditList);

  useEffect(() => {
    fetch("/api/admin/audit")
      .then((res) => res.json())
      .then((data: AuditLog[]) => {
        console.log("📦 Initial audits:", data); // ✅ Add this
        setAuditList(data);
      });
  }, []);

  return (
    <div>
      <h1>Audit Logs</h1>

        {auditList.length === 0 ? (
          <p>🚫 No audit logs found</p>
        ) : (
          <ul>
            {auditList.map((log, i) => (
              <li key={i}>
                {log.action} — {log.userId} — {log.timestamp}
              </li>
            ))}
          </ul>
        )}

    </div>
  );
}
