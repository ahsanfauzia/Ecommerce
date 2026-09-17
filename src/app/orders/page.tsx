import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function OrdersPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const orders = await prisma.order.findMany({
    where: { userId: user.id },
    include: { items: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="mx-auto max-w-5xl px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">My Orders</h1>
      {orders.length === 0 ? (
        <div className="rounded-lg border bg-white p-8">
          <p className="text-gray-600">You have not placed any orders yet.</p>
          <Link href="/products" className="mt-4 inline-block rounded-md bg-black px-5 py-3 text-white">
            Browse Products
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="rounded-lg border bg-white p-5">
              <div className="flex items-center justify-between gap-4">
                <p className="font-bold">Order #{order.id}</p>
                <p className="rounded-full bg-yellow-100 px-3 py-1 text-sm font-semibold">{order.status}</p>
              </div>
              <p className="mt-2 text-sm text-gray-600">
                {order.items.length} items - Rs. {order.total.toLocaleString("en-IN")} - {order.paymentMethod}
              </p>
              <Link href={`/orders/${order.id}`} className="mt-4 inline-block text-sm font-semibold text-blue-700">
                View receipt
              </Link>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
