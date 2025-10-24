type VideoMeta = {
  id: string;
  name: string;
  url: string;
  uploadedAt: number;
};

const videoStore: VideoMeta[] = [];

export function storeVideo(name: string, url: string): VideoMeta {
  const video = { id: `vid-${Date.now()}`, name, url, uploadedAt: Date.now() };
  videoStore.push(video);
  return video;
}

export function getAllVideos(): VideoMeta[] {
  return videoStore;
}