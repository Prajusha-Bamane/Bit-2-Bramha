import React from 'react';
import { Activity, ArrowRightLeft, BadgeCheck, CircleSlash } from 'lucide-react';

const ActivityTimeline = ({ activities }) => {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">Recent activity</p>
          <h3 className="mt-1 text-xl font-semibold text-slate-900">Your latest actions</h3>
        </div>
        <div className="rounded-full bg-slate-100 p-2 text-slate-700">
          <Activity className="h-5 w-5" />
        </div>
      </div>
      <div className="mt-6 space-y-4">
        {activities.map((item) => (
          <div key={item.title} className="flex gap-3">
            <div className="rounded-full bg-slate-100 p-2 text-slate-700">
              {item.title.includes('Approved') ? <BadgeCheck className="h-4 w-4 text-emerald-500" /> : item.title.includes('Cancelled') ? <CircleSlash className="h-4 w-4 text-amber-500" /> : <ArrowRightLeft className="h-4 w-4 text-sky-500" />}
            </div>
            <div>
              <p className="font-semibold text-slate-800">{item.title}</p>
              <p className="text-sm text-slate-500">{item.detail}</p>
              <p className="mt-1 text-xs font-medium uppercase tracking-[0.2em] text-slate-400">{item.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityTimeline;
