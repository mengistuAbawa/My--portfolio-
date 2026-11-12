import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase-server";

export async function GET(req: Request) {
  try {
    const supabase = await createSupabaseServerClient();
    const redirectTo = new URL("/auth/callback", req.url).toString();
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo, queryParams: { prompt: "select_account" } },
    });
    if (error || !data.url) return NextResponse.redirect(new URL("/?authError=google-sign-in#projects", req.url));
    return NextResponse.redirect(data.url);
  } catch {
    return NextResponse.redirect(new URL("/?authError=supabase-not-configured#projects", req.url));
  }
}
