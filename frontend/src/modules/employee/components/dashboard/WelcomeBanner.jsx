import React, { useState, useEffect } from 'react';
import { Clock, Calendar, Sparkles } from 'lucide-react';

const WelcomeBanner = ({ employee }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const getGreeting = () => {
    const hours = time.getHours();
    if (hours < 12) return 'Good Morning';
    if (hours < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  const formatTime = () => {
    return time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };

  const formatDate = () => {
    return time.toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  };

  return (
    <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-emerald-950 p-6 md:p-8 rounded-3xl border border-slate-800/80 shadow-2xl relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute right-0 top-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-[80px] pointer-events-none"></div>
      <div className="absolute -left-10 -bottom-10 w-64 h-64 bg-emerald-500/5 rounded-full blur-[80px] pointer-events-none"></div>

      <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div className="flex items-center gap-5">
          {/* Avatar circle */}
          <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-tr from-emerald-600 to-indigo-600 rounded-2xl flex items-center justify-center text-white font-extrabold text-2xl shadow-lg border border-white/10 flex-shrink-0">
            {employee.avatar}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-emerald-400 tracking-wider uppercase">{employee.department}</span>
              <span className="w-1 h-1 bg-slate-500 rounded-full"></span>
              <span className="text-xs font-medium text-slate-400">ID: {employee.employeeId}</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight mt-1">
              {getGreeting()}, {employee.firstName} {employee.lastName}
            </h1>
            <p className="text-sm text-slate-300 mt-1 font-medium">
              {employee.role} | Working remotely with VPN secure logs.
            </p>
          </div>
        </div>

        {/* Real-time ticking Clock and Date */}
        <div className="flex flex-col gap-2.5 md:items-end bg-slate-900/40 border border-slate-800/60 p-4 rounded-2xl shadow-inner md:self-center">
          <div className="flex items-center gap-2 text-slate-350">
            <Clock className="h-4 w-4 text-emerald-400 animate-pulse" />
            <span className="text-sm font-mono font-bold tracking-wider">{formatTime()}</span>
          </div>
          <div className="flex items-center gap-2 text-slate-400 text-xs font-semibold">
            <Calendar className="h-3.5 w-3.5 text-indigo-400" />
            <span>{formatDate()}</span>
          </div>
        </div>
      </div>

      {/* Motivational message line */}
      {employee.motivationalMessage && (
        <div className="relative z-10 mt-6 pt-5 border-t border-slate-800/80 flex items-center gap-2.5 text-xs text-slate-300 font-sans italic bg-slate-950/20 px-4 py-2.5 rounded-xl border border-slate-900">
          <Sparkles className="h-4 w-4 text-emerald-400 flex-shrink-0 animate-bounce" />
          <span>{employee.motivationalMessage}</span>
        </div>
      )}
    </div>
  );
};

export default WelcomeBanner;
