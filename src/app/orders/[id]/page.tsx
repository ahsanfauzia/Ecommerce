import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

type InvoicePageProps = {
  params: Promise<{ id: string }>;
};

export default async function InvoicePage({ params }: InvoicePageProps) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const { id } = await params;
  const order = await prisma.order.findFirst({
    where: {
      id: Number(id),
      ...(user.role === "ADMIN" ? {} : { userId: user.id }),
    },
    include: { items: true },
  });

  if (!order) {
    redirect("/orders");
  }

  return (
    <main className="mx-auto max-w-4xl px-4 py-8">
      <section className="rounded-lg border bg-white p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Receipt</h1>
            <p className="text-gray-600">Order #{order.id}</p>
          </div>
          <p className="font-semibold">{order.status}</p>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div>
            <h2 className="font-semibold">Bill To</h2>
            <p>{order.fullName}</p>
            <p>{order.email}</p>
            <p>{order.address}</p>
          </div>
          <div>
            <h2 className="font-semibold">Payment</h2>
            <p>{order.paymentMethod}</p>
            <p>{order.paymentStatus}</p>
          </div>
        </div>

        <div className="mt-6 divide-y border-y">
          {order.items.map((item) => (
            <div key={item.id} className="flex justify-between gap-4 py-3">
              <span>{item.name} x {item.quantity}</span>
              <span>Rs. {(item.price * item.quantity).toLocaleString("en-IN")}</span>
            </div>
          ))}
        </div>

        <div className="mt-5 flex justify-end text-2xl font-bold">
          Total: Rs. {order.total.toLocaleString("en-IN")}
        </div>
      </section>
    </main>
  );
}
