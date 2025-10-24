import { Dispute, disputes } from './disputeData';

export function submitDispute(userId: string, type: Dispute['type'], description: string): Dispute {
  const dispute: Dispute = { id: `d-${Date.now()}`, userId, type, description, status: 'OPEN' };
  disputes.push(dispute);
  return dispute;
}