import { ResearchPaper } from '@/features/papers/domain/ResearchPaper.entity';
import { READING_STAGES, RESEARCH_DOMAINS } from '@/shared/constants/paperOptions.constant';

// --- Types for Charts ---
export interface FunnelData {
  stage: string;
  count: number;
  fill: string;
}

export interface ScatterData {
  id: string;
  citations: number;
  impact: string;
  title: string;
  fill: string;
}

export interface StackedBarData {
  domain: string;
  [key: string]: string | number; // Dynamic keys for stages
}

export interface SummaryStats {
  totalPapers: number;
  completedCount: number;
  completionRate: number;
  avgCitations: number;
}

// --- Logic ---

export const calculateFunnelData = (papers: ResearchPaper[]): FunnelData[] => {
  return READING_STAGES.map((stage, index) => {
    // Count papers currently at this stage OR passed this stage
    // (A funnel implies accumulation, but usually for this specific requirement, 
    // a simple count per stage is often what's expected. Let's do simple count for clarity,
    // or cumulative if we want a true "drop-off" view. Let's do simple distribution first).
    const count = papers.filter(p => p.readingStage === stage).length;
    
    // Generate a gradient of blue colors
    const opacity = 1 - (index * 0.15);
    return {
      stage,
      count,
      fill: `rgba(79, 70, 229, ${opacity})` // Indigo color
    };
  });
};

export const calculateScatterData = (papers: ResearchPaper[]): ScatterData[] => {
  return papers.map(p => {
    let color = '#94a3b8'; // gray-400
    if (p.impactScore === 'High Impact') color = '#e11d48'; // rose-600
    if (p.impactScore === 'Medium Impact') color = '#d97706'; // amber-600
    if (p.impactScore === 'Low Impact') color = '#22c55e'; // green-500
    
    return {
      id: p.id,
      citations: p.citationCount,
      impact: p.impactScore,
      title: p.title,
      fill: color
    };
  });
};

export const calculateStackedBarData = (papers: ResearchPaper[]): StackedBarData[] => {
  return RESEARCH_DOMAINS.map(domain => {
    const domainPapers = papers.filter(p => p.domain === domain);
    
    const row: StackedBarData = { domain };
    
    // Initialize all stages to 0
    READING_STAGES.forEach(stage => {
      row[stage] = 0;
    });

    // Count
    domainPapers.forEach(p => {
      row[p.readingStage] = (row[p.readingStage] as number) + 1;
    });

    return row;
  });
};

export const calculateSummaryStats = (papers: ResearchPaper[]): SummaryStats => {
  const total = papers.length;
  if (total === 0) return { totalPapers: 0, completedCount: 0, completionRate: 0, avgCitations: 0 };

  const completed = papers.filter(p => p.isCompleted()).length;
  const totalCitations = papers.reduce((sum, p) => sum + p.citationCount, 0);

  return {
    totalPapers: total,
    completedCount: completed,
    completionRate: Math.round((completed / total) * 100),
    avgCitations: Math.round(totalCitations / total)
  };
};