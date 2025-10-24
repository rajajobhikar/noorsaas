"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import FairnessBadge from "@/components/FairnessBadge";
import { FairnessData } from "@/types/fairness";
import InstallScreen from "../../../modules/secure-auth/screens/InstallScreen";
// import AuditMirror from "@/components/AuditMirror";


export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);
  const [serial, setSerial] = useState("");
  const [fairness, setFairness] = useState<FairnessData | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/auth/session-check", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.valid && data.serial) {
          setSerial(data.serial);
          setAuthorized(true);
          setFairness({
            verified: true,
            cleanRecord: true,
            skillLevel: "pro",
            activeSince: Date.now() - 365 * 24 * 60 * 60 * 1000,
          });
        } else {
          router.push("/login");
        }
      })
      .finally(() => setLoading(false));
  }, [router]);

  if (loading) return <p className="text-center mt-10">Checking session…</p>;
  if (!authorized) return null;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Welcome to your dashboard</h1>
      <p className="mt-2">You're logged in and verified ✅</p>
      <p className="mt-2">
        Your serial number: <strong>{serial}</strong>
      </p>
      {fairness && <FairnessBadge fairness={fairness} />}
      <button
        className="mt-4 bg-green-600 text-white px-4 py-2 rounded mr-4"
        onClick={async () => {
          const res = await fetch("/api/auth/session-check", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
          });
          const { valid, serial } = await res.json();
          if (!valid) return;

          const matchRes = await fetch("/api/matchmaking/find", {
            method: "POST",
            body: JSON.stringify({ userId: serial }),
            headers: { "Content-Type": "application/json" },
          });

          const result = await matchRes.json();
          alert(
            result.match ? `Matched with: ${result.match.email}` : result.error
          );
        }}
      >
        Find Match
      </button>
      {/* {authorized && session && <AuditMirror session={session} />} */}

      <InstallScreen userId={"WKT3 - 521641 - 754"} />

      <button
        className="mt-4 bg-red-600 text-white px-4 py-2 rounded"
        onClick={async () => {
          await fetch("/api/auth/logout", { method: "POST" });
          window.location.href = "/login"; // ✅ triggers full reload
        }}
      >
        Logout
      </button>
    </div>
  );
}
