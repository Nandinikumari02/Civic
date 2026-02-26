import { useAuth } from '@/contexts/AuthContext';
import { useEffect, useState, useCallback } from 'react';
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
  Loader2,
  RefreshCw,
  
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';

// Components
import { AssignStaffDialog } from '@/components/department-admin/AssignStaffDialog';
import { StaffListCard } from '@/components/department-admin/StaffListCard';
import { IssueDetailsDialog } from '@/components/department-admin/IssueDetailsDialog';
import { AddCategoryDialog } from '@/components/department-admin/AddCategoryDialog';

// API Services
import { issueService } from '@/services/issueService';
import { departmentService } from '@/services/departmentService';

export function DepartmentAdminDashboard() {
  const { user } = useAuth();
  const { toast } = useToast();

  const [departmentIssues, setDepartmentIssues] = useState<any[]>([]);
  const [departmentStaff, setDepartmentStaff] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [filterStatus, setFilterStatus] = useState("all");

  const rawDeptName = user?.departmentAdmin?.department?.name ?? user?.department?.name;
  const displayTitle = rawDeptName ? `${rawDeptName} Sector` : "Department Control";

  // --- LOGIC FIX START ---
 const fetchData = useCallback(async (showRefreshState = false) => {
    try {
      if (showRefreshState) setIsRefreshing(true);
      else setLoading(true);

      const [issuesRes, staffRes] = await Promise.all([
        issueService.getDeptIssues(),
        departmentService.getMyStaff()
      ]);

      // ✅ FIX: Type assertion (as any) use karke red line hatayi gayi hai
      const issuesData = (issuesRes as any)?.data || issuesRes;
      setDepartmentIssues(Array.isArray(issuesData) ? issuesData : []);
      
      // ✅ FIX: Staff data extraction
      const staffApiData = (staffRes as any)?.data || staffRes;
      const staffArray = staffApiData?.staff || (Array.isArray(staffApiData) ? staffApiData : []);
      setDepartmentStaff(staffArray);

    } catch (error: any) {
      console.error("Dashboard fetch error:", error);
      toast({ 
        title: "Sync Error", 
        description: "Failed to fetch latest department data.",
        variant: "destructive" 
      });
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  }, [toast]);
  useEffect(() => {
    if (user) fetchData();
  }, [user, fetchData]);

  const pendingCount = departmentIssues.filter(i => ["OPEN", "SUBMITTED"].includes(i.status)).length;
  const inProgressCount = departmentIssues.filter(i => i.status === "IN_PROGRESS").length;
  const resolvedCount = departmentIssues.filter(i => i.status === "RESOLVED").length;

  const filteredIssues = filterStatus === "all" 
    ? departmentIssues 
    : departmentIssues.filter(i => i.status === filterStatus);

  if (loading && !isRefreshing) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center gap-4">
        <Loader2 className="h-10 w-10 animate-spin text-primary opacity-50" />
        <div className="text-center">
          <p className="font-semibold text-foreground">Loading Dashboard</p>
          <p className="text-sm text-muted-foreground">Synchronizing {rawDeptName || 'Sector'} data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            {displayTitle}
          </h1>
          <p className="text-muted-foreground">
            Overview of reports and staff assignment for your sector.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
           <AddCategoryDialog onSuccess={() => fetchData(true)} />
          
           <Button 
             variant="outline" 
             size="icon" 
             onClick={() => fetchData(true)} 
             disabled={isRefreshing}
             className={isRefreshing ? "animate-spin" : ""}
           >
              <RefreshCw className="h-4 w-4" />
           </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard title="Total Reports" value={departmentIssues.length} icon={FileWarning} variant="primary" />
        <StatsCard title="Pending Review" value={pendingCount} icon={Clock} variant="warning" />
        <StatsCard title="In Progress" value={inProgressCount} icon={Users} />
        <StatsCard title="Resolved" value={resolvedCount} icon={CheckCircle2} variant="success" />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <Card className="shadow-sm border-muted/60">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <CardTitle className="text-xl font-bold">Recent Issues</CardTitle>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-[160px] bg-muted/50">
                  <SelectValue placeholder="All Issues" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="OPEN">New Reports</SelectItem>
                  <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
                  <SelectItem value="RESOLVED">Resolved</SelectItem>
                </SelectContent>
              </Select>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader className="bg-muted/30">
                    <TableRow>
                      <TableHead className="w-[250px]">Issue </TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Reported</TableHead>
                      <TableHead>Assigned To</TableHead>
                      <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredIssues.length > 0 ? (
                      filteredIssues.map((issue) => (
                        <TableRow key={issue.id} className="group">
                          <TableCell className="py-4">
                            <div className="space-y-1">
                              <p className="font-semibold leading-none group-hover:text-primary transition-colors cursor-default">
                                {issue.title}
                              </p>
                              <div className="flex items-center text-[11px] text-muted-foreground">
                                <MapPin className="mr-1 h-3 w-3 shrink-0" />
                                <span className="truncate max-w-[180px]">{issue.address || issue.location?.address || 'N/A'}</span>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell><StatusBadge status={issue.status} /></TableCell>
                          <TableCell className="text-xs text-muted-foreground whitespace-nowrap">
                            {issue.createdAt ? formatDistanceToNow(new Date(issue.createdAt), { addSuffix: true }) : 'N/A'}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <div className="h-6 w-6 rounded-full bg-secondary flex items-center justify-center text-[10px] font-bold">
                                {issue.staff?.user?.fullname?.charAt(0) || '?'}
                              </div>
                              <span className="text-sm font-medium">
                                 {issue.staff?.user?.fullname || <span className="text-muted-foreground italic font-normal">Unassigned</span>}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex items-center justify-end gap-1">
                              <IssueDetailsDialog issue={issue} />
                              {(issue.status === 'OPEN' || issue.status === 'SUBMITTED') && (
                                <AssignStaffDialog 
                                  issue={issue} 
                                  staff={departmentStaff} 
                                  onSuccess={() => fetchData(true)} 
                                />
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={5} className="h-32 text-center text-muted-foreground">
                          No issues found.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <StaffListCard staff={departmentStaff} />
          
        </div>
      </div>
    </div>
  );
}