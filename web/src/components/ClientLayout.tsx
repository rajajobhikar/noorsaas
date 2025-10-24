// components/ClientLayout.tsx
"use client";
import { useEffect, useState } from "react";
import Navbar from "./Navbar";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <>
      <main>
        <Navbar />
        {children}
      </main>
    </>
  );
}
