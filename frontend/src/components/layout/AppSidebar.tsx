import { useAuth } from "@/contexts/AuthContext";
import { BarChart3, Bell, Building2, CheckCircle, ClipboardList, FileWarning, Home, LogOut, MapPin,  Settings,  Trophy, Users } from "lucide-react";
import { useLocation , Link } from 'react-router-dom';
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar";
import { cn } from "@/lib/utils";
import type { UserRole } from "@/types";

export function AppSidebar({ role: propRole }: { role?: UserRole }) {
  const { role: contextRole } = useAuth();
  const role = propRole ?? contextRole;

  const location = useLocation();

     
  const citizenLinks = [
  { title: "Dashboard", icon: Home, url: "/citizen" },
  { title: "Issue Feed", icon: FileWarning, url: "/citizen/issues" },
  { title: "Rewards", icon: Trophy, url: "/citizen/rewards" },
  { title: "Notifications", icon: Bell, url: "/citizen/notifications" },
];
  const departmentAdminLinks = [
    { title: 'Dashboard', icon: Home, url: '/departments' },
    { title: 'Department Issues', icon: FileWarning, url: '/departments/department-issues' },
    { title: 'Staff Management', icon: Users, url: '/departments/staff' },
    { title: 'Reports', icon: BarChart3, url: '/departments/reports' },
  ];

  const staffLinks = [
    { title: 'Dashboard', icon: Home, url: '/staff' },
    { title: 'My Tasks', icon: ClipboardList, url: '/staff/tasks' },
    { title: 'Task Map', icon: MapPin, url: '/staff/task-map' },
    { title: 'Completed', icon: CheckCircle, url: '/staff/completed' },
  ];

  const superAdminLinks = [
    { title: 'City Overview', icon: MapPin, url: '/superadmin' },
    { title: 'All Issues', icon: FileWarning, url: '/all-issues' },
    { title: 'User Management', icon: Users, url: '/users' },
    { title: 'Departments', icon: Building2, url: '/departments' },
    { title: 'Analytics', icon: BarChart3, url: '/analytics' },
  ];

  const getLinks = () => {
    switch(role) {
      case 'citizen':
        return citizenLinks;
      case 'department_admin':
        return departmentAdminLinks;
      case 'staff':
        return staffLinks;
      case 'super_admin':
        return superAdminLinks;
      default:
        return citizenLinks;
    }
  };
  const links = getLinks();

  const getRoleLabel = () => {
    switch (role) {
      case 'citizen':
        return 'Citizen Portal';
      case 'department_admin':
        return 'Department Admin';
      case 'staff':
        return 'Field Worker';
      case 'super_admin':
        return 'Super Admin';
      default:
        return 'Portal';
    }
  };


  return (
    <Sidebar className="border-r-0 md:border-r ">
      <SidebarHeader className="p-4 border-b  border-sidebar-border">
        <div className="flex items-center gap-3  rounded-lg">
          <div className="h-10 w-10 rounded-lg gradient-primary flex items-center justify-center">
            <Building2 className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="font-semibold text-sidebar-foreground">Civic Sarthi</h1>
            <p className="text-xs text-sidebar-foreground/70">{getRoleLabel()}</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-2">
        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/50 text-xs uppercase tracking-wider">
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {links.map((link) => {
                const isActive = location.pathname === link.url;
                return (
                  <SidebarMenuItem key={link.title}>
                    <SidebarMenuButton
                      asChild
                      className={cn(
                        'w-full justify-start gap-3 text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors',
                        isActive && 'bg-sidebar-accent text-sidebar-accent-foreground'
                      )}
                    >
                      <Link to={link.url}>
                        <link.icon className="h-4 w-4" />
                        <span>{link.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-2 border-t border-sidebar-border">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton className="w-full justify-start gap-3 text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
              <Settings className="h-4 w-4" />
              <span>Settings</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="w-full justify-start gap-3 text-sidebar-foreground/80 hover:bg-destructive/20 hover:text-destructive-foreground">
              <Link to="/">
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
