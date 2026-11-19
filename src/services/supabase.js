import { createClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL;
const key = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Sem variáveis de ambiente => null => o app usa localStorage (modo local).
export const supabase = url && key ? createClient(url, key) : null;
