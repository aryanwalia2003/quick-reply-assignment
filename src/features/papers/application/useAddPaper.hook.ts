import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createPaperApi } from '../infrastructure/createPaperApi.request';
import type { CreatePaperDTO } from '../domain/ResearchPaper.entity';
import { PAPERS_QUERY_KEY } from './usePapers.hook';

export const useAddPaper = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newPaper: CreatePaperDTO) => createPaperApi(newPaper),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PAPERS_QUERY_KEY });
    },
    onError: (error) => {
      console.error("Failed to add paper:", error);
    }
  });
};