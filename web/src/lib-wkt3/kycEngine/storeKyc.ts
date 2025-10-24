export type KycData = {
  userId: string;
  pan: string;
  aadhaar: string;
  selfie: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
};

export const kycStore: KycData[] = [];

export function submitKyc(data: KycData): boolean {
  kycStore.push(data);
  return true;
}

export function getPendingKyc(): KycData[] {
  return kycStore.filter(k => k.status === 'PENDING');
}