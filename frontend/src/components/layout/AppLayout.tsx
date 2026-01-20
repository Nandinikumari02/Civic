import { useEffect, useMemo } from "react";
import { useLocation, Outlet } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { AppSidebar } from "./AppSidebar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Bell, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import type { UserRole } from "@/types";

export function AppLayout() {
  const { user, role, switchRole } = useAuth();
  const location = useLocation();

  
  const roleFromPath = useMemo<UserRole>(() => {
    const p = location.pathname.toLowerCase();

    if (p.startsWith("/citizen")) return "citizen";
    if (p.startsWith("/departments")) return "department_admin";
    if (p.startsWith("/staff")) return "staff";

    return "citizen";
  }, [location.pathname]);

  // 🔄 Keep AuthContext in sync with URL
  useEffect(() => {
    if (role !== roleFromPath) {
      switchRole(roleFromPath);
    }
  }, [roleFromPath, role, switchRole]);

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar role={role} />

        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="h-16 border-b bg-card flex items-center justify-between px-4 lg:px-6">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="lg:hidden" />

              <div className="hidden md:flex items-center gap-2 bg-muted rounded-lg px-3 py-2">
                <Search className="h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search issues..."
                  className="border-0 bg-transparent h-auto p-0 focus-visible:ring-0 w-64"
                />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 h-2 w-2 bg-destructive rounded-full" />
              </Button>

              <div className="flex items-center gap-3 pl-3 border-l">
                <div className="hidden sm:block text-right">
                  <p className="text-sm font-medium">{user.name}</p>
                  <p className="text-xs text-muted-foreground capitalize">
                    {role.replace("_", " ")}
                  </p>
                </div>

                <Avatar className="h-9 w-9">
                  <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                    {user.avatar}
                  </AvatarFallback>
                </Avatar>
              </div>
            </div>
          </header>

          {/* Page content */}
          <main className="flex-1 p-4 lg:p-6 overflow-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
