"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function PokerGamePage() {
  const [access, setAccess] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("wkt3-session");
    if (!token) return router.push("/login");

    fetch("/api/games/poker/access", {
      method: "POST",
      body: JSON.stringify({ token }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.valid) setAccess(true);
        else router.push("/dashboard");
      });
  }, [router]);

  if (!access) return <p className="p-6">Checking access...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Poker Game</h1>
      {/* Game UI goes here */}
    </div>
  );
}
