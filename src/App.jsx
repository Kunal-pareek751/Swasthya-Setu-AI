import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import HealthCenters from './pages/HealthCenters';
import MedicineStock from './pages/MedicineStock';
import BedAvailability from './pages/BedAvailability';
import DoctorAttendance from './pages/DoctorAttendance';
import AIAssistant from './pages/AIAssistant';

function DashboardLayout({ children }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const isCollapsed = sidebarCollapsed;

  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar
        collapsed={isCollapsed}
        onToggle={() => setMobileSidebarOpen(!mobileSidebarOpen)}
      />
      <div className={`transition-all duration-300 ${isCollapsed ? 'lg:ml-20' : 'lg:ml-64'}`}>
        <Navbar onMenuToggle={() => setMobileSidebarOpen(!mobileSidebarOpen)} />
        <main className="p-4 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Routes>
      <Route path="/" element={isLoggedIn ? <Navigate to="/dashboard" /> : <Login />} />
      <Route
        path="/dashboard"
        element={
          <DashboardLayout>
            <Dashboard />
          </DashboardLayout>
        }
      />
      <Route
        path="/centers"
        element={
          <DashboardLayout>
            <HealthCenters />
          </DashboardLayout>
        }
      />
      <Route
        path="/medicine"
        element={
          <DashboardLayout>
            <MedicineStock />
          </DashboardLayout>
        }
      />
      <Route
        path="/beds"
        element={
          <DashboardLayout>
            <BedAvailability />
          </DashboardLayout>
        }
      />
      <Route
        path="/doctors"
        element={
          <DashboardLayout>
            <DoctorAttendance />
          </DashboardLayout>
        }
      />
      <Route
        path="/ai-assistant"
        element={
          <DashboardLayout>
            <AIAssistant />
          </DashboardLayout>
        }
      />
    </Routes>
  );
}
