import { useAuth } from '@/contexts/AuthContext';
import { mockIssues } from '@/data/mockData';
import { StatsCard } from '@/components/shared/StatsCard';
import { Card } from '@/components/ui/card';
import { TaskCard } from '@/components/staff/TaskCard';
import { EmptyTaskState } from '@/components/staff/EmptyTaskState';
import {
  ClipboardList,
  CheckCircle2,
  Clock,
  MapPin,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function StaffDashboard() {
  const { user } = useAuth();
  const { toast } = useToast();

  const assignedTasks = mockIssues.filter(
    (i) => i.assignedTo === 'Amit Kumar' && i.status !== 'resolved'
  );
//   const completedTasks = mockIssues.filter(
//     (i) => i.assignedTo === 'Amit Kumar' && i.status === 'resolved'
//   );

  const handleResolve = () => {
    toast({
      title: 'Task Completed!',
      description: 'Great work! The issue has been marked as resolved.',
    });
  };

  // Display tasks or sample if none assigned
  const displayTasks = assignedTasks.length > 0 
    ? assignedTasks 
    : mockIssues.slice(0, 2).map(task => ({
        ...task, 
        status: 'in_progress' as const, 
        assignedTo: user.name
      }));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">
          Good morning, {user.name.split(' ')[0]}! 🔧
        </h1>
        <p className="text-muted-foreground mt-1">
          You have {assignedTasks.length} tasks pending today
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Active Tasks"
          value={assignedTasks.length}
          icon={ClipboardList}
          variant="primary"
        />
        <StatsCard
          title="Completed Today"
          value="2"
          icon={CheckCircle2}
          variant="success"
        />
        <StatsCard
          title="Avg. Response Time"
          value="2.4h"
          icon={Clock}
        />
        <StatsCard
          title="This Month"
          value="18"
          icon={CheckCircle2}
          trend={{ value: 8, isPositive: true }}
        />
      </div>

      {/* Task List */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div>
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <ClipboardList className="h-5 w-5 text-primary" />
            My Tasks
          </h2>
          <div className="space-y-4">
            {displayTasks.length === 0 ? (
              <EmptyTaskState />
            ) : (
              displayTasks.map((task) => (
                <TaskCard 
                  key={task.id} 
                  task={task} 
                  onResolve={handleResolve}
                  variant="compact"
                  showTimestamp={false}
                />
              ))
            )}
          </div>
        </div>

        {/* Map View */}
        <div>
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <MapPin className="h-5 w-5 text-primary" />
            Task Locations
          </h2>
          <Card className="h-[400px] overflow-hidden">
            <div className="h-full bg-muted flex items-center justify-center relative">
              <div className="text-center">
                <MapPin className="h-16 w-16 text-muted-foreground/30 mx-auto mb-3" />
                <p className="text-muted-foreground">Map View</p>
                <p className="text-sm text-muted-foreground/70">
                  Task locations will appear here
                </p>
              </div>
              
              {/* Mock pins */}
              <div className="absolute top-20 left-20 h-8 w-8 bg-warning rounded-full flex items-center justify-center shadow-lg animate-pulse-soft">
                <MapPin className="h-4 w-4 text-warning-foreground" />
              </div>
              <div className="absolute top-32 right-24 h-8 w-8 bg-info rounded-full flex items-center justify-center shadow-lg">
                <MapPin className="h-4 w-4 text-info-foreground" />
              </div>
              <div className="absolute bottom-24 left-32 h-8 w-8 bg-success rounded-full flex items-center justify-center shadow-lg">
                <MapPin className="h-4 w-4 text-success-foreground" />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
