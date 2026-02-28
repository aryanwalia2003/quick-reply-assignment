import type { ReadingStage, ResearchDomain, ImpactScore } from '@/shared/types/supabase.type';

export const READING_STAGES: ReadingStage[] = [
  'Abstract Read',
  'Introduction Done',
  'Methodology Done',
  'Results Analyzed',
  'Fully Read',
  'Notes Completed'
];

export const RESEARCH_DOMAINS: ResearchDomain[] = [
  'Computer Science',
  'Biology',
  'Physics',
  'Chemistry',
  'Mathematics',
  'Social Sciences'
];

export const IMPACT_SCORES: ImpactScore[] = [
  'High Impact',
  'Medium Impact',
  'Low Impact',
  'Unknown'
];