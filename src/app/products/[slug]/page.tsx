import Image from "next/image";
import { notFound } from "next/navigation";
import { Star } from "lucide-react";
import { AddToCartButton } from "@/components/AddToCartButton";
import { prisma } from "@/lib/prisma";

type ProductPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;

  const product = await prisma.product.findUnique({
    where: {
      slug,
    },
  });

  if (!product) {
    notFound();
  }

  const discount = Math.round(((product.mrp - product.price) / product.mrp) * 100);

  return (
    <main className="mx-auto grid max-w-7xl gap-10 px-4 py-8 md:grid-cols-2">
      <div className="relative `h-[520px]` overflow-hidden bg-white">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-contain p-8"
          priority
        />
      </div>

      <section className="bg-white p-6">
        <p className="text-sm text-blue-700">{product.brand}</p>
        <h1 className="mt-2 text-3xl font-semibold">{product.name}</h1>

        <div className="mt-3 flex items-center gap-2">
          <span className="rounded bg-green-700 px-2 py-1 text-sm font-bold text-white">
            {product.rating}
          </span>
          <div className="flex text-orange-400">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star key={star} size={16} fill="currentColor" />
            ))}
          </div>
          <span className="text-sm text-blue-700">
            {product.reviews.toLocaleString("en-IN")} ratings
          </span>
        </div>

        <hr className="my-5" />

        <p className="text-sm text-red-700">{discount}% off</p>
        <div className="mt-1 flex items-end gap-3">
          <p className="text-4xl font-bold">₹{product.price.toLocaleString("en-IN")}</p>
          <p className="text-gray-500 line-through">
            ₹{product.mrp.toLocaleString("en-IN")}
          </p>
        </div>

        <p className="mt-4 text-green-700">In stock: {product.stock}</p>
        <p className="mt-5 leading-7 text-gray-700">{product.description}</p>

        <div className="mt-8 max-w-sm">
          <AddToCartButton product={product} />
        </div>
      </section>
    </main>
  );
}