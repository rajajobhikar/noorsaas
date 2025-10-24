import { kycStore, type KycData } from './storeKyc';

export function hasFairnessBadge(userId: string): boolean {
  const record = kycStore.find((k: KycData) => k.userId === userId);
  return record?.status === 'APPROVED';
}