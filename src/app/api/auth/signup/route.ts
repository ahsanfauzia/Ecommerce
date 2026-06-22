import { NextResponse } from "next/server";
import { createSessionToken, getSessionExpiry, hashPassword } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const body = await request.json();
  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim().toLowerCase();
  const password = String(body.password ?? "");

  if (!name || !email || password.length < 6) {
    return NextResponse.json(
      { message: "Name, valid email, and 6+ character password are required." },
      { status: 400 }
    );
  }

  const existingUser = await prisma.user.findUnique({ where: { email } });

  if (existingUser) {
    return NextResponse.json({ message: "Email already registered." }, { status: 409 });
  }

  const user = await prisma.user.create({
    data: {
      name,
      email,
      passwordHash: hashPassword(password),
    },
  });

  const token = createSessionToken();
  const expiresAt = getSessionExpiry();

  await prisma.session.create({
    data: {
      token,
      userId: user.id,
      expiresAt,
    },
  });

  const response = NextResponse.json({ user: { id: user.id, name: user.name, email: user.email } });
  response.cookies.set("shopkart_session", token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    expires: expiresAt,
    path: "/",
  });

  return response;
}
