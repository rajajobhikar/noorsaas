import WalletDisplay from "./WalletDisplay";

export default function WalletPage() {
  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">Your Wallet</h1>
      <WalletDisplay />
    </div>
  );
}
