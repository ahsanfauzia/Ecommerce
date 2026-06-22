import { cookies } from "next/headers";
import { randomBytes, scryptSync, timingSafeEqual } from "crypto";
import { prisma } from "@/lib/prisma";

const SESSION_COOKIE = "shopkart_session";
const SESSION_DAYS = 7;

export function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

export function verifyPassword(password: string, storedHash: string) {
  const [salt, hash] = storedHash.split(":");

  if (!salt || !hash) return false;

  const candidate = scryptSync(password, salt, 64);
  const stored = Buffer.from(hash, "hex");

  return stored.length === candidate.length && timingSafeEqual(stored, candidate);
}

export function createSessionToken() {
  return randomBytes(32).toString("hex");
}

export function getSessionExpiry() {
  return new Date(Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000);
}

export async function getCurrentUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;

  if (!token) return null;

  const session = await prisma.session.findUnique({
    where: { token },
    include: { user: true },
  });

  if (!session || session.expiresAt < new Date()) {
    return null;
  }

  return session.user;
}

export function setSessionCookie(response: Response, token: string, expiresAt: Date) {
  const nextResponse = response as Response & {
    cookies?: {
      set: (name: string, value: string, options: Record<string, unknown>) => void;
    };
  };

  nextResponse.cookies?.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    expires: expiresAt,
    path: "/",
  });
}

export function clearSessionCookie(response: Response) {
  const nextResponse = response as Response & {
    cookies?: {
      set: (name: string, value: string, options: Record<string, unknown>) => void;
    };
  };

  nextResponse.cookies?.set(SESSION_COOKIE, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    expires: new Date(0),
    path: "/",
  });
}

export { SESSION_COOKIE };
