import { useEffect } from "react";
import { socket } from "../client";
import { AuditLog } from "@/types/audit";

export function useAuditSocket(
  setAuditList: React.Dispatch<React.SetStateAction<AuditLog[]>>
) {
  useEffect(() => {
    socket.on("welcome", (data) => {
      console.log("✅ Server says:", data.message);
    });

    socket.on("audit_update", (data: AuditLog) => {
      console.log("📜 New audit data received:", data);
      setAuditList((prevList: AuditLog[]) => [data, ...prevList]);
    });
    return () => {
      socket.off("welcome");
      socket.off("audit_update");
    };
  }, [setAuditList]);
}
