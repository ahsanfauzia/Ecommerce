import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/components/CartProvider";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

export const metadata: Metadata = {
  title: "ShopKart",
  description: "Full-stack Next.js e-commerce store",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-950">
        <CartProvider>
          <Header />
          <div className="min-h-screen">{children}</div>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
