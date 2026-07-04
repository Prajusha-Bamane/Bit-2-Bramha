import React from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ROUTES } from '../routes/routes.config';
import { 
  LayoutDashboard, 
  CalendarDays, 
  FileSpreadsheet, 
  Banknote, 
  LogOut,
  User,
  Building,
  Users,
  BarChart3
} from 'lucide-react';

const DashboardLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate(ROUTES.PUBLIC.LOGIN);
  };

  const navItems = [
    {
      name: 'Dashboard',
      path: ROUTES.PROTECTED.DASHBOARD,
      icon: LayoutDashboard,
      roles: ['Admin', 'Manager', 'Employee']
    },
    {
      name: 'Employees',
      path: ROUTES.PROTECTED.EMPLOYEES,
      icon: Users,
      roles: ['Admin', 'Manager', 'Employee']
    },
    {
      name: 'Attendance',
      path: ROUTES.PROTECTED.ATTENDANCE,
      icon: CalendarDays,
      roles: ['Admin', 'Manager', 'Employee']
    },
    {
      name: 'Leave Management',
      path: ROUTES.PROTECTED.LEAVES,
      icon: FileSpreadsheet,
      roles: ['Admin', 'Manager', 'Employee']
    },
    {
      name: 'Payroll systems',
      path: ROUTES.PROTECTED.PAYROLL,
      icon: Banknote,
      roles: ['Admin'] // Restricted to Admins as per routing strategy
    },
    {
      name: 'Reports & Analytics',
      path: ROUTES.PROTECTED.REPORTS,
      icon: BarChart3,
      roles: ['Admin', 'Manager']
    }
  ];

  // Filter menu items by active user role
  const visibleNavItems = navItems.filter(item => item.roles.includes(user?.role));

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
      {/* Sidebar Navigation */}
      <aside className="hidden md:flex md:flex-col md:w-64 bg-slate-950 text-slate-200 border-r border-slate-900">
        <div className="h-16 flex items-center px-6 gap-2 border-b border-slate-900 bg-slate-950">
          <Building className="h-6 w-6 text-primary" />
          <span className="text-lg font-bold tracking-tight text-white font-sans">Enterprise HRMS</span>
        </div>
        
        <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
          {visibleNavItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-150 ${
                  isActive
                    ? 'bg-primary text-white shadow'
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
            <div className="w-9 h-9 bg-slate-800 rounded-full flex items-center justify-center text-slate-300 font-bold">
              {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-slate-100 truncate">{user?.firstName} {user?.lastName}</p>
              <p className="text-xs text-slate-500 truncate">{user?.role}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center px-4 py-2.5 text-sm font-medium text-rose-400 hover:bg-rose-950/20 hover:text-rose-300 rounded-lg transition-colors duration-150"
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
            <h2 className="text-lg font-semibold text-slate-800">
              HR Operations Portal
            </h2>
          </div>
          
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200 gap-1.5">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
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
  );
};

export default DashboardLayout;
