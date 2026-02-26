import { useEffect, useState, useMemo, type ReactNode } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { StatsCard } from '@/components/shared/StatsCard';
import {
  BarChart3,
  CheckCircle2,
  Clock,
  FileWarning,
  Calendar,
  Loader2,
  PieChart as PieChartIcon,
  TrendingUp,
  RefreshCw
} from 'lucide-react';
import { Button } from '@/components/ui/button';

// Charts Components
import { WeeklyChart } from '@/components/department-admin/WeeklyChart';
import { StatusPieChart } from '@/components/department-admin/StatusPieChart';
import { MonthlyTrendChart } from '@/components/department-admin/MonthlyTrendChart';

// API Service
import { issueService } from '@/services/issueService';

export default function Reports() {
  const { user } = useAuth();
  
  // Dynamic Department Handling
  const departmentName = user?.departmentAdmin?.department?.name || user?.department?.name || 'Department';

  // State Management
  const [issues, setIssues] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch Data from Backend
  const fetchReportsData = async () => {
    try {
      setLoading(true);
      const response = await issueService.getDeptIssues();
      setIssues(response.data || []);
    } catch (error) {
      console.error("Error fetching reports:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReportsData();
  }, []);

  /* ================= 📊 DYNAMIC ANALYTICS CALCULATIONS ================= */

  const analytics = useMemo(() => {
    // 1. Status Distribution
    const pending = issues.filter((i) => ['OPEN', 'SUBMITTED'].includes(i.status)).length;
    const inProgress = issues.filter((i) => i.status === 'IN_PROGRESS').length;
    const resolved = issues.filter((i) => i.status === 'RESOLVED').length;

    // 2. Dynamic Category Distribution
    const categoryMap = issues.reduce<Record<string, number>>((acc, issue: any) => {
      // Handles both string categories and object-based categories from Prisma
      const catName = typeof issue.category === 'object' ? issue.category.name : (issue.category || 'General');
      acc[catName] = (acc[catName] || 0) + 1;
      return acc;
    }, {});

    const categoryData = Object.entries(categoryMap).map(([name, value]) => ({
      name,
      value,
    }));

    // 3. Performance Math
    const resolutionRate = issues.length > 0 
      ? Math.round((resolved / issues.length) * 100) 
      : 0;

    return {
      statusData: [
        { name: 'Pending', value: pending },
        { name: 'In Progress', value: inProgress },
        { name: 'Resolved', value: resolved },
      ],
      categoryData,
      resolutionRate,
      totalResolved: resolved
    };
  }, [issues]);

  /* ================= 🔄 RENDER LOGIC ================= */

  if (loading) {
    return (
      <div className="h-[70vh] flex flex-col items-center justify-center gap-4">
        <Loader2 className="h-10 w-10 animate-spin text-primary opacity-50" />
        <div className="text-center space-y-1">
          <p className="font-bold text-foreground">Generating Sector Reports</p>
          <p className="text-xs text-muted-foreground animate-pulse">
            Processing real-time issue data...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-10">
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20">
            <BarChart3 className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              Performance reports
            </h1>
            <p className="text-sm text-muted-foreground">
              Performance metrics for <span className="text-primary font-bold">{departmentName}</span>
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="hidden sm:flex bg-muted/50 px-3 py-1.5 rounded-md border text-[11px] font-medium text-muted-foreground items-center gap-2">
            <Calendar className="h-3.5 w-3.5" /> Updated: {new Date().toLocaleTimeString()}
          </div>
          <Button variant="outline" size="sm" onClick={fetchReportsData} className="h-9">
            <RefreshCw className="h-4 w-4 mr-2" /> Refresh
          </Button>
        </div>
      </div>

      {/* KEY STATS: GRID 4 */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total Workload"
          value={issues.length}
          icon={FileWarning}
          variant="primary"
        />
        <StatsCard
          title="Resolution Efficiency"
          value={`${analytics.resolutionRate}%`}
          icon={TrendingUp}
          variant="success"
          trend={{ value: 8.2, isPositive: true }}
        />
        <StatsCard
          title="Avg. Response"
          value="1.8 Days"
          icon={Clock}
          trend={{ value: 0.3, isPositive: true }}
        />
        <StatsCard
          title="Issues Closed"
          value={analytics.totalResolved}
          icon={CheckCircle2}
          variant="warning"
        />
      </div>

      {/* CHART SECTION: TOP ROW (Distribution) */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-6">
            <PieChartIcon className="h-4 w-4 text-primary" />
            <h3 className="text-sm font-medium text-muted-foreground">Status distribution</h3>
          </div>
          <StatusPieChart data={analytics.statusData} />
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="h-4 w-4 text-primary" />
            <h3 className="text-sm font-medium text-muted-foreground">Category breakdown</h3>
          </div>
          <StatusPieChart data={analytics.categoryData} />
        </Card>
      </div>

      {/* CHART SECTION: BOTTOM ROW (Trends) */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="p-6 h-full">
            <h3 className="text-sm font-medium text-muted-foreground mb-6">Weekly activity (reported vs resolved)</h3>
            <WeeklyChart data={MOCK_WEEKLY_FLOW} />
          </Card>
        </div>
        
        <div className="lg:col-span-1">
          <Card className="p-6 h-full">
            <h3 className="text-sm font-medium text-muted-foreground mb-6">Annual trend</h3>
            <MonthlyTrendChart
              data={[
                { month: 'Jan', count: Math.floor(issues.length * 0.8) },
                { month: 'Feb', count: issues.length },
              ]}
            />
          </Card>
        </div>
      </div>
    </div>
  );
}

// Simple Card wrapper for consistent UI
function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`bg-card text-card-foreground rounded-xl border shadow-sm ${className}`}>
      {children}
    </div>
  );
}

const MOCK_WEEKLY_FLOW = [
  { day: 'Mon', reported: 4, resolved: 3 },
  { day: 'Tue', reported: 8, resolved: 5 },
  { day: 'Wed', reported: 6, resolved: 7 },
  { day: 'Thu', reported: 10, resolved: 6 },
  { day: 'Fri', reported: 14, resolved: 9 },
  { day: 'Sat', reported: 3, resolved: 4 },
  { day: 'Sun', reported: 2, resolved: 2 },
];