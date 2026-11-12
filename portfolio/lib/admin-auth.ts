import { createSupabaseServerClient } from "@/lib/supabase-server";

export const ADMIN_EMAIL = "mengistuabawa21@gmail.com";

export async function isAdminAuthenticated() {
  try {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase.auth.getUser();
    return !error && data.user?.email?.toLowerCase() === ADMIN_EMAIL;
  } catch {
    return false;
  }
}
