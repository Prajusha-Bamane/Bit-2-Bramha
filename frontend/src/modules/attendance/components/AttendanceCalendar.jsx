import React from 'react';
import { 
  ChevronLeft, 
  ChevronRight,
  Info 
} from 'lucide-react';

const AttendanceCalendar = ({ employeeId }) => {
  // Calendar data structure for July 2026 (Wednesday starts)
  const monthLabel = "July 2026";
  const daysInMonth = 31;
  const startDayOffset = 3; // Wednesday starts index 3

  // Map dates to attendance status for the employee
  const getDayStatus = (day) => {
    // Weekend checks
    const weekendDays = [4, 5, 11, 12, 18, 19, 25, 26];
    if (weekendDays.includes(day)) return 'Weekend';

    // Mock statuses for demonstration
    if (day === 10) return 'Absent';
    if (day === 17) return 'Leave';
    if (day === 24) return 'Holiday';
    if ([8, 15].includes(day)) return 'Late';
    if ([3, 16, 22].includes(day)) return 'WFH';
    
    // Default checked dates up to current date (July 4)
    if (day > 4) return 'Pending';
    
    return 'Present';
  };

  const statusStyles = {
    Present: 'bg-emerald-50 text-emerald-800 border-emerald-100 hover:bg-emerald-100',
    Late: 'bg-amber-50 text-amber-800 border-amber-100 hover:bg-amber-100',
    WFH: 'bg-blue-50 text-blue-800 border-blue-100 hover:bg-blue-100',
    Absent: 'bg-rose-50 text-rose-800 border-rose-100 hover:bg-rose-100',
    Leave: 'bg-purple-50 text-purple-800 border-purple-100 hover:bg-purple-100',
    Holiday: 'bg-cyan-50 text-cyan-800 border-cyan-100 hover:bg-cyan-100',
    Weekend: 'bg-slate-100 text-slate-400 border-transparent hover:bg-slate-200/60',
    Pending: 'bg-white text-slate-400 border-slate-100 hover:bg-slate-50',
  };

  const statusLabels = [
    { name: 'Present', color: 'bg-emerald-500' },
    { name: 'Late', color: 'bg-amber-500' },
    { name: 'WFH', color: 'bg-blue-500' },
    { name: 'Absent', color: 'bg-rose-500' },
    { name: 'Leave', color: 'bg-purple-500' },
    { name: 'Holiday', color: 'bg-cyan-500' }
  ];

  const calendarCells = [];
  // Fill empty start day offsets
  for (let i = 0; i < startDayOffset; i++) {
    calendarCells.push(null);
  }
  // Fill actual dates
  for (let d = 1; d <= daysInMonth; d++) {
    calendarCells.push(d);
  }

  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col h-full">
      
      {/* Calendar header controls */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-bold text-slate-800 font-sans tracking-tight">Attendance Calendar</h3>
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

      {/* Weekday labels */}
      <div className="grid grid-cols-7 text-center text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
        <span>Sun</span>
        <span>Mon</span>
        <span>Tue</span>
        <span>Wed</span>
        <span>Thu</span>
        <span>Fri</span>
        <span>Sat</span>
      </div>

      {/* Calendar Grids */}
      <div className="grid grid-cols-7 gap-1.5 flex-1 items-stretch">
        {calendarCells.map((day, index) => {
          if (day === null) {
            return <div key={`empty-${index}`} className="aspect-square bg-slate-50/30 rounded-xl"></div>;
          }

          const status = getDayStatus(day);
          const isToday = day === 4;

          return (
            <div 
              key={`day-${day}`}
              className={`aspect-square border rounded-xl flex flex-col items-center justify-center relative select-none transition-all duration-150 cursor-pointer ${
                statusStyles[status]
              } ${isToday ? 'ring-2 ring-primary ring-offset-2' : ''}`}
            >
              <span className="text-xs font-bold">{day}</span>
              {status !== 'Pending' && status !== 'Weekend' && (
                <span className="absolute bottom-1 w-1 h-1 rounded-full bg-current"></span>
              )}
            </div>
          );
        })}
      </div>

      {/* Color status key annotations */}
      <div className="flex flex-wrap items-center justify-center gap-x-3.5 gap-y-1.5 mt-5 border-t border-slate-100 pt-4 text-[10px] font-bold text-slate-500 uppercase tracking-wide">
        {statusLabels.map(label => (
          <div key={label.name} className="flex items-center gap-1.5">
            <span className={`w-2 h-2 rounded-full ${label.color}`}></span>
            <span>{label.name}</span>
          </div>
        ))}
      </div>

    </div>
  );
};

export default AttendanceCalendar;
