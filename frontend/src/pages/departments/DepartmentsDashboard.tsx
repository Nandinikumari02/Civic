// import { useAuth } from '@/contexts/AuthContext';
// import { useEffect, useState } from 'react';
// import { CATEGORY_LABELS } from '@/types';
// import { StatsCard } from '@/components/shared/StatsCard';
// import { StatusBadge } from '@/components/shared/StatusBadge';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from '@/components/ui/table';
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from '@/components/ui/select';
// import {
//   FileWarning,
//   CheckCircle2,
//   Clock,
//   Users,
//   MapPin,
// } from 'lucide-react';
// import { formatDistanceToNow } from 'date-fns';
// import { useToast } from '@/hooks/use-toast';

// import { AssignStaffDialog } from '@/components/department-admin/AssignStaffDialog';
// import { StaffListCard } from '@/components/department-admin/StaffListCard';
// import { IssueDetailsDialog } from '@/components/department-admin/IssueDetailsDialog';

// /* ✅ IMPORT API FUNCTIONS */
// import { fetchDepartmentIssues, fetchDepartmentStaff, assignIssue } from '@/services/departmentApi';
// export function DepartmentAdminDashboard() {
//   const { user } = useAuth();
//   const { toast } = useToast();
//   const department = user?.department ?? 'water';

//   const [departmentIssues, setDepartmentIssues] = useState<any[]>([]);
//   const [departmentStaff, setDepartmentStaff] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);

//   /* ================= FETCH DATA ================= */
//   const fetchData = async () => {
//     try {
//       setLoading(true);

//       const issues = await fetchDepartmentIssues();
//       const staff = await fetchDepartmentStaff();

//       setDepartmentIssues(issues);
//       setDepartmentStaff(staff);

//     } catch (err) {
//       toast({
//         title: "Error",
//         description: "Failed to load department data",
//         variant: "destructive"
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   /* ================= STATS ================= */

//   const pendingCount = departmentIssues.filter(i => i.status === "OPEN").length;
//   const inProgressCount = departmentIssues.filter(i => i.status === "IN_PROGRESS").length;
//   const resolvedCount = departmentIssues.filter(i => i.status === "RESOLVED").length;

//   /* ================= ASSIGN STAFF ================= */

//   const handleAssign = async (issueId: string, staffId: string) => {
//     try {
//       await assignIssue(issueId, staffId);

//       toast({
//         title: "Assigned",
//         description: "Staff assigned successfully"
//       });

//       fetchData(); // refresh table after update

//     } catch {
//       toast({
//         title: "Error",
//         description: "Assignment failed",
//         variant: "destructive"
//       });
//     }
//   };

//   /* ================= LOADING ================= */

//   if (loading) {
//     return <div className="p-6 text-center text-muted-foreground">Loading dashboard...</div>;
//   }

//   /* ================= UI ================= */

//   return (
//     <div className="space-y-6">

//       {/* HEADER */}
//       <div>
//         <h1 className="text-2xl font-bold text-foreground">
//           {CATEGORY_LABELS[department]} Department
//         </h1>
//         <p className="text-muted-foreground mt-1">
//           Manage and assign issues for your department
//         </p>
//       </div>

//       {/* STATS */}
//       <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
//         <StatsCard title="Total Reports" value={departmentIssues.length} icon={FileWarning} />
//         <StatsCard title="Pending" value={pendingCount} icon={Clock} variant="warning" />
//         <StatsCard title="In Progress" value={inProgressCount} icon={Users} />
//         <StatsCard title="Resolved" value={resolvedCount} icon={CheckCircle2} variant="success" />
//       </div>

//       {/* MAIN GRID */}
//       <div className="grid lg:grid-cols-3 gap-6">

//         {/* ISSUES TABLE */}
//         <div className="lg:col-span-2">
//           <Card>
//             <CardHeader className="flex flex-row items-center justify-between">
//               <CardTitle className="text-lg">Department Issues</CardTitle>

//               <Select defaultValue="all">
//                 <SelectTrigger className="w-[140px]">
//                   <SelectValue />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="all">All Status</SelectItem>
//                   <SelectItem value="OPEN">Pending</SelectItem>
//                   <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
//                   <SelectItem value="RESOLVED">Resolved</SelectItem>
//                 </SelectContent>
//               </Select>
//             </CardHeader>

//             <CardContent>
//               <Table>
//                 <TableHeader>
//                   <TableRow>
//                     <TableHead>Issue</TableHead>
//                     <TableHead>Status</TableHead>
//                     <TableHead>Reported</TableHead>
//                     <TableHead>Assigned To</TableHead>
//                     <TableHead>Actions</TableHead>
//                   </TableRow>
//                 </TableHeader>

//                 <TableBody>
//                   {departmentIssues.map(issue => (
//                     <TableRow key={issue.id}>

//                       {/* TITLE */}
//                       <TableCell>
//                         <div className="max-w-[200px]">
//                           <p className="font-medium truncate">{issue.title}</p>
//                           <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
//                             <MapPin className="h-3 w-3" />
//                             {issue.address ?? "No address"}
//                           </p>
//                         </div>
//                       </TableCell>

//                       {/* STATUS */}
//                       <TableCell>
//                         <StatusBadge status={issue.status} />
//                       </TableCell>

//                       {/* TIME */}
//                       <TableCell>
//                         <span className="text-sm text-muted-foreground">
//                           {formatDistanceToNow(new Date(issue.createdAt), { addSuffix: true })}
//                         </span>
//                       </TableCell>

//                       {/* ASSIGNED */}
//                       <TableCell>
//                         {issue.staff?.user?.fullname ?? (
//                           <span className="text-muted-foreground">Unassigned</span>
//                         )}
//                       </TableCell>

//                       {/* ACTIONS */}
//                       <TableCell>
//                         <div className="flex gap-2">
//                           <IssueDetailsDialog issue={issue} />

//                           {issue.status === "OPEN" && (
//                             <AssignStaffDialog
//                               issue={issue}
//                               staff={departmentStaff}
//                               onAssign={handleAssign}
//                             />
//                           )}
//                         </div>
//                       </TableCell>

//                     </TableRow>
//                   ))}
//                 </TableBody>

//               </Table>
//             </CardContent>
//           </Card>
//         </div>

//         {/* STAFF PANEL */}
//         <div>
//           <StaffListCard staff={departmentStaff} />
//         </div>

//       </div>
//     </div>
//   );
// }
