import { supabase } from '@/shared/infrastructure/supabase.client';
import { ResearchPaper } from '../domain/ResearchPaper.entity';

export const getPapersApi = async (): Promise<ResearchPaper[]> => {
  const { data, error } = await supabase
    .from('user_paper_interactions')
    .select(`
      *,
      papers_metadata (
        id,title,first_author,domain,citation_count
      )
    `)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching papers:', error);
    throw new Error(error.message);
  }

  // Transform Raw SQL Rows -> Clean Domain Entities
  return (data as any[]).map((row) => ResearchPaper.fromSupabase(row));
};