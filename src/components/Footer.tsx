import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-12 bg-[#131921] text-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <h2 className="text-xl font-bold">Shop<span className="text-orange-400">Kart</span></h2>
          <p className="mt-3 text-sm text-gray-300">
            A full-stack e-commerce demo with cart, orders, wishlist, reviews, and auth.
          </p>
        </div>
        <div>
          <h3 className="font-semibold">Shop</h3>
          <div className="mt-3 space-y-2 text-sm text-gray-300">
            <Link href="/products" className="block">All Products</Link>
            <Link href="/deals" className="block">Today's Deals</Link>
            <Link href="/wishlist" className="block">Wishlist</Link>
          </div>
        </div>
        <div>
          <h3 className="font-semibold">Support</h3>
          <div className="mt-3 space-y-2 text-sm text-gray-300">
            <Link href="/support" className="block">Customer Service</Link>
            <Link href="/cart" className="block">Cart</Link>
            <Link href="/checkout" className="block">Checkout</Link>
          </div>
        </div>
        <div>
          <h3 className="font-semibold">Payments</h3>
          <p className="mt-3 text-sm text-gray-300">
            Demo checkout supports COD, UPI, and card mode. Razorpay can be connected with live keys later.
          </p>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-sm text-gray-400">
        ShopKart demo store
      </div>
    </footer>
  );
}
