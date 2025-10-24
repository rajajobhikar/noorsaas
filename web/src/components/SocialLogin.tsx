"use client";

import Link from "next/link";

export default function SocialLogin() {
  return (
    <div className="space-y-2">
      <Link
        href="/api/oauth/google/start"
        className="block bg-red-600 text-white px-4 py-2 rounded text-center"
      >
        Sign in with Google
      </Link>
      <Link
        href="/api/oauth/github/start"
        className="block bg-gray-800 text-white px-4 py-2 rounded text-center"
      >
        Sign in with GitHub
      </Link>
    </div>
  );
}
