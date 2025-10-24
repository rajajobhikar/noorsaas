"use client";
import { useState } from "react";
import { launchRazorpay } from "@/lib-wkt3/paymentGateway/razorpay";
import { loadRazorpayScript } from "@/lib-wkt3/paymentGateway/loadRazorpay";

export default function RazorpayButton({ amount }: { amount: number }) {
  const [error, setError] = useState("");

  const handleClick = async () => {
    const loaded = await loadRazorpayScript();
    if (!loaded) {
      setError("❌ Failed to load Razorpay");
      return;
    }
    launchRazorpay(amount);
  };

  return (
    <div className="space-y-2">
      <button
        onClick={handleClick}
        className="bg-indigo-600 text-white px-4 py-2 rounded"
      >
        Pay ₹{amount} with Razorpay
      </button>
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}
