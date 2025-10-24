"use client";
import { useState } from "react";
import axios from "axios";

export default function VerifyPage() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [verified, setVerified] = useState(false);

  const handleVerify = async () => {
    try {
      const res = await axios.post("http://localhost:8080/verify-otp", {
        email: email.trim().toLowerCase(),
        otp: otp.trim(),
      });
      if (res.data.status === "verified") {
        localStorage.setItem("sessionToken", res.data.token);
        setVerified(true);
      }
    } catch {
      alert("Invalid OTP");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Verify OTP</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full mb-2 p-2 border rounded"
      />
      <input
        type="text"
        placeholder="Enter OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        className="w-full mb-4 p-2 border rounded"
      />
      <button
        onClick={handleVerify}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Verify OTP
      </button>
      {verified && (
        <div className="mt-4 text-green-700 font-semibold">
          ✅ Verified! Token saved.
        </div>
      )}
    </div>
  );
}
