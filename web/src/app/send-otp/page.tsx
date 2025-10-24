"use client";
import { useState } from "react";
import axios from "axios";

export default function SendOTPPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleSend = async () => {
    try {
      await axios.post("http://localhost:8080/send-otp", { email });
      setSent(true);
    } catch {
      alert("Failed to send OTP");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Send OTP</h2>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full mb-4 p-2 border rounded"
      />
      <button
        onClick={handleSend}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Send OTP
      </button>
      {sent && (
        <div className="mt-4 text-green-700 font-semibold">
          ✅ OTP sent! Check your email.
        </div>
      )}
    </div>
  );
}
