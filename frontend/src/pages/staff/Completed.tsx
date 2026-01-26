import { useState } from 'react';
// import { useAuth } from '@/contexts/AuthContext';
import { mockIssues } from '@/data/mockData';
import { CategoryBadge } from '@/components/shared/CategoryBadge';
import { Card, CardContent,  } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { StatsCard } from '@/components/shared/StatsCard';
import {
  CheckCircle2,
  MapPin,
  Calendar,
  Clock,
  TrendingUp,
  Award,
  Star,
  Filter,
} from 'lucide-react';
import { format, subDays } from 'date-fns';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function Completed() {
  // const { user } = useAuth();
  const [timeFilter, setTimeFilter] = useState<string>('all');

  // Mock completed tasks with resolution dates
  const completedTasks = [
    {
      ...mockIssues[0],
      status: 'resolved' as const,
      resolvedAt: subDays(new Date(), 1),
      resolutionNotes: 'Pothole filled and road surface leveled',
      afterPhoto: 'https://images.unsplash.com/photo-1618090584126-129cd1c5a617?w=400',
    },
    {
      ...mockIssues[1],
      status: 'resolved' as const,
      resolvedAt: subDays(new Date(), 2),
      resolutionNotes: 'Streetlight bulb replaced and tested',
      afterPhoto: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
    },
    {
      ...mockIssues[2],
      status: 'resolved' as const,
      resolvedAt: subDays(new Date(), 4),
      resolutionNotes: 'Garbage cleared and area sanitized',
      afterPhoto: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=400',
    },
    {
      ...mockIssues[3],
      status: 'resolved' as const,
      resolvedAt: subDays(new Date(), 7),
      resolutionNotes: 'Pipeline repaired and water supply restored',
      afterPhoto: 'https://images.unsplash.com/photo-1581093458791-9f3c3250a8b0?w=400',
    },
  ];

  const filterTasks = () => {
    const now = new Date();
    switch (timeFilter) {
      case 'today':
        return completedTasks.filter(t => 
          format(new Date(t.resolvedAt), 'yyyy-MM-dd') === format(now, 'yyyy-MM-dd')
        );
      case 'week':
        return completedTasks.filter(t => 
          new Date(t.resolvedAt) >= subDays(now, 7)
        );
      case 'month':
        return completedTasks.filter(t => 
          new Date(t.resolvedAt) >= subDays(now, 30)
        );
      default:
        return completedTasks;
    }
  };

  const filteredTasks = filterTasks();

  // Stats
  const todayCompleted = completedTasks.filter(t => 
    format(new Date(t.resolvedAt), 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd')
  ).length;
  const weekCompleted = completedTasks.filter(t => 
    new Date(t.resolvedAt) >= subDays(new Date(), 7)
  ).length;

  return (
   
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
              <CheckCircle2 className="h-6 w-6 text-success" />
              Completed Tasks
            </h1>
            <p className="text-muted-foreground mt-1">
              Review your completed work and achievements
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <Select value={timeFilter} onValueChange={setTimeFilter}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Time period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard
            title="Today"
            value={todayCompleted}
            icon={CheckCircle2}
            variant="success"
          />
          <StatsCard
            title="This Week"
            value={weekCompleted}
            icon={TrendingUp}
            variant="primary"
          />
          <StatsCard
            title="Total Completed"
            value={completedTasks.length}
            icon={Award}
          />
          <StatsCard
            title="Avg. Resolution"
            value="2.3h"
            icon={Clock}
            trend={{ value: 12, isPositive: true }}
          />
        </div>

        {/* Achievement Banner */}
        <Card className="bg-gradient-to-r from-success/10 via-success/5 to-transparent border-success/20">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="h-14 w-14 rounded-full bg-success/20 flex items-center justify-center">
                <Star className="h-7 w-7 text-success" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Great Work!</h3>
                <p className="text-muted-foreground">
                  You've completed {completedTasks.length} tasks. Keep up the excellent performance!
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Completed Tasks List */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Completed Tasks</h2>
          
          {filteredTasks.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <Clock className="h-12 w-12 text-muted-foreground/30 mx-auto mb-3" />
                <p className="font-medium">No completed tasks in this period</p>
                <p className="text-sm text-muted-foreground">
                  Select a different time filter to view more
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {filteredTasks.map((task) => (
                <Card key={task.id} className="overflow-hidden animate-fade-in">
                  <CardContent className="p-0">
                    <div className="flex flex-col md:flex-row">
                      {/* Before/After Photos */}
                      <div className="flex md:w-64 flex-shrink-0">
                        <div className="relative w-1/2 md:w-32">
                          <img
                            src={task.beforePhoto}
                            alt="Before"
                            className="w-full h-32 object-cover"
                          />
                          <Badge className="absolute bottom-2 left-2 bg-destructive/80 text-xs">
                            Before
                          </Badge>
                        </div>
                        <div className="relative w-1/2 md:w-32">
                          <img
                            src={task.afterPhoto}
                            alt="After"
                            className="w-full h-32 object-cover"
                          />
                          <Badge className="absolute bottom-2 left-2 bg-success/80 text-xs">
                            After
                          </Badge>
                        </div>
                      </div>

                      {/* Task Details */}
                      <div className="flex-1 p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <CategoryBadge category={task.category} />
                            <Badge variant="outline" className="bg-success/10 text-success border-success/30">
                              <CheckCircle2 className="h-3 w-3 mr-1" />
                              Resolved
                            </Badge>
                          </div>
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {format(new Date(task.resolvedAt), 'MMM d, yyyy')}
                          </span>
                        </div>
                        <h3 className="font-semibold mb-1">{task.title}</h3>
                        <p className="text-sm text-muted-foreground flex items-center gap-1 mb-2">
                          <MapPin className="h-3 w-3" />
                          {task.location.address}
                        </p>
                        <div className="bg-muted/50 rounded-lg p-2 mt-2">
                          <p className="text-xs text-muted-foreground">
                            <span className="font-medium">Resolution:</span> {task.resolutionNotes}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
  
  );
}