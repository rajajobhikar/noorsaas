"use client";
import { useState } from "react";
import { generateOtp } from "@/lib-wkt3/otpManager/generateOtp";
import { sendOtpEmail } from "@/lib-wkt3/nodemailerEngine/sendEmail";
import { hashPassword } from "@/lib-wkt3/passwordHasher/hash";
import { verifyOtp } from "@/lib-wkt3/otpManager/verifyOtp";
import { findUserByEmail } from "@/lib-wkt3/wkt3db/userStore";
import { useRouter } from "next/navigation";

export default function ResetForm() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [strength, setStrength] = useState(0);
  const [step, setStep] = useState<"email" | "otp" | "reset">("email");
  const [message, setMessage] = useState("");
  const router = useRouter();

  function evaluateStrength(password: string) {
    let score = 0;
    if (password.length >= 8) score += 25;
    if (/[A-Z]/.test(password)) score += 25;
    if (/[0-9]/.test(password)) score += 25;
    if (/[^A-Za-z0-9]/.test(password)) score += 25;
    setStrength(score);
  }

  const handleEmail = async () => {
    const user = findUserByEmail(email);
    if (!user) {
      setMessage("❌ Email not found");
      return;
    }
    const code = generateOtp(email);
    await sendOtpEmail(email, code);
    setStep("otp");
    setMessage("✅ OTP sent to your email");
  };

  const handleVerify = () => {
    if (verifyOtp(email, otp)) {
      setStep("reset");
      setMessage("");
    } else {
      setMessage("❌ Invalid OTP");
    }
  };

  const handleReset = () => {
    const user = findUserByEmail(email);
    if (!user) {
      setMessage("❌ User not found");
      return;
    }
    user.password = hashPassword(newPassword);
    setMessage("✅ Password reset successfully!");
    setTimeout(() => router.push("/login"), 2000);
  };

  return (
    <div className="space-y-4">
      {step === "email" && (
        <>
          <input
            type="email"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-2 w-full rounded"
          />
          <button
            onClick={handleEmail}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Send OTP
          </button>
        </>
      )}
      {step === "otp" && (
        <>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="border p-2 w-full rounded"
          />
          <button
            onClick={handleVerify}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Verify OTP
          </button>
        </>
      )}
      {step === "reset" && (
        <>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="New password"
            value={newPassword}
            onChange={(e) => {
              setNewPassword(e.target.value);
              evaluateStrength(e.target.value);
            }}
            className="border p-2 w-full rounded"
          />
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              onChange={() => setShowPassword(!showPassword)}
            />
            <span>Show Password</span>
          </label>
          <div className="w-full bg-gray-200 rounded h-2">
            <div
              className={`h-2 rounded ${
                strength === 100 ? "bg-green-500" : "bg-yellow-500"
              }`}
              style={{ width: `${strength}%` }}
            />
          </div>
          <p className="text-sm text-gray-600">
            Password must be 8+ characters, 1 capital, 1 digit, 1 special
            symbol.
          </p>
          <button
            onClick={handleReset}
            className="bg-purple-600 text-white px-4 py-2 rounded"
          >
            Reset Password
          </button>
        </>
      )}
      {message && (
        <p
          className={`text-sm text-center ${
            message.startsWith("✅") ? "text-green-600" : "text-red-600"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
}
