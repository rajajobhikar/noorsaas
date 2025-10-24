type Transaction = {
  id: string;
  userId: string;
  type: "DEPOSIT" | "WITHDRAW";
  amount: number;
  timestamp: number;
};

const transactions: Transaction[] = [];

export function logTransaction(
  userId: string,
  type: Transaction["type"],
  amount: number
): void {
  transactions.push({
    id: `txn-${Date.now()}`,
    userId,
    type,
    amount,
    timestamp: Date.now(),
  });
}

export function getTransactions(userId: string): Transaction[] {
  return transactions.filter((t) => t.userId === userId);
}
