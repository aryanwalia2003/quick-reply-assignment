import { supabase } from '@/shared/infrastructure/supabase.client';
import type { CreatePaperDTO } from '../domain/ResearchPaper.entity';

export const createPaperApi = async (dto: CreatePaperDTO) => {
  // 1. Upsert into papers_metadata (Get ID if exists, else create)
  const { data: metaData, error: metaError } = await supabase
    .from('papers_metadata')
    .upsert(
      {
        title: dto.title,
        first_author: dto.firstAuthor,
        domain: dto.domain,
        citation_count: dto.citationCount,
      },
      { onConflict: 'title, first_author' }
    )
    .select()
    .single();

  if (metaError) throw new Error(metaError.message);

  // 2. Link to User (user_id defaults to auth.uid() in the DB)
  const { error: linkError } = await supabase
    .from('user_paper_interactions')
    .insert({
      paper_id: metaData.id,
      reading_stage: dto.readingStage,
      impact_score: dto.impactScore,
    });

  if (linkError) {
    if (linkError.code === '23505') throw new Error("Paper already in your library");
    throw new Error(linkError.message);
  }

  return true;
};