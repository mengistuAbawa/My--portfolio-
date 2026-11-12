import { NextResponse } from "next/server";
import { ADMIN_EMAIL } from "@/lib/admin-auth";
import { createSupabaseServerClient } from "@/lib/supabase-server";

export async function POST(req: Request) {
  let body: { password?: unknown };
  try { body = await req.json(); } catch { return NextResponse.json({ error: "Invalid request." }, { status: 400 }); }
  if (typeof body.password !== "string" || !body.password) return NextResponse.json({ error: "Enter the admin password." }, { status: 400 });

  try {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase.auth.signInWithPassword({ email: ADMIN_EMAIL, password: body.password });
    if (error || data.user?.email?.toLowerCase() !== ADMIN_EMAIL) {
      await supabase.auth.signOut();
      return NextResponse.json({ error: "Admin email or password is incorrect. Check that the admin user exists in Supabase Auth." }, { status: 401 });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Supabase Auth is not configured.";
    return NextResponse.json({ error: message }, { status: 503 });
  }
}
