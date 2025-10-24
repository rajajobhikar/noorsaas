"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SocialLoginPage() {
  const router = useRouter();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
    if (!token) {
      router.push("/login");
      return;
    }

    localStorage.setItem("wkt3-session", token);

    // ✅ Check session to get role
    fetch("/api/auth/session-check", {
      method: "POST",
      body: JSON.stringify({ token }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.valid) {
          if (data.role === "admin") {
            router.push("/admin/dashboard/overview");
          } else {
            router.push("/dashboard");
          }
        } else {
          router.push("/login");
        }
      });
  }, [router]);

  return (
    <div className="p-6 text-center">
      <h1 className="text-xl font-semibold">Logging you in...</h1>
    </div>
  );
}
