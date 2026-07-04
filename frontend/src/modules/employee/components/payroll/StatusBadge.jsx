import React from 'react';

const statusStyles = {
  Paid: 'bg-emerald-50 text-emerald-700 ring-emerald-600/10',
  credited: 'bg-emerald-50 text-emerald-700 ring-emerald-600/10',
  Credited: 'bg-emerald-50 text-emerald-700 ring-emerald-600/10',
  Processing: 'bg-blue-50 text-blue-700 ring-blue-600/10',
  generated: 'bg-blue-50 text-blue-700 ring-blue-600/10',
  Generated: 'bg-blue-50 text-blue-700 ring-blue-600/10',
  Pending: 'bg-amber-50 text-amber-700 ring-amber-600/10',
  pending: 'bg-amber-50 text-amber-700 ring-amber-600/10',
  Failed: 'bg-rose-50 text-rose-700 ring-rose-600/10',
  failed: 'bg-rose-50 text-rose-700 ring-rose-600/10',
};

const StatusBadge = ({ status }) => {
  const normalizedStatus = status || 'Pending';
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ring-inset ${statusStyles[normalizedStatus] || 'bg-slate-50 text-slate-700 ring-slate-600/10'}`}>
      {normalizedStatus}
    </span>
  );
};

export default StatusBadge;
