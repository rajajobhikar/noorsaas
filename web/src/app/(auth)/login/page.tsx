"use client";

import { useState,useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import QuoteHeader from "@/components/QuoteHeader";
import AuthModal from "@/components/AuthModal";
import Image from "next/image";
import SocialLogin from "@/components/SocialLogin";
import { useUser } from "@/context/UserContext";


export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();
  const params = useSearchParams();
  const { setUser } = useUser();
    useEffect(() => {
      setUser(null); // ✅ Clear context on login page
    }, [setUser]);
  // ✅ Show success message from signup redirect
  const successMsg = params.get("msg");
  const displayMsg = message || (successMsg ? `✅ ${successMsg}` : "");
  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setMessage(""); // clear previous

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: { "Content-Type": "application/json" },
      });

      const result = await res.json();
      if (res.ok && result.success && result.user) {
        setMessage("✅ Login successful");
        setUser(result.user);
        router.push("/dashboard");
      } else {
        setMessage(`❌ ${result.error || "Login failed"}`);
      }

    } catch (err) {
      console.error("❌ Login error:", err);
      setMessage("❌ Server error");
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
          <h2 className="text-xl font-bold">Login to wkt3.com</h2>
        </div>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded"
          />
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded"
          />
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              onChange={() => setShowPassword(!showPassword)}
            />
            <span>Show Password</span>
          </label>
          <div className="text-right">
            <a href="/forgot" className="text-blue-600 underline text-sm">
              Forgot Password?
            </a>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded"
          >
            Login
          </button>
          {displayMsg && (
            <p
              className={`text-sm text-center ${
                displayMsg.startsWith("✅") ? "text-green-600" : "text-red-600"
              }`}
            >
              {displayMsg}
            </p>
          )}
        </form>
        <SocialLogin />
      </AuthModal>
    </div>
  );
}
 