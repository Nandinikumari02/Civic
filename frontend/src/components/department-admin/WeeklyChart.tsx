import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { BarChart3, TrendingUp } from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

interface WeeklyData {
  day: string;
  reported: number;
  resolved: number;
}

interface WeeklyChartProps {
  data: WeeklyData[];
  title?: string;
  description?: string;
}

export function WeeklyChart({ 
  data, 
  title = 'Weekly Performance', 
  description = 'Comparison of intake vs resolution' 
}: WeeklyChartProps) {
  
  // Optional: Ensure data is never empty to prevent Recharts crashes
  const safeData = data.length > 0 ? data : [
    { day: 'Mon', reported: 0, resolved: 0 },
    { day: 'Tue', reported: 0, resolved: 0 },
    { day: 'Wed', reported: 0, resolved: 0 },
    { day: 'Thu', reported: 0, resolved: 0 },
    { day: 'Fri', reported: 0, resolved: 0 },
  ];

  return (
    <Card className="border-none shadow-md bg-card/50 backdrop-blur-sm border border-primary/5">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <CardTitle className="text-lg font-black uppercase tracking-tighter italic flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              {title}
            </CardTitle>
            <CardDescription className="text-[10px] uppercase tracking-widest font-bold opacity-70">
              {description}
            </CardDescription>
          </div>
          <div className="hidden sm:flex items-center gap-2 bg-background/50 px-3 py-1 rounded-full border border-border/50">
             <TrendingUp className="h-3 w-3 text-emerald-500" />
             <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-tight">Live Intake</span>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="h-[300px] w-full mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart 
              data={safeData} 
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              barGap={8}
            >
              <CartesianGrid 
                strokeDasharray="3 3" 
                vertical={false} 
                stroke="hsl(var(--muted-foreground))" 
                opacity={0.1} 
              />
              <XAxis 
                dataKey="day" 
                axisLine={false}
                tickLine={false}
                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11, fontWeight: 600 }}
                dy={10}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }}
              />
              <Tooltip
                cursor={{ fill: 'hsl(var(--primary))', opacity: 0.05 }}
                contentStyle={{
                  backgroundColor: 'hsl(var(--background))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '12px',
                  boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
                }}
                itemStyle={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase' }}
                labelStyle={{ fontWeight: 800, marginBottom: '4px', color: 'hsl(var(--primary))' }}
              />
              <Legend 
                verticalAlign="top" 
                align="right"
                iconType="circle"
                height={36}
                formatter={(value) => (
                  <span className="text-[10px] font-black uppercase tracking-tighter text-muted-foreground ml-1">
                    {value}
                  </span>
                )}
              />
              <Bar
                dataKey="reported"
                fill="hsl(var(--primary))"
                name="Reported"
                radius={[4, 4, 0, 0]}
                barSize={18}
                animationBegin={200}
                animationDuration={1000}
              />
              <Bar
                dataKey="resolved"
                fill="hsl(var(--success))"
                name="Resolved"
                radius={[4, 4, 0, 0]}
                barSize={18}
                animationBegin={400}
                animationDuration={1000}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}