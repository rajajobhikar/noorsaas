"use client";
import { useState } from "react";
import QuoteHeader from "@/components/QuoteHeader";
import AuthModal from "@/components/AuthModal";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function ForgotPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/auth/forgot", {
      method: "POST",
      body: JSON.stringify({ email }),
      headers: { "Content-Type": "application/json" },
    });

    const result = await res.json();
    if (result.redirect) {
      setMessage(result.message);
      setTimeout(() => router.push(result.redirect), 3000); // ✅ Sweet redirect
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
          <h2 className="text-xl font-bold">Forgot Password</h2>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded"
          >
            Send Reset Link
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
