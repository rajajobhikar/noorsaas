import { Dispute, disputes } from './disputeData';

export function getOpenDisputes(): Dispute[] {
  return disputes.filter(d => d.status === 'OPEN');
}

export function getAllDisputes(): Dispute[] {
  return [...disputes];
}

export function getDisputeById(id: string): Dispute | undefined {
  return disputes.find(d => d.id === id);
}