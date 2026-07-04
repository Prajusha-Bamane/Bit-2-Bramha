import React from 'react';
import { ChevronLeft, ChevronRight, Cake, Calendar, Gift } from 'lucide-react';

const LeaveCalendar = () => {
  const monthLabel = "July 2026";
  const daysInMonth = 31;
  const startOffset = 3; // July 2026 Wednesday start

  const getDayHighlight = (day) => {
    const weekendDays = [4, 5, 11, 12, 18, 19, 25, 26];
    if (weekendDays.includes(day)) return 'Weekend';

    // Highlight key dates
    if (day === 6) return 'Birthday';
    if (day === 10) return 'Holiday';
    if ([8, 9, 14, 15].includes(day)) return 'ApprovedLeave';
    if ([16, 22].includes(day)) return 'PendingLeave';

    return 'Default';
  };

  const dayStyles = {
    ApprovedLeave: 'bg-emerald-50 text-emerald-800 border-emerald-100 hover:bg-emerald-100',
    PendingLeave: 'bg-amber-50 text-amber-800 border-amber-100 hover:bg-amber-100',
    Holiday: 'bg-cyan-50 text-cyan-800 border-cyan-100 hover:bg-cyan-100',
    Birthday: 'bg-pink-50 text-pink-850 border-pink-100 hover:bg-pink-100 font-bold',
    Weekend: 'bg-slate-50 text-slate-400 border-transparent',
    Default: 'bg-white text-slate-700 border-slate-100 hover:bg-slate-50'
  };

  const calendarGrid = [];
  for (let i = 0; i < startOffset; i++) {
    calendarGrid.push(null);
  }
  for (let d = 1; d <= daysInMonth; d++) {
    calendarGrid.push(d);
  }

  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-bold text-slate-800 font-sans tracking-tight">Team Leave Calendar</h3>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">{monthLabel}</p>
        </div>

        <div className="flex items-center gap-1">
          <button className="p-1.5 hover:bg-slate-50 border border-slate-200 rounded-lg text-slate-500 transition cursor-pointer">
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button className="p-1.5 hover:bg-slate-50 border border-slate-200 rounded-lg text-slate-500 transition cursor-pointer">
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 text-center text-[10px] font-bold text-slate-400 uppercase mb-2 tracking-wider">
        <span>Sun</span>
        <span>Mon</span>
        <span>Tue</span>
        <span>Wed</span>
        <span>Thu</span>
        <span>Fri</span>
        <span>Sat</span>
      </div>

      <div className="grid grid-cols-7 gap-1.5 flex-1">
        {calendarGrid.map((day, index) => {
          if (day === null) {
            return <div key={`empty-${index}`} className="aspect-square bg-slate-50/20 rounded-xl"></div>;
          }

          const highlight = getDayHighlight(day);
          const isToday = day === 4;

          return (
            <div
              key={`day-${day}`}
              className={`aspect-square border rounded-xl flex flex-col items-center justify-center relative transition-all duration-150 cursor-pointer ${
                dayStyles[highlight]
              } ${isToday ? 'ring-2 ring-primary ring-offset-2' : ''}`}
            >
              <span className="text-xs font-bold">{day}</span>
              
              {/* Icon decorators inside calendar cells */}
              {highlight === 'Birthday' && <Cake className="h-2.5 w-2.5 text-pink-500 absolute bottom-1" />}
              {highlight === 'Holiday' && <Gift className="h-2.5 w-2.5 text-cyan-600 absolute bottom-1" />}
              {highlight === 'ApprovedLeave' && <span className="w-1 h-1 rounded-full bg-emerald-500 absolute bottom-1"></span>}
              {highlight === 'PendingLeave' && <span className="w-1 h-1 rounded-full bg-amber-500 absolute bottom-1"></span>}
            </div>
          );
        })}
      </div>

      <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 mt-5 border-t border-slate-100 pt-4 text-[10px] font-bold text-slate-500 uppercase tracking-wide">
        <div className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          <span>Approved Leave</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-amber-500"></span>
          <span>Pending Review</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-cyan-500"></span>
          <span>Holidays</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-pink-500"></span>
          <span>Birthdays</span>
        </div>
      </div>

    </div>
  );
};

export default LeaveCalendar;
