"use client";
import { useEffect, useState } from "react";
import { saveSerial, getSerial } from "../utils/storage";
import { generateSerial } from "../utils/generateSerail";
import {registerDevice} from "../services/registerDevice";

export default function InstallScreen({ userId }: { userId: string }) {
  const [serial, setSerial] = useState<string | null>(null);
  const [status, setStatus] = useState("pending");

  useEffect(() => {
    const setup = async () => {
      const existing = await getSerial();
      if (existing) {
        setSerial(existing);
        setStatus("already installed");
        return;
      }

      const newSerial = generateSerial();
      await saveSerial(newSerial);
      setSerial(newSerial);

      const res = await registerDevice(userId, newSerial);
      if (res.status === "registered") {
        setStatus("registered");
      } else {
        setStatus("error");
      }
    };

    setup();
  }, [userId]);

  return (
    <div style={{ padding: "2rem" }}>
      <h2>WKT3 Secure Auth Setup</h2>
      <p>
        <strong>Serial:</strong> {serial || "Generating..."}
      </p>
      <p>
        <strong>Status:</strong> {status}
      </p>
    </div>
  );
}
