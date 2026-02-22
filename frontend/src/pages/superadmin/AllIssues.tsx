// import { useState } from 'react';
// import { mockIssues } from '@/data/mockData';
// import { CATEGORY_LABELS, IssueCategory, IssueStatus } from '@/types';
// import { StatusBadge } from '@/components/shared/StatusBadge';
// import { CategoryBadge } from '@/components/shared/CategoryBadge';
// import { AppLayout } from '@/components/layout/AppLayout';
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
//   DropdownMenuTrigger,
// } from '@/components/ui/dropdown-menu';
// import {
//   FileWarning,
//   Search,
//   Filter,
//   Download,
//   MoreHorizontal,
//   Eye,
//   UserPlus,
//   CheckCircle2,
//   MapPin,
//   Clock,
//   ArrowUpDown,
//   RefreshCw,
// } from 'lucide-react';
// import { format } from 'date-fns';
// import { useToast } from '@/hooks/use-toast';

// export default function AllIssues() {
//   const { toast } = useToast();
//   const [searchQuery, setSearchQuery] = useState('');
//   const [statusFilter, setStatusFilter] = useState<string>('all');
//   const [categoryFilter, setCategoryFilter] = useState<string>('all');
//   const [sortBy, setSortBy] = useState<string>('newest');

//   // Filter and sort issues
//   const filteredIssues = mockIssues
//     .filter((issue) => {
//       const matchesSearch = 
//         issue.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         issue.location.address.toLowerCase().includes(searchQuery.toLowerCase());
//       const matchesStatus = statusFilter === 'all' || issue.status === statusFilter;
//       const matchesCategory = categoryFilter === 'all' || issue.category === categoryFilter;
//       return matchesSearch && matchesStatus && matchesCategory;
//     })
//     .sort((a, b) => {
//       switch (sortBy) {
//         case 'newest':
//           return new Date(b.reportedAt).getTime() - new Date(a.reportedAt).getTime();
//         case 'oldest':
//           return new Date(a.reportedAt).getTime() - new Date(b.reportedAt).getTime();
//         case 'upvotes':
//           return b.upvotes - a.upvotes;
//         default:
//           return 0;
//       }
//     });

//   const handleAssign = (issueId: string) => {
//     toast({
//       title: 'Staff Assignment',
//       description: 'Issue has been assigned to the selected staff member.',
//     });
//   };

//   const handleExport = () => {
//     toast({
//       title: 'Export Started',
//       description: 'Issues data is being exported to CSV.',
//     });
//   };

//   const stats = {
//     total: mockIssues.length,
//     pending: mockIssues.filter(i => i.status === 'pending').length,
//     inProgress: mockIssues.filter(i => i.status === 'in_progress').length,
//     resolved: mockIssues.filter(i => i.status === 'resolved').length,
//   };

//   return (
//     <AppLayout>
//       <div className="space-y-6">
//         {/* Header */}
//         <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
//           <div>
//             <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
//               <FileWarning className="h-6 w-6 text-primary" />
//               All Issues
//             </h1>
//             <p className="text-muted-foreground mt-1">
//               Manage and monitor all reported issues across the city
//             </p>
//           </div>
//           <div className="flex gap-2">
//             <Button variant="outline" className="gap-2" onClick={handleExport}>
//               <Download className="h-4 w-4" />
//               Export
//             </Button>
//             <Button variant="outline" className="gap-2">
//               <RefreshCw className="h-4 w-4" />
//               Refresh
//             </Button>
//           </div>
//         </div>

//         {/* Quick Stats */}
//         <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
//           <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setStatusFilter('all')}>
//             <CardContent className="p-4">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm text-muted-foreground">Total Issues</p>
//                   <p className="text-2xl font-bold">{stats.total}</p>
//                 </div>
//                 <FileWarning className="h-8 w-8 text-primary/20" />
//               </div>
//             </CardContent>
//           </Card>
//           <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setStatusFilter('pending')}>
//             <CardContent className="p-4">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm text-muted-foreground">Pending</p>
//                   <p className="text-2xl font-bold text-warning">{stats.pending}</p>
//                 </div>
//                 <Clock className="h-8 w-8 text-warning/20" />
//               </div>
//             </CardContent>
//           </Card>
//           <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setStatusFilter('in_progress')}>
//             <CardContent className="p-4">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm text-muted-foreground">In Progress</p>
//                   <p className="text-2xl font-bold text-info">{stats.inProgress}</p>
//                 </div>
//                 <RefreshCw className="h-8 w-8 text-info/20" />
//               </div>
//             </CardContent>
//           </Card>
//           <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setStatusFilter('resolved')}>
//             <CardContent className="p-4">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm text-muted-foreground">Resolved</p>
//                   <p className="text-2xl font-bold text-success">{stats.resolved}</p>
//                 </div>
//                 <CheckCircle2 className="h-8 w-8 text-success/20" />
//               </div>
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
//                   placeholder="Search by title or location..."
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   className="pl-9"
//                 />
//               </div>
//               <div className="flex flex-wrap gap-2">
//                 <Select value={statusFilter} onValueChange={setStatusFilter}>
//                   <SelectTrigger className="w-[140px]">
//                     <SelectValue placeholder="Status" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="all">All Status</SelectItem>
//                     <SelectItem value="pending">Pending</SelectItem>
//                     <SelectItem value="in_progress">In Progress</SelectItem>
//                     <SelectItem value="resolved">Resolved</SelectItem>
//                   </SelectContent>
//                 </Select>
//                 <Select value={categoryFilter} onValueChange={setCategoryFilter}>
//                   <SelectTrigger className="w-[150px]">
//                     <SelectValue placeholder="Category" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="all">All Categories</SelectItem>
//                     {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
//                       <SelectItem key={key} value={key}>{label}</SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//                 <Select value={sortBy} onValueChange={setSortBy}>
//                   <SelectTrigger className="w-[130px]">
//                     <ArrowUpDown className="h-4 w-4 mr-2" />
//                     <SelectValue placeholder="Sort" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="newest">Newest First</SelectItem>
//                     <SelectItem value="oldest">Oldest First</SelectItem>
//                     <SelectItem value="upvotes">Most Upvotes</SelectItem>
//                   </SelectContent>
//                 </Select>
//               </div>
//             </div>
//           </CardContent>
//         </Card>

//         {/* Issues Table */}
//         <Card>
//           <CardHeader className="pb-0">
//             <div className="flex items-center justify-between">
//               <CardTitle>Issues ({filteredIssues.length})</CardTitle>
//               <Badge variant="outline">
//                 Showing {filteredIssues.length} of {mockIssues.length}
//               </Badge>
//             </div>
//           </CardHeader>
//           <CardContent className="p-0">
//             <Table>
//               <TableHeader>
//                 <TableRow>
//                   <TableHead className="w-[300px]">Issue</TableHead>
//                   <TableHead>Category</TableHead>
//                   <TableHead>Status</TableHead>
//                   <TableHead>Location</TableHead>
//                   <TableHead>Reported</TableHead>
//                   <TableHead>Upvotes</TableHead>
//                   <TableHead className="text-right">Actions</TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {filteredIssues.map((issue) => (
//                   <TableRow key={issue.id} className="group">
//                     <TableCell>
//                       <div className="flex items-center gap-3">
//                         {issue.beforePhoto && (
//                           <img
//                             src={issue.beforePhoto}
//                             alt=""
//                             className="h-10 w-10 rounded-lg object-cover"
//                           />
//                         )}
//                         <div>
//                           <p className="font-medium line-clamp-1">{issue.title}</p>
//                           <p className="text-xs text-muted-foreground line-clamp-1">
//                             {issue.description}
//                           </p>
//                         </div>
//                       </div>
//                     </TableCell>
//                     <TableCell>
//                       <CategoryBadge category={issue.category} />
//                     </TableCell>
//                     <TableCell>
//                       <StatusBadge status={issue.status} />
//                     </TableCell>
//                     <TableCell>
//                       <div className="flex items-center gap-1 text-sm text-muted-foreground">
//                         <MapPin className="h-3 w-3" />
//                         <span className="line-clamp-1 max-w-[150px]">{issue.location.address}</span>
//                       </div>
//                     </TableCell>
//                     <TableCell className="text-sm text-muted-foreground">
//                       {format(new Date(issue.reportedAt), 'MMM d, yyyy')}
//                     </TableCell>
//                     <TableCell>
//                       <Badge variant="secondary">{issue.upvotes}</Badge>
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
//                             <Eye className="h-4 w-4" />
//                             View Details
//                           </DropdownMenuItem>
//                           <DropdownMenuItem className="gap-2" onClick={() => handleAssign(issue.id)}>
//                             <UserPlus className="h-4 w-4" />
//                             Assign Staff
//                           </DropdownMenuItem>
//                           <DropdownMenuItem className="gap-2">
//                             <CheckCircle2 className="h-4 w-4" />
//                             Mark Resolved
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
