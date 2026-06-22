"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/components/CartProvider";

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart();
  const [successOrderId, setSuccessOrderId] = useState<number | null>(null);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (items.length === 0) {
      setError("Your cart is empty.");
      return;
    }

    const formData = new FormData(event.currentTarget);
    setIsSubmitting(true);

    const response = await fetch("/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fullName: formData.get("fullName"),
        email: formData.get("email"),
        address: formData.get("address"),
        paymentMethod: formData.get("paymentMethod"),
        items,
      }),
    });

    const data = await response.json();
    setIsSubmitting(false);

    if (!response.ok) {
      setError(data.message ?? "Order could not be placed.");
      return;
    }

    clearCart();
    setSuccessOrderId(data.order.id);
  }

  if (successOrderId) {
    return (
      <main className="mx-auto max-w-3xl px-6 py-10">
        <div className="rounded-lg border bg-white p-8">
          <p className="text-sm font-semibold text-green-700">
            Order confirmed
          </p>
          <h1 className="mt-2 text-3xl font-bold">
            Your order has been placed
          </h1>
          <p className="mt-3 text-gray-600">
            Order ID: #{successOrderId}. Payment is saved with the order.
          </p>
          <Link
            href="/"
            className="mt-6 inline-block rounded-md bg-black px-5 py-3 text-white"
          >
            Continue Shopping
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto grid max-w-6xl gap-8 px-6 py-10 lg:grid-cols-[1fr_360px]">
      <section>
        <h1 className="mb-8 text-3xl font-bold">Checkout</h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-5 rounded-lg border bg-white p-6"
        >
          <input required name="fullName" placeholder="Full name" className="w-full rounded-md border px-4 py-3" />
          <input required name="email" type="email" placeholder="Email address" className="w-full rounded-md border px-4 py-3" />
          <textarea required name="address" placeholder="Shipping address" className="min-h-28 w-full rounded-md border px-4 py-3" />

          <div className="rounded-lg border p-4">
            <h2 className="font-semibold">Payment Method</h2>
            <div className="mt-3 space-y-3 text-sm">
              <label className="flex items-center gap-3">
                <input type="radio" name="paymentMethod" value="Cash on Delivery" defaultChecked />
                Cash on Delivery
              </label>
              <label className="flex items-center gap-3">
                <input type="radio" name="paymentMethod" value="UPI Demo Payment" />
                UPI Demo Payment
              </label>
              <label className="flex items-center gap-3">
                <input type="radio" name="paymentMethod" value="Card Demo Payment" />
                Card Demo Payment
              </label>
            </div>
            <p className="mt-3 text-xs text-gray-500">
              Demo payments are marked as paid without charging money. Razorpay can be added with live keys later.
            </p>
          </div>

          {error && <p className="text-sm font-medium text-red-600">{error}</p>}

          <button
            disabled={isSubmitting}
            className="w-full rounded-md bg-yellow-400 px-5 py-3 font-semibold text-black hover:bg-yellow-500 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? "Placing Order..." : "Place Order"}
          </button>
        </form>
      </section>

      <aside className="h-fit rounded-lg border bg-white p-6">
        <h2 className="text-xl font-bold">Order Summary</h2>
        <div className="mt-4 space-y-3">
          {items.map((item) => (
            <div key={item.id} className="flex justify-between gap-4 text-sm">
              <span>{item.name} x {item.quantity}</span>
              <span>Rs. {(item.price * item.quantity).toLocaleString("en-IN")}</span>
            </div>
          ))}
        </div>
        <div className="mt-5 flex justify-between border-t pt-5 text-xl font-bold">
          <span>Total</span>
          <span>Rs. {totalPrice.toLocaleString("en-IN")}</span>
        </div>
      </aside>
    </main>
  );
}
