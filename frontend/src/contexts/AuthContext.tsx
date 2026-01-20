import { createContext, useContext, useState, type ReactNode } from 'react';
import type { User, UserRole } from '@/types';

interface AuthContextType {
  user: User;
  role: UserRole;
  switchRole: (role: UserRole) => void;
}

const mockUsers: Record<UserRole, User> = {
  citizen: {
    id: '1',
    name: 'Rahul Sharma',
    email: 'rahul@example.com',
    role: 'citizen',
    points: 450,
    avatar: 'RS',
  },
  department_admin: {
    id: '2',
    name: 'Priya Patel',
    email: 'priya.admin@gov.in',
    role: 'department_admin',
    department: 'water',
    avatar: 'PP',
  },
  staff: {
    id: '3',
    name: 'Amit Kumar',
    email: 'amit.staff@gov.in',
    role: 'staff',
    department: 'water',
    avatar: 'AK',
  },
  super_admin: {
    id: '4',
    name: 'Vijay Singh',
    email: 'vijay.superadmin@gov.in',
    role: 'super_admin',
    avatar: 'VS',
  },
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<UserRole>('citizen');

  const switchRole = (newRole: UserRole) => {
    setRole(newRole);
  };

  const value = {
    user: mockUsers[role],
    role,
    switchRole,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
