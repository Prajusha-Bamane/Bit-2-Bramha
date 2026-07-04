import React, { useState } from 'react';
import { Play, Square, Coffee, LogIn } from 'lucide-react';

const CheckInPanel = ({ isClockedIn, isBreak, onClockToggle, onBreakToggle }) => {
  const [loadingAction, setLoadingAction] = useState(null); // 'clock' or 'break'

  const handleClockClick = async () => {
    setLoadingAction('clock');
    // Simulate minor network delay
    await new Promise((resolve) => setTimeout(resolve, 800));
    onClockToggle();
    setLoadingAction(null);
  };

  const handleBreakClick = async () => {
    setLoadingAction('break');
    // Simulate minor network delay
    await new Promise((resolve) => setTimeout(resolve, 800));
    onBreakToggle();
    setLoadingAction(null);
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between h-full">
      <div>
        <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
          <h3 className="text-base font-bold text-slate-800 font-sans flex items-center gap-2">
            <LogIn className="h-4.5 w-4.5 text-indigo-500" />
            Duty Terminal
          </h3>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-sans">
            Shift Logs
          </span>
        </div>
        <p className="text-xs text-slate-500 font-sans mb-6">
          Record your day-to-day work log sessions. Breaks will pause your working hours computation temporarily.
        </p>
      </div>

      <div className="space-y-3.5">
        {/* Check In / Out Button */}
        <button
          onClick={handleClockClick}
          disabled={loadingAction !== null || (isClockedIn && isBreak)} // cannot clock out during active break
          className={`w-full py-3.5 px-4 rounded-xl text-sm font-bold text-white transition-all duration-300 flex items-center justify-center gap-2.5 cursor-pointer shadow-md transform hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
            isClockedIn
              ? 'bg-rose-600 hover:bg-rose-700 focus:ring-rose-500 shadow-rose-900/10'
              : 'bg-emerald-600 hover:bg-emerald-700 focus:ring-emerald-500 shadow-emerald-900/10'
          }`}
        >
          {loadingAction === 'clock' ? (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : isClockedIn ? (
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

        {/* Break Toggle Button */}
        {isClockedIn && (
          <button
            onClick={handleBreakClick}
            disabled={loadingAction !== null}
            className={`w-full py-3.5 px-4 rounded-xl text-sm font-bold transition-all duration-300 flex items-center justify-center gap-2.5 cursor-pointer border shadow-sm transform hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 ${
              isBreak
                ? 'bg-amber-600 border-amber-600 text-white hover:bg-amber-700 focus:ring-amber-500 shadow-amber-900/10'
                : 'bg-indigo-50 border-indigo-100 text-indigo-650 hover:bg-indigo-100/60 focus:ring-indigo-550'
            }`}
          >
            {loadingAction === 'break' ? (
              <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
            ) : isBreak ? (
              <>
                <Play className="h-4 w-4 fill-white" />
                <span>Resume Working Session</span>
              </>
            ) : (
              <>
                <Coffee className="h-4 w-4" />
                <span>Start Rest Break</span>
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default CheckInPanel;
