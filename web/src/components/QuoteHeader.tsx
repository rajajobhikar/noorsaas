"use client";
import { useEffect, useState } from "react";
import { quotes } from "@/lib-wkt3/quotes/gameQuotes";

export default function QuoteHeader() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % quotes.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6 text-center">
      <h1 className="text-3xl font-bold mb-2">Welcome to WKT3</h1>
      <p className="text-xl italic">{quotes[index]}</p>
    </div>
  );
}
