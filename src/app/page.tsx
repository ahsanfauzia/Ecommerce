import type { Product } from "@prisma/client";
import Link from "next/link";
import { ProductCard } from "@/components/ProductCard";
import { prisma } from "@/lib/prisma";

type CategoryItem = {
  category: string;
};

export default async function HomePage() {
  const products: Product[] = await prisma.product.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: 40,
  });

  const categories: CategoryItem[] = await prisma.product.findMany({
    distinct: ["category"],
    select: {
      category: true,
    },
  });

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
              Shop electronics, fashion, home products and everyday essentials.
            </p>
          </div>

          <div className="rounded-lg bg-white p-5 shadow-lg">
            <p className="text-sm font-semibold text-gray-500">Deal of the day</p>
            <h2 className="mt-2 text-2xl font-bold">Fresh deals from database</h2>
            <p className="mt-2 text-gray-600">100 products now available</p>
            <div className="mt-4 rounded-md bg-orange-400 px-4 py-3 text-center font-bold">
              Limited Time Offer
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8">
        <div className="mb-6 flex gap-3 overflow-x-auto">
          <Link
            href="/"
            className="whitespace-nowrap rounded-full bg-[#131921] px-5 py-2 text-sm font-semibold text-white"
          >
            All
          </Link>

          {categories.map((item: CategoryItem) => (
            <Link
              key={item.category}
              href={`/category/${item.category.toLowerCase()}`}
              className="whitespace-nowrap rounded-full bg-white px-5 py-2 text-sm font-semibold text-gray-700"
            >
              {item.category}
            </Link>
          ))}
        </div>

        <h2 className="mb-5 text-2xl font-bold">Recommended products</h2>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product: Product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </main>
  );
}