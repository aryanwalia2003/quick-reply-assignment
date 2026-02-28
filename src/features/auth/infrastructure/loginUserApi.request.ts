import { supabase } from '@/shared/infrastructure/supabase.client';

export const loginUserApi = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) throw new Error(error.message);
  return data;
};
