
import { Route, Routes,  BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import LandingPage from './pages/Landing'
import Register from './pages/auth/register'
import Login from './pages/auth/login';
import { AppLayout } from './components/layout/AppLayout';
import { Toaster } from 'sonner'
// Citizen
import {CitizenDashboard} from './pages/citizen/CitizenDashboard';
import IssueFeed from './pages/citizen/IssueFeed';
import Rewards from './pages/citizen/Rewards';
import Notifications from './pages/citizen/Notifications';


// Departments
import { DepartmentAdminDashboard } from './pages/departments/DepartmentsDashboard';
import DepartmentIssues from './pages/departments/DepartmentIssues';
import Reports from './pages/departments/Reports';
import StaffManagement from './pages/departments/StaffManagement';


//Staff
import { StaffDashboard } from './pages/staff/StaffDashboard';




function App() {
  return (
   <BrowserRouter>
  <AuthProvider>
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="/citizen" element={<AppLayout />}>
        <Route index element={<CitizenDashboard />} />
        <Route path="issues" element={<IssueFeed />} />
        <Route path="rewards" element={<Rewards />} />
        <Route path="notifications" element={<Notifications />} />
    </Route>


      <Route path="/departments" element={<AppLayout />}>
        <Route index element={<DepartmentAdminDashboard />} />
        <Route path="department-issues" element={<DepartmentIssues />} />
        <Route path="reports" element={<Reports />} />
        <Route path="staff" element={<StaffManagement />} />
     </Route>


      <Route path="/staff" element={<AppLayout />}>
        <Route index element={<StaffDashboard />} />
      </Route>
    </Routes>

    <Toaster position="top-right" richColors />
  </AuthProvider>
</BrowserRouter>
  )
}

export default App
