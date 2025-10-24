"use client";
import { getBalance } from "@/lib-wkt3/walletEngine/wallet";
import { getTransactions } from "@/lib-wkt3/walletEngine/transactions";

export default function WalletDisplay() {
  const balance = getBalance("u1");
  const txns = getTransactions("u1");

  return (
    <div className="space-y-4">
      <p className="text-lg font-semibold">Current Balance: ₹{balance}</p>
      <h2 className="text-md font-bold">Recent Transactions</h2>
      <ul className="border rounded p-4 space-y-2">
        {txns.map((txn) => (
          <li key={txn.id}>
            {txn.type} ₹{txn.amount} @{" "}
            {new Date(txn.timestamp).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
}
