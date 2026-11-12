import { NextResponse } from "next/server";
import { ADMIN_EMAIL } from "@/lib/admin-auth";
import { createSupabaseServerClient } from "@/lib/supabase-server";

export async function GET(req: Request) {
  const code = new URL(req.url).searchParams.get("code");
  if (!code) return NextResponse.redirect(new URL("/?authError=google-sign-in#projects", req.url));

  try {
    const supabase = await createSupabaseServerClient();
    const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);
    const { data, error } = await supabase.auth.getUser();
    if (exchangeError || error || data.user?.email?.toLowerCase() !== ADMIN_EMAIL) {
      await supabase.auth.signOut();
      return NextResponse.redirect(new URL("/?authError=not-admin#projects", req.url));
    }
    return NextResponse.redirect(new URL("/#projects", req.url));
  } catch {
    return NextResponse.redirect(new URL("/?authError=supabase-not-configured#projects", req.url));
  }
}
