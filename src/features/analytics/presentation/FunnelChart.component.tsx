import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import type { FunnelData } from '@/features/analytics/domain/usecases/analytics.usecase';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/atoms/Card.component';

export const FunnelChart = ({ data }: { data: FunnelData[] }) => {
  return (
    <Card className="h-[400px]">
      <CardHeader>
        <CardTitle>Reading Funnel</CardTitle>
        <p className="text-sm text-slate-500">Distribution of papers across reading stages</p>
      </CardHeader>
      <CardContent className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" margin={{ left: 40 }}>
            <CartesianGrid strokeDasharray="3 3" horizontal={false} />
            <XAxis type="number" />
            <YAxis 
              dataKey="stage" 
              type="category" 
              width={120} 
              tick={{ fontSize: 12 }} 
            />
            <Tooltip 
              cursor={{ fill: 'transparent' }}
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            />
            <Bar dataKey="count" radius={[0, 4, 4, 0]} barSize={30} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};