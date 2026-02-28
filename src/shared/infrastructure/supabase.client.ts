import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/shared/types/supabase.type';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase Environment Variables');
}

// Global Singleton Client
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);