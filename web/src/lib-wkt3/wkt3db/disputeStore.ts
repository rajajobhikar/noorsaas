export type Dispute = {
  id: string;
  userId: string;
  reason: string;
  timestamp: number;
  resolved: boolean;
  resolution?: string;
};

export const disputes: Dispute[] = [];

export function addDispute(d: Dispute) {
  disputes.push(d);
}

export function resolveDispute(id: string, resolution: string) {
  const dispute = disputes.find((d) => d.id === id);
  if (dispute) {
    dispute.resolved = true;
    dispute.resolution = resolution;
  }
}

export function getDisputesByUser(userId: string): Dispute[] {
  return disputes.filter((d) => d.userId === userId);
}

export function getAllDisputes(): Dispute[] {
  return disputes;
}
