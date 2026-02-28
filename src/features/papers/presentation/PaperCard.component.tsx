import { ResearchPaper } from '../domain/ResearchPaper.entity';
import { useUpdatePaperStage } from '../application/useUpdatePaperStage.hook';
import { READING_STAGES } from '@/shared/constants/paperOptions.constant';
import type { ReadingStage } from '@/shared/types/supabase.type';

// UI Components
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/atoms/Card.component';
import { Select } from '@/shared/ui/atoms/Select.component';
import { BookOpen, Users, BarChart3, Calendar } from 'lucide-react';
import { cn } from '@/shared/utils/cn.util';

interface PaperCardProps {
  paper: ResearchPaper;
}

export const PaperCard = ({ paper }: PaperCardProps) => {
  const { mutate: updateStage, isPending } = useUpdatePaperStage();

  const handleStageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateStage({ 
      id: paper.id, 
      stage: e.target.value as ReadingStage 
    });
  };

  // Helper for Impact Color "Vibe"
  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'High Impact': return 'bg-rose-100 text-rose-700 border-rose-200';
      case 'Medium Impact': return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'Low Impact': return 'bg-slate-100 text-slate-700 border-slate-200';
      default: return 'bg-gray-50 text-gray-500 border-gray-100';
    }
  };

  return (
    <Card className="transition-all hover:shadow-md border-l-4 border-l-indigo-500">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start gap-4">
          <div>
            {/* Domain Badge */}
            <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-indigo-100 text-indigo-800 hover:bg-indigo-200 mb-2">
              {paper.domain}
            </span>
            <CardTitle className="text-lg leading-tight mb-1">
              {paper.title}
            </CardTitle>
            <div className="flex items-center text-sm text-slate-500 gap-1">
              <Users className="w-4 h-4" />
              <span>{paper.firstAuthor}</span>
            </div>
          </div>

          {/* Impact Badge */}
          <div className={cn("px-2 py-1 rounded text-xs font-medium border", getImpactColor(paper.impactScore))}>
            {paper.impactScore}
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
          {/* Metric: Citations */}
          <div className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-slate-400" />
            <span className="font-medium">{paper.citationCount}</span>
            <span className="text-slate-500">Citations</span>
          </div>

          {/* Metric: Date Added */}
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-slate-400" />
            <span className="text-slate-500">
              {new Date(paper.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>

        {/* Action: Update Stage */}
        <div className="mt-4 pt-4 border-t border-slate-100">
          <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5 block">
            Current Stage
          </label>
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-indigo-500" />
            <Select 
              value={paper.readingStage}
              onChange={handleStageChange}
              options={READING_STAGES}
              disabled={isPending}
              className="h-8 text-sm"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};