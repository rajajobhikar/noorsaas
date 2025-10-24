import ImageEditor from './ImageEditor';

export default function UploadPage() {
  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-xl font-bold mb-4">Upload & Edit Image</h1>
      <ImageEditor />
    </div>
  );
}