import React, { useState } from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import StatusBadge from './StatusBadge';

const CalendarWidget = ({ attendanceHistory }) => {
  const [currentYear, setCurrentYear] = useState(2026);
  const [currentMonth, setCurrentMonth] = useState(6); // 0-indexed (6 = July)

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const weekDays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  // Handle month transitions
  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(prev => prev - 1);
    } else {
      setCurrentMonth(prev => prev - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(prev => prev + 1);
    } else {
      setCurrentMonth(prev => prev + 1);
    }
  };

  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
  };

  const renderDays = () => {
    const daysInMonth = getDaysInMonth(currentYear, currentMonth);
    const firstDay = getFirstDayOfMonth(currentYear, currentMonth);
    const dayCells = [];

    // Offset cells
    for (let i = 0; i < firstDay; i++) {
      dayCells.push(<div key={`offset-${i}`} className="h-10"></div>);
    }

    // Populate actual days
    for (let d = 1; d <= daysInMonth; d++) {
      const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      
      // Look up in history logs
      const record = attendanceHistory.find(r => r.date === dateStr);
      let dayStatus = 'Weekend';
      
      const testDate = new Date(currentYear, currentMonth, d);
      const isWeekendDay = testDate.getDay() === 0 || testDate.getDay() === 6;
      
      if (record) {
        dayStatus = record.status;
      } else {
        dayStatus = isWeekendDay ? 'Weekend' : 'Absent';
      }

      // July 4, 2026 is Today in context
      const isToday = currentYear === 2026 && currentMonth === 6 && d === 4;

      let cellStyle = 'hover:bg-slate-50 text-slate-700';
      let dotColor = '';

      if (dayStatus === 'Present') {
        dotColor = 'bg-emerald-500';
      } else if (dayStatus === 'Late') {
        cellStyle = 'bg-amber-50 text-amber-700 hover:bg-amber-100/60 font-bold';
        dotColor = 'bg-amber-500';
      } else if (dayStatus === 'Half-Day') {
        cellStyle = 'bg-purple-50 text-purple-700 hover:bg-purple-100/60 font-bold';
        dotColor = 'bg-purple-500';
      } else if (dayStatus === 'Leave') {
        cellStyle = 'bg-orange-50 text-orange-700 hover:bg-orange-100/60 font-bold';
        dotColor = 'bg-orange-500';
      } else if (dayStatus === 'Holiday') {
        cellStyle = 'bg-sky-50 text-sky-700 hover:bg-sky-100/60 font-bold';
        dotColor = 'bg-sky-500';
      } else if (dayStatus === 'Weekend') {
        cellStyle = 'text-slate-400 bg-slate-50/50';
      } else if (dayStatus === 'Absent') {
        cellStyle = 'bg-rose-50 text-rose-700 hover:bg-rose-100/60 font-bold';
        dotColor = 'bg-rose-500';
      }

      dayCells.push(
        <div 
          key={`day-${d}`} 
          className={`h-10 flex flex-col items-center justify-center rounded-xl text-xs font-semibold relative cursor-pointer transition-all duration-150 ${cellStyle} ${
            isToday ? 'ring-2 ring-indigo-600 ring-offset-1 font-black bg-indigo-50/20' : ''
          }`}
          title={record ? `${record.date}: ${record.status} (${record.workingHours} hrs)` : `${dateStr}: ${dayStatus}`}
        >
          <span>{d}</span>
          {dotColor && (
            <span className={`w-1 h-1 rounded-full absolute bottom-1.5 ${dotColor}`}></span>
          )}
        </div>
      );
    }

    return dayCells;
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
        <h3 className="text-base font-bold text-slate-800 font-sans flex items-center gap-2">
          <CalendarIcon className="h-4.5 w-4.5 text-indigo-500" />
          Roster Calendar
        </h3>
        
        <div className="flex items-center gap-2">
          <button 
            onClick={handlePrevMonth} 
            className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-500 cursor-pointer"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <span className="text-xs font-bold text-slate-700 min-w-[100px] text-center select-none font-sans">
            {monthNames[currentMonth]} {currentYear}
          </span>
          <button 
            onClick={handleNextMonth} 
            className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-500 cursor-pointer"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Week Header */}
      <div className="grid grid-cols-7 gap-1 text-center mb-1 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
        {weekDays.map(day => (
          <div key={day} className="py-2 font-sans">{day}</div>
        ))}
      </div>

      {/* Grid Days */}
      <div className="grid grid-cols-7 gap-1 text-center font-sans">
        {renderDays()}
      </div>

      {/* Legends */}
      <div className="mt-5 pt-4 border-t border-slate-100 flex flex-wrap gap-x-4 gap-y-2 text-[10px] font-bold text-slate-500 font-sans justify-center">
        <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>Present</span>
        <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>Late Arrival</span>
        <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>Half Day</span>
        <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>Absent</span>
        <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>Leave</span>
        <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-sky-500"></span>Public Holiday</span>
      </div>
    </div>
  );
};

export default CalendarWidget;
