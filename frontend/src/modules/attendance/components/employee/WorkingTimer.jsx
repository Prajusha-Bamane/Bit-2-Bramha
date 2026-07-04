import React from 'react';
import { Hourglass, Play, RefreshCw } from 'lucide-react';

const WorkingTimer = ({ timer, isClockedIn, isBreak, breakTimer }) => {
  // Assume a standard 8-hour shift target
  const targetShiftSecs = 8 * 3600;

  // Compute remaining hours (mock-up calculations)
  const getRemainingHours = () => {
    if (!isClockedIn) return '08h 00m';
    
    // Parse current timer 'HHh MMm SSs'
    const parts = timer.split(' ');
    if (parts.length < 3) return '08h 00m';
    
    const hrs = parseInt(parts[0]) || 0;
    const mins = parseInt(parts[1]) || 0;
    const secs = parseInt(parts[2]) || 0;
    
    const elapsedSecs = hrs * 3600 + mins * 60 + secs;
    const diffSecs = targetShiftSecs - elapsedSecs;
    
    if (diffSecs <= 0) return 'Shift Completed 🎉';
    
    const diffHrs = Math.floor(diffSecs / 3600);
    const diffMins = Math.floor((diffSecs % 3600) / 60);
    return `${String(diffHrs).padStart(2, '0')}h ${String(diffMins).padStart(2, '0')}m remaining`;
  };

  return (
    <div className="bg-slate-950 text-slate-100 p-6 rounded-2xl border border-slate-850 shadow-inner flex flex-col justify-between h-full relative overflow-hidden group">
      {/* Background Radial Glow */}
      <div className="absolute -right-20 -bottom-20 w-44 h-44 bg-indigo-500/5 rounded-full blur-2xl group-hover:bg-indigo-500/10 transition-colors duration-300"></div>

      <div className="space-y-4 relative z-10">
        <div className="flex items-center justify-between border-b border-slate-900 pb-3">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5 font-sans">
            <Hourglass className="h-3.5 w-3.5 text-indigo-400" />
            Active Session Timer
          </span>
          <span className={`h-2 w-2 rounded-full ${
            isClockedIn && !isBreak 
              ? 'bg-emerald-500 animate-ping' 
              : isBreak 
              ? 'bg-amber-500 animate-pulse' 
              : 'bg-slate-700'
          }`}></span>
        </div>

        {/* Big Clock Counter */}
        <div className="text-center py-4">
          <p className="text-4xl font-black font-mono tracking-widest text-white select-none">
            {timer}
          </p>
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mt-2 font-sans">
            Logged Working Hours
          </p>
        </div>

        {/* Break hours timer */}
        {isClockedIn && (
          <div className="flex justify-between items-center bg-slate-900/60 p-3 rounded-xl border border-slate-900 text-xs font-sans">
            <span className="text-slate-400 font-semibold flex items-center gap-1.5">
              <RefreshCw className={`h-3.5 w-3.5 text-amber-500 ${isBreak ? 'animate-spin' : ''}`} />
              Break Timer:
            </span>
            <span className="font-mono font-bold text-slate-200">{breakTimer}</span>
          </div>
        )}
      </div>

      {/* Target status bar */}
      <div className="pt-4 border-t border-slate-900/80 flex items-center justify-between text-xs mt-4 relative z-10">
        <span className="text-slate-500 font-bold uppercase tracking-wider text-[9px] font-sans">Shift Target: 8.00 Hrs</span>
        <span className="font-mono font-bold text-emerald-400">{getRemainingHours()}</span>
      </div>
    </div>
  );
};

export default WorkingTimer;
