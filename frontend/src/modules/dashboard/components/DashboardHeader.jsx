import React from 'react';
import { useAuth } from '../../../context/AuthContext';
import { CloudSun, Sun, Moon, Calendar } from 'lucide-react';

const DashboardHeader = () => {
  const { user } = useAuth();
  
  // Compute greeting dynamically based on current local hours
  const getGreeting = () => {
    const hours = new Date().getHours();
    if (hours < 12) return { text: 'Good Morning', icon: Sun, color: 'text-amber-500' };
    if (hours < 18) return { text: 'Good Afternoon', icon: CloudSun, color: 'text-orange-500' };
    return { text: 'Good Evening', icon: Moon, color: 'text-indigo-400' };
  };

  const greeting = getGreeting();
  const GreetingIcon = greeting.icon;

  // Format today's date
  const formatDate = () => {
    const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
    return new Date().toLocaleDateString('en-US', options);
  };

  return (
    <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 p-6 rounded-2xl border border-slate-800 shadow-xl relative overflow-hidden mb-6">
      {/* Background radial highlight */}
      <div className="absolute right-0 top-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
      
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 relative z-10">
        <div className="flex items-center gap-4">
          <div className="p-3.5 bg-slate-800/80 rounded-2xl border border-slate-700/50 text-white shadow-inner">
            <GreetingIcon className={`h-8 w-8 ${greeting.color} animate-pulse`} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-indigo-400 tracking-wide uppercase">Workspace</span>
              <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></span>
              <span className="text-xs text-slate-400">{user?.department || 'Operations'}</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight mt-0.5">
              {greeting.text}, {user?.firstName} {user?.lastName}
            </h1>
            <p className="text-sm text-slate-300 mt-1">
              Designation: <strong className="text-white font-semibold">{user?.role}</strong> | Let's make today productive and meaningful.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 bg-slate-800/40 px-4 py-3 rounded-xl border border-slate-700/30 self-start md:self-auto shadow-sm">
          <Calendar className="h-5 w-5 text-indigo-400" />
          <div className="text-left">
            <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Today's Date</p>
            <p className="text-sm font-semibold text-slate-100">{formatDate()}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
