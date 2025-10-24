import { hasFairnessBadge } from "@/lib-wkt3/kycEngine/badge";

export function getFairnessBoost(userId: string): number {
  return hasFairnessBadge(userId) ? 50 : 0;
}
