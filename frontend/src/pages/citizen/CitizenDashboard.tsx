import { useAuth } from '@/contexts/AuthContext';
import { mockIssues } from '@/data/mockData';
import { IssueCard } from '@/components/citizen/IssueCard';
import { ReportIssueDialog } from '@/components/citizen/ReportIssueDialog';
import { StatsCard } from '@/components/shared/StatsCard';
import { FileWarning, CheckCircle2, Clock, TrendingUp, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

export function CitizenDashboard() {
  const { user } = useAuth();

  const pendingIssues = mockIssues.filter((i) => i.status === 'pending');
  const recentIssues = mockIssues.slice(0, 3);
  const userPoints = user.points || 0;
  const nextBadgePoints = 500;
  const progress = (userPoints / nextBadgePoints) * 100;

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            Welcome back, {user.name.split(' ')[0]}! 👋
          </h1>
          <p className="text-muted-foreground mt-1">
            Help improve your city by reporting and tracking civic issues.
          </p>
        </div>
        <ReportIssueDialog />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Your Reports"
          value="12"
          icon={FileWarning}
          variant="primary"
        />
        <StatsCard
          title="Resolved"
          value="8"
          icon={CheckCircle2}
          variant="success"
        />
        <StatsCard
          title="Pending"
          value={pendingIssues.length.toString()}
          icon={Clock}
          variant="warning"
        />
        <StatsCard
          title="Civic Points"
          value={userPoints}
          icon={TrendingUp}
          trend={{ value: 12, isPositive: true }}
        />
      </div>

      {/* Main Content */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Issues */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Recent Issues</h2>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/citizen/issues" className="flex items-center gap-1">
                View All <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          {recentIssues.map((issue) => (
            <IssueCard key={issue.id} issue={issue} />
          ))}
        </div>

        {/* Quick Rewards Overview */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Your Rewards</h2>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/citizen/rewards" className="flex items-center gap-1">
                View All <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Civic Points</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center p-4 bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg">
                <p className="text-3xl font-bold text-primary">{userPoints}</p>
                <p className="text-sm text-muted-foreground">Total Points</p>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Next Badge: Community Hero</span>
                  <span className="font-medium">{userPoints}/{nextBadgePoints}</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
