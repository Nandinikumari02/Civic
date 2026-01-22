import { useAuth } from '@/contexts/AuthContext';
import { getIssuesByDepartment, getStaffByDepartment } from '@/data/mockData';
import { CATEGORY_LABELS } from '@/types';
import { StatsCard } from '@/components/shared/StatsCard';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  FileWarning,
  CheckCircle2,
  Clock,
  Users,
  MapPin,
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { useToast } from '@/hooks/use-toast';

import { AssignStaffDialog } from '@/components/department-admin/AssignStaffDialog';
import { StaffListCard } from '@/components/department-admin/StaffListCard';
import { IssueDetailsDialog } from '@/components/department-admin/IssueDetailsDialog';


export function DepartmentAdminDashboard() {
  const { user } = useAuth();
  const { toast } = useToast();
  const department = user.department || 'water' ;
  
  const departmentIssues = getIssuesByDepartment(department);
  const departmentStaff = getStaffByDepartment(department);
  
  const pendingCount = departmentIssues.filter((i) => i.status === 'pending').length;
  const inProgressCount = departmentIssues.filter((i) => i.status === 'in_progress').length;
  const resolvedCount = departmentIssues.filter((i) => i.status === 'resolved').length;

  const handleAssign = (_issueId: string, staffName: string) => {
    toast({
      title: 'Task Assigned',
      description: `Issue assigned to ${staffName} successfully.`,
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">
          {CATEGORY_LABELS[department]} Department
        </h1>
        <p className="text-muted-foreground mt-1">
          Manage and assign issues for your department
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total Reports"
          value={departmentIssues.length}
          icon={FileWarning}
          variant="primary"
        />
        <StatsCard
          title="Pending"
          value={pendingCount}
          icon={Clock}
          variant="warning"
        />
        <StatsCard
          title="In Progress"
          value={inProgressCount}
          icon={Users}
        />
        <StatsCard
          title="Resolved"
          value={resolvedCount}
          icon={CheckCircle2}
          variant="success"
          trend={{ value: 15, isPositive: true }}
        />
      </div>

      {/* Main Content */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Issues Table */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Department Issues</CardTitle>
              <Select defaultValue="all">
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Filter" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="in_progress">In Progress</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                </SelectContent>
              </Select>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Issue</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Reported</TableHead>
                    <TableHead>Assigned To</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {departmentIssues.map((issue) => (
                    <TableRow key={issue.id}>
                      <TableCell>
                        <div className="max-w-[200px]">
                          <p className="font-medium truncate">{issue.title}</p>
                          <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                            <MapPin className="h-3 w-3" />
                            {issue.location.address}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <StatusBadge status={issue.status} />
                      </TableCell>
                      <TableCell>
                        <span className="text-sm text-muted-foreground">
                          {formatDistanceToNow(issue.reportedAt, { addSuffix: true })}
                        </span>
                      </TableCell>
                      <TableCell>
                        {issue.assignedTo ? (
                          <span className="text-sm">{issue.assignedTo}</span>
                        ) : (
                          <span className="text-sm text-muted-foreground">Unassigned</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <IssueDetailsDialog issue={issue} />
                          
                          {issue.status === 'pending' && (
                            <AssignStaffDialog
                              issue={issue}
                              staff={departmentStaff}
                              onAssign={handleAssign}
                            />
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        {/* Staff List */}
        <div>
          <StaffListCard staff={departmentStaff} />
        </div>
      </div>
    </div>
  );
}
