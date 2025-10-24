"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function SuperadminGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const [allowed, setAllowed] = useState(false);
  const [checking, setChecking] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/auth/session-check", { method: "POST" })
      .then((res) => res.json())
      .then((data) => {
        if (data.valid && data.role === "superadmin") {
          setAllowed(true);
        } else {
          router.push("/unauthorized");
        }
      })
      .catch(() => router.push("/login"))
      .finally(() => setChecking(false));
  }, []);

  if (checking) return <p className="p-6">🔍 Checking superadmin access...</p>;
  if (!allowed) return null;

  return <>{children}</>;
}
