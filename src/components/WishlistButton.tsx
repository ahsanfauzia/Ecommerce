"use client";

import { useRouter } from "next/navigation";
import { Heart } from "lucide-react";
import { useState } from "react";

type WishlistButtonProps = {
  productId: number;
  initialWished?: boolean;
  compact?: boolean;
};

export function WishlistButton({ productId, initialWished = false, compact = false }: WishlistButtonProps) {
  const router = useRouter();
  const [wished, setWished] = useState(initialWished);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function toggleWishlist() {
    setIsLoading(true);
    setMessage("");

    const response = await fetch("/api/wishlist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId }),
    });

    const data = await response.json();
    setIsLoading(false);

    if (response.status === 401) {
      router.push("/login");
      return;
    }

    if (!response.ok) {
      setMessage(data.message ?? "Could not update wishlist.");
      return;
    }

    setWished(data.wished);
    router.refresh();
  }

  return (
    <div>
      <button
        onClick={toggleWishlist}
        disabled={isLoading}
        className={
          compact
            ? "absolute right-3 top-3 rounded-full bg-white p-2 shadow hover:bg-gray-100"
            : "flex w-full items-center justify-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold hover:bg-gray-50"
        }
        aria-label="Toggle wishlist"
      >
        <Heart size={18} fill={wished ? "#ef4444" : "none"} className={wished ? "text-red-500" : "text-gray-700"} />
        {!compact && <span>{wished ? "Wishlisted" : "Add to Wishlist"}</span>}
      </button>
      {message && !compact && <p className="mt-2 text-sm text-red-600">{message}</p>}
    </div>
  );
}
