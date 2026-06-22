import type { Product } from "@prisma/client";
import { ProductCard } from "@/components/ProductCard";
import { prisma } from "@/lib/prisma";

type CategoryPageProps = {
  params: Promise<{
    category: string;
  }>;
};

function normalizeCategory(category: string) {
  const decoded = decodeURIComponent(category);

  return decoded.charAt(0).toUpperCase() + decoded.slice(1).toLowerCase();
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;
  const normalizedCategory = normalizeCategory(category);

  const products: Product[] = await prisma.product.findMany({
    where: {
      category: normalizedCategory,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">{normalizedCategory}</h1>

      {products.length === 0 ? (
        <p className="text-gray-600">No products found in this category.</p>
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