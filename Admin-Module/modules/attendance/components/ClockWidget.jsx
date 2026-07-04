import React, { useState, useEffect } from 'react';
import { 
  Play, 
  Square, 
  Coffee, 
  MapPin, 
  Clock, 
  CheckCircle,
  HelpCircle
} from 'lucide-react';

const ClockWidget = () => {
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [isBreakActive, setIsBreakActive] = useState(false);
  const [workSeconds, setWorkSeconds] = useState(0);
  const [breakSeconds, setBreakSeconds] = useState(0);
  const [location, setLocation] = useState('Bangalore Office');
  
  // Real-time ticking clock
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Work and Break timer ticking
  useEffect(() => {
    let interval = null;
    if (isCheckedIn && !isBreakActive) {
      interval = setInterval(() => {
        setWorkSeconds(prev => prev + 1);
      }, 1000);
    } else if (isCheckedIn && isBreakActive) {
      interval = setInterval(() => {
        setBreakSeconds(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isCheckedIn, isBreakActive]);

  const formatTimer = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600).toString().padStart(2, '0');
    const minutes = Math.floor((totalSeconds % 3600) / 60).toString().padStart(2, '0');
    const seconds = (totalSeconds % 60).toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  };

  const handleCheckIn = () => {
    setIsCheckedIn(true);
    setWorkSeconds(0);
    setBreakSeconds(0);
    setIsBreakActive(false);
  };

  const handleCheckOut = () => {
    alert(`Clock-Out successfully submitted! Total logged shift: ${formatTimer(workSeconds)}.`);
    setIsCheckedIn(false);
    setIsBreakActive(false);
  };

  return (
    <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 p-6 rounded-2xl border border-slate-800 shadow-xl text-white h-full flex flex-col justify-between relative overflow-hidden">
      <div className="absolute right-0 top-0 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div>
        <div className="flex items-center justify-between border-b border-slate-700/40 pb-3">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Attendance Register</span>
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[9px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/25">
            <MapPin className="h-2.5 w-2.5" />
            {location}
          </span>
        </div>

        {/* Live Date & Time clock display */}
        <div className="mt-5 text-center">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            {currentTime.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' })}
          </p>
          <h2 className="text-3xl font-black tracking-tight font-mono mt-1 text-indigo-100">
            {currentTime.toLocaleTimeString('en-US', { hour12: false })}
          </h2>
        </div>
      </div>

      {/* Running timers area */}
      {isCheckedIn && (
        <div className="grid grid-cols-2 gap-4 mt-6">
          <div className="p-3 bg-slate-800/40 border border-slate-700/30 rounded-xl text-center">
            <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Working Hours</p>
            <p className="text-sm font-bold text-indigo-300 font-mono mt-1">{formatTimer(workSeconds)}</p>
          </div>
          <div className="p-3 bg-slate-800/40 border border-slate-700/30 rounded-xl text-center">
            <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">On Break</p>
            <p className="text-sm font-bold text-amber-400 font-mono mt-1">{formatTimer(breakSeconds)}</p>
          </div>
        </div>
      )}

      {/* Interactive CTA Actions */}
      <div className="mt-6 flex flex-col gap-2 relative z-10">
        {!isCheckedIn ? (
          <button
            onClick={handleCheckIn}
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer shadow-md shadow-indigo-600/35"
          >
            <Play className="h-4 w-4 fill-current" />
            Clock In Shift
          </button>
        ) : (
          <div className="flex gap-2 w-full">
            <button
              onClick={() => setIsBreakActive(prev => !prev)}
              className={`flex-1 py-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer border ${
                isBreakActive 
                  ? 'bg-amber-500/20 border-amber-500/30 text-amber-300 hover:bg-amber-500/30' 
                  : 'bg-slate-800 border-slate-700 hover:bg-slate-700 text-slate-200'
              }`}
            >
              <Coffee className="h-4 w-4" />
              {isBreakActive ? 'End Break' : 'Take Break'}
            </button>
            <button
              onClick={handleCheckOut}
              className="flex-1 py-3 bg-rose-600 hover:bg-rose-700 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer shadow-md shadow-rose-600/35"
            >
              <Square className="h-4 w-4 fill-current" />
              Clock Out
            </button>
          </div>
        )}
      </div>

    </div>
  );
};

export default ClockWidget;
