import { NextResponse } from "next/server";
import { createAdminSession } from "@/lib/admin-auth";
import { timingSafeEqual } from "node:crypto";

export async function POST(req: Request) {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) return NextResponse.json({ error: "Admin password is not configured on the server." }, { status: 503 });

  let body: { password?: unknown };
  try { body = await req.json(); } catch { return NextResponse.json({ error: "Invalid request." }, { status: 400 }); }
  const provided = typeof body.password === "string" ? Buffer.from(body.password) : Buffer.alloc(0);
  const expected = Buffer.from(password);
  if (provided.length !== expected.length || !timingSafeEqual(provided, expected)) {
    return NextResponse.json({ error: "Incorrect password." }, { status: 401 });
  }

  try {
    const response = NextResponse.json({ success: true });
    response.cookies.set({ ...createAdminSession(), httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax", path: "/" });
    return response;
  } catch {
    return NextResponse.json({ error: "Admin session is not configured on the server." }, { status: 503 });
  }
}
