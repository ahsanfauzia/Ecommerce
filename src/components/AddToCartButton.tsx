"use client";

import type { Product } from "@/types/product";
import { useCart } from "@/components/CartProvider";

export function AddToCartButton({ product }: { product: Product }) {
  const { addToCart } = useCart();

  return (
    <button
      onClick={() => addToCart(product)}
      className="w-full rounded-full bg-yellow-400 px-4 py-2 text-sm font-semibold text-black hover:bg-yellow-500"
    >
      Add to Cart
    </button>
  );
}