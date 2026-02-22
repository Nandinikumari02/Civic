// import { useState } from 'react';
// import { AppLayout } from '@/components/layout/AppLayout';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from '@/components/ui/select';
// import {
//   BarChart3,
//   TrendingUp,
//   Download,
//   Calendar,
//   Clock,
//   Users,
//   FileWarning,
//   CheckCircle2,
// } from 'lucide-react';
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
//   AreaChart,
//   Area,
// } from 'recharts';
// import { KpiCard, ResolutionRatesList } from '@/components/superadmin';

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
//   { month: 'Jul', reports: 45, resolved: 38, avgTime: 4.2 },
//   { month: 'Aug', reports: 52, resolved: 45, avgTime: 3.8 },
//   { month: 'Sep', reports: 48, resolved: 50, avgTime: 3.5 },
//   { month: 'Oct', reports: 61, resolved: 55, avgTime: 3.2 },
//   { month: 'Nov', reports: 55, resolved: 52, avgTime: 2.9 },
//   { month: 'Dec', reports: 67, resolved: 60, avgTime: 2.6 },
// ];

// const weeklyData = [
//   { day: 'Mon', issues: 12 },
//   { day: 'Tue', issues: 18 },
//   { day: 'Wed', issues: 15 },
//   { day: 'Thu', issues: 22 },
//   { day: 'Fri', issues: 19 },
//   { day: 'Sat', issues: 8 },
//   { day: 'Sun', issues: 6 },
// ];

// const categoryTrends = [
//   { month: 'Jul', water: 8, roads: 12, electricity: 6, sanitation: 5 },
//   { month: 'Aug', water: 10, roads: 15, electricity: 8, sanitation: 6 },
//   { month: 'Sep', water: 7, roads: 11, electricity: 9, sanitation: 8 },
//   { month: 'Oct', water: 12, roads: 18, electricity: 7, sanitation: 9 },
//   { month: 'Nov', water: 9, roads: 14, electricity: 10, sanitation: 7 },
//   { month: 'Dec', water: 11, roads: 16, electricity: 11, sanitation: 10 },
// ];

// const kpiCards = [
//   { 
//     title: 'Resolution Rate', 
//     value: '67%', 
//     change: 8, 
//     isPositive: true,
//     icon: CheckCircle2,
//     iconColor: 'text-success',
//   },
//   { 
//     title: 'Avg. Response Time', 
//     value: '2.6 hrs', 
//     change: 15, 
//     isPositive: true,
//     icon: Clock,
//     iconColor: 'text-info',
//   },
//   { 
//     title: 'Active Reports', 
//     value: '77', 
//     change: 5, 
//     isPositive: false,
//     icon: FileWarning,
//     iconColor: 'text-warning',
//   },
//   { 
//     title: 'Staff Efficiency', 
//     value: '94%', 
//     change: 3, 
//     isPositive: true,
//     icon: Users,
//     iconColor: 'text-primary',
//   },
// ];

// export default function Analytics() {
//   const [timeRange, setTimeRange] = useState('6months');

//   return (
//     <AppLayout>
//       <div className="space-y-6">
//         {/* Header */}
//         <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
//           <div>
//             <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
//               <BarChart3 className="h-6 w-6 text-primary" />
//               Analytics Dashboard
//             </h1>
//             <p className="text-muted-foreground mt-1">
//               Comprehensive insights into city operations and performance
//             </p>
//           </div>
//           <div className="flex gap-2">
//             <Select value={timeRange} onValueChange={setTimeRange}>
//               <SelectTrigger className="w-[160px]">
//                 <Calendar className="h-4 w-4 mr-2" />
//                 <SelectValue placeholder="Time range" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="7days">Last 7 Days</SelectItem>
//                 <SelectItem value="30days">Last 30 Days</SelectItem>
//                 <SelectItem value="3months">Last 3 Months</SelectItem>
//                 <SelectItem value="6months">Last 6 Months</SelectItem>
//                 <SelectItem value="1year">Last Year</SelectItem>
//               </SelectContent>
//             </Select>
//             <Button variant="outline" className="gap-2">
//               <Download className="h-4 w-4" />
//               Export
//             </Button>
//           </div>
//         </div>

//         {/* KPI Cards */}
//         <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
//           {kpiCards.map((kpi) => (
//             <KpiCard
//               key={kpi.title}
//               title={kpi.title}
//               value={kpi.value}
//               change={kpi.change}
//               isPositive={kpi.isPositive}
//               icon={kpi.icon}
//               iconColor={kpi.iconColor}
//             />
//           ))}
//         </div>

//         {/* Charts Tabs */}
//         <Tabs defaultValue="overview" className="space-y-6">
//           <TabsList>
//             <TabsTrigger value="overview">Overview</TabsTrigger>
//             <TabsTrigger value="departments">Departments</TabsTrigger>
//             <TabsTrigger value="trends">Trends</TabsTrigger>
//           </TabsList>

//           <TabsContent value="overview" className="space-y-6">
//             <div className="grid lg:grid-cols-2 gap-6">
//               {/* Monthly Trends */}
//               <Card>
//                 <CardHeader>
//                   <CardTitle className="flex items-center gap-2">
//                     <TrendingUp className="h-5 w-5 text-primary" />
//                     Monthly Issue Trends
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="h-[300px]">
//                     <ResponsiveContainer width="100%" height="100%">
//                       <AreaChart data={trendData}>
//                         <defs>
//                           <linearGradient id="colorReports" x1="0" y1="0" x2="0" y2="1">
//                             <stop offset="5%" stopColor="hsl(215, 80%, 50%)" stopOpacity={0.3}/>
//                             <stop offset="95%" stopColor="hsl(215, 80%, 50%)" stopOpacity={0}/>
//                           </linearGradient>
//                           <linearGradient id="colorResolved" x1="0" y1="0" x2="0" y2="1">
//                             <stop offset="5%" stopColor="hsl(152, 69%, 40%)" stopOpacity={0.3}/>
//                             <stop offset="95%" stopColor="hsl(152, 69%, 40%)" stopOpacity={0}/>
//                           </linearGradient>
//                         </defs>
//                         <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
//                         <XAxis dataKey="month" tick={{ fontSize: 12 }} />
//                         <YAxis tick={{ fontSize: 12 }} />
//                         <Tooltip />
//                         <Legend />
//                         <Area
//                           type="monotone"
//                           dataKey="reports"
//                           stroke="hsl(215, 80%, 50%)"
//                           fill="url(#colorReports)"
//                           strokeWidth={2}
//                           name="Reports"
//                         />
//                         <Area
//                           type="monotone"
//                           dataKey="resolved"
//                           stroke="hsl(152, 69%, 40%)"
//                           fill="url(#colorResolved)"
//                           strokeWidth={2}
//                           name="Resolved"
//                         />
//                       </AreaChart>
//                     </ResponsiveContainer>
//                   </div>
//                 </CardContent>
//               </Card>

//               {/* Status Distribution */}
//               <Card>
//                 <CardHeader>
//                   <CardTitle>Issue Status Distribution</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="h-[300px]">
//                     <ResponsiveContainer width="100%" height="100%">
//                       <PieChart>
//                         <Pie
//                           data={statusData}
//                           cx="50%"
//                           cy="50%"
//                           innerRadius={70}
//                           outerRadius={110}
//                           paddingAngle={5}
//                           dataKey="value"
//                           label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
//                         >
//                           {statusData.map((entry, index) => (
//                             <Cell key={`cell-${index}`} fill={entry.color} />
//                           ))}
//                         </Pie>
//                         <Tooltip />
//                       </PieChart>
//                     </ResponsiveContainer>
//                   </div>
//                   <div className="flex justify-center gap-6 mt-4">
//                     {statusData.map((item) => (
//                       <div key={item.name} className="flex items-center gap-2">
//                         <div 
//                           className="h-3 w-3 rounded-full" 
//                           style={{ backgroundColor: item.color }}
//                         />
//                         <span className="text-sm text-muted-foreground">{item.name}</span>
//                       </div>
//                     ))}
//                   </div>
//                 </CardContent>
//               </Card>
//             </div>

//             {/* Weekly Distribution */}
//             <Card>
//               <CardHeader>
//                 <CardTitle>Weekly Issue Distribution</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="h-[250px]">
//                   <ResponsiveContainer width="100%" height="100%">
//                     <BarChart data={weeklyData}>
//                       <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
//                       <XAxis dataKey="day" tick={{ fontSize: 12 }} />
//                       <YAxis tick={{ fontSize: 12 }} />
//                       <Tooltip />
//                       <Bar dataKey="issues" fill="hsl(215, 80%, 50%)" radius={[4, 4, 0, 0]} />
//                     </BarChart>
//                   </ResponsiveContainer>
//                 </div>
//               </CardContent>
//             </Card>
//           </TabsContent>

//           <TabsContent value="departments" className="space-y-6">
//             <div className="grid lg:grid-cols-2 gap-6">
//               {/* Department Performance */}
//               <Card>
//                 <CardHeader>
//                   <CardTitle className="flex items-center gap-2">
//                     <BarChart3 className="h-5 w-5 text-primary" />
//                     Department Performance
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="h-[350px]">
//                     <ResponsiveContainer width="100%" height="100%">
//                       <BarChart data={departmentData} layout="vertical">
//                         <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
//                         <XAxis type="number" tick={{ fontSize: 12 }} />
//                         <YAxis dataKey="name" type="category" tick={{ fontSize: 12 }} width={80} />
//                         <Tooltip />
//                         <Legend />
//                         <Bar dataKey="issues" fill="hsl(215, 80%, 50%)" name="Total Issues" radius={[0, 4, 4, 0]} />
//                         <Bar dataKey="resolved" fill="hsl(152, 69%, 40%)" name="Resolved" radius={[0, 4, 4, 0]} />
//                       </BarChart>
//                     </ResponsiveContainer>
//                   </div>
//                 </CardContent>
//               </Card>

//               {/* Resolution Rates */}
//               <Card>
//                 <CardHeader>
//                   <CardTitle>Resolution Rates by Department</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <ResolutionRatesList items={departmentData} />
//                 </CardContent>
//               </Card>
//             </div>
//           </TabsContent>

//           <TabsContent value="trends" className="space-y-6">
//             {/* Category Trends */}
//             <Card>
//               <CardHeader>
//                 <CardTitle className="flex items-center gap-2">
//                   <TrendingUp className="h-5 w-5 text-primary" />
//                   Category-wise Trends
//                 </CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="h-[350px]">
//                   <ResponsiveContainer width="100%" height="100%">
//                     <LineChart data={categoryTrends}>
//                       <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
//                       <XAxis dataKey="month" tick={{ fontSize: 12 }} />
//                       <YAxis tick={{ fontSize: 12 }} />
//                       <Tooltip />
//                       <Legend />
//                       <Line type="monotone" dataKey="water" stroke="hsl(200, 80%, 50%)" strokeWidth={2} name="Water" />
//                       <Line type="monotone" dataKey="roads" stroke="hsl(38, 80%, 50%)" strokeWidth={2} name="Roads" />
//                       <Line type="monotone" dataKey="electricity" stroke="hsl(50, 80%, 50%)" strokeWidth={2} name="Electricity" />
//                       <Line type="monotone" dataKey="sanitation" stroke="hsl(130, 60%, 40%)" strokeWidth={2} name="Sanitation" />
//                     </LineChart>
//                   </ResponsiveContainer>
//                 </div>
//               </CardContent>
//             </Card>

//             {/* Response Time Trend */}
//             <Card>
//               <CardHeader>
//                 <CardTitle className="flex items-center gap-2">
//                   <Clock className="h-5 w-5 text-primary" />
//                   Average Response Time Trend
//                 </CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="h-[250px]">
//                   <ResponsiveContainer width="100%" height="100%">
//                     <AreaChart data={trendData}>
//                       <defs>
//                         <linearGradient id="colorTime" x1="0" y1="0" x2="0" y2="1">
//                           <stop offset="5%" stopColor="hsl(199, 89%, 48%)" stopOpacity={0.3}/>
//                           <stop offset="95%" stopColor="hsl(199, 89%, 48%)" stopOpacity={0}/>
//                         </linearGradient>
//                       </defs>
//                       <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
//                       <XAxis dataKey="month" tick={{ fontSize: 12 }} />
//                       <YAxis tick={{ fontSize: 12 }} unit=" hrs" />
//                       <Tooltip formatter={(value) => [`${value} hrs`, 'Avg. Response Time']} />
//                       <Area
//                         type="monotone"
//                         dataKey="avgTime"
//                         stroke="hsl(199, 89%, 48%)"
//                         fill="url(#colorTime)"
//                         strokeWidth={2}
//                       />
//                     </AreaChart>
//                   </ResponsiveContainer>
//                 </div>
//               </CardContent>
//             </Card>
//           </TabsContent>
//         </Tabs>
//       </div>
//     </AppLayout>
//   );
// }
