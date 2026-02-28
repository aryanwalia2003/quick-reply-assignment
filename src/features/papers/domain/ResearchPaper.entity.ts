import type { Database, ReadingStage, ResearchDomain, ImpactScore } from '@/shared/types/supabase.type';

export interface CreatePaperDTO {
  title: string;
  firstAuthor: string;
  domain: ResearchDomain;
  readingStage: ReadingStage;
  citationCount: number;
  impactScore: ImpactScore;
}

// The Interface stays EXACTLY the same! 
// This is the beauty of Clean Architecture. The UI doesn't know the DB changed.
export interface IResearchPaper {
  id: string;          // This is now the INTERACTION ID (Unique to the user's library entry)
  paperId: string;     // The Global Paper ID
  title: string;
  firstAuthor: string;
  domain: ResearchDomain;
  readingStage: ReadingStage;
  citationCount: number;
  impactScore: ImpactScore;
  createdAt: Date;
}

export class ResearchPaper implements IResearchPaper {
  id: string;
  paperId: string;
  title: string;
  firstAuthor: string;
  domain: ResearchDomain;
  readingStage: ReadingStage;
  citationCount: number;
  impactScore: ImpactScore;
  createdAt: Date;

  constructor(
    id: string,
    paperId: string,
    title: string,
    firstAuthor: string,
    domain: ResearchDomain,
    readingStage: ReadingStage,
    citationCount: number,
    impactScore: ImpactScore,
    createdAt: Date
  ) {
    this.id = id;
    this.paperId = paperId;
    this.title = title;
    this.firstAuthor = firstAuthor;
    this.domain = domain;
    this.readingStage = readingStage;
    this.citationCount = citationCount;
    this.impactScore = impactScore;
    this.createdAt = createdAt;
  }

  /**
   * ADAPTER: Flattens the Joined Data
   * Takes the nested Supabase response and makes it a clean object
   */
  static fromSupabase(
    row: Database['public']['Tables']['user_paper_interactions']['Row'] & {
      papers_metadata: Database['public']['Tables']['papers_metadata']['Row']
    }
  ): ResearchPaper {
    // Safety check in case the join failed (shouldn't happen)
    if (!row.papers_metadata) {
      throw new Error("Paper metadata missing");
    }

    return new ResearchPaper(
      row.id,                      // The User's Interaction ID
      row.papers_metadata.id,      // The Global Paper ID
      row.papers_metadata.title,
      row.papers_metadata.first_author,
      row.papers_metadata.domain,
      row.reading_stage,
      row.papers_metadata.citation_count,
      row.impact_score,
      new Date(row.created_at)
    );
  }

  isValid(): boolean {
    return this.title.length > 0;
  }

  isCompleted(): boolean {
    return this.readingStage === 'Notes Completed' || this.readingStage === 'Fully Read';
  }
}