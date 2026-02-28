import { useQuery } from '@tanstack/react-query';
import { getPapersApi } from '../infrastructure/getPapersApi.request';
import { ResearchPaper } from '../domain/ResearchPaper.entity';

export const PAPERS_QUERY_KEY = ['papers'];

export const usePapers = () => {
  return useQuery<ResearchPaper[], Error>({
    queryKey: PAPERS_QUERY_KEY,
    queryFn: getPapersApi,
    select: (data) => {
      return data;
    },
  });
};