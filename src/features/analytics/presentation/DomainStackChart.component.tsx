import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';
import type { StackedBarData } from '@/features/analytics/domain/usecases/analytics.usecase';
import { READING_STAGES } from '@/shared/constants/paperOptions.constant';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/atoms/Card.component';

const COLORS = ['#e0e7ff', '#c7d2fe', '#a5b4fc', '#818cf8', '#6366f1', '#4338ca']; // Indigo scale

export const DomainStackChart = ({ data }: { data: StackedBarData[] }) => {
  return (
    <Card className="h-[400px] md:col-span-2">
      <CardHeader>
        <CardTitle>Domain Progress</CardTitle>
        <p className="text-sm text-slate-500">Reading status breakdown by research domain</p>
      </CardHeader>
      <CardContent className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="domain" tick={{ fontSize: 12 }} />
            <YAxis />
            <Tooltip />
            <Legend wrapperStyle={{ paddingTop: '20px' }} />
            
            {READING_STAGES.map((stage, index) => (
              <Bar 
                key={stage} 
                dataKey={stage} 
                stackId="a" 
                fill={COLORS[index % COLORS.length]} 
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};