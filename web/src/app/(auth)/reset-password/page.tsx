"use client";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import QuoteHeader from "@/components/QuoteHeader";
import AuthModal from "@/components/AuthModal";
import Image from "next/image";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [strength, setStrength] = useState(0);
  const [message, setMessage] = useState("");
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  useEffect(() => {
    if (!token) {
      setMessage("❌ Invalid or missing token");
    }
  }, [token]);

  function evaluateStrength(password: string) {
    let score = 0;
    if (password.length >= 8) score += 25;
    if (/[A-Z]/.test(password)) score += 25;
    if (/[0-9]/.test(password)) score += 25;
    if (/[^A-Za-z0-9]/.test(password)) score += 25;
    setStrength(score);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!token) {
      setMessage("❌ Missing token");
      return;
    }
    if (password !== confirm) {
      setMessage("❌ Passwords do not match");
      return;
    }

    const res = await fetch("/api/auth/reset-password", {
      method: "POST",
      body: JSON.stringify({ token, password }),
      headers: { "Content-Type": "application/json" },
    });

    const result = await res.json();
    if (res.ok) {
      setMessage("✅ Password reset. Redirecting to login...");
      setTimeout(() => router.push("/login"), 2000);
    } else {
      setMessage(`❌ ${result.error}`);
    }
  }

  return (
    <div>
      <QuoteHeader />
      <AuthModal>
        <div className="flex items-center justify-center mb-4">
          <Image src="/bowler.jpg" alt="WKT3 Logo" height={100} width={100} />
          <h2 className="text-xl font-bold">Reset Your Password</h2>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="New Password"
            required
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              evaluateStrength(e.target.value);
            }}
            className="w-full p-2 border rounded"
          />
          <input
            type={showPassword ? "text" : "password"}
            name="confirm"
            placeholder="Confirm Password"
            required
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            className="w-full p-2 border rounded"
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
            type="submit"
            className="w-full bg-purple-600 text-white py-2 rounded"
          >
            Reset Password
          </button>
          {message && (
            <p
              className={`text-sm text-center ${
                message.startsWith("✅") ? "text-green-600" : "text-red-600"
              }`}
            >
              {message}
            </p>
          )}
        </form>
      </AuthModal>
    </div>
  );
}
