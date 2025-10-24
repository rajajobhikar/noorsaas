"use client";
import {
  getPendingWithdraws,
  approveWithdraw,
  rejectWithdraw,
} from "@/lib-wkt3/walletEngine/withdrawRequests";
import { useState } from "react";

export default function WithdrawReviewPanel() {
  const [pending, setPending] = useState(getPendingWithdraws());

  const handleApprove = (id: string) => {
    approveWithdraw(id);
    setPending(getPendingWithdraws());
  };

  const handleReject = (id: string) => {
    rejectWithdraw(id);
    setPending(getPendingWithdraws());
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Pending Withdrawals</h2>
      {pending.map((req) => (
        <div key={req.id} className="border p-4 rounded">
          <p>
            <strong>User:</strong> {req.userId}
          </p>
          <p>
            <strong>Amount:</strong> ₹{req.amount}
          </p>
          <p>
            <strong>Time:</strong> {new Date(req.timestamp).toLocaleString()}
          </p>
          <div className="flex space-x-2 mt-2">
            <button
              onClick={() => handleApprove(req.id)}
              className="bg-green-600 text-white px-4 py-1 rounded"
            >
              Approve
            </button>
            <button
              onClick={() => handleReject(req.id)}
              className="bg-red-600 text-white px-4 py-1 rounded"
            >
              Reject
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
