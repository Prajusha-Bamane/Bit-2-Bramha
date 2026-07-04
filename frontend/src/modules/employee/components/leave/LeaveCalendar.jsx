import React from 'react';
import { CalendarDays } from 'lucide-react';

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const LeaveCalendar = ({ records }) => {
  const today = 15;
  const monthDays = Array.from({ length: 31 }, (_, index) => index + 1);
  const highlighted = new Set(records.slice(0, 8).map((item) => Number(item.startDate.split('-')[2])));

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">Leave Calendar</p>
          <h3 className="mt-1 text-xl font-semibold text-slate-900">July 2026</h3>
        </div>
        <div className="rounded-full bg-slate-100 p-2 text-slate-700">
          <CalendarDays className="h-5 w-5" />
        </div>
      </div>
      <div className="mt-6 grid grid-cols-7 gap-2 text-center text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
        {days.map((day) => <div key={day}>{day}</div>)}
      </div>
      <div className="mt-3 grid grid-cols-7 gap-2">
        {monthDays.map((day) => {
          const isToday = day === today;
          const isHighlighted = highlighted.has(day);
          const isWeekend = [0, 6].includes(new Date(2026, 6, day).getDay());
          return (
            <div key={day} className={`flex h-12 items-center justify-center rounded-2xl border text-sm font-medium ${isToday ? 'border-emerald-500 bg-emerald-50 text-emerald-700' : isHighlighted ? 'border-amber-300 bg-amber-50 text-amber-700' : isWeekend ? 'border-slate-200 bg-slate-50 text-slate-500' : 'border-slate-100 bg-white text-slate-600'}`}>
              {day}
            </div>
          );
        })}
      </div>
      <div className="mt-4 flex flex-wrap gap-3 text-sm text-slate-500">
        <span className="inline-flex items-center gap-2"><span className="h-3 w-3 rounded-full bg-emerald-500" />Today</span>
        <span className="inline-flex items-center gap-2"><span className="h-3 w-3 rounded-full bg-amber-500" />Approved</span>
        <span className="inline-flex items-center gap-2"><span className="h-3 w-3 rounded-full bg-rose-500" />Pending</span>
        <span className="inline-flex items-center gap-2"><span className="h-3 w-3 rounded-full bg-slate-500" />Public Holiday</span>
      </div>
    </div>
  );
};

export default LeaveCalendar;
