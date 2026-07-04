import React from 'react';
import { CalendarDays, CheckCircle2, Clock3, XCircle } from 'lucide-react';

const stats = [
  { label: 'Current Leave Balance', value: '18 days', icon: CalendarDays, tone: 'emerald' },
  { label: 'Pending Requests', value: '6', icon: Clock3, tone: 'amber' },
  { label: 'Approved Leaves', value: '31', icon: CheckCircle2, tone: 'sky' },
  { label: 'Rejected Requests', value: '3', icon: XCircle, tone: 'rose' },
];

const toneMap = {
  emerald: 'bg-emerald-50 text-emerald-700',
  amber: 'bg-amber-50 text-amber-700',
  sky: 'bg-sky-50 text-sky-700',
  rose: 'bg-rose-50 text-rose-700',
};

const LeaveHeader = () => {
  return (
    <div className="rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 p-6 text-white shadow-xl">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-300">Employee Self Service</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight">My Leave</h1>
          <p className="mt-3 max-w-2xl text-sm text-slate-300">
            Manage your personal leave requests, monitor balances, and keep your leave history organized in one place.
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.label} className="rounded-2xl border border-white/15 bg-white/10 p-3 backdrop-blur">
                <div className={`inline-flex rounded-xl p-2 ${toneMap[item.tone]}`}>
                  <Icon className="h-4 w-4" />
                </div>
                <p className="mt-2 text-xs font-medium text-slate-300">{item.label}</p>
                <p className="mt-1 text-lg font-semibold text-white">{item.value}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default LeaveHeader;
