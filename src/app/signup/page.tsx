"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignupPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);
    const formData = new FormData(event.currentTarget);

    const response = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: formData.get("name"),
        email: formData.get("email"),
        password: formData.get("password"),
      }),
    });

    const data = await response.json();
    setIsSubmitting(false);

    if (!response.ok) {
      setError(data.message ?? "Signup failed.");
      return;
    }

    router.push("/");
    router.refresh();
  }

  return (
    <main className="mx-auto max-w-md px-4 py-10">
      <form onSubmit={handleSubmit} className="space-y-5 rounded-lg border bg-white p-6 shadow-sm">
        <h1 className="text-3xl font-bold">Create Account</h1>
        <input required name="name" placeholder="Full name" className="w-full rounded-md border px-4 py-3" />
        <input required name="email" type="email" placeholder="Email" className="w-full rounded-md border px-4 py-3" />
        <input required name="password" type="password" minLength={6} placeholder="Password" className="w-full rounded-md border px-4 py-3" />
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button disabled={isSubmitting} className="w-full rounded-md bg-yellow-400 px-5 py-3 font-semibold text-black hover:bg-yellow-500 disabled:opacity-70">
          {isSubmitting ? "Creating account..." : "Sign Up"}
        </button>
        <p className="text-sm text-gray-600">
          Already have an account? <Link href="/login" className="font-semibold text-blue-700">Login</Link>
        </p>
      </form>
    </main>
  );
}
