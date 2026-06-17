import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import type { Product } from "@/types/product";
import { AddToCartButton } from "@/components/AddToCartButton";

export function ProductCard({ product }: { product: Product }) {
  return (
    <div className="group bg-white p-4 shadow-sm transition hover:shadow-lg">
      <Link href={`/products/${product.slug}`}>
        <div className="relative mb-4 h-56 overflow-hidden bg-gray-100">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition duration-300 group-hover:scale-105"
          />
        </div>
      </Link>

      <p className="mb-1 text-xs font-semibold uppercase text-gray-500">
        {product.category}
      </p>

      <Link href={`/products/${product.slug}`}>
        <h2 className="line-clamp-2 min-h-12 font-semibold hover:text-orange-600">
          {product.name}
        </h2>
      </Link>

      <div className="mt-2 flex items-center gap-1 text-orange-400">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star key={star} size={15} fill="currentColor" />
        ))}
        <span className="ml-1 text-xs text-blue-700">1,245</span>
      </div>

      <p className="mt-3 text-2xl font-bold">
        ₹{product.price.toLocaleString("en-IN")}
      </p>

      <p className="mb-4 mt-1 text-sm text-gray-600">Free delivery available</p>

      <AddToCartButton product={product} />
    </div>
  );
}