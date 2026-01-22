// import { useState } from 'react';
// import { useAuth } from '@/contexts/AuthContext';
// import { getStaffByDepartment } from '@/data/mockData';
// import { CATEGORY_LABELS, type StaffMember } from '@/types';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Badge } from '@/components/ui/badge';
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from '@/components/ui/table';
// import { StatsCard } from '@/components/shared/StatsCard';
// import {
//   Users,
//   Search,
//   Phone,
//   Mail,
//   CheckCircle2,
//   Clock,
//   MoreVertical,
// } from 'lucide-react';
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from '@/components/ui/dropdown-menu';
// import { AddStaffDialog } from '@/components/department-admin/AddStaffDialog';
// // import { StaffProfileDialog } from '@/components/department-admin/StaffProfileDialog';
// // import { StaffHistoryDialog } from '@/components/department-admin/StaffHistoryDialog';
// // import { RemoveStaffDialog } from '@/components/department-admin/RemoveStaffDialog';
// // import { AssignTaskDialog } from '@/components/department-admin/AssignTaskDialog';
// import { useToast } from '@/hooks/use-toast';

// export default function StaffManagement() {
//   const { user } = useAuth();
//   const { toast } = useToast();
//   const department = user.department || 'water';
//   const [searchQuery, setSearchQuery] = useState('');
// //   const [staffList, setStaffList] = useState<StaffMember[]>(() => 
// //     getStaffByDepartment(department)
// //   );

// //   // Dialog states
// //   const [selectedStaff, setSelectedStaff] = useState<StaffMember | null>(null);
// //   const [profileOpen, setProfileOpen] = useState(false);
// //   const [historyOpen, setHistoryOpen] = useState(false);
// //   const [removeOpen, setRemoveOpen] = useState(false);
// //   const [assignOpen, setAssignOpen] = useState(false);

// //   const filteredStaff = staffList.filter((staff) =>
// //     staff.name.toLowerCase().includes(searchQuery.toLowerCase())
// //   );

// //   const activeStaff = staffList.filter((s) => s.activeTasks > 0).length;
// //   const availableStaff = staffList.filter((s) => s.activeTasks === 0).length;
// //   const totalTasks = staffList.reduce((acc, s) => acc + s.activeTasks, 0);

//   const handleAddStaff = (newStaff: { name: string; email: string; phone: string; role: string }) => {
//     const staff: StaffMember = {
//       id: `s${Date.now()}`,
//       name: newStaff.name,
//       department: department,
//       activeTasks: 0,
//     };
//     setStaffList((prev) => [...prev, staff]);
//   };

// //   const handleViewProfile = (staff: StaffMember) => {
// //     setSelectedStaff(staff);
// //     setProfileOpen(true);
// //   };

// //   const handleAssignTask = (staff: StaffMember) => {
// //     setSelectedStaff(staff);
// //     setAssignOpen(true);
// //   };

// //   const handleViewHistory = (staff: StaffMember) => {
// //     setSelectedStaff(staff);
// //     setHistoryOpen(true);
// //   };

// //   const handleRemoveStaff = (staff: StaffMember) => {
// //     setSelectedStaff(staff);
// //     setRemoveOpen(true);
// //   };

// //   const confirmRemoveStaff = () => {
// //     if (selectedStaff) {
// //       setStaffList((prev) => prev.filter((s) => s.id !== selectedStaff.id));
// //       toast({
// //         title: 'Staff Removed',
// //         description: `${selectedStaff.name} has been removed from the department`,
// //       });
// //       setRemoveOpen(false);
// //       setSelectedStaff(null);
// //     }
// //   };

//   return (
 
//       <div className="space-y-6">
//         {/* Header */}
//         <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
//           <div className="flex items-center gap-3">
//             <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
//               <Users className="h-5 w-5 text-primary" />
//             </div>
//             <div>
//               <h1 className="text-2xl font-bold text-foreground">Staff Management</h1>
//               <p className="text-muted-foreground">
//                 {CATEGORY_LABELS[department]} Department - Manage your team
//               </p>
//             </div>
//           </div>
//           <AddStaffDialog department={department} onAddStaff={handleAddStaff} />
//         </div>

//         {/* Stats */}
//         {/* <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
//           <StatsCard
//             title="Total Staff"
//             value={staffList.length}
//             icon={Users}
//             variant="primary"
//           />
//           <StatsCard
//             title="Active"
//             value={activeStaff}
//             icon={Clock}
//             variant="warning"
//           />
//           <StatsCard
//             title="Available"
//             value={availableStaff}
//             icon={CheckCircle2}
//             variant="success"
//           />
//           <StatsCard
//             title="Total Tasks"
//             value={totalTasks}
//             icon={Clock}
//           />
//         </div> */}

//         {/* Search */}
//         <Card>
//           <CardContent className="p-4">
//             <div className="relative">
//               <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//               <Input
//                 placeholder="Search staff..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 className="pl-9"
//               />
//             </div>
//           </CardContent>
//         </Card>

//         {/* Staff Table */}
//         <Card>
//           <CardHeader>
//             <CardTitle>Team Members</CardTitle>
//           </CardHeader>
//           <CardContent className="p-0">
//             <Table>
//               <TableHeader>
//                 <TableRow>
//                   <TableHead>Staff Member</TableHead>
//                   <TableHead>Contact</TableHead>
//                   <TableHead>Status</TableHead>
//                   <TableHead>Active Tasks</TableHead>
//                   <TableHead>Completed</TableHead>
//                   <TableHead className="w-[50px]"></TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {filteredStaff.length === 0 ? (
//                   <TableRow>
//                     <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
//                       No staff members found
//                     </TableCell>
//                   </TableRow>
//                 ) : (
//                   filteredStaff.map((staff) => (
//                     <TableRow key={staff.id}>
//                       <TableCell>
//                         <div className="flex items-center gap-3">
//                           <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
//                             {staff.name.split(' ').map((n) => n[0]).join('')}
//                           </div>
//                           <div>
//                             <p className="font-medium">{staff.name}</p>
//                             <p className="text-xs text-muted-foreground">Field Worker</p>
//                           </div>
//                         </div>
//                       </TableCell>
//                       <TableCell>
//                         <div className="space-y-1">
//                           <p className="text-sm flex items-center gap-1">
//                             <Phone className="h-3 w-3 text-muted-foreground" />
//                             +91 98765 43210
//                           </p>
//                           <p className="text-sm flex items-center gap-1">
//                             <Mail className="h-3 w-3 text-muted-foreground" />
//                             {staff.name.toLowerCase().replace(' ', '.')}@city.gov
//                           </p>
//                         </div>
//                       </TableCell>
//                       <TableCell>
//                         <Badge
//                           variant={staff.activeTasks === 0 ? 'default' : 'secondary'}
//                           className={staff.activeTasks === 0 ? 'bg-success/10 text-success border-success/20' : ''}
//                         >
//                           {staff.activeTasks === 0 ? 'Available' : 'Busy'}
//                         </Badge>
//                       </TableCell>
//                       <TableCell>
//                         <span className="font-medium">{staff.activeTasks}</span>
//                       </TableCell>
//                       <TableCell>
//                         <span className="text-muted-foreground">{Math.floor(Math.random() * 20) + 5}</span>
//                       </TableCell>
//                       <TableCell>
//                         <DropdownMenu>
//                           <DropdownMenuTrigger asChild>
//                             <Button variant="ghost" size="icon" className="h-8 w-8">
//                               <MoreVertical className="h-4 w-4" />
//                             </Button>
//                           </DropdownMenuTrigger>
//                           <DropdownMenuContent align="end">
//                             <DropdownMenuItem onClick={() => handleViewProfile(staff)}>
//                               View Profile
//                             </DropdownMenuItem>
//                             <DropdownMenuItem onClick={() => handleAssignTask(staff)}>
//                               Assign Task
//                             </DropdownMenuItem>
//                             <DropdownMenuItem onClick={() => handleViewHistory(staff)}>
//                               View History
//                             </DropdownMenuItem>
//                             <DropdownMenuItem 
//                               className="text-destructive"
//                               onClick={() => handleRemoveStaff(staff)}
//                             >
//                               Remove
//                             </DropdownMenuItem>
//                           </DropdownMenuContent>
//                         </DropdownMenu>
//                       </TableCell>
//                     </TableRow>
//                   ))
//                 )}
//               </TableBody>
//             </Table>
//           </CardContent>
//         </Card>

//         {/* Dialogs
//         <StaffProfileDialog
//           staff={selectedStaff}
//           open={profileOpen}
//           onOpenChange={setProfileOpen}
//         />
//         <AssignTaskDialog
//           staff={selectedStaff}
//           open={assignOpen}
//           onOpenChange={setAssignOpen}
//         />
//         <StaffHistoryDialog
//           staff={selectedStaff}
//           open={historyOpen}
//           onOpenChange={setHistoryOpen}
//         />
//         <RemoveStaffDialog
//           staff={selectedStaff}
//           open={removeOpen}
//           onOpenChange={setRemoveOpen}
//           onConfirm={confirmRemoveStaff}
//         /> */}
//       </div>
    
//   );
// }
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { getStaffByDepartment } from '@/data/mockData';
import { CATEGORY_LABELS, type StaffMember } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { StatsCard } from '@/components/shared/StatsCard';
import {
  Users,
  Search,
  Phone,
  Mail,
  CheckCircle2,
  Clock,
} from 'lucide-react';
import { AddStaffDialog } from '@/components/department-admin/AddStaffDialog';

export default function StaffManagement() {
  const { user } = useAuth();
  const department = user.department || 'water';
  const [searchQuery, setSearchQuery] = useState('');
  const [staffList, setStaffList] = useState<StaffMember[]>(() => 
    getStaffByDepartment(department)
  );

  const filteredStaff = staffList.filter((staff) =>
    staff.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const activeStaff = staffList.filter((s) => s.activeTasks > 0).length;
  const availableStaff = staffList.filter((s) => s.activeTasks === 0).length;
  const totalTasks = staffList.reduce((acc, s) => acc + s.activeTasks, 0);

  const handleAddStaff = (newStaff: { name: string; email: string; phone: string; role: string }) => {
    const staff: StaffMember = {
      id: `s${Date.now()}`,
      name: newStaff.name,
      department: department,
      activeTasks: 0,
    };
    setStaffList((prev) => [...prev, staff]);
  };

  return (
 
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Users className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Staff Management</h1>
              <p className="text-muted-foreground">
                {CATEGORY_LABELS[department]} Department - Manage your team
              </p>
            </div>
          </div>
          <AddStaffDialog department={department} onAddStaff={handleAddStaff} />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard
            title="Total Staff"
            value={staffList.length}
            icon={Users}
            variant="primary"
          />
          <StatsCard
            title="Active"
            value={activeStaff}
            icon={Clock}
            variant="warning"
          />
          <StatsCard
            title="Available"
            value={availableStaff}
            icon={CheckCircle2}
            variant="success"
          />
          <StatsCard
            title="Total Tasks"
            value={totalTasks}
            icon={Clock}
          />
        </div>

        {/* Search */}
        <Card>
          <CardContent className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search staff..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
          </CardContent>
        </Card>

        {/* Staff Table */}
        <Card>
          <CardHeader>
            <CardTitle>Team Members</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Staff Member</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Active Tasks</TableHead>
                  <TableHead>Completed</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStaff.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                      No staff members found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredStaff.map((staff) => (
                    <TableRow key={staff.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                            {staff.name.split(' ').map((n) => n[0]).join('')}
                          </div>
                          <div>
                            <p className="font-medium">{staff.name}</p>
                            <p className="text-xs text-muted-foreground">Field Worker</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <p className="text-sm flex items-center gap-1">
                            <Phone className="h-3 w-3 text-muted-foreground" />
                            +91 98765 43210
                          </p>
                          <p className="text-sm flex items-center gap-1">
                            <Mail className="h-3 w-3 text-muted-foreground" />
                            {staff.name.toLowerCase().replace(' ', '.')}@city.gov
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={staff.activeTasks === 0 ? 'default' : 'secondary'}
                          className={staff.activeTasks === 0 ? 'bg-success/10 text-success border-success/20' : ''}
                        >
                          {staff.activeTasks === 0 ? 'Available' : 'Busy'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <span className="font-medium">{staff.activeTasks}</span>
                      </TableCell>
                      <TableCell>
                        <span className="text-muted-foreground">{Math.floor(Math.random() * 20) + 5}</span>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

  );
}
