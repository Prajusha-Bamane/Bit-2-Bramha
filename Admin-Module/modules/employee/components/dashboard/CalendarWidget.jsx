import React from 'react';
import { Calendar as LucideCalendar, ChevronLeft, ChevronRight } from 'lucide-react';

const CalendarWidget = () => {
  // Calendar configuration for July 2026 (starts on Wednesday, has 31 days)
  const daysInMonth = 31;
  const startDayOffset = 3; // Wednesday (Sunday=0, Monday=1, Tuesday=2, Wednesday=3)
  
  const weekDays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  // Match days with statuses
  const dayStatuses = {
    1: { type: 'present', label: 'Present' },
    2: { type: 'present', label: 'Present' },
    3: { type: 'present', label: 'Present' },
    4: { type: 'holiday', label: 'Public Holiday (Independence Day)' },
    6: { type: 'present', label: 'Present' },
    7: { type: 'present', label: 'Present' },
    8: { type: 'present', label: 'Present' },
    9: { type: 'present', label: 'Present' },
    10: { type: 'present', label: 'Present' },
    13: { type: 'present', label: 'Present' },
    14: { type: 'leave', label: 'Annual Leave' },
    15: { type: 'leave', label: 'Annual Leave' },
    16: { type: 'leave', label: 'Annual Leave' }
  };

  const today = 4; // July 4, 2026 (corresponds to current local time in context)

  const renderDays = () => {
    const dayCells = [];
    
    // Fill offsets
    for (let i = 0; i < startDayOffset; i++) {
      dayCells.push(<div key={`offset-${i}`} className="h-9"></div>);
    }
    
    // Fill days
    for (let d = 1; d <= daysInMonth; d++) {
      const isToday = d === today;
      const status = dayStatuses[d];
      
      let statusClass = 'text-slate-700 hover:bg-slate-50';
      let dotClass = '';
      
      if (status?.type === 'present') {
        dotClass = 'bg-emerald-500';
      } else if (status?.type === 'leave') {
        statusClass = 'bg-orange-50 text-orange-700 font-bold hover:bg-orange-100/80';
        dotClass = 'bg-orange-500';
      } else if (status?.type === 'holiday') {
        statusClass = 'bg-sky-50 text-sky-700 font-bold hover:bg-sky-100/80';
        dotClass = 'bg-sky-500';
      }

      dayCells.push(
        <div 
          key={`day-${d}`} 
          className={`h-9 flex flex-col items-center justify-center rounded-lg text-xs font-semibold relative cursor-pointer transition-all duration-150 ${statusClass} ${
            isToday ? 'ring-2 ring-indigo-600 ring-offset-1 font-black bg-indigo-50/20' : ''
          }`}
          title={status ? status.label : `July ${d}, 2026`}
        >
          <span>{d}</span>
          {dotClass && (
            <span className={`w-1 h-1 rounded-full absolute bottom-1.5 ${dotClass}`}></span>
          )}
        </div>
      );
    }
    
    return dayCells;
  };

  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
          <h3 className="text-sm font-bold text-slate-800 font-sans flex items-center gap-2">
            <LucideCalendar className="h-4.5 w-4.5 text-indigo-500" />
            Duty Calendar
          </h3>
          <div className="flex items-center gap-1.5">
            <button className="p-1 hover:bg-slate-100 rounded text-slate-500 cursor-pointer"><ChevronLeft className="h-4 w-4" /></button>
            <span className="text-xs font-bold text-slate-700 select-none">July 2026</span>
            <button className="p-1 hover:bg-slate-100 rounded text-slate-500 cursor-pointer"><ChevronRight className="h-4 w-4" /></button>
          </div>
        </div>

        {/* Days of Week header */}
        <div className="grid grid-cols-7 gap-1 text-center mb-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
          {weekDays.map((day) => (
            <div key={day} className="py-1">{day}</div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-1 text-center font-sans">
          {renderDays()}
        </div>
      </div>

      {/* Legend */}
      <div className="mt-5 pt-4 border-t border-slate-100 flex flex-wrap gap-x-4 gap-y-2 text-[10px] font-bold text-slate-500 font-sans">
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
          Present
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
          Approved Leave
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-sky-500"></span>
          Holiday
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-600"></span>
          Today
        </span>
      </div>
    </div>
  );
};

export default CalendarWidget;
