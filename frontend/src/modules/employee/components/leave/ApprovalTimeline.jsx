import React from 'react';
import { CheckCircle2, Clock3, ShieldCheck, XCircle } from 'lucide-react';

const ApprovalTimeline = ({ timeline, status }) => {
  const iconMap = {
    Applied: Clock3,
    'Manager Review': ShieldCheck,
    'HR Review': ShieldCheck,
    Approved: CheckCircle2,
    Rejected: XCircle,
    Cancelled: XCircle,
  };

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">Approval timeline</p>
      <div className="mt-6 space-y-4">
        {timeline.map((item, index) => {
          const Icon = iconMap[item.label] || Clock3;
          const isActive = status === item.label || index === timeline.length - 1;
          return (
            <div key={item.label} className="flex gap-3">
              <div className="flex flex-col items-center">
                <div className={`rounded-full p-2 ${isActive ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>
                  <Icon className="h-4 w-4" />
                </div>
                {index < timeline.length - 1 && <div className="mt-2 h-8 w-px bg-slate-200" />}
              </div>
              <div className="flex-1 rounded-2xl border border-slate-200 bg-slate-50 p-3">
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-slate-800">{item.label}</p>
                  <p className="text-sm text-slate-500">{item.timestamp}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ApprovalTimeline;
