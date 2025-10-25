export function evolveFlair(score: number): string {
  if (score >= 90) return "verified mentor";
  if (score >= 70) return "girl going college";
  if (score >= 40) return "fair trainee";
  return "auti going college";
}
