import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

type CheckoutItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
};

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser();
    const body = await request.json();
    const fullName = String(body.fullName ?? "").trim();
    const email = String(body.email ?? "").trim();
    const address = String(body.address ?? "").trim();
    const paymentMethod = String(body.paymentMethod ?? "Cash on Delivery").trim();
    const items = Array.isArray(body.items) ? (body.items as CheckoutItem[]) : [];

    if (!fullName || !email || !address || items.length === 0) {
      return NextResponse.json(
        { message: "Please provide customer details and cart items." },
        { status: 400 }
      );
    }

    const total = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const order = await prisma.order.create({
      data: {
        userId: user?.id,
        fullName,
        email,
        address,
        total,
        paymentMethod,
        paymentStatus: paymentMethod === "Cash on Delivery" ? "PENDING" : "PAID_DEMO",
        items: {
          create: items.map((item) => ({
            productId: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            image: item.image,
          })),
        },
      },
      include: {
        items: true,
      },
    });

    return NextResponse.json({ order }, { status: 201 });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Something went wrong while placing the order." },
      { status: 500 }
    );
  }
}
