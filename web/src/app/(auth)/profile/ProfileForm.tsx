'use client';
import { useState } from 'react';
import { getUser} from '@/lib-wkt3/userManager/getUser';
import { generateApiKey } from '@/lib-wkt3/apiKeyEngine/generateKey';
import { supportedLanguages, supportedCurrencies } from '@/lib-wkt3/userManager/preferences';
import { updateUser } from '@/lib-wkt3/userManager/updateProfile';

export default function ProfileForm() {
  const userId = 'u1'; // Replace with session logic
  const user = getUser(userId)!;

  const [form, setForm] = useState({
    name: user.name,
    email: user.email,
    language: user.language || 'en',
    currency: user.currency || 'INR',
    twoFA: user.twoFA || false,
  });
  const [apiKey, setApiKey] = useState(user.apiKey || '');
  const [message, setMessage] = useState('');

  const handleUpdate = () => {
    updateUser(userId, form);
    setMessage('✅ Profile updated');
  };

  const handleGenerateKey = () => {
    const key = generateApiKey(userId);
    setApiKey(key);
    setMessage('✅ API Key generated');
  };

  return (
    <div className="space-y-4">
      <input
        type="text"
        value={form.name}
        onChange={e => setForm({ ...form, name: e.target.value })}
        className="border p-2 w-full rounded"
        placeholder="Name"
      />
      <input
        type="email"
        value={form.email}
        onChange={e => setForm({ ...form, email: e.target.value })}
        className="border p-2 w-full rounded"
        placeholder="Email"
      />
      <select
        value={form.language}
        onChange={e => setForm({ ...form, language: e.target.value })}
        className="border p-2 w-full rounded"
      >
        {supportedLanguages.map(lang => (
          <option key={lang} value={lang}>{lang}</option>
        ))}
      </select>
      <select
        value={form.currency}
        onChange={e => setForm({ ...form, currency: e.target.value })}
        className="border p-2 w-full rounded"
      >
        {supportedCurrencies.map(cur => (
          <option key={cur} value={cur}>{cur}</option>
        ))}
      </select>
      <label className="flex items-center space-x-2">
        <input
          type="checkbox"
          checked={form.twoFA}
          onChange={e => setForm({ ...form, twoFA: e.target.checked })}
        />
        <span>Enable 2FA</span>
      </label>
      <button onClick={handleUpdate} className="bg-green-600 text-white px-4 py-2 rounded">
        Save Profile
      </button>
      <button onClick={handleGenerateKey} className="bg-blue-600 text-white px-4 py-2 rounded">
        Generate API Key
      </button>
      {apiKey && <p className="text-sm mt-2">🔑 {apiKey}</p>}
      <p className="text-sm text-gray-700">{message}</p>
    </div>
  );
}