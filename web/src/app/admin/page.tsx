"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const [authorized, setAuthorized] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("wkt3-session");
    if (!token) {
      router.push("/login");
      return;
    }

    fetch("/api/auth/session-check", {
      method: "POST",
      body: JSON.stringify({ token }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.valid && data.role === "admin") {
          setAuthorized(true);
        } else {
          router.push("/dashboard");
        }
      });
  }, [router]);

  if (!authorized) return null;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Admin Panel</h1>
      <p className="mt-2">Welcome, admin. You have full access.</p>
    </div>
  );
}
