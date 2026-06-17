import { ProductCard } from "@/components/ProductCard";
import { products } from "@/data/products";

export default function HomePage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <section className="mb-10">
        <h1 className="text-4xl font-bold">Modern products for everyday life</h1>
        <p className="mt-3 max-w-2xl text-gray-600">
          Browse our curated collection of fashion, accessories, and tech.
        </p>
      </section>

      <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </section>
    </main>
  );
}