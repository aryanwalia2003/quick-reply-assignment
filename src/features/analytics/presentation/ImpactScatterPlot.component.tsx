import { ResponsiveContainer, ScatterChart, Scatter, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts';
import type { ScatterData } from '@/features/analytics/domain/usecases/analytics.usecase';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/atoms/Card.component';

export const ImpactScatterPlot = ({ data }: { data: ScatterData[] }) => {
  return (
    <Card className="h-[400px]">
      <CardHeader>
        <CardTitle>Citations vs. Impact</CardTitle>
        <p className="text-sm text-slate-500">Are high-impact papers getting more citations?</p>
      </CardHeader>
      <CardContent className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
            <CartesianGrid />
            <XAxis type="number" dataKey="citations" name="Citations" unit="" />
            <YAxis type="category" dataKey="impact" name="Impact" width={100} />
            <Tooltip cursor={{ strokeDasharray: '3 3' }} />
            <Legend />
            
            {/* We map different colors for different impacts manually or pass fill in data */}
            <Scatter name="Papers" data={data} fill="#8884d8" shape="circle" />
          </ScatterChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};