"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Navbar() {
  const [user, setUser] = useState<null | { email: string; role: string }>(
    null
  );
  const router = useRouter();

  // 🔍 Check session on mount
  useEffect(() => {
    fetch("/api/auth/session-check", { method: "POST" })
      .then((res) => res.json())
      .then((data) => {
        if (data.valid) {
          setUser({ email: data.email, role: data.role });
        } else {
          setUser(null);
        }
      })
      .catch(() => setUser(null));
  }, []);

  // 🔓 Logout handler
  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setUser(null); // ✅ Clear local state
    window.location.href = "/login"; // ✅ Hard reload
  };

  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-blue-600 text-white">
      <div className="text-xl font-bold">WKT3</div>
      <div className="flex items-center gap-4">
        {user ? (
          <>
            <span>
              {user.email} ({user.role})
            </span>
            <button
              onClick={handleLogout}
              className="bg-white text-blue-600 px-3 py-1 rounded"
            >
              Logout
            </button>
          </>
        ) : (
          <Link href="/login" className="bg-white text-blue-600 px-3 py-1 rounded">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
