import React from 'react';

const statusStyles = {
  Approved: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
  Pending: 'bg-amber-50 text-amber-700 ring-amber-200',
  Rejected: 'bg-rose-50 text-rose-700 ring-rose-200',
  Cancelled: 'bg-slate-100 text-slate-600 ring-slate-200',
};

const StatusBadge = ({ status }) => {
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${statusStyles[status] || statusStyles.Pending}`}>
      {status}
    </span>
  );
};

export default StatusBadge;
