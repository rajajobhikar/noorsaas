'use client';
import { useState } from 'react';
import { submitDispute } from '@/lib-wkt3/disputeEngine/submitDispute';

export default function DisputeForm() {
  const [type, setType] = useState<'MATCH' | 'MONEY' | 'ABUSE'>('MATCH');
  const [desc, setDesc] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (desc.trim() === '') {
      setMessage('⚠️ Please describe your issue');
      return;
    }
    submitDispute('u1', type, desc);
    setMessage('✅ Dispute submitted');
    setDesc(''); // Clear the description after submission
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <label htmlFor="dispute-type" className="block text-sm font-medium text-gray-700">
        Dispute Type
      </label>
      <select
        id="dispute-type"
        value={type}
        onChange={e => setType(e.target.value as 'MATCH' | 'MONEY' | 'ABUSE')}
        className="border p-2 w-full rounded"
      >
        <option value="MATCH">Match Issue</option>
        <option value="MONEY">Money Issue</option>
        <option value="ABUSE">Abuse / Misconduct</option>
      </select>
      <label htmlFor="dispute-desc" className="block text-sm font-medium text-gray-700">
        Description
      </label>
      <textarea
        id="dispute-desc"
        value={desc}
        onChange={e => setDesc(e.target.value)}
        placeholder="Describe your issue in detail"
        className="border p-2 w-full rounded h-32"
        required
      />
      <button type="submit" className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">Submit Dispute</button>
      {message && <p className="text-sm text-gray-700">{message}</p>}
    </form>
  );
}