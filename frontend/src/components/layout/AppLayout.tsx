import {useMemo } from "react";
import { useLocation, Outlet } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { AppSidebar } from "./AppSidebar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Bell, Search, Loader2 } from "lucide-react"; // Loader2 add kiya
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import type { UserRole } from "@/types";

export function AppLayout() {
  const { user, role } = useAuth();
  const location = useLocation();

  const roleFromPath = useMemo<UserRole>(() => {
    const p = location.pathname.toLowerCase();
    if (p.startsWith("/citizen")) return "citizen";
    if (p.startsWith("/departments")) return "department_admin";
    if (p.startsWith("/staff")) return "staff";
    return "citizen";
  }, [location.pathname]);

  

  // 1. CRASH GUARD: Agar user load nahi hua, toh loading dikhao 
  // Iske bina page white/blank ho jata hai
  if (!user) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center gap-2">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="text-muted-foreground animate-pulse text-sm font-medium">
          Loading your profile...
        </p>
      </div>
    );
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar role={role || roleFromPath} />

        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="h-16 border-b bg-card flex items-center justify-between px-4 lg:px-6 sticky top-0 z-10">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="lg:hidden" />

              <div className="hidden md:flex items-center gap-2 bg-muted rounded-lg px-3 py-2">
                <Search className="h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search issues..."
                  className="border-0 bg-transparent h-auto p-0 focus-visible:ring-0 w-64 text-sm"
                />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 h-2 w-2 bg-destructive rounded-full border border-card" />
              </Button>

              <div className="flex items-center gap-3 pl-3 border-l">
                <div className="hidden sm:block text-right">
                  {/* REAL DATA FIX: user.name ki jagah user?.fullname (ya name) safe access */}
                  <p className="text-sm font-semibold leading-none mb-1">
                    {user?.fullname || user?.name || "Civic User"}
                  </p>
                  <p className="text-[11px] text-muted-foreground font-medium capitalize">
                    {(role || roleFromPath)?.replace("_", " ")}
                  </p>
                </div>

                <Avatar className="h-9 w-9 border">
                  <AvatarFallback className="bg-primary text-primary-foreground text-xs font-bold">
                    {/* User ke name se Initials nikalna (e.g. Rahul Kumar -> RK) */}
                    {(user?.fullname || user?.name || "U")
                      .split(" ")
                      .map((n: string) => n[0])
                      .join("")
                      .toUpperCase()
                      .substring(0, 2)}
                  </AvatarFallback>
                </Avatar>
              </div>
            </div>
          </header>

          {/* Page content */}
          <main className="flex-1 p-4 lg:p-6 overflow-auto bg-muted/10">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}