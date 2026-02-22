import { cn } from '@/lib/utils';

interface ResolutionRateBarProps {
  name: string;
  resolved: number;
  total: number;
}

export function ResolutionRateBar({ name, resolved, total }: ResolutionRateBarProps) {
  const rate = Math.round((resolved / total) * 100);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="font-medium">{name}</span>
        <span className="text-sm text-muted-foreground">
          {resolved}/{total} ({rate}%)
        </span>
      </div>
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <div
          className={cn(
            'h-full rounded-full transition-all',
            rate >= 80 ? 'bg-success' : rate >= 60 ? 'bg-warning' : 'bg-destructive'
          )}
          style={{ width: `${rate}%` }}
        />
      </div>
    </div>
  );
}

interface ResolutionRatesListProps {
  items: Array<{ name: string; resolved: number; issues: number }>;
}

export function ResolutionRatesList({ items }: ResolutionRatesListProps) {
  return (
    <div className="space-y-4">
      {items.map((item) => (
        <ResolutionRateBar
          key={item.name}
          name={item.name}
          resolved={item.resolved}
          total={item.issues}
        />
      ))}
    </div>
  );
}
