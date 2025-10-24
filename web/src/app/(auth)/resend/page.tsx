"use client";

export default function ResendLinkPage() {
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const form = new FormData(e.target as HTMLFormElement);
    const res = await fetch("/api/auth/resend", {
      method: "POST",
      body: form,
    });
    const data = await res.json();
    alert(data.message || data.error);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 to-blue-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full"
      >
        <h1 className="text-2xl font-bold mb-4 text-center">
          🔁 Request New Link
        </h1>
        <input
          name="email"
          type="email"
          placeholder="Enter your email"
          required
          className="w-full px-4 py-2 mb-4 border rounded"
        />
        <button
          type="submit"
          className="w-full bg-pink-500 hover:bg-pink-600 text-white py-2 rounded transition"
        >
          Send New Link
        </button>
      </form>
    </div>
  );
}
