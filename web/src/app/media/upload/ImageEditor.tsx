'use client';
import { useState } from 'react';
import { validateImage } from '@/lib-wkt3/imageEngine/validateImage';
import { applyEdits } from '@/lib-wkt3/imageEngine/editImage';
import Image from 'next/image';

export default function ImageEditor() {
  const [preview, setPreview] = useState<string | null>(null);
  const [edits, setEdits] = useState({ blur: 0, brightness: 100, saturation: 100 });

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !validateImage(file)) return alert('❌ Invalid image');

    const reader = new FileReader();
    reader.onload = () => setPreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleEdit = () => {
    const img = document.getElementById('preview-img') as HTMLImageElement;
    const edited = applyEdits(img, edits);
    setPreview(edited);
  };

  return (
    <div className="space-y-4">
      <input type="file" accept="image/*" onChange={handleUpload} />
      {preview && (
        <>
          <Image id="preview-img" src={preview} alt="Preview" height={300} width={300} className="max-w-full rounded shadow" />
          <div className="grid grid-cols-3 gap-4">
            <label>
              Blur
              <input type="range" min={0} max={10} value={edits.blur} onChange={e => setEdits({ ...edits, blur: +e.target.value })} />
            </label>
            <label>
              Brightness
              <input type="range" min={50} max={150} value={edits.brightness} onChange={e => setEdits({ ...edits, brightness: +e.target.value })} />
            </label>
            <label>
              Saturation
              <input type="range" min={50} max={150} value={edits.saturation} onChange={e => setEdits({ ...edits, saturation: +e.target.value })} />
            </label>
          </div>
          <button onClick={handleEdit} className="bg-blue-600 text-white px-4 py-2 rounded">Apply Edits</button>
        </>
      )}
    </div>
  );
}