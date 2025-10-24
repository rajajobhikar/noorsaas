"use client";
import { useState } from "react";
import { deposit } from "@/lib-wkt3/walletEngine/wallet";
import { logTransaction } from "@/lib-wkt3/walletEngine/transactions";

export default function DepositForm() {
  const [amount, setAmount] = useState(0);
  const [message, setMessage] = useState("");

  const handleDeposit = () => {
    deposit("u1", amount);
    logTransaction("u1", "DEPOSIT", amount);
    setMessage(`✅ ₹${amount} deposited`);
  };

  return (
    <div className="space-y-4">
      <input
        type="number"
        placeholder="Enter amount"
        value={amount}
        onChange={(e) => setAmount(+e.target.value)}
        className="border p-2 rounded w-full"
      />
      <button
        onClick={handleDeposit}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Deposit
      </button>
      <p className="text-sm text-gray-700">{message}</p>
    </div>
  );
}
