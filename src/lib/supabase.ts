import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

let browserClient: SupabaseClient | null = null;
let serverClient: SupabaseClient | null = null;

export function hasSupabaseConfig() {
  return Boolean(supabaseUrl && supabaseAnonKey);
}

export function getSupabaseServerClient() {
  if (!hasSupabaseConfig()) {
    return null;
  }

  serverClient ??= createClient(supabaseUrl!, supabaseAnonKey!, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });

  return serverClient;
}

export function getSupabaseBrowserClient() {
  if (!hasSupabaseConfig()) {
    return null;
  }

  browserClient ??= createClient(supabaseUrl!, supabaseAnonKey!);

  return browserClient;
}
