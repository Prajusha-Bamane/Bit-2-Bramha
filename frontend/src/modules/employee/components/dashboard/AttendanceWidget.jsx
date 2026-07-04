import React from 'react';
import { Clock, MapPin, Play, Square, Session } from 'lucide-react';

const AttendanceWidget = ({ isClockedIn, checkInTime, checkOutTime, timer, status, location, onClockToggle }) => {
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between h-full">
      <div>
        <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
          <h3 className="text-base font-bold text-slate-800 font-sans flex items-center gap-2">
            <Clock className="h-4.5 w-4.5 text-indigo-500" />
            Today's Log
          </h3>
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold gap-1.5 border ${
            isClockedIn
              ? 'bg-emerald-50 text-emerald-700 border-emerald-100'
              : 'bg-slate-100 text-slate-650 border-slate-200'
          }`}>
            <span className={`w-1.5 h-1.5 rounded-full ${isClockedIn ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'}`}></span>
            {status}
          </span>
        </div>

        {/* Check-In/Out grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100/50">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide font-sans">Check-In</span>
            <p className="text-sm font-bold text-slate-700 font-mono mt-0.5">{checkInTime}</p>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100/50">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide font-sans">Check-Out</span>
            <p className="text-sm font-bold text-slate-700 font-mono mt-0.5">{checkOutTime}</p>
          </div>
        </div>

        {/* Live Working Hours Timer */}
        <div className="bg-slate-900 text-slate-100 p-5 rounded-2xl border border-slate-850 shadow-inner text-center mb-6">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
            Active Session Timer
          </span>
          <p className="text-3xl font-black font-mono tracking-widest text-emerald-400 select-none">
            {timer}
          </p>
          <div className="flex items-center justify-center gap-1 text-[10px] text-slate-500 font-bold uppercase tracking-wider mt-2">
            <MapPin className="h-3 w-3 text-slate-500" />
            <span>{location}</span>
          </div>
        </div>
      </div>

      {/* Quick Action Button */}
      <button
        onClick={onClockToggle}
        className={`w-full py-3.5 px-4 rounded-xl text-sm font-bold text-white transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-lg transform hover:scale-[1.01] active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-offset-2 ${
          isClockedIn
            ? 'bg-rose-600 hover:bg-rose-700 focus:ring-rose-500 shadow-rose-900/10'
            : 'bg-emerald-600 hover:bg-emerald-700 focus:ring-emerald-500 shadow-emerald-900/10'
        }`}
      >
        {isClockedIn ? (
          <>
            <Square className="h-4 w-4 fill-white" />
            <span>Clock Out Session</span>
          </>
        ) : (
          <>
            <Play className="h-4 w-4 fill-white" />
            <span>Clock In Session</span>
          </>
        )}
      </button>
    </div>
  );
};

export default AttendanceWidget;
