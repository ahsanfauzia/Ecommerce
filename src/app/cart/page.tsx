"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/components/CartProvider";

export default function CartPage() {
  const { items, addToCart, decreaseQuantity, removeFromCart, totalPrice } =
    useCart();

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
    <main className="mx-auto max-w-5xl px-6 py-10">
      <h1 className="mb-8 text-3xl font-bold">Shopping Cart</h1>

      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <section className="space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex gap-4 rounded-lg border bg-white p-4"
            >
              <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-md bg-gray-50">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="112px"
                  className="object-contain p-2"
                />
              </div>

              <div className="flex flex-1 justify-between gap-4">
                <div>
                  <h2 className="font-semibold">{item.name}</h2>
                  <p className="text-sm text-gray-500">{item.brand}</p>
                  <p className="mt-1 text-sm text-green-700">In stock</p>

                  <div className="mt-3 flex w-fit items-center overflow-hidden rounded-full border">
                    <button
                      onClick={() => decreaseQuantity(item.id)}
                      className="px-3 py-1 font-bold hover:bg-gray-100"
                    >
                      -
                    </button>
                    <span className="min-w-10 px-3 text-center text-sm">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => addToCart(item)}
                      className="px-3 py-1 font-bold hover:bg-gray-100"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="mt-3 text-sm font-medium text-red-600"
                  >
                    Remove
                  </button>
                </div>

                <p className="font-bold">
                  Rs. {(item.price * item.quantity).toLocaleString("en-IN")}
                </p>
              </div>
            </div>
          ))}
        </section>

        <aside className="h-fit rounded-lg border bg-white p-6">
          <div className="flex justify-between text-xl font-bold">
            <span>Subtotal</span>
            <span>Rs. {totalPrice.toLocaleString("en-IN")}</span>
          </div>
          <p className="mt-2 text-sm text-gray-600">
            Delivery and taxes are calculated during checkout.
          </p>

          <Link
            href="/checkout"
            className="mt-6 block rounded-md bg-yellow-400 px-5 py-3 text-center font-semibold text-black hover:bg-yellow-500"
          >
            Proceed to Checkout
          </Link>
        </aside>
      </div>
    </main>
  );
}
