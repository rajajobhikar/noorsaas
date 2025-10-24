import KycForm from './KycForm';

export default function KycUploadPage() {
  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">Verify Your Identity</h1>
      <KycForm />
    </div>
  );
}