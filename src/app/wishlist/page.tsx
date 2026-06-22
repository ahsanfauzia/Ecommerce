import Link from "next/link";
import { ProductCard } from "@/components/ProductCard";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function WishlistPage() {
  const user = await getCurrentUser();

  if (!user) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-10">
        <div className="rounded-lg border bg-white p-8">
          <h1 className="text-3xl font-bold">Login to view wishlist</h1>
          <p className="mt-3 text-gray-600">Save products and view them later.</p>
          <Link href="/login" className="mt-6 inline-block rounded-md bg-black px-5 py-3 text-white">
            Login
          </Link>
        </div>
      </main>
    );
  }

  const items = await prisma.wishlistItem.findMany({
    where: { userId: user.id },
    include: { product: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">My Wishlist</h1>
      {items.length === 0 ? (
        <div className="rounded-lg border bg-white p-8">
          <p className="text-gray-600">Your wishlist is empty.</p>
          <Link href="/products" className="mt-4 inline-block rounded-md bg-black px-5 py-3 text-white">
            Browse Products
          </Link>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <ProductCard key={item.id} product={item.product} />
          ))}
        </div>
      )}
    </main>
  );
}
