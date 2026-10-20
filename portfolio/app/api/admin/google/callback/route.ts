import { NextResponse } from "next/server";
import { createAdminSession } from "@/lib/admin-auth";

const ALLOWED_EMAIL = "mengistuabawa19@gmail.com";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const state = url.searchParams.get("state");
  const code = url.searchParams.get("code");
  const cookieState = req.headers.get("cookie")?.split(";").map((item) => item.trim()).find((item) => item.startsWith("portfolio_google_state="))?.split("=")[1];
  const fail = () => NextResponse.redirect(new URL("/upload?authError=google-failed", req.url));
  if (!state || !cookieState || state !== cookieState || !code) return fail();

  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const redirectUri = process.env.GOOGLE_REDIRECT_URI || new URL("/api/admin/google/callback", req.url).toString();
  if (!clientId || !clientSecret) return NextResponse.redirect(new URL("/upload?authError=google-not-configured", req.url));

  try {
    const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ code, client_id: clientId, client_secret: clientSecret, redirect_uri: redirectUri, grant_type: "authorization_code" }),
      cache: "no-store",
    });
    if (!tokenResponse.ok) return fail();
    const tokens = await tokenResponse.json() as { access_token?: string };
    if (!tokens.access_token) return fail();
    const userResponse = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", { headers: { Authorization: `Bearer ${tokens.access_token}` }, cache: "no-store" });
    if (!userResponse.ok) return fail();
    const user = await userResponse.json() as { email?: string; verified_email?: boolean };
    if (user.email?.toLowerCase() !== ALLOWED_EMAIL || user.verified_email !== true) return NextResponse.redirect(new URL("/upload?authError=not-admin", req.url));

    const response = NextResponse.redirect(new URL("/#projects", req.url));
    response.cookies.set({ ...createAdminSession(), httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax", path: "/" });
    response.cookies.set("portfolio_google_state", "", { maxAge: 0, path: "/api/admin/google/callback" });
    return response;
  } catch {
    return fail();
  }
}
