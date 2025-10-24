"use client";

export default function ExpiredTokenPage() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center text-white"
      style={{
        backgroundImage:
          "url('https://copilot.microsoft.com/th/id/BCO.976536c5-6267-48d6-a12a-ab6df5d4f493.png')",
      }}
    >
      <div className="bg-black bg-opacity-60 p-8 rounded-xl text-center max-w-md">
        <h1 className="text-4xl font-bold mb-4">Oops! Expired Token</h1>
        <p className="text-lg mb-6">
          Your link has expired. Please request a new one to proceed.
        </p>
        <button
          onClick={() => (window.location.href = "/resend")}
          className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-full text-lg transition"
        >
          Request New Link
        </button>
      </div>
    </div>
  );
}
