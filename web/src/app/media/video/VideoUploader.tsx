'use client';
import { useState } from 'react';
import { validateVideo } from '@/lib-wkt3/videoEngine/validateVideo';
import { storeVideo } from '@/lib-wkt3/videoEngine/storeVideo';

export default function VideoUploader() {
  const [preview, setPreview] = useState<string | null>(null);
  const [message, setMessage] = useState('');

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !validateVideo(file)) return alert('❌ Invalid video');

    const url = URL.createObjectURL(file);
    storeVideo(file.name, url);
    setPreview(url);
    setMessage('✅ Video uploaded');
  };

  return (
    <div className="space-y-4">
      <input type="file" accept="video/*" onChange={handleUpload} />
      {preview && (
        <video src={preview} controls className="w-full rounded shadow" />
      )}
      <p className="text-sm text-gray-700">{message}</p>
    </div>
  );
}