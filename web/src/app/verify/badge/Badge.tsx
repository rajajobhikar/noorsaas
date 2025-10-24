'use client';
import { hasFairnessBadge } from '@/lib-wkt3/kycEngine/badge';

export default function Badge({ userId }: { userId: string }) {
  const verified = hasFairnessBadge(userId);
  return verified ? (
    <span className="inline-block bg-green-600 text-white px-2 py-1 rounded text-xs">Fairness Verified ✅</span>
  ) : (
    <span className="inline-block bg-gray-300 text-black px-2 py-1 rounded text-xs">Unverified</span>
  );
}