import { useEffect, useState, useMemo } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent } from '@/components/ui/card';
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
  Loader2,
  RefreshCcw,
  BarChart3,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

// Dialogs
import { AddStaffDialog } from '@/components/department-admin/AddStaffDialog';

// API Service
import { departmentService } from '@/services/departmentService';

export default function StaffManagement() {
  const { user } = useAuth();
  const { toast } = useToast();

  // --- State ---
  const [staffList, setStaffList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  // --- Data Fetching (FIXED LOGIC) ---
  const fetchStaff = async () => {
    try {
      setLoading(true);
      const response = await departmentService.getMyStaff();
      
      // ✅ Yahan badlao kiya hai: 
      // Backend ab { staff: [...], supportedRoles: [...] } bhej raha hai
      const apiData = response.data || response;
      
      if (apiData && Array.isArray(apiData.staff)) {
        setStaffList(apiData.staff); 
      } else if (Array.isArray(apiData)) {
        // Fallback agar direct array aaye
        setStaffList(apiData);
      } else {
        setStaffList([]);
      }
    } catch (error) {
      console.error("Staff fetch error:", error);
      toast({ 
        variant: "destructive", 
        title: "Sync Error", 
        description: "Failed to load staff records from the server." 
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStaff();
  }, []);

  // --- Logic & Filtering ---
  const departmentName = (
    user?.departmentAdmin?.department?.name ??
    (typeof user?.department === 'object'
      ? (user.department as any).name
      : user?.department)
  ) || 'Department';

  const { filteredStaff, stats } = useMemo(() => {
    // Safety check: ensure list is an array
    const list = Array.isArray(staffList) ? staffList : [];
    
    const filtered = list.filter((s) =>
      s.user?.fullname?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.user?.email?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const activeCount = list.filter((s) => (s._count?.issues || 0) > 0).length;
    const totalTasks = list.reduce((acc, s) => acc + (s._count?.issues || 0), 0);

    return {
      filteredStaff: filtered,
      stats: {
        total: list.length,
        active: activeCount,
        available: list.length - activeCount,
        tasks: totalTasks
      }
    };
  }, [staffList, searchQuery]);

  // --- Loading State ---
  if (loading) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center gap-4">
        <Loader2 className="h-10 w-10 animate-spin text-primary opacity-50" />
        <p className="text-muted-foreground animate-pulse font-medium">Syncing personal records...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20 shadow-sm">
            <Users className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Staff directory</h1>
            <p className="text-sm text-muted-foreground flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              {departmentName} team overview
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={fetchStaff} className="gap-2 border-primary/20">
             <RefreshCcw className="h-4 w-4" /> Sync
          </Button>
          <AddStaffDialog 
            departmentId={
              user?.departmentAdmin?.departmentId ??
              user?.departmentAdmin?.department?.id ??
              ((typeof user?.department === 'string'
                ? user.department
                : (user?.department as any)?.id) || '')
            }
            onSuccess={fetchStaff}
          />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard title="Total Force" value={stats.total} icon={Users} variant="primary" />
        <StatsCard title="On Mission" value={stats.active} icon={Clock} variant="warning" />
        <StatsCard title="Standby" value={stats.available} icon={CheckCircle2} variant="success" />
        <StatsCard title="Active Load" value={stats.tasks} icon={BarChart3} />
      </div>

      {/* Search Bar */}
      <Card className="border-none shadow-sm bg-muted/30">
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Filter by name or email identity..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-background border-none shadow-inner"
            />
          </div>
        </CardContent>
      </Card>

      {/* Staff Table */}
      <Card className="border-none shadow-xl overflow-hidden bg-card/50 backdrop-blur-sm">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50 border-none">
              <TableHead className="text-xs font-medium">Personnel</TableHead>
              <TableHead className="text-xs font-medium">Contact</TableHead>
              <TableHead className="text-xs font-medium">Availability</TableHead>
              <TableHead className="text-xs font-medium text-center">Workload</TableHead>
              <TableHead className="text-right text-xs font-medium">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredStaff.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-24 text-muted-foreground italic">
                  No staff members found in this division.
                </TableCell>
              </TableRow>
            ) : (
              filteredStaff.map((staff) => {
                const activeTasks = staff._count?.issues || 0;
                // Safety initials logic
                const initials = staff.user?.fullname 
                  ? staff.user.fullname.split(' ').map((n: string) => n[0]).join('').toUpperCase().substring(0, 2)
                  : '??';

                return (
                  <TableRow key={staff.id} className="hover:bg-primary/5 transition-all border-b border-muted/20">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-white font-black text-xs shadow-md">
                          {initials}
                        </div>
                        <div>
                          <p className="font-semibold text-sm leading-none">{staff.user?.fullname || 'Unknown'}</p>
                          <p className="text-[11px] text-muted-foreground mt-1">{staff.designation || 'Field agent'}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1 text-[11px]">
                        <p className="flex items-center gap-1.5 font-bold text-muted-foreground italic">
                          <Phone className="h-3 w-3" /> {staff.user?.phoneNumber || 'No Phone'}
                        </p>
                        <p className="flex items-center gap-1.5 text-muted-foreground/70">
                          <Mail className="h-3 w-3" /> {staff.user?.email}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={`text-[10px] border-none shadow-sm ${activeTasks === 0 ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                        {activeTasks === 0 ? 'Available' : 'Busy'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className={`inline-flex items-center justify-center h-8 w-8 rounded-full border-2 font-black text-xs ${activeTasks > 2 ? 'border-destructive/30 bg-destructive/5 text-destructive' : 'border-primary/10 text-primary'}`}>
                        {activeTasks}
                      </div>
                    </TableCell>
                    <TableCell className="text-right text-xs text-muted-foreground">
                      {activeTasks === 0 ? 'No active tasks' : 'In progress'}
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}