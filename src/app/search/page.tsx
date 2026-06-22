import type { Product } from "@prisma/client";
import { ProductCard } from "@/components/ProductCard";
import { prisma } from "@/lib/prisma";

type SearchPageProps = {
  searchParams: Promise<{
    q?: string;
  }>;
};

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q = "" } = await searchParams;

  const products: Product[] = await prisma.product.findMany({
    where: {
      OR: [
        { name: { contains: q } },
        { category: { contains: q } },
        { brand: { contains: q } },
        { description: { contains: q } },
      ],
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="mb-2 text-3xl font-bold">Search results</h1>
      <p className="mb-6 text-gray-600">Showing results for "{q}"</p>

      {products.length === 0 ? (
        <p className="text-gray-600">No products found.</p>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product: Product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </main>
  );
}