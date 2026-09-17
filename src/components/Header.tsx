"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { Heart, MapPin, Search, ShoppingCart } from "lucide-react";
import { useCart } from "@/components/CartProvider";

const categories = [
  "Electronics",
  "Fashion",
  "Bags",
  "Home",
  "Kitchen",
  "Fitness",
  "Beauty",
  "Stationery",
];

type AuthUser = {
  id: number;
  name: string;
  email: string;
  role: string;
};

export function Header() {
  const { totalItems } = useCart();
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((response) => response.json())
      .then((data) => setUser(data.user))
      .catch(() => setUser(null));
  }, []);

  function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmedQuery = query.trim();

    if (!trimmedQuery) {
      router.push("/products");
      return;
    }

    router.push(`/search?q=${encodeURIComponent(trimmedQuery)}`);
  }

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    setUser(null);
    router.push("/");
    router.refresh();
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

            <button type="submit" className="bg-orange-400 px-4 text-black hover:bg-orange-500">
              <Search size={22} />
            </button>
          </form>

          <Link href="/wishlist" className="hidden items-center gap-1 font-bold md:flex">
            <Heart size={22} />
            Wishlist
          </Link>

          {user ? (
            <button onClick={logout} className="hidden text-left text-sm md:block">
              <p className="text-gray-300">Hi, {user.name.split(" ")[0]}</p>
              <p className="font-bold">Logout</p>
            </button>
          ) : (
            <Link href="/login" className="hidden text-sm md:block">
              <p className="text-gray-300">Hello, sign in</p>
              <p className="font-bold">Account</p>
            </Link>
          )}

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
          <Link href="/products">Products</Link>
          {categories.map((category) => (
            <Link key={category} href={`/category/${category.toLowerCase()}`}>
              {category}
            </Link>
          ))}
          <Link href="/deals">Today's Deals</Link>
          <Link href="/wishlist">Wishlist</Link>
          <Link href="/orders">Orders</Link>
          <Link href="/profile">Profile</Link>
          <Link href="/support">Customer Service</Link>
          {user?.role === "ADMIN" && <Link href="/admin">Admin</Link>}
          {!user && <Link href="/signup">Sign Up</Link>}
        </div>
      </div>
    </header>
  );
}
