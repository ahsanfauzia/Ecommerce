"use client";

import { useMemo, useState } from "react";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/data/products";

const categories = ["All", "Electronics", "Fashion", "Bags", "Home", "Kitchen"];

export function StoreFront() {
  const [category, setCategory] = useState("All");

  const filteredProducts = useMemo(() => {
    if (category === "All") return products;
    return products.filter((product) => product.category === category);
  }, [category]);

  return (
    <main className="bg-gray-100">
      <section className="bg-gradient-to-r from-sky-200 via-orange-100 to-yellow-100">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 md:grid-cols-[1.2fr_0.8fr] md:items-center">
          <div>
            <p className="mb-3 text-sm font-bold uppercase tracking-wide text-[#232f3e]">
              Big saving days
            </p>
            <h1 className="max-w-2xl text-4xl font-extrabold text-[#131921] md:text-6xl">
              Everything you need, delivered fast
            </h1>
            <p className="mt-4 max-w-xl text-gray-700">
              Shop electronics, fashion, home products and everyday essentials
              with a clean Amazon-style shopping experience.
            </p>
          </div>

          <div className="rounded-lg bg-white p-5 shadow-lg">
            <p className="text-sm font-semibold text-gray-500">Deal of the day</p>
            <h2 className="mt-2 text-2xl font-bold">Smart Fitness Watch</h2>
            <p className="mt-2 text-gray-600">Starting from ₹3,999</p>
            <div className="mt-4 rounded-md bg-orange-400 px-4 py-3 text-center font-bold">
              Limited Time Offer
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8">
        <div className="mb-6 flex gap-3 overflow-x-auto">
          {categories.map((item) => (
            <button
              key={item}
              onClick={() => setCategory(item)}
              className={`whitespace-nowrap rounded-full px-5 py-2 text-sm font-semibold ${
                category === item
                  ? "bg-[#131921] text-white"
                  : "bg-white text-gray-700"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        <h2 className="mb-5 text-2xl font-bold">Recommended products</h2>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </main>
  );
}