'use client';
import { getAllVideos } from '@/lib-wkt3/videoEngine/storeVideo';

export default function MediaGrid() {
  const videos = getAllVideos();

  return (
    <div className="grid grid-cols-2 gap-4">
      {videos.map(v => (
        <div key={v.id} className="border p-2 rounded">
          <video src={v.url} controls className="w-full" />
          <p className="text-sm mt-1">{v.name}</p>
        </div>
      ))}
    </div>
  );
}