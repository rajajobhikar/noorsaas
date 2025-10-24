import { disputes } from './disputeData';

export function resolveDispute(disputeId: string, resolution: string): boolean {
  const dispute = disputes.find(d => d.id === disputeId);
  if (!dispute || dispute.status !== 'OPEN') return false;
  dispute.status = 'RESOLVED';
  dispute.resolution = resolution;
  return true;
}