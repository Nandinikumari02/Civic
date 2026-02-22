// import { useState } from 'react';
// import { CATEGORY_LABELS, IssueCategory, UserRole } from '@/types';
// import { AppLayout } from '@/components/layout/AppLayout';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Badge } from '@/components/ui/badge';
// import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from '@/components/ui/table';
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
//   DialogFooter,
// } from '@/components/ui/dialog';
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from '@/components/ui/select';
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from '@/components/ui/dropdown-menu';
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
// import {
//   Users,
//   Search,
//   Plus,
//   MoreHorizontal,
//   Edit,
//   Trash2,
//   UserCheck,
//   UserX,
//   Shield,
//   Briefcase,
//   Mail,
//   Phone,
// } from 'lucide-react';
// import { useToast } from '@/hooks/use-toast';
// import { cn } from '@/lib/utils';

// interface User {
//   id: string;
//   name: string;
//   email: string;
//   phone: string;
//   role: UserRole;
//   department?: string;
//   status: 'active' | 'inactive';
//   avatar?: string;
//   joinedAt: string;
//   tasksCompleted?: number;
// }

// const mockUsers: User[] = [
//   { id: '1', name: 'Priya Patel', email: 'priya@gov.in', phone: '+91 98765 43210', role: 'department_admin', department: 'Water Supply', status: 'active', joinedAt: '2024-01-15', tasksCompleted: 45 },
//   { id: '2', name: 'Amit Kumar', email: 'amit@gov.in', phone: '+91 98765 43211', role: 'staff', department: 'Water Supply', status: 'active', joinedAt: '2024-02-20', tasksCompleted: 78 },
//   { id: '3', name: 'Ravi Singh', email: 'ravi@gov.in', phone: '+91 98765 43212', role: 'staff', department: 'Roads', status: 'active', joinedAt: '2024-01-10', tasksCompleted: 92 },
//   { id: '4', name: 'Sunita Sharma', email: 'sunita@gov.in', phone: '+91 98765 43213', role: 'department_admin', department: 'Electricity', status: 'active', joinedAt: '2023-11-05', tasksCompleted: 56 },
//   { id: '5', name: 'Vijay Reddy', email: 'vijay@gov.in', phone: '+91 98765 43214', role: 'staff', department: 'Sanitation', status: 'inactive', joinedAt: '2024-03-01', tasksCompleted: 23 },
//   { id: '6', name: 'Meera Joshi', email: 'meera@gov.in', phone: '+91 98765 43215', role: 'super_admin', status: 'active', joinedAt: '2023-06-15', tasksCompleted: 120 },
//   { id: '7', name: 'Rahul Verma', email: 'rahul@example.com', phone: '+91 98765 43216', role: 'citizen', status: 'active', joinedAt: '2024-04-10' },
//   { id: '8', name: 'Anita Desai', email: 'anita@example.com', phone: '+91 98765 43217', role: 'citizen', status: 'active', joinedAt: '2024-05-20' },
// ];

// export default function UserManagement() {
//   const { toast } = useToast();
//   const [searchQuery, setSearchQuery] = useState('');
//   const [roleFilter, setRoleFilter] = useState<string>('all');
//   const [statusFilter, setStatusFilter] = useState<string>('all');
//   const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

//   const filteredUsers = mockUsers.filter((user) => {
//     const matchesSearch = 
//       user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       user.email.toLowerCase().includes(searchQuery.toLowerCase());
//     const matchesRole = roleFilter === 'all' || user.role === roleFilter;
//     const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
//     return matchesSearch && matchesRole && matchesStatus;
//   });

//   const getRoleBadge = (role: UserRole) => {
//     const styles = {
//       super_admin: 'bg-purple-500/10 text-purple-600 border-purple-500/30',
//       department_admin: 'bg-blue-500/10 text-blue-600 border-blue-500/30',
//       staff: 'bg-green-500/10 text-green-600 border-green-500/30',
//       citizen: 'bg-gray-500/10 text-gray-600 border-gray-500/30',
//     };
//     const labels = {
//       super_admin: 'Super Admin',
//       department_admin: 'Dept Admin',
//       staff: 'Staff',
//       citizen: 'Citizen',
//     };
//     return (
//       <Badge variant="outline" className={cn('font-medium', styles[role])}>
//         {labels[role]}
//       </Badge>
//     );
//   };

//   const handleAddUser = () => {
//     toast({
//       title: 'User Added',
//       description: 'New user has been added successfully.',
//     });
//     setIsAddDialogOpen(false);
//   };

//   const handleDeleteUser = (userId: string) => {
//     toast({
//       title: 'User Deleted',
//       description: 'User has been removed from the system.',
//       variant: 'destructive',
//     });
//   };

//   const stats = {
//     total: mockUsers.length,
//     admins: mockUsers.filter(u => u.role === 'super_admin' || u.role === 'department_admin').length,
//     staff: mockUsers.filter(u => u.role === 'staff').length,
//     citizens: mockUsers.filter(u => u.role === 'citizen').length,
//     active: mockUsers.filter(u => u.status === 'active').length,
//   };

//   return (
//     <AppLayout>
//       <div className="space-y-6">
//         {/* Header */}
//         <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
//           <div>
//             <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
//               <Users className="h-6 w-6 text-primary" />
//               User Management
//             </h1>
//             <p className="text-muted-foreground mt-1">
//               Manage all users, roles, and permissions
//             </p>
//           </div>
//           <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
//             <DialogTrigger asChild>
//               <Button className="gap-2">
//                 <Plus className="h-4 w-4" />
//                 Add User
//               </Button>
//             </DialogTrigger>
//             <DialogContent className="sm:max-w-[500px]">
//               <DialogHeader>
//                 <DialogTitle>Add New User</DialogTitle>
//               </DialogHeader>
//               <div className="grid gap-4 py-4">
//                 <div className="grid gap-2">
//                   <Label htmlFor="name">Full Name</Label>
//                   <Input id="name" placeholder="Enter full name" />
//                 </div>
//                 <div className="grid gap-2">
//                   <Label htmlFor="email">Email</Label>
//                   <Input id="email" type="email" placeholder="Enter email address" />
//                 </div>
//                 <div className="grid gap-2">
//                   <Label htmlFor="phone">Phone</Label>
//                   <Input id="phone" placeholder="+91 XXXXX XXXXX" />
//                 </div>
//                 <div className="grid grid-cols-2 gap-4">
//                   <div className="grid gap-2">
//                     <Label>Role</Label>
//                     <Select>
//                       <SelectTrigger>
//                         <SelectValue placeholder="Select role" />
//                       </SelectTrigger>
//                       <SelectContent>
//                         <SelectItem value="department_admin">Dept Admin</SelectItem>
//                         <SelectItem value="staff">Staff</SelectItem>
//                         <SelectItem value="citizen">Citizen</SelectItem>
//                       </SelectContent>
//                     </Select>
//                   </div>
//                   <div className="grid gap-2">
//                     <Label>Department</Label>
//                     <Select>
//                       <SelectTrigger>
//                         <SelectValue placeholder="Select dept" />
//                       </SelectTrigger>
//                       <SelectContent>
//                         {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
//                           <SelectItem key={key} value={key}>{label}</SelectItem>
//                         ))}
//                       </SelectContent>
//                     </Select>
//                   </div>
//                 </div>
//               </div>
//               <DialogFooter>
//                 <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
//                   Cancel
//                 </Button>
//                 <Button onClick={handleAddUser}>Add User</Button>
//               </DialogFooter>
//             </DialogContent>
//           </Dialog>
//         </div>

//         {/* Stats */}
//         <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
//           <Card>
//             <CardContent className="p-4 text-center">
//               <p className="text-2xl font-bold">{stats.total}</p>
//               <p className="text-sm text-muted-foreground">Total Users</p>
//             </CardContent>
//           </Card>
//           <Card>
//             <CardContent className="p-4 text-center">
//               <p className="text-2xl font-bold text-purple-600">{stats.admins}</p>
//               <p className="text-sm text-muted-foreground">Admins</p>
//             </CardContent>
//           </Card>
//           <Card>
//             <CardContent className="p-4 text-center">
//               <p className="text-2xl font-bold text-green-600">{stats.staff}</p>
//               <p className="text-sm text-muted-foreground">Staff</p>
//             </CardContent>
//           </Card>
//           <Card>
//             <CardContent className="p-4 text-center">
//               <p className="text-2xl font-bold text-blue-600">{stats.citizens}</p>
//               <p className="text-sm text-muted-foreground">Citizens</p>
//             </CardContent>
//           </Card>
//           <Card>
//             <CardContent className="p-4 text-center">
//               <p className="text-2xl font-bold text-success">{stats.active}</p>
//               <p className="text-sm text-muted-foreground">Active</p>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Filters */}
//         <Card>
//           <CardContent className="p-4">
//             <div className="flex flex-col lg:flex-row gap-4">
//               <div className="relative flex-1">
//                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//                 <Input
//                   placeholder="Search by name or email..."
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   className="pl-9"
//                 />
//               </div>
//               <div className="flex gap-2">
//                 <Select value={roleFilter} onValueChange={setRoleFilter}>
//                   <SelectTrigger className="w-[140px]">
//                     <SelectValue placeholder="Role" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="all">All Roles</SelectItem>
//                     <SelectItem value="super_admin">Super Admin</SelectItem>
//                     <SelectItem value="department_admin">Dept Admin</SelectItem>
//                     <SelectItem value="staff">Staff</SelectItem>
//                     <SelectItem value="citizen">Citizen</SelectItem>
//                   </SelectContent>
//                 </Select>
//                 <Select value={statusFilter} onValueChange={setStatusFilter}>
//                   <SelectTrigger className="w-[130px]">
//                     <SelectValue placeholder="Status" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="all">All Status</SelectItem>
//                     <SelectItem value="active">Active</SelectItem>
//                     <SelectItem value="inactive">Inactive</SelectItem>
//                   </SelectContent>
//                 </Select>
//               </div>
//             </div>
//           </CardContent>
//         </Card>

//         {/* Users Table */}
//         <Card>
//           <CardContent className="p-0">
//             <Table>
//               <TableHeader>
//                 <TableRow>
//                   <TableHead>User</TableHead>
//                   <TableHead>Contact</TableHead>
//                   <TableHead>Role</TableHead>
//                   <TableHead>Department</TableHead>
//                   <TableHead>Status</TableHead>
//                   <TableHead>Tasks</TableHead>
//                   <TableHead className="text-right">Actions</TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {filteredUsers.map((user) => (
//                   <TableRow key={user.id}>
//                     <TableCell>
//                       <div className="flex items-center gap-3">
//                         <Avatar className="h-9 w-9">
//                           <AvatarImage src={user.avatar} />
//                           <AvatarFallback className="bg-primary/10 text-primary text-sm">
//                             {user.name.split(' ').map(n => n[0]).join('')}
//                           </AvatarFallback>
//                         </Avatar>
//                         <div>
//                           <p className="font-medium">{user.name}</p>
//                           <p className="text-xs text-muted-foreground">
//                             Joined {new Date(user.joinedAt).toLocaleDateString()}
//                           </p>
//                         </div>
//                       </div>
//                     </TableCell>
//                     <TableCell>
//                       <div className="space-y-1">
//                         <p className="text-sm flex items-center gap-1">
//                           <Mail className="h-3 w-3 text-muted-foreground" />
//                           {user.email}
//                         </p>
//                         <p className="text-xs text-muted-foreground flex items-center gap-1">
//                           <Phone className="h-3 w-3" />
//                           {user.phone}
//                         </p>
//                       </div>
//                     </TableCell>
//                     <TableCell>{getRoleBadge(user.role)}</TableCell>
//                     <TableCell>
//                       {user.department ? (
//                         <Badge variant="secondary">{user.department}</Badge>
//                       ) : (
//                         <span className="text-muted-foreground text-sm">-</span>
//                       )}
//                     </TableCell>
//                     <TableCell>
//                       <Badge
//                         variant="outline"
//                         className={cn(
//                           user.status === 'active'
//                             ? 'bg-success/10 text-success border-success/30'
//                             : 'bg-muted text-muted-foreground'
//                         )}
//                       >
//                         {user.status === 'active' ? (
//                           <><UserCheck className="h-3 w-3 mr-1" /> Active</>
//                         ) : (
//                           <><UserX className="h-3 w-3 mr-1" /> Inactive</>
//                         )}
//                       </Badge>
//                     </TableCell>
//                     <TableCell>
//                       {user.tasksCompleted !== undefined ? (
//                         <span className="font-medium">{user.tasksCompleted}</span>
//                       ) : (
//                         <span className="text-muted-foreground">-</span>
//                       )}
//                     </TableCell>
//                     <TableCell className="text-right">
//                       <DropdownMenu>
//                         <DropdownMenuTrigger asChild>
//                           <Button variant="ghost" size="icon" className="h-8 w-8">
//                             <MoreHorizontal className="h-4 w-4" />
//                           </Button>
//                         </DropdownMenuTrigger>
//                         <DropdownMenuContent align="end">
//                           <DropdownMenuItem className="gap-2">
//                             <Edit className="h-4 w-4" />
//                             Edit User
//                           </DropdownMenuItem>
//                           <DropdownMenuItem className="gap-2">
//                             <Shield className="h-4 w-4" />
//                             Change Role
//                           </DropdownMenuItem>
//                           <DropdownMenuSeparator />
//                           <DropdownMenuItem 
//                             className="gap-2 text-destructive"
//                             onClick={() => handleDeleteUser(user.id)}
//                           >
//                             <Trash2 className="h-4 w-4" />
//                             Delete User
//                           </DropdownMenuItem>
//                         </DropdownMenuContent>
//                       </DropdownMenu>
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </CardContent>
//         </Card>
//       </div>
//     </AppLayout>
//   );
// }
