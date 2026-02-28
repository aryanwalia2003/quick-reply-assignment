import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updatePaperStageApi } from '../infrastructure/updatePaperStageApi.request';
import { PAPERS_QUERY_KEY } from './usePapers.hook';
import type { ReadingStage } from '@/shared/types/supabase.type';

interface UpdateStageParams {
  id: string;
  stage: ReadingStage;
}

export const useUpdatePaperStage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, stage }: UpdateStageParams) => updatePaperStageApi(id, stage),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PAPERS_QUERY_KEY });
    },
  });
};