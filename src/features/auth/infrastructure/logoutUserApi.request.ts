import { supabase } from '@/shared/infrastructure/supabase.client';

export const logoutUserApi = async () => {
  const { error } = await supabase.auth.signOut();

  if (error) throw new Error(error.message);
  return true;
};
