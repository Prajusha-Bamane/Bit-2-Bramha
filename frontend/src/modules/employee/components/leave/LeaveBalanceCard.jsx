import React from 'react';
import { ArrowRightCircle, Sparkles } from 'lucide-react';

const LeaveBalanceCard = ({ title, available, used, remaining, color }) => {
  const progress = Math.min(100, Math.round((remaining / available) * 100));
  const colorClass = {
    emerald: 'from-emerald-500 to-teal-500',
    sky: 'from-sky-500 to-indigo-500',
    amber: 'from-amber-500 to-orange-500',
    violet: 'from-violet-500 to-fuchsia-500',
    rose: 'from-rose-500 to-red-500',
    slate: 'from-slate-600 to-slate-500',
  }[color] || 'from-slate-600 to-slate-500';

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-semibold text-slate-700">{title}</p>
          <p className="mt-2 text-2xl font-semibold text-slate-900">{remaining}</p>
        </div>
        <div className={`rounded-xl bg-gradient-to-br ${colorClass} p-2 text-white`}>
          <Sparkles className="h-4 w-4" />
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between text-sm text-slate-500">
        <span>Available {available}</span>
        <span>Used {used}</span>
      </div>
      <div className="mt-3 h-2 rounded-full bg-slate-100">
        <div className={`h-2 rounded-full bg-gradient-to-r ${colorClass}`} style={{ width: `${progress}%` }} />
      </div>
      <div className="mt-3 flex items-center text-sm font-medium text-slate-600">
        <ArrowRightCircle className="mr-2 h-4 w-4 text-emerald-500" />
        Strong utilization balance
      </div>
    </div>
  );
};

export default LeaveBalanceCard;
