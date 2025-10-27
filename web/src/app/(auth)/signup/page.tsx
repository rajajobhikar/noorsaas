"use client";
import { useState, useRef } from "react";
import QuoteHeader from "@/components/QuoteHeader";
import AuthModal from "@/components/AuthModal";
import Image from "next/image";
import SocialLogin from "@/components/SocialLogin";

export default function SignupPage() {
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [strength, setStrength] = useState(0);
  const formRef = useRef<HTMLFormElement>(null);

  function evaluateStrength(password: string) {
    let score = 0;
    if (password.length >= 8) score += 25;
    if (/[A-Z]/.test(password)) score += 25;
    if (/[0-9]/.test(password)) score += 25;
    if (/[^A-Za-z0-9]/.test(password)) score += 25;
    setStrength(score);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = formRef.current;
    if (!form) return;

    const formData = new FormData(form);
    const name = formData.get("name")?.toString();
    const email = formData.get("email")?.toString();
    const password = formData.get("password")?.toString();
    const confirm = formData.get("confirm")?.toString();

    if (!name || !email || !password || !confirm) {
      setMessage("❌ All fields are required");
      return;
    }

    if (password !== confirm) {
      setMessage("❌ Passwords do not match");
      return;
    }

    const res = await fetch("/api/auth/custom-register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        email,
        password,
        flair: "default", // ✅ required by backend, but hidden from UI
        interests: [], // ✅ required by backend, but empty
      }),
    });

    const data = await res.json();

    if (res.ok && data.success) {
      setMessage("✅ Account created. You are now logged in.");
      form.reset();
      setStrength(0);
      window.scrollTo({ top: 0, behavior: "smooth" });
      setTimeout(() => setMessage(""), 5000);
    } else {
      setMessage(`❌ ${data.error || "Signup failed"}`);
    }
  }

  return (
    <div>
      <QuoteHeader />
      <AuthModal>
        <div className="flex items-center justify-center mb-4">
          <Image
            src="/bowler.jpg"
            alt="WKT3 Logo"
            height={100}
            width={100}
            priority
          />
          <h2 className="text-xl font-bold">Sign Up at wkt3.com</h2>
        </div>
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            required
            className="w-full p-2 border rounded"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            className="w-full p-2 border rounded"
          />
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            required
            className="w-full p-2 border rounded"
            onChange={(e) => evaluateStrength(e.target.value)}
          />
          <input
            type={showPassword ? "text" : "password"}
            name="confirm"
            placeholder="Confirm Password"
            required
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
          <label className="flex items-center space-x-2">
            <input type="checkbox" name="terms" required />
            <span>
              I accept the{" "}
              <a href="/terms" className="text-blue-600 underline">
                Terms & Conditions
              </a>
            </span>
          </label>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded"
          >
            Sign Up
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

        <SocialLogin />
      </AuthModal>
    </div>
  );
}
