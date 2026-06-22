"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);
    const formData = new FormData(event.currentTarget);

    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: formData.get("email"),
        password: formData.get("password"),
      }),
    });

    const data = await response.json();
    setIsSubmitting(false);

    if (!response.ok) {
      setError(data.message ?? "Login failed.");
      return;
    }

    router.push("/");
    router.refresh();
  }

  return (
    <main className="mx-auto max-w-md px-4 py-10">
      <form onSubmit={handleSubmit} className="space-y-5 rounded-lg border bg-white p-6 shadow-sm">
        <h1 className="text-3xl font-bold">Login</h1>
        <input required name="email" type="email" placeholder="Email" className="w-full rounded-md border px-4 py-3" />
        <input required name="password" type="password" placeholder="Password" className="w-full rounded-md border px-4 py-3" />
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button disabled={isSubmitting} className="w-full rounded-md bg-yellow-400 px-5 py-3 font-semibold text-black hover:bg-yellow-500 disabled:opacity-70">
          {isSubmitting ? "Logging in..." : "Login"}
        </button>
        <p className="text-sm text-gray-600">
          New customer? <Link href="/signup" className="font-semibold text-blue-700">Create account</Link>
        </p>
      </form>
    </main>
  );
}
