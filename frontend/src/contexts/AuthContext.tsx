import { createContext, useContext, useState, useEffect, type ReactNode, useCallback } from 'react';
import type { User, UserRole } from '@/types';

interface AuthContextType {
  user: User | null;
  token: string | null;
  role: UserRole | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  switchRole: (newRole: UserRole) => void; // Ab red line nahi aayegi
  isLoading: boolean; // Loading state check karne ke liye
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));
  const [isLoading, setIsLoading] = useState(true); // Initial loading true

  const role = user?.role ?? null;

  // Role badalne ka function (AppLayout ke liye)
  const switchRole = useCallback((newRole: UserRole) => {
    if (user && user.role !== newRole) {
      setUser({ ...user, role: newRole });
    }
  }, [user]);

  useEffect(() => {
    const fetchUser = async () => {
      if (token) {
        try {
          const res = await fetch("http://localhost:5000/api/auth/me", {
            headers: { Authorization: `Bearer ${token}` },
          });
          
          const data = await res.json();
          
          if (res.ok) {
            // BACKEND FIX: Agar backend seedha object bhej raha hai toh data use karein
            // Agar backend { user: {...} } bhej raha hai toh data.user use karein
            setUser(data.user || data); 
          } else {
            logout();
          }
        } catch (error) {
          console.error("Auth Error:", error);
          logout();
        }
      }
      setIsLoading(false); // Data fetch hone ke baad loading false
    };

    fetchUser();
  }, [token]);

  const login = async (email: string, password: string) => {
    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Login failed");

    const userToSet = data.user || data;
    setToken(data.token);
    localStorage.setItem("token", data.token);
    setUser(userToSet);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, token, role, login, logout, switchRole, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
}