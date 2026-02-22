// import { mockIssues } from '@/data/mockData';
// import { StatsCard } from '@/components/shared/StatsCard';
// import { AppLayout } from '@/components/layout/AppLayout';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import {
//   MapPin,
//   Users,
//   FileWarning,
//   CheckCircle2,
//   Clock,
//   Building2,
//   AlertTriangle,
//   Locate,
//   Layers,
// } from 'lucide-react';
// import { 
//   AlertsList, 
//   DepartmentStatsList, 
//   HotspotMarker, 
//   MapLegend 
// } from '@/components/superadmin';

// const departmentData = [
//   { name: 'Water Supply', issues: 45, resolved: 38, color: 'bg-blue-500' },
//   { name: 'Roads', issues: 62, resolved: 48, color: 'bg-amber-500' },
//   { name: 'Electricity', issues: 34, resolved: 30, color: 'bg-yellow-500' },
//   { name: 'Sanitation', issues: 28, resolved: 22, color: 'bg-green-500' },
//   { name: 'Drainage', issues: 19, resolved: 15, color: 'bg-cyan-500' },
//   { name: 'Street Lights', issues: 24, resolved: 21, color: 'bg-purple-500' },
// ];

// const hotspots = [
//   { id: 1, name: 'Sector 15', issues: 32, severity: 'high' as const, position: { top: '15%', left: '20%' } },
//   { id: 2, name: 'MG Road', issues: 18, severity: 'medium' as const, position: { top: '35%', left: '60%' } },
//   { id: 3, name: 'Civil Lines', issues: 12, severity: 'low' as const, position: { top: '55%', left: '35%' } },
//   { id: 4, name: 'Station Area', issues: 24, severity: 'high' as const, position: { top: '25%', left: '75%' } },
//   { id: 5, name: 'Industrial Zone', issues: 8, severity: 'low' as const, position: { top: '70%', left: '50%' } },
// ];

// const recentAlerts = [
//   { id: 1, type: 'critical' as const, message: 'Water pipeline burst in Sector 15', time: '10 mins ago' },
//   { id: 2, type: 'warning' as const, message: 'Electricity outage reported in MG Road', time: '25 mins ago' },
//   { id: 3, type: 'info' as const, message: 'Road repair completed in Civil Lines', time: '1 hour ago' },
// ];

// export default function CityOverview() {
//   const totalIssues = mockIssues.length;
//   const resolvedIssues = mockIssues.filter((i) => i.status === 'resolved').length;
//   const pendingIssues = mockIssues.filter((i) => i.status === 'pending').length;
//   const inProgressIssues = mockIssues.filter((i) => i.status === 'in_progress').length;

//   return (
//     <AppLayout>
//       <div className="space-y-6">
//         {/* Header */}
//         <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
//           <div>
//             <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
//               <MapPin className="h-6 w-6 text-primary" />
//               City Overview
//             </h1>
//             <p className="text-muted-foreground mt-1">
//               Real-time monitoring of civic operations across the city
//             </p>
//           </div>
//           <div className="flex gap-2">
//             <Button variant="outline" className="gap-2">
//               <Layers className="h-4 w-4" />
//               View Layers
//             </Button>
//             <Button className="gap-2">
//               <FileWarning className="h-4 w-4" />
//               Export Report
//             </Button>
//           </div>
//         </div>

//         {/* Stats */}
//         <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
//           <StatsCard
//             title="Total Reports"
//             value="233"
//             icon={FileWarning}
//             variant="primary"
//             trend={{ value: 12, isPositive: true }}
//           />
//           <StatsCard
//             title="Resolved"
//             value="156"
//             icon={CheckCircle2}
//             variant="success"
//             subtitle="67% resolution rate"
//           />
//           <StatsCard
//             title="Pending"
//             value="42"
//             icon={Clock}
//             variant="warning"
//           />
//           <StatsCard
//             title="Active Staff"
//             value="24"
//             icon={Users}
//             trend={{ value: 3, isPositive: true }}
//           />
//         </div>

//         <div className="grid lg:grid-cols-3 gap-6">
//           {/* City Map */}
//           <div className="lg:col-span-2">
//             <Card>
//               <CardHeader className="flex flex-row items-center justify-between pb-2">
//                 <CardTitle className="flex items-center gap-2">
//                   <MapPin className="h-5 w-5 text-primary" />
//                   Issue Hotspot Map
//                 </CardTitle>
//                 <Button variant="ghost" size="sm" className="gap-1">
//                   <Locate className="h-4 w-4" />
//                   Center
//                 </Button>
//               </CardHeader>
//               <CardContent>
//                 <div className="h-[450px] bg-gradient-to-br from-muted to-muted/50 rounded-lg relative overflow-hidden">
//                   {/* Grid Background */}
//                   <div className="absolute inset-0 opacity-30">
//                     <svg width="100%" height="100%">
//                       <defs>
//                         <pattern id="cityGrid" width="50" height="50" patternUnits="userSpaceOnUse">
//                           <path d="M 50 0 L 0 0 0 50" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-muted-foreground" />
//                         </pattern>
//                       </defs>
//                       <rect width="100%" height="100%" fill="url(#cityGrid)" />
//                     </svg>
//                   </div>

//                   {/* Hotspot Markers */}
//                   {hotspots.map((spot) => (
//                     <HotspotMarker
//                       key={spot.id}
//                       name={spot.name}
//                       issues={spot.issues}
//                       severity={spot.severity}
//                       position={spot.position}
//                     />
//                   ))}

//                   {/* Map Legend */}
//                   <MapLegend className="absolute bottom-4 left-4" />
//                 </div>
//               </CardContent>
//             </Card>
//           </div>

//           {/* Side Panel */}
//           <div className="space-y-6">
//             {/* Recent Alerts */}
//             <Card>
//               <CardHeader className="pb-2">
//                 <CardTitle className="flex items-center gap-2 text-base">
//                   <AlertTriangle className="h-5 w-5 text-warning" />
//                   Recent Alerts
//                 </CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <AlertsList alerts={recentAlerts} />
//               </CardContent>
//             </Card>

//             {/* Department Quick Stats */}
//             <Card>
//               <CardHeader className="pb-2">
//                 <CardTitle className="flex items-center gap-2 text-base">
//                   <Building2 className="h-5 w-5 text-primary" />
//                   Department Performance
//                 </CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <DepartmentStatsList departments={departmentData} limit={4} />
//                 <Button variant="ghost" size="sm" className="w-full mt-2">
//                   View All Departments
//                 </Button>
//               </CardContent>
//             </Card>
//           </div>
//         </div>
//       </div>
//     </AppLayout>
//   );
// }
