// lib-wkt3/bettingLogic/dream11Betting.ts

export function calculateDream11Winnings(totalRuns: number): number {
  const baseAmount = totalRuns * 10;
  const commission = baseAmount * 0.15;
  return Math.floor(baseAmount - commission);
}
