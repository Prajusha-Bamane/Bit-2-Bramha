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
  LogOut,
  Building,
  Clock,
  CalendarDays as RequestLeaveIcon,
  ChevronRight,
  Banknote,
  User,
  FileText,
  Bell,
  Settings
} from 'lucide-react';

const EmployeeLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate(ROUTES.PUBLIC.LOGIN);
  };

  const navItems = [
    {
      name: 'Dashboard',
      path: ROUTES.EMPLOYEE.DASHBOARD,
      icon: LayoutDashboard,
    },
    {
      name: 'My Attendance',
      path: ROUTES.EMPLOYEE.ATTENDANCE,
      icon: CalendarDays,
    },
    {
      name: 'My Leave',
      path: ROUTES.EMPLOYEE.LEAVES,
      icon: FileSpreadsheet,
    },
    {
      name: 'My Payroll',
      path: ROUTES.EMPLOYEE.PAYROLL,
      icon: Banknote,
    },
    {
      name: 'My Profile',
      path: ROUTES.EMPLOYEE.PROFILE,
      icon: User,
    },
    {
      name: 'Documents',
      path: ROUTES.EMPLOYEE.DOCUMENTS,
      icon: FileText,
    },
    {
      name: 'Notifications',
      path: ROUTES.EMPLOYEE.NOTIFICATIONS,
      icon: Bell,
    },
    {
      name: 'Settings',
      path: ROUTES.EMPLOYEE.SETTINGS,
      icon: Settings,
    }
  ];

  return (
    <NotificationProvider>
      <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
      {/* Compact Sidebar */}
      <aside className="hidden md:flex md:flex-col md:w-60 bg-slate-900 text-slate-200 border-r border-slate-800">
        {/* Brand */}
        <div className="h-16 flex items-center px-5 gap-2 border-b border-slate-800 bg-slate-900">
          <Building className="h-5 w-5 text-emerald-500" />
          <span className="text-base font-bold tracking-tight text-white font-sans">AURA Employee</span>
        </div>

        {/* Clean Profile Section */}
        <div className="p-5 border-b border-slate-800 bg-slate-900/50">
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center text-slate-350 font-bold text-xl border-2 border-emerald-500/30 shadow-inner mb-3">
              {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
            </div>
            <h3 className="text-sm font-bold text-slate-100">{user?.firstName} {user?.lastName}</h3>
            <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider mt-0.5">{user?.role}</p>
            <p className="text-[10px] text-slate-500 mt-1">{user?.department || 'Operations'}</p>
            
            <span className="inline-flex items-center mt-3 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 gap-1">
              <span className="w-1 h-1 bg-emerald-400 rounded-full animate-pulse"></span>
              Active Session
            </span>
          </div>
        </div>
        
        {/* Simplified Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          <p className="px-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Workspace</p>
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center px-3 py-2.5 text-xs font-bold rounded-xl transition-all duration-150 ${
                  isActive
                    ? 'bg-emerald-600 text-white shadow shadow-emerald-950/50'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-slate-100'
                }`
              }
            >
              <item.icon className="mr-2.5 h-4.5 w-4.5 flex-shrink-0" />
              {item.name}
            </NavLink>
          ))}

          {/* Quick Access Cards */}
          <div className="pt-6 mt-4 border-t border-slate-800/60 space-y-3">
            <p className="px-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Quick Operations</p>
            
            {/* Quick Card 1: Clock In/Out */}
            <div 
              onClick={() => navigate(ROUTES.EMPLOYEE.ATTENDANCE)}
              className="group mx-2 p-3 bg-slate-800/40 hover:bg-slate-800 border border-slate-800/80 hover:border-slate-700/80 rounded-xl transition-all duration-200 cursor-pointer flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-lg group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300">
                  <Clock className="h-3.5 w-3.5" />
                </div>
                <div className="text-left">
                  <p className="text-[10px] font-bold text-slate-200">Log Hours</p>
                  <p className="text-[9px] text-slate-500">Record attendance</p>
                </div>
              </div>
              <ChevronRight className="h-3 w-3 text-slate-500 group-hover:text-slate-350 transition-colors" />
            </div>

            {/* Quick Card 2: Request Leave */}
            <div 
              onClick={() => navigate(ROUTES.EMPLOYEE.LEAVES)}
              className="group mx-2 p-3 bg-slate-800/40 hover:bg-slate-800 border border-slate-800/80 hover:border-slate-700/80 rounded-xl transition-all duration-200 cursor-pointer flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded-lg group-hover:bg-amber-500 group-hover:text-white transition-all duration-300">
                  <RequestLeaveIcon className="h-3.5 w-3.5" />
                </div>
                <div className="text-left">
                  <p className="text-[10px] font-bold text-slate-200">Apply Leave</p>
                  <p className="text-[9px] text-slate-500">Request time off</p>
                </div>
              </div>
              <ChevronRight className="h-3 w-3 text-slate-500 group-hover:text-slate-350 transition-colors" />
            </div>
          </div>
        </nav>

        {/* User Info & Logout footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-900/50">
          <button
            onClick={handleLogout}
            className="w-full flex items-center px-4 py-2.5 text-xs font-bold text-rose-450 hover:bg-rose-950/20 hover:text-rose-400 rounded-xl transition-colors duration-150 cursor-pointer"
          >
            <LogOut className="mr-2.5 h-4.5 w-4.5" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main View Area */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Header bar */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 z-10 shadow-sm">
          <div className="flex items-center gap-4">
            <h2 className="text-sm font-bold text-slate-800">
              Employee Self-Service Desk
            </h2>
          </div>
          
          <div className="flex items-center gap-4">
            <NotificationDropdown />
            
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-100 gap-1.5">
              <span className="w-1 h-1 bg-emerald-500 rounded-full"></span>
              {user?.role} Portal
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

export default EmployeeLayout;
