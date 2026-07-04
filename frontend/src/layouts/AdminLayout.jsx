import React from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ROUTES } from '../routes/routes.config';
import { NotificationProvider } from '../modules/notifications/context/NotificationContext';
import NotificationDropdown from '../modules/notifications/components/NotificationDropdown';
import { 
  LayoutDashboard, 
  CalendarDays, 
  FileSpreadsheet, 
  Banknote, 
  LogOut,
  Building,
  Users,
  BarChart3,
  Settings
} from 'lucide-react';

const AdminLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate(ROUTES.PUBLIC.LOGIN);
  };

  const navItems = [
    {
      name: 'Dashboard',
      path: ROUTES.ADMIN.DASHBOARD,
      icon: LayoutDashboard,
      roles: ['Admin', 'Manager']
    },
    {
      name: 'Employees',
      path: ROUTES.ADMIN.EMPLOYEES,
      icon: Users,
      roles: ['Admin', 'Manager']
    },
    {
      name: 'Attendance',
      path: ROUTES.ADMIN.ATTENDANCE,
      icon: CalendarDays,
      roles: ['Admin', 'Manager']
    },
    {
      name: 'Leave Management',
      path: ROUTES.ADMIN.LEAVES,
      icon: FileSpreadsheet,
      roles: ['Admin', 'Manager']
    },
    {
      name: 'Payroll systems',
      path: ROUTES.ADMIN.PAYROLL,
      icon: Banknote,
      roles: ['Admin']
    },
    {
      name: 'Reports & Analytics',
      path: ROUTES.ADMIN.REPORTS,
      icon: BarChart3,
      roles: ['Admin', 'Manager']
    },
    {
      name: 'System Settings',
      path: '/admin/settings',
      icon: Settings,
      roles: ['Admin']
    }
  ];

  const visibleNavItems = navItems.filter(item => item.roles.includes(user?.role));

  return (
    <NotificationProvider>
      <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
      {/* Sidebar Navigation */}
      <aside className="hidden md:flex md:flex-col md:w-64 bg-slate-950 text-slate-200 border-r border-slate-900">
        <div className="h-16 flex items-center px-6 gap-2 border-b border-slate-900 bg-slate-950">
          <Building className="h-6 w-6 text-indigo-500" />
          <span className="text-lg font-bold tracking-tight text-white font-sans">AURA Admin Portal</span>
        </div>
        
        <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
          {visibleNavItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center px-4 py-3 text-sm font-semibold rounded-lg transition-colors duration-150 ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow shadow-indigo-900/50'
                    : 'text-slate-400 hover:bg-slate-900 hover:text-slate-100'
                }`
              }
            >
              <item.icon className="mr-3 h-5 w-5 flex-shrink-0" />
              {item.name}
            </NavLink>
          ))}
        </nav>

        {/* User Info & Logout footer */}
        <div className="p-4 border-t border-slate-900 bg-slate-950/50">
          <div className="flex items-center gap-3 px-2 py-3 mb-2">
            <div className="w-9 h-9 bg-slate-800 rounded-full flex items-center justify-center text-slate-350 font-bold border border-slate-700">
              {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-slate-100 truncate">{user?.firstName} {user?.lastName}</p>
              <p className="text-xs text-slate-500 truncate">{user?.role} Portal</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center px-4 py-2.5 text-sm font-semibold text-rose-400 hover:bg-rose-950/20 hover:text-rose-350 rounded-lg transition-colors duration-150 cursor-pointer"
          >
            <LogOut className="mr-3 h-5 w-5" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main View Area */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Header bar */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 z-10 shadow-sm">
          <div className="flex items-center gap-4">
            <h2 className="text-lg font-bold text-slate-800">
              HR Operations Admin
            </h2>
          </div>
          
          <div className="flex items-center gap-4">
            <NotificationDropdown />
            
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-100 gap-1.5">
              <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></span>
              {user?.role} Mode
            </span>
          </div>
        </header>

        {/* Content Outlet wrapper */}
        <main className="flex-1 overflow-y-auto p-6 bg-slate-50">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
    </NotificationProvider>
  );
};

export default AdminLayout;
