'use client';
import { getPendingKyc } from '@/lib-wkt3/kycEngine/storeKyc';
import { approveKyc } from '@/lib-wkt3/kycEngine/approveKyc';
import { useState } from 'react';
import Image from 'next/image';

export default function ReviewPanel() {
  const [pending, setPending] = useState(getPendingKyc());

  const handleApprove = (userId: string) => {
    approveKyc(userId);
    setPending(getPendingKyc());
  };

  return (
    <div className="space-y-4">
      {pending.map(k => (
        <div key={k.userId} className="border p-4 rounded">
          <p>PAN: {k.pan}</p>
          <p>Aadhaar: {k.aadhaar}</p>
          <Image src={k.selfie} alt="Selfie" height={32} width={32} className="w-32 h-32 object-cover rounded" />
          <button onClick={() => handleApprove(k.userId)} className="mt-2 bg-blue-600 text-white px-4 py-2 rounded">Approve</button>
        </div>
      ))}
    </div>
  );
}