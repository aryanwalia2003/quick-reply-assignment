import { AnalyticsDashboard } from '@/features/analytics/presentation/AnalyticsDashboard.component';

export const AnalyticsPage = () => {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-slate-900">Research Analytics</h2>
        <p className="text-slate-500 mt-1">Visualize your reading habits and impact.</p>
      </div>
      
      <AnalyticsDashboard />
    </div>
  );
};