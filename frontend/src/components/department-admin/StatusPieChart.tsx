import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

interface StatusData {
  name: string;
  value: number;
  [key: string]: string | number;
}

interface StatusPieChartProps {
  data: StatusData[];
  title?: string;
  description?: string;
}

// ✅ Colors mapped to your CSS variables for consistency
const COLORS = [
  'hsl(var(--warning))', // For Pending / OPEN
  'hsl(var(--primary))', // For In Progress / IN_PROGRESS
  'hsl(var(--success))', // For Resolved / RESOLVED
  'hsl(var(--muted))',    // Fallback
];

export function StatusPieChart({ 
  data, 
  title = 'Resolution Status',
  description = 'Live breakdown of issue lifecycle'
}: StatusPieChartProps) {
  
  // ✅ 1. Filter out zero values so the chart labels don't overlap
  const activeData = data.filter(item => item.value > 0);
  
  // ✅ 2. Calculate sum for the center label
  const totalIssues = data.reduce((acc, curr) => acc + curr.value, 0);

  return (
    <Card className="flex flex-col border-none shadow-md bg-card/50 backdrop-blur-sm border border-primary/5">
      <CardHeader className="pb-0">
        <CardTitle className="text-lg font-black uppercase tracking-tighter italic">
          {title}
        </CardTitle>
        <CardDescription className="text-[10px] uppercase tracking-widest font-bold opacity-70">
          {description}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="flex-1 pb-4">
        <div className="h-[300px] w-full">
          {totalIssues > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--background))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '12px',
                    fontSize: '12px',
                    fontWeight: 'bold'
                  }}
                  itemStyle={{ textTransform: 'uppercase' }}
                />
                <Legend 
                  verticalAlign="bottom" 
                  height={36}
                  formatter={(value) => (
                    <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground ml-1">
                      {value}
                    </span>
                  )}
                />
                <Pie
                  data={activeData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70} // Creates the Donut hole
                  outerRadius={95}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                  animationDuration={1200}
                >
                  {activeData.map((_, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={COLORS[index % COLORS.length]} 
                      className="hover:opacity-80 transition-opacity outline-none cursor-pointer"
                    />
                  ))}
                </Pie>

                {/* ✅ 3. Dynamic Center Text showing Total Count */}
                <text
                  x="50%"
                  y="48%"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="fill-foreground font-black text-3xl italic"
                >
                  {totalIssues}
                </text>
                <text
                  x="50%"
                  y="58%"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="fill-muted-foreground text-[10px] uppercase font-black tracking-tighter"
                >
                  Total Tasks
                </text>
              </PieChart>
            </ResponsiveContainer>
          ) : (
            /* ✅ 4. Professional Empty State */
            <div className="h-full flex flex-col items-center justify-center text-muted-foreground/40">
              <div className="h-16 w-16 rounded-full border-2 border-dashed border-muted-foreground/20 mb-3 animate-pulse" />
              <p className="text-[10px] font-black uppercase tracking-widest">No Active Records</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}