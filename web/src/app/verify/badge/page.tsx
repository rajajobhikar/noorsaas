'use client';
import Badge from './Badge';

export default function BadgePage() {
  const userId = 'u1'; // Replace with dynamic session logic if needed

  return (
    <div className="p-6 max-w-md mx-auto space-y-4">
      <h1 className="text-xl font-bold">Fairness Badge Status</h1>
      <Badge userId={userId} />
    </div>
  );
}