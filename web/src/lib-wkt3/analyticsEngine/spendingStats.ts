type Spending = {
  userId: string;
  amount: number;
};

const spendings: Spending[] = [
  { userId: 'u1', amount: 1200 },
  { userId: 'u2', amount: 800 },
];

export function getSpendingStats() {
  return spendings;
}