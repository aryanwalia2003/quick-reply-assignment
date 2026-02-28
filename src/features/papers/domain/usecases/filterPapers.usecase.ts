import { ResearchPaper } from '../ResearchPaper.entity';
import type { ReadingStage, ResearchDomain, ImpactScore } from '@/shared/types/supabase.type';

export type DateFilter = 'This Week' | 'This Month' | 'Last 3 Months' | 'All Time';

export interface FilterCriteria {
  searchQuery: string;
  stages: ReadingStage[];
  domains: ResearchDomain[];
  impacts: ImpactScore[];
  dateRange: DateFilter;
}

export const filterPapers = (papers: ResearchPaper[], criteria: FilterCriteria): ResearchPaper[] => {
  const now = new Date();
  
  return papers.filter((paper) => {
    // 1. Text Search (Title or Author)
    const matchesSearch = 
      criteria.searchQuery === '' ||
      paper.title.toLowerCase().includes(criteria.searchQuery.toLowerCase()) ||
      paper.firstAuthor.toLowerCase().includes(criteria.searchQuery.toLowerCase());

    // 2. Multi-select: Reading Stage (If empty, allow all)
    const matchesStage = 
      criteria.stages.length === 0 || 
      criteria.stages.includes(paper.readingStage);

    // 3. Multi-select: Domain
    const matchesDomain = 
      criteria.domains.length === 0 || 
      criteria.domains.includes(paper.domain);

    // 4. Multi-select: Impact
    const matchesImpact = 
      criteria.impacts.length === 0 || 
      criteria.impacts.includes(paper.impactScore);

    // 5. Date Filter
    let matchesDate = true;
    const paperDate = new Date(paper.createdAt);
    
    if (criteria.dateRange === 'This Week') {
      const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      matchesDate = paperDate >= oneWeekAgo;
    } else if (criteria.dateRange === 'This Month') {
      const oneMonthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
      matchesDate = paperDate >= oneMonthAgo;
    } else if (criteria.dateRange === 'Last 3 Months') {
      const threeMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 3, now.getDate());
      matchesDate = paperDate >= threeMonthsAgo;
    }

    return matchesSearch && matchesStage && matchesDomain && matchesImpact && matchesDate;
  });
};
