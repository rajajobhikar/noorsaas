import { kycStore, type KycData } from './storeKyc';

export function approveKyc(userId: string): boolean {
  const record = kycStore.find((k: KycData) => k.userId === userId);
  if (!record) return false;
  record.status = 'APPROVED';
  return true;
}