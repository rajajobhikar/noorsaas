type Wallet = Record<string, number>; // userId → balance

export const wallet: Wallet = {
  u1: 5000,
  u2: 1200,
};

export function getBalance(userId: string): number {
  return wallet[userId] || 0;
}

export function deposit(userId: string, amount: number): void {
  wallet[userId] = getBalance(userId) + amount;
}
