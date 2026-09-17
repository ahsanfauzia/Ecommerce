import Link from "next/link";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function AdminPage() {
  const admin = await requireAdmin();

  if (!admin) {
    redirect("/login");
  }

  const [products, orders, users] = await Promise.all([
    prisma.product.findMany({ orderBy: { createdAt: "desc" }, take: 20 }),
    prisma.order.findMany({ orderBy: { createdAt: "desc" }, take: 20, include: { items: true } }),
    prisma.user.count(),
  ]);

  const revenue = orders.reduce((sum, order) => sum + order.total, 0);

  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm font-bold uppercase tracking-wide text-orange-600">Admin</p>
          <h1 className="text-3xl font-bold">Dashboard</h1>
        </div>
        <Link href="/products" className="rounded-md bg-black px-5 py-3 text-white">
          View Store
        </Link>
      </div>

      <section className="mt-6 grid gap-4 md:grid-cols-3">
        <div className="rounded-lg border bg-white p-5">
          <p className="text-sm text-gray-500">Products</p>
          <p className="text-3xl font-bold">{products.length}</p>
        </div>
        <div className="rounded-lg border bg-white p-5">
          <p className="text-sm text-gray-500">Recent Revenue</p>
          <p className="text-3xl font-bold">Rs. {revenue.toLocaleString("en-IN")}</p>
        </div>
        <div className="rounded-lg border bg-white p-5">
          <p className="text-sm text-gray-500">Users</p>
          <p className="text-3xl font-bold">{users}</p>
        </div>
      </section>

      <section className="mt-8 rounded-lg border bg-white p-5">
        <h2 className="text-xl font-bold">Recent Products</h2>
        <div className="mt-4 divide-y">
          {products.map((product) => (
            <div key={product.id} className="flex items-center justify-between gap-4 py-3">
              <div>
                <p className="font-semibold">{product.name}</p>
                <p className="text-sm text-gray-500">{product.category} - Stock {product.stock}</p>
              </div>
              <Link href={`/products/${product.slug}`} className="text-sm font-semibold text-blue-700">
                View
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8 rounded-lg border bg-white p-5">
        <h2 className="text-xl font-bold">Recent Orders</h2>
        <div className="mt-4 divide-y">
          {orders.map((order) => (
            <div key={order.id} className="py-3">
              <p className="font-semibold">Order #{order.id} - {order.status}</p>
              <p className="text-sm text-gray-500">
                {order.email} - Rs. {order.total.toLocaleString("en-IN")}
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
