import { supabase } from '@/shared/infrastructure/supabase.client';
import type { Database, ReadingStage } from '@/shared/types/supabase.type';

type InteractionUpdate = Database['public']['Tables']['user_paper_interactions']['Update'];

export const updatePaperStageApi = async (interactionId: string, newStage: ReadingStage) => {
  const updatePayload: InteractionUpdate = { reading_stage: newStage };
  const { error } = await supabase
    .from('user_paper_interactions')
    .update(updatePayload)
    .eq('id', interactionId); // Note: We use interaction ID, not paper ID

  if (error) throw new Error(error.message);
  return true;
};