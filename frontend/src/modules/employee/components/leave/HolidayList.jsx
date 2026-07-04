import React from 'react';
import { CalendarHeart } from 'lucide-react';

const HolidayList = ({ holidays }) => {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">Holiday list</p>
          <h3 className="mt-1 text-xl font-semibold text-slate-900">Upcoming holidays</h3>
        </div>
        <div className="rounded-full bg-slate-100 p-2 text-slate-700">
          <CalendarHeart className="h-5 w-5" />
        </div>
      </div>
      <div className="mt-6 space-y-3">
        {holidays.map((holiday) => (
          <div key={holiday.name} className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
            <div>
              <p className="font-semibold text-slate-800">{holiday.name}</p>
              <p className="text-sm text-slate-500">{holiday.date} · {holiday.day}</p>
            </div>
            <div className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-700">{holiday.remainingDays} days</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HolidayList;
