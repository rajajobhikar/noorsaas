import { useEffect, useState } from "react";
import { getSerial } from "../utils/storage";

export default function DashboardScreen() {
  const [serial, setSerial] = useState<string | null>(null);
  const [status, setStatus] = useState("loading");
  const [lastMessage, setLastMessage] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      const storedSerial = await getSerial();
      setSerial(storedSerial);

      if (!storedSerial) {
        setStatus("not installed");
        return;
      }

      // Fetch status from backend
      const res = await fetch(`/backend/device-status?serial=${storedSerial}`);
      const data = await res.json();

      setStatus(data.status || "unknown");
      setLastMessage(data.last_message || null);
    };

    load();
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h2>WKT3 Auth Dashboard</h2>
      <p>
        <strong>Serial:</strong> {serial || "Not installed"}
      </p>
      <p>
        <strong>Status:</strong> {status}
      </p>
      {lastMessage && (
        <p>
          <strong>Last Message:</strong> {lastMessage}
        </p>
      )}
    </div>
  );
}
