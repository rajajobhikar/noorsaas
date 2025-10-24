export function applyCommission(winnings: number): number {
  const commissionRate = 0.15;
  return winnings * (1 - commissionRate);
}