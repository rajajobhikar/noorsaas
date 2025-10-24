"use client";
import { useSearchParams } from "next/navigation";

export default function ErrorPage() {
  const params = useSearchParams();
  const msg = params.get("msg") || "Something went wrong";

  return (
    <div className="wkt3-error-page">
      <h2>❌ Error</h2>
      <p>{msg}</p>
    </div>
  );
}