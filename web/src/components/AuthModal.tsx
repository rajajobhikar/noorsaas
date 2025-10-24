export default function AuthModal({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-md mx-auto mt-10 bg-white shadow-lg rounded-lg p-6 space-y-4">
      {children}
    </div>
  );
}
