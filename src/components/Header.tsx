"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { MapPin, Search, ShoppingCart } from "lucide-react";
import { useCart } from "@/components/CartProvider";

const categories = ["Electronics", "Fashion", "Bags", "Home", "Kitchen"];

export function Header() {
  const { totalItems } = useCart();
  const router = useRouter();
  const [query, setQuery] = useState("");

  function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!query.trim()) return;

    router.push(`/search?q=${encodeURIComponent(query.trim())}`);
  }

  return (
    <header>
      <div className="bg-[#131921] text-white">
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3">
          <Link href="/" className="text-2xl font-bold">
            Shop<span className="text-orange-400">Kart</span>
          </Link>

          <div className="hidden items-center gap-2 text-xs md:flex">
            <MapPin size={18} />
            <div>
              <p className="text-gray-300">Deliver to</p>
              <p className="font-bold">India</p>
            </div>
          </div>

          <form onSubmit={handleSearch} className="flex flex-1 overflow-hidden rounded-md bg-white">
            <select
              onChange={(event) => {
                if (event.target.value) router.push(`/category/${event.target.value}`);
              }}
              className="hidden bg-gray-100 px-3 text-sm text-black outline-none sm:block"
              defaultValue=""
            >
              <option value="">All</option>
              {categories.map((category) => (
                <option key={category} value={category.toLowerCase()}>
                  {category}
                </option>
              ))}
            </select>

            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search ShopKart"
              className="w-full px-4 py-2 text-black outline-none"
            />

            <button className="bg-orange-400 px-4 text-black hover:bg-orange-500">
              <Search size={22} />
            </button>
          </form>

          <Link href="/cart" className="relative flex items-center gap-1 font-bold">
            <ShoppingCart size={30} />
            <span className="hidden sm:inline">Cart</span>
            <span className="absolute -top-2 left-5 rounded-full bg-orange-400 px-2 text-xs text-black">
              {totalItems}
            </span>
          </Link>
        </div>
      </div>

      <div className="bg-[#232f3e] text-sm text-white">
        <div className="mx-auto flex max-w-7xl gap-6 overflow-x-auto px-4 py-2">
          <Link href="/" className="font-semibold">All</Link>
          {categories.map((category) => (
            <Link key={category} href={`/category/${category.toLowerCase()}`}>
              {category}
            </Link>
          ))}
          <span>Today's Deals</span>
          <span>Customer Service</span>
        </div>
      </div>
    </header>
  );
}