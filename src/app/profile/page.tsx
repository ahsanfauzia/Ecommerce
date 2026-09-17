import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";

export default async function ProfilePage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <main className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">My Profile</h1>
      <section className="rounded-lg border bg-white p-6">
        <p className="text-sm font-semibold text-gray-500">Name</p>
        <p className="text-xl font-bold">{user.name}</p>

        <p className="mt-5 text-sm font-semibold text-gray-500">Email</p>
        <p className="text-xl font-bold">{user.email}</p>

        <p className="mt-5 text-sm font-semibold text-gray-500">Role</p>
        <p className="text-xl font-bold">{user.role}</p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/orders" className="rounded-md bg-black px-5 py-3 text-white">
            View Orders
          </Link>
          <Link href="/wishlist" className="rounded-md border px-5 py-3 font-semibold">
            View Wishlist
          </Link>
        </div>
      </section>
    </main>
  );
}
