import type { Product } from "@prisma/client";
import { ProductCard } from "@/components/ProductCard";
import { prisma } from "@/lib/prisma";

export default async function DealsPage() {
  const products: Product[] = await prisma.product.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  const deals = products
    .map((product) => ({
      ...product,
      discount: Math.round(((product.mrp - product.price) / product.mrp) * 100),
    }))
    .filter((product) => product.discount >= 25)
    .sort((a, b) => b.discount - a.discount)
    .slice(0, 40);

  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-6 rounded-lg bg-orange-100 p-6">
        <p className="text-sm font-semibold uppercase text-orange-700">Limited time</p>
        <h1 className="mt-1 text-3xl font-bold">Today's Deals</h1>
        <p className="mt-2 text-gray-700">Best discounts from your product catalog.</p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {deals.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  );
}
