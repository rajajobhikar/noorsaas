import DisputeForm from './DisputeForm';

export default function DisputePage() {
  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">Raise a Dispute</h1>
      <DisputeForm />
    </div>
  );
}