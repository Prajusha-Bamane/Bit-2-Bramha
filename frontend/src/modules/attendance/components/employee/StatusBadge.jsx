import React from 'react';

const StatusBadge = ({ status }) => {
  const configs = {
    'Present': 'bg-emerald-50 text-emerald-700 border-emerald-150 text-emerald-600',
    'Late': 'bg-amber-50 text-amber-700 border-amber-150 text-amber-600',
    'Absent': 'bg-rose-50 text-rose-700 border-rose-150 text-rose-600',
    'Half-Day': 'bg-purple-50 text-purple-700 border-purple-150 text-purple-650',
    'Leave': 'bg-orange-50 text-orange-700 border-orange-150 text-orange-650',
    'Weekend': 'bg-slate-100 text-slate-600 border-slate-200 text-slate-500',
    'Holiday': 'bg-sky-50 text-sky-700 border-sky-150 text-sky-650',
  };

  const activeClass = configs[status] || 'bg-slate-50 text-slate-600 border-slate-100';

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border font-sans ${activeClass}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
      {status}
    </span>
  );
};

export default StatusBadge;
