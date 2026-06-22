"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function ReviewForm({ productId }: { productId: number }) {
  const router = useRouter();
  const [rating, setRating] = useState("5");
  const [comment, setComment] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function submitReview(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    setIsSubmitting(true);

    const response = await fetch("/api/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId, rating, comment }),
    });

    const data = await response.json();
    setIsSubmitting(false);

    if (response.status === 401) {
      router.push("/login");
      return;
    }

    if (!response.ok) {
      setMessage(data.message ?? "Could not submit review.");
      return;
    }

    setComment("");
    setRating("5");
    router.refresh();
  }

  return (
    <form onSubmit={submitReview} className="mt-5 space-y-3 rounded-lg border bg-white p-4">
      <h3 className="font-semibold">Write a review</h3>
      <select
        value={rating}
        onChange={(event) => setRating(event.target.value)}
        className="w-full rounded-md border px-3 py-2"
      >
        <option value="5">5 stars</option>
        <option value="4">4 stars</option>
        <option value="3">3 stars</option>
        <option value="2">2 stars</option>
        <option value="1">1 star</option>
      </select>
      <textarea
        value={comment}
        onChange={(event) => setComment(event.target.value)}
        placeholder="Share your experience"
        className="min-h-24 w-full rounded-md border px-3 py-2"
      />
      {message && <p className="text-sm text-red-600">{message}</p>}
      <button
        disabled={isSubmitting}
        className="rounded-md bg-black px-4 py-2 text-sm font-semibold text-white disabled:opacity-70"
      >
        {isSubmitting ? "Submitting..." : "Submit Review"}
      </button>
    </form>
  );
}
