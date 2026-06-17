import { ProductCard } from "@/components/ProductCard";
import { products } from "@/data/products";

type SearchPageProps = {
  searchParams: Promise<{
    q?: string;
  }>;
};

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q = "" } = await searchParams;

  const filteredProducts = products.filter((product) => {
    const text = `${product.name} ${product.category} ${product.description}`.toLowerCase();
    return text.includes(q.toLowerCase());
  });

  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="mb-2 text-3xl font-bold">Search results</h1>
      <p className="mb-6 text-gray-600">Showing results for "{q}"</p>

      {filteredProducts.length === 0 ? (
        <p className="text-gray-600">No products found.</p>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </main>
  );
}