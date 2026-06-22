import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const user = await getCurrentUser();

  if (!user) {
    return NextResponse.json({ message: "Please login first." }, { status: 401 });
  }

  const body = await request.json();
  const productId = Number(body.productId);

  if (!productId) {
    return NextResponse.json({ message: "Product id is required." }, { status: 400 });
  }

  const existing = await prisma.wishlistItem.findUnique({
    where: {
      userId_productId: {
        userId: user.id,
        productId,
      },
    },
  });

  if (existing) {
    await prisma.wishlistItem.delete({ where: { id: existing.id } });
    return NextResponse.json({ wished: false });
  }

  await prisma.wishlistItem.create({
    data: {
      userId: user.id,
      productId,
    },
  });

  return NextResponse.json({ wished: true });
}
