import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const user = await getCurrentUser();

  if (!user) {
    return NextResponse.json({ message: "Please login to write a review." }, { status: 401 });
  }

  const body = await request.json();
  const productId = Number(body.productId);
  const rating = Number(body.rating);
  const comment = String(body.comment ?? "").trim();

  if (!productId || rating < 1 || rating > 5 || comment.length < 5) {
    return NextResponse.json(
      { message: "Rating and a review of at least 5 characters are required." },
      { status: 400 }
    );
  }

  await prisma.review.create({
    data: {
      userId: user.id,
      productId,
      rating,
      comment,
    },
  });

  return NextResponse.json({ ok: true }, { status: 201 });
}
