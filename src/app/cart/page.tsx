"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/components/CartProvider";

export default function CartPage() {
  const { items, removeFromCart, totalPrice } = useCart();

  if (items.length === 0) {
    return (
      <main className="mx-auto max-w-4xl px-6 py-10">
        <h1 className="text-3xl font-bold">Your cart is empty</h1>
        <Link
          href="/"
          className="mt-6 inline-block rounded-md bg-black px-5 py-3 text-white"
        >
          Continue Shopping
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-4xl px-6 py-10">
      <h1 className="mb-8 text-3xl font-bold">Shopping Cart</h1>

      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex gap-4 rounded-lg border bg-white p-4"
          >
            <div className="relative h-24 w-24 overflow-hidden rounded-md">
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-cover"
              />
            </div>

            <div className="flex flex-1 justify-between gap-4">
              <div>
                <h2 className="font-semibold">{item.name}</h2>
                <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                <p className="mt-2 font-bold">${item.price * item.quantity}</p>
              </div>

              <button
                onClick={() => removeFromCart(item.id)}
                className="text-sm font-medium text-red-600"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-lg border bg-white p-6">
        <div className="flex justify-between text-xl font-bold">
          <span>Total</span>
          <span>${totalPrice}</span>
        </div>

        <Link
          href="/checkout"
          className="mt-6 block rounded-md bg-black px-5 py-3 text-center font-semibold text-white"
        >
          Checkout
        </Link>
      </div>
    </main>
  );
}