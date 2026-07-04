import React from 'react';
import { Routes, Route, Navigate, useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ROUTES } from './routes.config';
import AdminLayout from '../layouts/AdminLayout';
import EmployeeLayout from '../layouts/EmployeeLayout';
import Login from '../modules/auth/pages/Login';
import EmployeeDashboard from '../modules/employee/pages/EmployeeDashboard';

import DashboardContainer from '../modules/dashboard/components/DashboardContainer';
import EmployeeList from '../modules/employee/pages/EmployeeList';
import EmployeeDetails from '../modules/employee/pages/EmployeeDetails';
import EmployeeAddEdit from '../modules/employee/pages/EmployeeAddEdit';
import AttendanceContainer from '../modules/attendance/pages/AttendanceContainer';
import LeaveContainer from '../modules/leave/pages/LeaveContainer';
import PayrollContainer from '../modules/payroll/pages/PayrollContainer';
import ReportsContainer from '../modules/reports/pages/ReportsContainer';
import EmployeeLeavePage from '../modules/employee/pages/EmployeeLeavePage';
import EmployeePayroll from '../modules/employee/pages/EmployeePayroll';
import EmployeeProfile from '../modules/employee/pages/EmployeeProfile';
import AdminNotificationCenter from '../modules/notifications/pages/AdminNotificationCenter';
import EmployeeNotificationCenter from '../modules/notifications/pages/EmployeeNotificationCenter';
import AdminSettings from '../modules/settings/pages/AdminSettings';
import EmployeeSettings from '../modules/settings/pages/EmployeeSettings';

const DashboardHome = DashboardContainer;
const AttendancePlaceholder = AttendanceContainer;
const LeavesPlaceholder = LeaveContainer;
const PayrollPlaceholder = PayrollContainer;

const EmployeePayrollPlaceholder = () => (
  <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm font-sans max-w-2xl">
    <h2 className="text-xl font-bold text-slate-800 mb-2">My Payroll Statements</h2>
    <p className="text-slate-505 text-sm">Welcome to your earnings and payslips portal. Your monthly compensation logs are processed directly into your HDFC Bank account.</p>
  </div>
);

const EmployeeProfilePlaceholder = () => (
  <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm font-sans max-w-2xl">
    <h2 className="text-xl font-bold text-slate-800 mb-2">My Profile</h2>
    <p className="text-slate-505 text-sm">Update your corporate credentials, personal emergency contacts, and home address logs.</p>
  </div>
);

const EmployeeDocumentsPlaceholder = () => (
  <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm font-sans max-w-2xl">
    <h2 className="text-xl font-bold text-slate-800 mb-2">Documents Vault</h2>
    <p className="text-slate-550 text-sm">Access your offer letters, company policies, insurance guidelines, and signed bonds.</p>
  </div>
);

const EmployeeNotificationsPlaceholder = () => (
  <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm font-sans max-w-2xl">
    <h2 className="text-xl font-bold text-slate-800 mb-2">Inbox & Notifications</h2>
    <p className="text-slate-550 text-sm">View system alerts, team announcements, and HR broadcasts.</p>
  </div>
);

const EmployeeSettingsPlaceholder = () => (
  <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm font-sans max-w-2xl">
    <h2 className="text-xl font-bold text-slate-800 mb-2">Account Settings</h2>
    <p className="text-slate-550 text-sm">Manage password security, multi-factor settings, and active session configurations.</p>
  </div>
);

const Unauthorized = () => (
  <div className="flex flex-col items-center justify-center min-h-[60vh] text-center font-sans">
    <div className="w-16 h-16 bg-red-100 dark:bg-red-950/20 text-red-650 rounded-full flex items-center justify-center mb-4 text-2xl font-bold border border-red-200">⚠️</div>
    <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-2">Access Forbidden</h1>
    <p className="text-slate-500 max-w-md text-sm">
      You are not authorized to view this page. This resource is restricted to specific role levels.
    </p>
  </div>
);

const NotFound = () => (
  <div className="flex flex-col items-center justify-center min-h-screen text-center bg-slate-50 p-6 font-sans">
    <h1 className="text-7xl font-extrabold text-slate-350 tracking-widest">404</h1>
    <h2 className="text-2xl font-bold text-slate-800 mt-4 mb-2">Oops! Page not found</h2>
    <p className="text-slate-500 max-w-md text-sm mb-6">
      The address does not exist or has been relocated to another directory link.
    </p>
    <a href="/" className="px-6 py-2.5 bg-indigo-600 text-white font-semibold rounded-xl text-sm shadow hover:bg-indigo-750 transition-colors duration-150">
      Back to Home
    </a>
  </div>
);

export const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return isAuthenticated ? children : <Navigate to={ROUTES.PUBLIC.LOGIN} replace />;
};

export const RoleGuard = ({ children, allowedRoles }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to={ROUTES.PUBLIC.LOGIN} replace />;
  return allowedRoles.includes(user.role) ? children : <Navigate to={ROUTES.PROTECTED.UNAUTHORIZED} replace />;
};

// Root Redirector based on User Role
const RootRedirect = () => {
  const { user, isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return <Navigate to={ROUTES.PUBLIC.LOGIN} replace />;
  }

  if (user.role === 'Admin' || user.role === 'Manager') {
    return <Navigate to={ROUTES.ADMIN.DASHBOARD} replace />;
  }

  if (user.role === 'Employee') {
    return <Navigate to={ROUTES.EMPLOYEE.DASHBOARD} replace />;
  }

  return <Navigate to={ROUTES.PROTECTED.UNAUTHORIZED} replace />;
};

// Dynamic Legacy Redirect Handler
const LegacyRedirect = ({ target }) => {
  const { user, isAuthenticated } = useAuth();
  const params = useParams();
  
  if (!isAuthenticated || !user) return <Navigate to={ROUTES.PUBLIC.LOGIN} replace />;
  
  const prefix = (user.role === 'Admin' || user.role === 'Manager') ? '/admin' : '/employee';
  
  // Guard legacy admin routes
  if (user.role === 'Employee' && (target === 'employees' || target === 'payroll' || target === 'reports')) {
    return <Navigate to={ROUTES.PROTECTED.UNAUTHORIZED} replace />;
  }
  
  let redirectPath = `${prefix}/${target}`;
  if (target === 'employees' && params.id) {
    redirectPath = `${prefix}/employees/${params.id}`;
  } else if (target === 'employees/edit' && params.id) {
    redirectPath = `${prefix}/employees/edit/${params.id}`;
  } else if (target === 'employees/new') {
    redirectPath = `${prefix}/employees/new`;
  }
  
  return <Navigate to={redirectPath} replace />;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path={ROUTES.PUBLIC.LOGIN} element={<Login />} />

      {/* Root Path dynamic mapping */}
      <Route path="/" element={<RootRedirect />} />

      {/* Admin Portal Routing */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <RoleGuard allowedRoles={['Admin', 'Manager']}>
              <AdminLayout />
            </RoleGuard>
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to={ROUTES.ADMIN.DASHBOARD} replace />} />
        <Route path="dashboard" element={<DashboardHome />} />
        <Route path="employees" element={<EmployeeList />} />
        <Route path="employees/:id" element={<EmployeeDetails />} />
        <Route path="employees/new" element={<EmployeeAddEdit />} />
        <Route path="employees/edit/:id" element={<EmployeeAddEdit />} />
        <Route path="attendance" element={<AttendancePlaceholder />} />
        <Route path="leaves" element={<LeavesPlaceholder />} />
        
        <Route
          path="payroll"
          element={
            <RoleGuard allowedRoles={['Admin']}>
              <PayrollPlaceholder />
            </RoleGuard>
          }
        />
        <Route
          path="reports"
          element={
            <RoleGuard allowedRoles={['Admin', 'Manager']}>
              <ReportsContainer />
            </RoleGuard>
          }
        />
        <Route path="notifications" element={<AdminNotificationCenter />} />
        <Route path="settings" element={<AdminSettings />} />
        <Route path="unauthorized" element={<Unauthorized />} />
      </Route>

      {/* Employee Portal Routing */}
      <Route
        path="/employee"
        element={
          <ProtectedRoute>
            <RoleGuard allowedRoles={['Employee']}>
              <EmployeeLayout />
            </RoleGuard>
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to={ROUTES.EMPLOYEE.DASHBOARD} replace />} />
        <Route path="dashboard" element={<EmployeeDashboard />} />
        <Route path="attendance" element={<AttendancePlaceholder />} />
        <Route path="leaves" element={<EmployeeLeavePage />} />
        <Route path="payroll" element={<EmployeePayroll />} />
        <Route path="profile" element={<EmployeeProfile />} />
        <Route path="documents" element={<EmployeeDocumentsPlaceholder />} />
        <Route path="notifications" element={<EmployeeNotificationCenter />} />
        <Route path="settings" element={<EmployeeSettings />} />
        <Route path="unauthorized" element={<Unauthorized />} />
      </Route>

      {/* Legacy Redirect paths for backward compatibility */}
      <Route path="/dashboard" element={<LegacyRedirect target="dashboard" />} />
      <Route path="/employees" element={<LegacyRedirect target="employees" />} />
      <Route path="/employees/:id" element={<LegacyRedirect target="employees" />} />
      <Route path="/employees/new" element={<LegacyRedirect target="employees/new" />} />
      <Route path="/employees/edit/:id" element={<LegacyRedirect target="employees/edit" />} />
      <Route path="/attendance" element={<LegacyRedirect target="attendance" />} />
      <Route path="/leaves" element={<LegacyRedirect target="leaves" />} />
      <Route path="/payroll" element={<LegacyRedirect target="payroll" />} />
      <Route path="/reports" element={<LegacyRedirect target="reports" />} />
      <Route path={ROUTES.PROTECTED.UNAUTHORIZED} element={<Unauthorized />} />

      {/* 404 Fallback */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
export default AppRoutes;
