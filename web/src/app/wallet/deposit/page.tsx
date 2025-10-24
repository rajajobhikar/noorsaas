import DepositForm from "./DepositForm";

export default function DepositPage() {
  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">Deposit to Wallet</h1>
      <DepositForm />
    </div>
  );
}
