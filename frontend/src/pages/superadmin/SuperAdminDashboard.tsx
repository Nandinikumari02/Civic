// import { useState } from 'react';
// import { mockIssues, mockStaff } from '@/data/mockData';
// import { CATEGORY_LABELS, IssueCategory, UserRole } from '@/types';
// import { StatsCard } from '@/components/shared/StatsCard';
// import { StatusBadge } from '@/components/shared/StatusBadge';
// import { CategoryBadge } from '@/components/shared/CategoryBadge';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
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
// } from '@/components/ui/dialog';
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from '@/components/ui/select';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
// import {
//   MapPin,
//   Users,
//   FileWarning,
//   CheckCircle2,
//   Clock,
//   BarChart3,
//   Plus,
//   Edit,
//   Trash2,
//   Building2,
//   TrendingUp,
//   TrendingDown,
// } from 'lucide-react';
// import { useToast } from '@/hooks/use-toast';
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
//   PieChart,
//   Pie,
//   Cell,
//   LineChart,
//   Line,
//   CartesianGrid,
//   Legend,
// } from 'recharts';

// const departmentData = [
//   { name: 'Water', issues: 45, resolved: 38 },
//   { name: 'Roads', issues: 62, resolved: 48 },
//   { name: 'Electricity', issues: 34, resolved: 30 },
//   { name: 'Sanitation', issues: 28, resolved: 22 },
//   { name: 'Drainage', issues: 19, resolved: 15 },
//   { name: 'Lights', issues: 24, resolved: 21 },
// ];

// const statusData = [
//   { name: 'Pending', value: 42, color: 'hsl(38, 92%, 50%)' },
//   { name: 'In Progress', value: 35, color: 'hsl(199, 89%, 48%)' },
//   { name: 'Resolved', value: 156, color: 'hsl(152, 69%, 31%)' },
// ];

// const trendData = [
//   { month: 'Jul', reports: 45, resolved: 38 },
//   { month: 'Aug', reports: 52, resolved: 45 },
//   { month: 'Sep', reports: 48, resolved: 50 },
//   { month: 'Oct', reports: 61, resolved: 55 },
//   { month: 'Nov', reports: 55, resolved: 52 },
//   { month: 'Dec', reports: 67, resolved: 60 },
// ];

// const mockUsers = [
//   { id: '1', name: 'Priya Patel', email: 'priya@gov.in', role: 'department_admin', department: 'Water' },
//   { id: '2', name: 'Amit Kumar', email: 'amit@gov.in', role: 'staff', department: 'Water' },
//   { id: '3', name: 'Ravi Singh', email: 'ravi@gov.in', role: 'staff', department: 'Roads' },
//   { id: '4', name: 'Sunita Sharma', email: 'sunita@gov.in', role: 'department_admin', department: 'Electricity' },
// ];

// export function SuperAdminDashboard() {
//   const { toast } = useToast();
//   const [activeTab, setActiveTab] = useState('overview');

//   const totalIssues = mockIssues.length;
//   const resolvedIssues = mockIssues.filter((i) => i.status === 'resolved').length;
//   const pendingIssues = mockIssues.filter((i) => i.status === 'pending').length;

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
//         <div>
//           <h1 className="text-2xl font-bold text-foreground">City Overview</h1>
//           <p className="text-muted-foreground mt-1">
//             Monitor and manage all civic operations across the city
//           </p>
//         </div>
//         <Button className="gap-2">
//           <Plus className="h-4 w-4" />
//           Add User
//         </Button>
//       </div>

//       {/* Stats */}
//       <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
//         <StatsCard
//           title="Total Reports"
//           value="233"
//           icon={FileWarning}
//           variant="primary"
//           trend={{ value: 12, isPositive: true }}
//         />
//         <StatsCard
//           title="Resolved"
//           value="156"
//           icon={CheckCircle2}
//           variant="success"
//           subtitle="67% resolution rate"
//         />
//         <StatsCard
//           title="Pending"
//           value="42"
//           icon={Clock}
//           variant="warning"
//         />
//         <StatsCard
//           title="Active Staff"
//           value="24"
//           icon={Users}
//         />
//       </div>

//       {/* Tabs */}
//       <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
//         <TabsList>
//           <TabsTrigger value="overview">City Map</TabsTrigger>
//           <TabsTrigger value="users">User Management</TabsTrigger>
//           <TabsTrigger value="analytics">Analytics</TabsTrigger>
//         </TabsList>

//         {/* City Map View */}
//         <TabsContent value="overview" className="mt-6">
//           <div className="grid lg:grid-cols-3 gap-6">
//             <div className="lg:col-span-2">
//               <Card>
//                 <CardHeader>
//                   <CardTitle className="flex items-center gap-2">
//                     <MapPin className="h-5 w-5 text-primary" />
//                     Hotspot Map
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="h-[400px] bg-muted rounded-lg relative overflow-hidden">
//                     {/* Simplified map representation */}
//                     <div className="absolute inset-0 flex items-center justify-center">
//                       <div className="text-center">
//                         <MapPin className="h-16 w-16 text-muted-foreground/30 mx-auto mb-3" />
//                         <p className="text-muted-foreground">Interactive City Map</p>
//                         <p className="text-sm text-muted-foreground/70">
//                           Showing issue density by area
//                         </p>
//                       </div>
//                     </div>
                    
//                     {/* Mock hotspots */}
//                     <div className="absolute top-16 left-16 h-20 w-20 bg-destructive/20 rounded-full flex items-center justify-center border-2 border-destructive/40">
//                       <span className="text-destructive font-bold">32</span>
//                     </div>
//                     <div className="absolute top-24 right-20 h-16 w-16 bg-warning/20 rounded-full flex items-center justify-center border-2 border-warning/40">
//                       <span className="text-warning font-bold">18</span>
//                     </div>
//                     <div className="absolute bottom-20 left-1/3 h-14 w-14 bg-info/20 rounded-full flex items-center justify-center border-2 border-info/40">
//                       <span className="text-info font-bold">12</span>
//                     </div>
//                     <div className="absolute bottom-32 right-1/3 h-12 w-12 bg-success/20 rounded-full flex items-center justify-center border-2 border-success/40">
//                       <span className="text-success font-bold">8</span>
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>
//             </div>

//             {/* Department Quick Stats */}
//             <div>
//               <Card>
//                 <CardHeader>
//                   <CardTitle className="flex items-center gap-2">
//                     <Building2 className="h-5 w-5 text-primary" />
//                     Departments
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent className="space-y-3">
//                   {departmentData.map((dept) => (
//                     <div
//                       key={dept.name}
//                       className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
//                     >
//                       <div>
//                         <p className="font-medium text-sm">{dept.name}</p>
//                         <p className="text-xs text-muted-foreground">
//                           {dept.resolved}/{dept.issues} resolved
//                         </p>
//                       </div>
//                       <div className="text-right">
//                         <p className="text-sm font-medium">
//                           {Math.round((dept.resolved / dept.issues) * 100)}%
//                         </p>
//                         <div className="w-20 h-1.5 bg-muted rounded-full mt-1">
//                           <div
//                             className="h-full bg-success rounded-full"
//                             style={{ width: `${(dept.resolved / dept.issues) * 100}%` }}
//                           />
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </CardContent>
//               </Card>
//             </div>
//           </div>
//         </TabsContent>

//         {/* User Management */}
//         <TabsContent value="users" className="mt-6">
//           <Card>
//             <CardHeader className="flex flex-row items-center justify-between">
//               <CardTitle>User Management</CardTitle>
//               <div className="flex items-center gap-2">
//                 <Select defaultValue="all">
//                   <SelectTrigger className="w-[140px]">
//                     <SelectValue placeholder="Filter by role" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="all">All Roles</SelectItem>
//                     <SelectItem value="admin">Dept Admin</SelectItem>
//                     <SelectItem value="staff">Staff</SelectItem>
//                   </SelectContent>
//                 </Select>
//               </div>
//             </CardHeader>
//             <CardContent>
//               <Table>
//                 <TableHeader>
//                   <TableRow>
//                     <TableHead>Name</TableHead>
//                     <TableHead>Email</TableHead>
//                     <TableHead>Role</TableHead>
//                     <TableHead>Department</TableHead>
//                     <TableHead>Actions</TableHead>
//                   </TableRow>
//                 </TableHeader>
//                 <TableBody>
//                   {mockUsers.map((user) => (
//                     <TableRow key={user.id}>
//                       <TableCell className="font-medium">{user.name}</TableCell>
//                       <TableCell>{user.email}</TableCell>
//                       <TableCell>
//                         <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
//                           {user.role === 'department_admin' ? 'Dept Admin' : 'Staff'}
//                         </span>
//                       </TableCell>
//                       <TableCell>{user.department}</TableCell>
//                       <TableCell>
//                         <div className="flex items-center gap-2">
//                           <Button variant="ghost" size="icon" className="h-8 w-8">
//                             <Edit className="h-4 w-4" />
//                           </Button>
//                           <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
//                             <Trash2 className="h-4 w-4" />
//                           </Button>
//                         </div>
//                       </TableCell>
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//             </CardContent>
//           </Card>
//         </TabsContent>

//         {/* Analytics */}
//         <TabsContent value="analytics" className="mt-6">
//           <div className="grid lg:grid-cols-2 gap-6">
//             {/* Department Performance */}
//             <Card>
//               <CardHeader>
//                 <CardTitle className="flex items-center gap-2">
//                   <BarChart3 className="h-5 w-5 text-primary" />
//                   Department Performance
//                 </CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="h-[300px]">
//                   <ResponsiveContainer width="100%" height="100%">
//                     <BarChart data={departmentData}>
//                       <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
//                       <XAxis dataKey="name" tick={{ fontSize: 12 }} />
//                       <YAxis tick={{ fontSize: 12 }} />
//                       <Tooltip />
//                       <Bar dataKey="issues" fill="hsl(215, 80%, 25%)" name="Total" />
//                       <Bar dataKey="resolved" fill="hsl(152, 69%, 31%)" name="Resolved" />
//                     </BarChart>
//                   </ResponsiveContainer>
//                 </div>
//               </CardContent>
//             </Card>

//             {/* Status Distribution */}
//             <Card>
//               <CardHeader>
//                 <CardTitle>Issue Status Distribution</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="h-[300px]">
//                   <ResponsiveContainer width="100%" height="100%">
//                     <PieChart>
//                       <Pie
//                         data={statusData}
//                         cx="50%"
//                         cy="50%"
//                         innerRadius={60}
//                         outerRadius={100}
//                         paddingAngle={5}
//                         dataKey="value"
//                         label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
//                       >
//                         {statusData.map((entry, index) => (
//                           <Cell key={`cell-${index}`} fill={entry.color} />
//                         ))}
//                       </Pie>
//                       <Tooltip />
//                     </PieChart>
//                   </ResponsiveContainer>
//                 </div>
//               </CardContent>
//             </Card>

//             {/* Trend Chart */}
//             <Card className="lg:col-span-2">
//               <CardHeader>
//                 <CardTitle className="flex items-center gap-2">
//                   <TrendingUp className="h-5 w-5 text-primary" />
//                   Monthly Trends
//                 </CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="h-[300px]">
//                   <ResponsiveContainer width="100%" height="100%">
//                     <LineChart data={trendData}>
//                       <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
//                       <XAxis dataKey="month" tick={{ fontSize: 12 }} />
//                       <YAxis tick={{ fontSize: 12 }} />
//                       <Tooltip />
//                       <Legend />
//                       <Line
//                         type="monotone"
//                         dataKey="reports"
//                         stroke="hsl(215, 80%, 25%)"
//                         strokeWidth={2}
//                         name="Reports"
//                       />
//                       <Line
//                         type="monotone"
//                         dataKey="resolved"
//                         stroke="hsl(152, 69%, 31%)"
//                         strokeWidth={2}
//                         name="Resolved"
//                       />
//                     </LineChart>
//                   </ResponsiveContainer>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>
//         </TabsContent>
//       </Tabs>
//     </div>
//   );
// }
