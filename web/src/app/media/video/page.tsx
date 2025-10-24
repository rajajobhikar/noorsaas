import VideoUploader from './VideoUploader';

export default function VideoUploadPage() {
  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-xl font-bold mb-4">Upload Video</h1>
      <VideoUploader />
    </div>
  );
}