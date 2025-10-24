"use client";
import { submitWithdraw } from "@/lib-wkt3/walletEngine/withdrawRequests";
import { useState } from "react";

export default function WithdrawForm() {
  const [amount, setAmount] = useState(0);
  const [message, setMessage] = useState("");

  const handleSubmit = () => {
    submitWithdraw("u1", amount);
    setMessage(`✅ ₹${amount} withdrawal request submitted`);
  };

  return (
    <div className="space-y-4">
      <input
        type="number"
        placeholder="Withdraw amount"
        value={amount}
        onChange={(e) => setAmount(+e.target.value)}
        className="border p-2 rounded w-full"
      />
      <button
        onClick={handleSubmit}
        className="bg-red-600 text-white px-4 py-2 rounded"
      >
        Request Withdraw
      </button>
      <p className="text-sm text-gray-700">{message}</p>
    </div>
  );
}
