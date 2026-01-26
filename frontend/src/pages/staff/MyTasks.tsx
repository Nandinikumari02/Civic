import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { mockIssues } from '@/data/mockData';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TaskCard } from '@/components/staff/TaskCard';
import { EmptyTaskState } from '@/components/staff/EmptyTaskState';
import {
  ClipboardList,
  Clock,
  AlertTriangle,
  Filter,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function MyTasks() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const assignedTasks = mockIssues.filter(
    (i) => i.assignedTo === 'Amit Kumar' && i.status !== 'resolved'
  );

  // Add sample tasks if none assigned
  const displayTasks = assignedTasks.length > 0 
    ? assignedTasks 
    : mockIssues.slice(0, 4).map(task => ({
        ...task, 
        status: 'in_progress' as const, 
        assignedTo: user?.name || 'Staff'
      }));

  const pendingTasks = displayTasks.filter(t => t.status === 'pending');
  const inProgressTasks = displayTasks.filter(t => t.status === 'in_progress');

  const filteredTasks = statusFilter === 'all' 
    ? displayTasks 
    : displayTasks.filter(t => t.status === statusFilter);

  const handleResolve = () => {
    toast({
      title: 'Task Completed!',
      description: 'Great work! The issue has been marked as resolved.',
    });
  };

  return (
 
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
              <ClipboardList className="h-6 w-6 text-primary" />
              My Tasks
            </h1>
            <p className="text-muted-foreground mt-1">
              {displayTasks.length} tasks assigned to you
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="in_progress">In Progress</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="all" className="space-y-4">
          <TabsList>
            <TabsTrigger value="all" className="gap-2">
              All <span className="bg-muted px-2 py-0.5 rounded-full text-xs">{filteredTasks.length}</span>
            </TabsTrigger>
            <TabsTrigger value="pending" className="gap-2">
              <Clock className="h-4 w-4" />
              Pending <span className="bg-warning/20 text-warning px-2 py-0.5 rounded-full text-xs">{pendingTasks.length}</span>
            </TabsTrigger>
            <TabsTrigger value="in_progress" className="gap-2">
              <AlertTriangle className="h-4 w-4" />
              In Progress <span className="bg-info/20 text-info px-2 py-0.5 rounded-full text-xs">{inProgressTasks.length}</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {filteredTasks.length === 0 ? (
              <EmptyTaskState />
            ) : (
              filteredTasks.map((task) => (
                <TaskCard key={task.id} task={task} onResolve={handleResolve} />
              ))
            )}
          </TabsContent>

          <TabsContent value="pending" className="space-y-4">
            {pendingTasks.length === 0 ? (
              <EmptyTaskState message="No pending tasks" />
            ) : (
              pendingTasks.map((task) => (
                <TaskCard key={task.id} task={task} onResolve={handleResolve} />
              ))
            )}
          </TabsContent>

          <TabsContent value="in_progress" className="space-y-4">
            {inProgressTasks.length === 0 ? (
              <EmptyTaskState message="No tasks in progress" />
            ) : (
              inProgressTasks.map((task) => (
                <TaskCard key={task.id} task={task} onResolve={handleResolve} />
              ))
            )}
          </TabsContent>
        </Tabs>
      </div>
 
  );
}
