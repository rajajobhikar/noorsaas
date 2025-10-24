import RazorpayButton from "./RazorpayButton";

export default function GatewayPage() {
  return (
    <div className="p-6 max-w-md mx-auto space-y-4">
      <h1 className="text-xl font-bold">Payment Gateway</h1>
      <RazorpayButton amount={500} />
    </div>
  );
}
