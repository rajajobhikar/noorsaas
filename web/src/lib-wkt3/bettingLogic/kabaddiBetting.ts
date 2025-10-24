export function calculateKabaddiWinnings(points: number): number {
  const baseRate = 100; // ₹100 per point
  const commissionRate = 0.15;
  const gross = points * baseRate;
  return gross * (1 - commissionRate);
}