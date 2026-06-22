import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import type { Product } from "@/types/product";
import { AddToCartButton } from "@/components/AddToCartButton";
import { WishlistButton } from "@/components/WishlistButton";

export function ProductCard({ product }: { product: Product }) {
  const discount = Math.round(((product.mrp - product.price) / product.mrp) * 100);

  return (
    <div className="group bg-white p-4 shadow-sm transition hover:shadow-lg">
      <div className="relative">
        <Link href={`/products/${product.slug}`}>
          <div className="relative mb-4 h-56 overflow-hidden bg-gray-100">
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="object-contain p-4 transition duration-300 group-hover:scale-105"
            />
          </div>
        </Link>
        <WishlistButton productId={product.id} compact />
      </div>

      <p className="mb-1 text-xs font-semibold uppercase text-gray-500">
        {product.category}
      </p>

      <Link href={`/products/${product.slug}`}>
        <h2 className="line-clamp-2 min-h-12 font-semibold hover:text-orange-600">
          {product.name}
        </h2>
      </Link>

      <p className="mt-1 text-sm text-gray-500">{product.brand}</p>

      <div className="mt-2 flex items-center gap-1 text-orange-400">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star key={star} size={15} fill="currentColor" />
        ))}
        <span className="ml-1 text-xs text-blue-700">
          {product.reviews.toLocaleString("en-IN")}
        </span>
      </div>

      <div className="mt-3 flex items-end gap-2">
        <p className="text-2xl font-bold">Rs. {product.price.toLocaleString("en-IN")}</p>
        <p className="text-sm text-gray-500 line-through">
          Rs. {product.mrp.toLocaleString("en-IN")}
        </p>
      </div>

      <p className="mb-4 mt-1 text-sm text-red-700">{discount}% off</p>

      <AddToCartButton product={product} />
    </div>
  );
}
