// import { useState } from 'react';
// import { CATEGORY_LABELS, IssueCategory } from '@/types';
// import { mockStaff } from '@/data/mockData';
// import { AppLayout } from '@/components/layout/AppLayout';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Badge } from '@/components/ui/badge';
// import { Progress } from '@/components/ui/progress';
// import { Avatar, AvatarFallback } from '@/components/ui/avatar';
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
//   DialogFooter,
// } from '@/components/ui/dialog';
// import {
//   Building2,
//   Plus,
//   Users,
//   FileWarning,
//   CheckCircle2,
//   Clock,
//   TrendingUp,
//   Settings,
//   MoreHorizontal,
//   ChevronRight,
// } from 'lucide-react';
// import { useToast } from '@/hooks/use-toast';
// import { cn } from '@/lib/utils';
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from '@/components/ui/dropdown-menu';

// interface Department {
//   id: string;
//   name: string;
//   category: IssueCategory;
//   description: string;
//   totalIssues: number;
//   resolvedIssues: number;
//   pendingIssues: number;
//   staffCount: number;
//   adminName: string;
//   color: string;
//   icon: string;
// }

// const departments: Department[] = [
//   {
//     id: '1',
//     name: 'Water Supply',
//     category: 'water',
//     description: 'Manages water distribution, pipeline maintenance, and water quality',
//     totalIssues: 45,
//     resolvedIssues: 38,
//     pendingIssues: 7,
//     staffCount: 8,
//     adminName: 'Priya Patel',
//     color: 'bg-blue-500',
//     icon: '💧',
//   },
//   {
//     id: '2',
//     name: 'Roads & Infrastructure',
//     category: 'roads',
//     description: 'Handles road repairs, potholes, and infrastructure maintenance',
//     totalIssues: 62,
//     resolvedIssues: 48,
//     pendingIssues: 14,
//     staffCount: 12,
//     adminName: 'Rajesh Kumar',
//     color: 'bg-amber-500',
//     icon: '🛣️',
//   },
//   {
//     id: '3',
//     name: 'Electricity',
//     category: 'electricity',
//     description: 'Manages power distribution and electrical infrastructure',
//     totalIssues: 34,
//     resolvedIssues: 30,
//     pendingIssues: 4,
//     staffCount: 6,
//     adminName: 'Sunita Sharma',
//     color: 'bg-yellow-500',
//     icon: '⚡',
//   },
//   {
//     id: '4',
//     name: 'Sanitation',
//     category: 'sanitation',
//     description: 'Handles waste management, cleanliness, and hygiene',
//     totalIssues: 28,
//     resolvedIssues: 22,
//     pendingIssues: 6,
//     staffCount: 10,
//     adminName: 'Amit Verma',
//     color: 'bg-green-500',
//     icon: '🧹',
//   },
//   {
//     id: '5',
//     name: 'Drainage',
//     category: 'drainage',
//     description: 'Manages drainage systems and flood prevention',
//     totalIssues: 19,
//     resolvedIssues: 15,
//     pendingIssues: 4,
//     staffCount: 5,
//     adminName: 'Kavita Singh',
//     color: 'bg-cyan-500',
//     icon: '🌊',
//   },
//   {
//     id: '6',
//     name: 'Street Lights',
//     category: 'streetlights',
//     description: 'Maintains street lighting and public illumination',
//     totalIssues: 24,
//     resolvedIssues: 21,
//     pendingIssues: 3,
//     staffCount: 4,
//     adminName: 'Deepak Joshi',
//     color: 'bg-purple-500',
//     icon: '💡',
//   },
// ];

// export default function Departments() {
//   const { toast } = useToast();
//   const [selectedDept, setSelectedDept] = useState<Department | null>(null);

//   const totalStats = {
//     issues: departments.reduce((sum, d) => sum + d.totalIssues, 0),
//     resolved: departments.reduce((sum, d) => sum + d.resolvedIssues, 0),
//     staff: departments.reduce((sum, d) => sum + d.staffCount, 0),
//   };

//   const handleAddDepartment = () => {
//     toast({
//       title: 'Department Added',
//       description: 'New department has been created successfully.',
//     });
//   };

//   return (
//     <AppLayout>
//       <div className="space-y-6">
//         {/* Header */}
//         <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
//           <div>
//             <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
//               <Building2 className="h-6 w-6 text-primary" />
//               Departments
//             </h1>
//             <p className="text-muted-foreground mt-1">
//               Manage city departments and their operations
//             </p>
//           </div>
//           <Dialog>
//             <DialogTrigger asChild>
//               <Button className="gap-2">
//                 <Plus className="h-4 w-4" />
//                 Add Department
//               </Button>
//             </DialogTrigger>
//             <DialogContent>
//               <DialogHeader>
//                 <DialogTitle>Add New Department</DialogTitle>
//               </DialogHeader>
//               <div className="grid gap-4 py-4">
//                 <div className="grid gap-2">
//                   <Label htmlFor="deptName">Department Name</Label>
//                   <Input id="deptName" placeholder="Enter department name" />
//                 </div>
//                 <div className="grid gap-2">
//                   <Label htmlFor="deptDesc">Description</Label>
//                   <Input id="deptDesc" placeholder="Brief description" />
//                 </div>
//                 <div className="grid gap-2">
//                   <Label htmlFor="deptAdmin">Department Admin</Label>
//                   <Input id="deptAdmin" placeholder="Assign admin" />
//                 </div>
//               </div>
//               <DialogFooter>
//                 <Button onClick={handleAddDepartment}>Create Department</Button>
//               </DialogFooter>
//             </DialogContent>
//           </Dialog>
//         </div>

//         {/* Overall Stats */}
//         <div className="grid grid-cols-3 gap-4">
//           <Card>
//             <CardContent className="p-4">
//               <div className="flex items-center gap-3">
//                 <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
//                   <Building2 className="h-5 w-5 text-primary" />
//                 </div>
//                 <div>
//                   <p className="text-2xl font-bold">{departments.length}</p>
//                   <p className="text-sm text-muted-foreground">Active Departments</p>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//           <Card>
//             <CardContent className="p-4">
//               <div className="flex items-center gap-3">
//                 <div className="h-10 w-10 rounded-lg bg-success/10 flex items-center justify-center">
//                   <CheckCircle2 className="h-5 w-5 text-success" />
//                 </div>
//                 <div>
//                   <p className="text-2xl font-bold">{Math.round((totalStats.resolved / totalStats.issues) * 100)}%</p>
//                   <p className="text-sm text-muted-foreground">Avg Resolution Rate</p>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//           <Card>
//             <CardContent className="p-4">
//               <div className="flex items-center gap-3">
//                 <div className="h-10 w-10 rounded-lg bg-info/10 flex items-center justify-center">
//                   <Users className="h-5 w-5 text-info" />
//                 </div>
//                 <div>
//                   <p className="text-2xl font-bold">{totalStats.staff}</p>
//                   <p className="text-sm text-muted-foreground">Total Staff</p>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Department Cards */}
//         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {departments.map((dept) => {
//             const resolutionRate = Math.round((dept.resolvedIssues / dept.totalIssues) * 100);
            
//             return (
//               <Card 
//                 key={dept.id} 
//                 className="overflow-hidden hover:shadow-lg transition-all cursor-pointer group"
//                 onClick={() => setSelectedDept(dept)}
//               >
//                 <div className={cn("h-2", dept.color)} />
//                 <CardHeader className="pb-2">
//                   <div className="flex items-start justify-between">
//                     <div className="flex items-center gap-3">
//                       <span className="text-2xl">{dept.icon}</span>
//                       <div>
//                         <CardTitle className="text-lg">{dept.name}</CardTitle>
//                         <p className="text-xs text-muted-foreground mt-0.5">
//                           Admin: {dept.adminName}
//                         </p>
//                       </div>
//                     </div>
//                     <DropdownMenu>
//                       <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
//                         <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
//                           <MoreHorizontal className="h-4 w-4" />
//                         </Button>
//                       </DropdownMenuTrigger>
//                       <DropdownMenuContent align="end">
//                         <DropdownMenuItem className="gap-2">
//                           <Settings className="h-4 w-4" />
//                           Edit Department
//                         </DropdownMenuItem>
//                         <DropdownMenuItem className="gap-2">
//                           <Users className="h-4 w-4" />
//                           Manage Staff
//                         </DropdownMenuItem>
//                       </DropdownMenuContent>
//                     </DropdownMenu>
//                   </div>
//                 </CardHeader>
//                 <CardContent className="space-y-4">
//                   <p className="text-sm text-muted-foreground line-clamp-2">
//                     {dept.description}
//                   </p>

//                   {/* Stats Row */}
//                   <div className="grid grid-cols-3 gap-2 text-center">
//                     <div className="bg-muted/50 rounded-lg p-2">
//                       <p className="text-lg font-bold">{dept.totalIssues}</p>
//                       <p className="text-xs text-muted-foreground">Issues</p>
//                     </div>
//                     <div className="bg-muted/50 rounded-lg p-2">
//                       <p className="text-lg font-bold text-success">{dept.resolvedIssues}</p>
//                       <p className="text-xs text-muted-foreground">Resolved</p>
//                     </div>
//                     <div className="bg-muted/50 rounded-lg p-2">
//                       <p className="text-lg font-bold">{dept.staffCount}</p>
//                       <p className="text-xs text-muted-foreground">Staff</p>
//                     </div>
//                   </div>

//                   {/* Resolution Progress */}
//                   <div>
//                     <div className="flex items-center justify-between mb-1">
//                       <span className="text-xs text-muted-foreground">Resolution Rate</span>
//                       <span className="text-xs font-medium">{resolutionRate}%</span>
//                     </div>
//                     <Progress value={resolutionRate} className="h-2" />
//                   </div>

//                   {/* Pending Badge */}
//                   {dept.pendingIssues > 0 && (
//                     <div className="flex items-center justify-between">
//                       <Badge variant="outline" className="bg-warning/10 text-warning border-warning/30">
//                         <Clock className="h-3 w-3 mr-1" />
//                         {dept.pendingIssues} Pending
//                       </Badge>
//                       <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
//                     </div>
//                   )}
//                 </CardContent>
//               </Card>
//             );
//           })}
//         </div>

//         {/* Department Detail Modal */}
//         <Dialog open={!!selectedDept} onOpenChange={() => setSelectedDept(null)}>
//           <DialogContent className="sm:max-w-[600px]">
//             {selectedDept && (
//               <>
//                 <DialogHeader>
//                   <div className="flex items-center gap-3">
//                     <span className="text-3xl">{selectedDept.icon}</span>
//                     <div>
//                       <DialogTitle className="text-xl">{selectedDept.name}</DialogTitle>
//                       <p className="text-sm text-muted-foreground">
//                         Managed by {selectedDept.adminName}
//                       </p>
//                     </div>
//                   </div>
//                 </DialogHeader>
//                 <div className="space-y-4 py-4">
//                   <p className="text-muted-foreground">{selectedDept.description}</p>
                  
//                   <div className="grid grid-cols-2 gap-4">
//                     <Card>
//                       <CardContent className="p-4">
//                         <div className="flex items-center gap-2 mb-2">
//                           <FileWarning className="h-4 w-4 text-primary" />
//                           <span className="font-medium">Issues Overview</span>
//                         </div>
//                         <div className="space-y-2">
//                           <div className="flex justify-between">
//                             <span className="text-sm text-muted-foreground">Total</span>
//                             <span className="font-medium">{selectedDept.totalIssues}</span>
//                           </div>
//                           <div className="flex justify-between">
//                             <span className="text-sm text-muted-foreground">Resolved</span>
//                             <span className="font-medium text-success">{selectedDept.resolvedIssues}</span>
//                           </div>
//                           <div className="flex justify-between">
//                             <span className="text-sm text-muted-foreground">Pending</span>
//                             <span className="font-medium text-warning">{selectedDept.pendingIssues}</span>
//                           </div>
//                         </div>
//                       </CardContent>
//                     </Card>
//                     <Card>
//                       <CardContent className="p-4">
//                         <div className="flex items-center gap-2 mb-2">
//                           <Users className="h-4 w-4 text-primary" />
//                           <span className="font-medium">Team</span>
//                         </div>
//                         <div className="flex items-center gap-2 mt-3">
//                           {[...Array(Math.min(selectedDept.staffCount, 4))].map((_, i) => (
//                             <Avatar key={i} className="h-8 w-8 border-2 border-background -ml-2 first:ml-0">
//                               <AvatarFallback className="bg-primary/10 text-primary text-xs">
//                                 {String.fromCharCode(65 + i)}
//                               </AvatarFallback>
//                             </Avatar>
//                           ))}
//                           {selectedDept.staffCount > 4 && (
//                             <span className="text-sm text-muted-foreground ml-1">
//                               +{selectedDept.staffCount - 4} more
//                             </span>
//                           )}
//                         </div>
//                         <p className="text-sm text-muted-foreground mt-2">
//                           {selectedDept.staffCount} staff members
//                         </p>
//                       </CardContent>
//                     </Card>
//                   </div>
//                 </div>
//                 <DialogFooter>
//                   <Button variant="outline" onClick={() => setSelectedDept(null)}>
//                     Close
//                   </Button>
//                   <Button>View Full Details</Button>
//                 </DialogFooter>
//               </>
//             )}
//           </DialogContent>
//         </Dialog>
//       </div>
//     </AppLayout>
//   );
// }
