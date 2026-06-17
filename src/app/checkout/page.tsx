"use client";

import { useState } from "react";
import { useCart } from "@/components/CartProvider";

export default function CheckoutPage() {
  const { totalPrice, clearCart } = useCart();
  const [success, setSuccess] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    clearCart();
    setSuccess(true);
  }

  if (success) {
    return (
      <main className="mx-auto max-w-3xl px-6 py-10">
        <h1 className="text-3xl font-bold">Order placed successfully</h1>
        <p className="mt-3 text-gray-600">
          This is a demo checkout. No real payment was charged.
        </p>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="mb-8 text-3xl font-bold">Checkout</h1>

      <form onSubmit={handleSubmit} className="space-y-5 rounded-lg border bg-white p-6">
        <input
          required
          placeholder="Full name"
          className="w-full rounded-md border px-4 py-3"
        />
        <input
          required
          type="email"
          placeholder="Email address"
          className="w-full rounded-md border px-4 py-3"
        />
        <input
          required
          placeholder="Shipping address"
          className="w-full rounded-md border px-4 py-3"
        />

        <div className="flex justify-between border-t pt-5 text-xl font-bold">
          <span>Total</span>
          <span>${totalPrice}</span>
        </div>

        <button className="w-full rounded-md bg-black px-5 py-3 font-semibold text-white">
          Place Order
        </button>
      </form>
    </main>
  );
}