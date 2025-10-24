'use client';
import { useState } from 'react';
import { submitKyc } from '@/lib-wkt3/kycEngine/storeKyc';

export default function KycForm() {
  const [form, setForm] = useState({ pan: '', aadhaar: '', selfie: '' });
  const [message, setMessage] = useState('');

  const handleSubmit = () => {
    submitKyc({ userId: 'u1', ...form, status: 'PENDING' });
    setMessage('✅ KYC submitted for review');
  };

  return (
    <div className="space-y-4">
      <input type="text" placeholder="PAN Number" value={form.pan} onChange={e => setForm({ ...form, pan: e.target.value })} className="border p-2 w-full rounded" />
      <input type="text" placeholder="Aadhaar Number" value={form.aadhaar} onChange={e => setForm({ ...form, aadhaar: e.target.value })} className="border p-2 w-full rounded" />
      <input type="text" placeholder="Selfie URL" value={form.selfie} onChange={e => setForm({ ...form, selfie: e.target.value })} className="border p-2 w-full rounded" />
      <button onClick={handleSubmit} className="bg-green-600 text-white px-4 py-2 rounded">Submit KYC</button>
      <p className="text-sm text-gray-700">{message}</p>
    </div>
  );
}