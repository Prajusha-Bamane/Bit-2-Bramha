import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const CalendarWidget = () => {
  // Calendar data customized for July 2026 (July 1st is Wednesday)
  const daysInMonth = 31;
  const startOffset = 3;
  const monthLabel = 'July 2026';
  const weekdays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  const cells = [];
  for (let i = 0; i < startOffset; i++) {
    cells.push({ day: '', type: 'empty' });
  }

  for (let d = 1; d <= daysInMonth; d++) {
    let type = 'normal';
    if (d === 4) type = 'today';
    else if (d === 6) type = 'birthday';
    else if (d === 10) type = 'holiday';
    else if (d === 12 || d === 13) type = 'leave';
    cells.push({ day: d, type });
  }

  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold text-slate-800 font-sans">{monthLabel}</h3>
        <div className="flex items-center gap-1">
          <button className="p-1 hover:bg-slate-50 border border-slate-200 rounded-lg text-slate-500 cursor-pointer">
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button className="p-1 hover:bg-slate-50 border border-slate-200 rounded-lg text-slate-500 cursor-pointer">
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-y-2 text-center text-[10px] font-bold text-slate-400 mb-2.5">
        {weekdays.map((w) => (
          <div key={w}>{w}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-y-1 text-center text-xs">
        {cells.map((cell, idx) => {
          let cellStyle = 'text-slate-700 hover:bg-slate-50 rounded-lg py-1.5 cursor-pointer font-semibold relative';
          let highlightDot = null;

          if (cell.type === 'empty') {
            cellStyle = 'py-1.5';
          } else if (cell.type === 'today') {
            cellStyle = 'bg-primary text-white font-extrabold rounded-lg py-1.5 shadow shadow-indigo-500/25 relative';
          } else if (cell.type === 'birthday') {
            cellStyle = 'text-rose-700 font-bold bg-rose-50 hover:bg-rose-100/80 rounded-lg py-1.5 relative';
            highlightDot = <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-rose-500 rounded-full"></span>;
          } else if (cell.type === 'holiday') {
            cellStyle = 'text-emerald-700 font-bold bg-emerald-50 hover:bg-emerald-100/80 rounded-lg py-1.5 relative';
            highlightDot = <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-emerald-500 rounded-full"></span>;
          } else if (cell.type === 'leave') {
            cellStyle = 'text-amber-700 font-bold bg-amber-50 hover:bg-amber-100/80 rounded-lg py-1.5 relative';
            highlightDot = <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-amber-500 rounded-full"></span>;
          }

          return (
            <div key={idx} className={cellStyle}>
              {cell.day}
              {highlightDot}
            </div>
          );
        })}
      </div>

      <div className="mt-4 pt-3.5 border-t border-slate-100 flex flex-wrap gap-x-3 gap-y-1 text-[9px] font-bold text-slate-500 uppercase tracking-wide">
        <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 bg-primary rounded-full"></span> Today</span>
        <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 bg-rose-500 rounded-full"></span> Birthday</span>
        <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span> Holiday</span>
        <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 bg-amber-500 rounded-full"></span> Leave</span>
      </div>
    </div>
  );
};

export default CalendarWidget;
