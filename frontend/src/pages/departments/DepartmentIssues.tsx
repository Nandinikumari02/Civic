import { AssignStaffDialog } from "@/components/department-admin/AssignStaffDialog";
import { IssueDetailsDialog } from "@/components/department-admin/IssueDetailsDialog";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import { getIssuesByDepartment, getStaffByDepartment } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";
import { CATEGORY_LABELS, type Issue } from "@/types";
import { formatDistanceToNow } from "date-fns/formatDistanceToNow";
import { Calendar, FileWarning, Filter, MapPin, Search } from "lucide-react";
import { useState } from "react";

export default function DepartmentIssues() {
    const {user} = useAuth();
    const {toast} = useToast();
    const department =user.department || 'water';
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState('all');

    const DepartmentIssues = getIssuesByDepartment(department);
    const departmentStaff = getStaffByDepartment(department);

    const filteredIssues = DepartmentIssues.filter((issue) => {
    const matchesSearch = issue.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      issue.location.address.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || issue.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const pendingIssues = filteredIssues.filter((i) => i.status === 'pending');
  const inProgressIssues = filteredIssues.filter((i) => i.status === 'in_progress');
  const resolvedIssues = filteredIssues.filter((i) => i.status === 'resolved');

  const handleAssign = (issueId: string, staffName: string) => {
    toast({
      title: "Assigning Issue",
      description: `Assigning issue ${issueId} to ${staffName} successfully.`,
    });
  };

  const IssueTable =({issues}: {issues: Issue[] }) => (
     <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Issue</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Priority</TableHead>
          <TableHead>Reported</TableHead>
          <TableHead>Assigned To</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {issues.length == 0 ? (
            <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    No issues found.
                </TableCell>
            </TableRow>
        ) : (
          issues.map((issue) => (
            <TableRow key={issue.id}>
              <TableCell>
                <div className="max-w-[250px]">
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
                <span className="text-xs font-medium px-2 py-1 rounded-full bg-muted text-muted-foreground">
                  Normal
                </span>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Calendar className="h-3 w-3" />
                  {formatDistanceToNow(issue.reportedAt, { addSuffix: true })}
                </div>
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
          ))
        )}
        
      </TableBody>
      </Table>
  )

  return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <FileWarning className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Department Issues</h1>
              <p className="text-muted-foreground">
                {CATEGORY_LABELS[department]} Department - Manage all reported issues
              </p>
            </div>
          </div>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search issues..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-[160px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="in_progress">In Progress</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Issues Tabs */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="all">All ({filteredIssues.length})</TabsTrigger>
            <TabsTrigger value="pending">Pending ({pendingIssues.length})</TabsTrigger>
            <TabsTrigger value="in_progress">In Progress ({inProgressIssues.length})</TabsTrigger>
            <TabsTrigger value="resolved">Resolved ({resolvedIssues.length})</TabsTrigger>
          </TabsList>

          <Card>
            <CardContent className="p-0">
              <TabsContent value="all" className="mt-0">
                <IssueTable issues={filteredIssues} />
              </TabsContent>
              <TabsContent value="pending" className="mt-0">
                <IssueTable issues={pendingIssues} />
              </TabsContent>
              <TabsContent value="in_progress" className="mt-0">
                <IssueTable issues={inProgressIssues} />
              </TabsContent>
              <TabsContent value="resolved" className="mt-0">
                <IssueTable issues={resolvedIssues} />
              </TabsContent>
            </CardContent>
          </Card>
        </Tabs>
      </div>
 
  );
}
