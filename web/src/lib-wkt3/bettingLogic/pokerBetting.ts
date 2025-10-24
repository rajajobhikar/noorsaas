export function calculatePokerWinnings(pot: number): number {
  const commission = 0.15;
  return Math.floor(pot * (1 - commission));
}
