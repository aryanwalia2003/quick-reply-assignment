import { usePapers } from '@/features/papers/application/usePapers.hook';
import { 
  calculateFunnelData, 
  calculateScatterData, 
  calculateStackedBarData, 
  calculateSummaryStats 
} from '@/features/analytics/domain/usecases/analytics.usecase';
import { FunnelChart } from './FunnelChart.component';
import { ImpactScatterPlot } from './ImpactScatterPlot.component';
import { DomainStackChart } from './DomainStackChart.component';
import { Loader2, TrendingUp, CheckCircle, Book } from 'lucide-react';

export const AnalyticsDashboard = () => {
  const { data: papers, isLoading } = usePapers();

  if (isLoading) return <Loader2 className="animate-spin mx-auto mt-20" />;
  if (!papers || papers.length === 0) return <div className="text-center mt-20">No data for analytics yet.</div>;

  const funnelData = calculateFunnelData(papers);
  const scatterData = calculateScatterData(papers);
  const stackData = calculateStackedBarData(papers);
  const stats = calculateSummaryStats(papers);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-indigo-100 rounded-full text-indigo-600">
            <Book className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-slate-500">Total Papers</p>
            <p className="text-2xl font-bold">{stats.totalPapers}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-emerald-100 rounded-full text-emerald-600">
            <CheckCircle className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-slate-500">Completion Rate</p>
            <p className="text-2xl font-bold">{stats.completionRate}%</p>
            <p className="text-xs text-slate-400">{stats.completedCount} papers fully read</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-amber-100 rounded-full text-amber-600">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-slate-500">Avg. Citations</p>
            <p className="text-2xl font-bold">{stats.avgCitations}</p>
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FunnelChart data={funnelData} />
        <ImpactScatterPlot data={scatterData} />
        <DomainStackChart data={stackData} />
      </div>
    </div>
  );
};