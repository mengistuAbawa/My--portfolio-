import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

const COOKIE_NAME = "portfolio_admin";
const SESSION_SECONDS = 60 * 60 * 12;
const ADMIN_EMAIL = "mengistuabawa19@gmail.com";

function sessionSecret() {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) throw new Error("ADMIN_SESSION_SECRET is not configured");
  return secret;
}

function sign(value: string) {
  return createHmac("sha256", sessionSecret()).update(value).digest("base64url");
}

export function createAdminSession() {
  const payload = Buffer.from(JSON.stringify({
    email: ADMIN_EMAIL,
    expiresAt: Date.now() + SESSION_SECONDS * 1000,
  })).toString("base64url");
  return { name: COOKIE_NAME, value: `${payload}.${sign(payload)}`, maxAge: SESSION_SECONDS };
}

export async function isAdminAuthenticated() {
  const token = (await cookies()).get(COOKIE_NAME)?.value;
  if (!token) return false;
  const [payload, signature, extra] = token.split(".");
  if (!payload || !signature || extra) return false;
  let expected: string;
  try { expected = sign(payload); } catch { return false; }
  const actualBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expected);
  if (actualBuffer.length !== expectedBuffer.length || !timingSafeEqual(actualBuffer, expectedBuffer)) return false;
  try {
    const session = JSON.parse(Buffer.from(payload, "base64url").toString("utf8")) as { email?: string; expiresAt?: number };
    return session.email === ADMIN_EMAIL && typeof session.expiresAt === "number" && session.expiresAt > Date.now();
  } catch {
    return false;
  }
}

export { ADMIN_EMAIL, COOKIE_NAME };
