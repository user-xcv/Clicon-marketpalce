import { createClient } from '@supabase/supabase-js';


const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error("Supabase URL yoki ANON KEY `.env` faylida noto‘g‘ri yoki mavjud emas!");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
