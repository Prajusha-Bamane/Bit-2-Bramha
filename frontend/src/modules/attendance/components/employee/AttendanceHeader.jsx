import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin } from 'lucide-react';

const AttendanceHeader = ({ status, workingHoursToday }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = () => {
    return time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };

  const formatDate = () => {
    return time.toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  };

  return (
    <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-emerald-950 p-6 rounded-2xl border border-slate-800 shadow-xl relative overflow-hidden mb-6">
      {/* Glow Orbs */}
      <div className="absolute right-0 top-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-[80px] pointer-events-none"></div>

      <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-indigo-400 tracking-wider uppercase font-sans">Self-Service Logs</span>
            <span className="w-1 h-1 bg-slate-500 rounded-full"></span>
            <span className={`inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
              status === 'Clocked In' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-slate-800 text-slate-400'
            }`}>
              {status}
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight mt-1 font-sans">
            My Attendance Desk
          </h1>
          <p className="text-sm text-slate-300 mt-1 font-medium font-sans">
            Monitor check-ins, record working sessions, request logs update, and track payroll hours.
          </p>
        </div>

        {/* Dynamic Clocks */}
        <div className="flex gap-4 self-start md:self-auto flex-wrap">
          {/* Time & Date Card */}
          <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800/80 shadow-inner flex flex-col items-start gap-1">
            <div className="flex items-center gap-2 text-slate-300">
              <Clock className="h-4 w-4 text-emerald-450 animate-pulse" />
              <span className="text-sm font-mono font-bold tracking-wider">{formatTime()}</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-450 text-[10px] font-semibold font-sans mt-0.5">
              <Calendar className="h-3.5 w-3.5 text-indigo-400" />
              <span>{formatDate()}</span>
            </div>
          </div>

          {/* Today Summary hours card */}
          <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800/80 shadow-inner flex flex-col justify-center">
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block font-sans">Hours Today</span>
            <p className="text-lg font-black text-emerald-400 font-mono mt-0.5">{workingHoursToday}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceHeader;
