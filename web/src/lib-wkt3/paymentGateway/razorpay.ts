// Define the Razorpay response type
interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

// Define the Razorpay options type
interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  handler: (response: RazorpayResponse) => void;
  prefill: {
    name: string;
    email: string;
  };
}

// Define the Razorpay instance type
interface RazorpayInstance {
  open: () => void;
}

// Define the Razorpay constructor type
interface RazorpayConstructor {
  new (options: RazorpayOptions): RazorpayInstance;
}

// Declare the Razorpay constructor on the window object
declare global {
  interface Window {
    Razorpay: RazorpayConstructor;
  }
}

export function launchRazorpay(amount: number) {
  const options: RazorpayOptions = {
    key: "rzp_test_RTLn3LpYVqKSt7",
    amount: amount * 100,
    currency: "INR",
    name: "WKT3 Wallet",
    description: "Deposit to wallet",
    handler: function (response: RazorpayResponse) {
      console.log("Payment success:", response);
    },
    prefill: {
      name: "User",
      email: "noorgoldfinance@gmail.com",
    },
  };

  const rzp = new window.Razorpay(options);
  rzp.open();
}
