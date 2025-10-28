"use client";

import { JSX, useEffect, useState } from "react";

export default function VerifyPage(): JSX.Element {
  const [status, setStatus] = useState<string>("Verifying your account...");

  useEffect(() => {
    const token = new URLSearchParams(window.location.search).get("token");

    if (!token || token.length < 10) {
      window.location.href = "/error?msg=Missing+or+invalid+token";
      return;
    }

    // Let browser follow redirect from backend
    window.location.href = `/api/auth/verify?token=${token}`;
  }, []);


  return (
    <div className="max-w-md mx-auto p-6 mt-10 bg-white rounded shadow text-center">
      <h2 className="text-xl font-bold mb-4">Email Verification</h2>
      <p className="text-gray-700">{status}</p>
    </div>
  );
}
