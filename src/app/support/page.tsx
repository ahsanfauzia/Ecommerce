import Link from "next/link";

const helpTopics = [
  "Track an order",
  "Returns and refunds",
  "Shipping information",
  "Payment issues",
  "Account support",
  "Report a product problem",
];

export default function SupportPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-8">
      <section className="rounded-lg bg-white p-8 shadow-sm">
        <p className="text-sm font-semibold uppercase text-blue-700">Help center</p>
        <h1 className="mt-2 text-3xl font-bold">Customer Service</h1>
        <p className="mt-3 max-w-2xl text-gray-600">
          Find help for orders, delivery, returns, refunds, and product questions.
        </p>
      </section>

      <section className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {helpTopics.map((topic) => (
          <div key={topic} className="rounded-lg border bg-white p-5 shadow-sm">
            <h2 className="font-semibold">{topic}</h2>
            <p className="mt-2 text-sm text-gray-600">
              This demo section can later connect to real support workflows.
            </p>
          </div>
        ))}
      </section>

      <Link
        href="/products"
        className="mt-8 inline-block rounded-md bg-black px-5 py-3 font-semibold text-white"
      >
        Continue Shopping
      </Link>
    </main>
  );
}
