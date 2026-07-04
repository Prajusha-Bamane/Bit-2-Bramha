import React from 'react';
import { CalendarDays, Download, PlusCircle, XCircle } from 'lucide-react';

const QuickActions = ({ onApply, onCancel, onDownload, onCalendar }) => {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">Quick actions</p>
      <div className="mt-4 grid gap-3">
        <button onClick={onApply} className="flex items-center justify-between rounded-2xl bg-slate-900 px-4 py-3 text-sm font-medium text-white">
          <span className="inline-flex items-center"><PlusCircle className="mr-2 h-4 w-4" />Apply Leave</span>
          <span>→</span>
        </button>
        <button onClick={onCancel} className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700">
          <span className="inline-flex items-center"><XCircle className="mr-2 h-4 w-4 text-rose-500" />Cancel Leave</span>
          <span>↺</span>
        </button>
        <button onClick={onDownload} className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700">
          <span className="inline-flex items-center"><Download className="mr-2 h-4 w-4 text-sky-500" />Download History</span>
          <span>⬇</span>
        </button>
        <button onClick={onCalendar} className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700">
          <span className="inline-flex items-center"><CalendarDays className="mr-2 h-4 w-4 text-emerald-500" />View Calendar</span>
          <span>📅</span>
        </button>
      </div>
    </div>
  );
};

export default QuickActions;
