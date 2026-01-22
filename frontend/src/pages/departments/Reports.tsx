
import { useAuth } from '@/contexts/AuthContext';
import { getIssuesByDepartment } from '@/data/mockData';
import { CATEGORY_LABELS } from '@/types';
import { StatsCard } from '@/components/shared/StatsCard';
import {
  BarChart3,
  CheckCircle2,
  Clock,
  FileWarning,
  Calendar,
} from 'lucide-react';
import { WeeklyChart } from '@/components/department-admin/WeeklyChart';
import { StatusPieChart } from '@/components/department-admin/StatusPieChart';
import { MonthlyTrendChart } from '@/components/department-admin/MonthlyTrendChart';


const weeklyData = [
  { day: 'Mon', reported: 12, resolved: 8 },
  { day: 'Tue', reported: 19, resolved: 14 },
  { day: 'Wed', reported: 15, resolved: 12 },
  { day: 'Thu', reported: 8, resolved: 10 },
  { day: 'Fri', reported: 22, resolved: 18 },
  { day: 'Sat', reported: 10, resolved: 8 },
  { day: 'Sun', reported: 5, resolved: 6 },
];

const monthlyTrend = [
  { month: 'Jan', issues: 45 },
  { month: 'Feb', issues: 52 },
  { month: 'Mar', issues: 48 },
  { month: 'Apr', issues: 61 },
  { month: 'May', issues: 55 },
  { month: 'Jun', issues: 67 },
];

export default function Reports() {
  const { user } = useAuth();
  const department = user.department || 'water';

  const departmentIssues = getIssuesByDepartment(department);
  const pendingCount = departmentIssues.filter((i) => i.status === 'pending').length;
  const inProgressCount = departmentIssues.filter((i) => i.status === 'in_progress').length;
  const resolvedCount = departmentIssues.filter((i) => i.status === 'resolved').length;

  const statusData = [
    { name: 'Pending', value: pendingCount },
    { name: 'In Progress', value: inProgressCount },
    { name: 'Resolved', value: resolvedCount },
  ];

  const resolutionRate = departmentIssues.length > 0 
    ? Math.round((resolvedCount / departmentIssues.length) * 100) 
    : 0;

  const avgResolutionTime = 2.5;

//   const performanceMetrics = [
//     {
//       label: 'Resolution Rate',
//       value: `${resolutionRate}%`,
//       trend: { value: '+5% from last month', isPositive: true },
//     },
//     {
//       label: 'Avg. Resolution Time',
//       value: `${avgResolutionTime}d`,
//       trend: { value: '-0.5d from last month', isPositive: true },
//     },
//     {
//       label: 'Citizen Satisfaction',
//       value: '98%',
//       trend: { value: '+2% from last month', isPositive: true },
//     },
//   ];

  return (
   
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <BarChart3 className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Reports & Analytics</h1>
            <p className="text-muted-foreground">
              {CATEGORY_LABELS[department]} Department - Performance metrics
            </p>
          </div>
        </div>

        {/* Key Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard
            title="Total Issues"
            value={departmentIssues.length}
            icon={FileWarning}
            variant="primary"
          />
          <StatsCard
            title="Resolution Rate"
            value={`${resolutionRate}%`}
            icon={CheckCircle2}
            variant="success"
            trend={{ value: 5, isPositive: true }}
          />
          <StatsCard
            title="Avg. Resolution Time"
            value={`${avgResolutionTime}d`}
            icon={Clock}
            trend={{ value: 0.5, isPositive: true }}
          />
          <StatsCard
            title="This Week"
            value={weeklyData.reduce((acc, d) => acc + d.reported, 0)}
            icon={Calendar}
            variant="warning"
          />
        </div>

        {/* Charts */}
        <div className="grid lg:grid-cols-2 gap-6">
          <WeeklyChart data={weeklyData} />
          <StatusPieChart data={statusData} />
          <MonthlyTrendChart data={monthlyTrend} />
        </div>


        
      </div>
  
  );
}
