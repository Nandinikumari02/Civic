import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface Department {
  name: string;
  issues: number;
  resolved: number;
  color?: string;
}

interface DepartmentStatsItemProps {
  department: Department;
}

export function DepartmentStatsItem({ department }: DepartmentStatsItemProps) {
  const rate = Math.round((department.resolved / department.issues) * 100);

  return (
    <div className="flex items-center justify-between p-2 hover:bg-muted/50 rounded-lg transition-colors">
      <div className="flex items-center gap-2">
        <div className={cn('h-2 w-2 rounded-full', department.color || 'bg-primary')} />
        <span className="text-sm font-medium">{department.name}</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-xs text-muted-foreground">
          {department.resolved}/{department.issues}
        </span>
        <Badge variant="outline" className="text-xs">
          {rate}%
        </Badge>
      </div>
    </div>
  );
}

interface DepartmentStatsListProps {
  departments: Department[];
  limit?: number;
}

export function DepartmentStatsList({ departments, limit }: DepartmentStatsListProps) {
  const displayDepartments = limit ? departments.slice(0, limit) : departments;

  return (
    <div className="space-y-3">
      {displayDepartments.map((dept) => (
        <DepartmentStatsItem key={dept.name} department={dept} />
      ))}
    </div>
  );
}
