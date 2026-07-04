import React from 'react';
import { AlertCircle, CalendarClock, CreditCard, ShieldAlert } from 'lucide-react';

const urgencyStyles = {
  High: 'bg-rose-500 text-white',
  Medium: 'bg-amber-500 text-slate-900',
  Low: 'bg-slate-350 text-slate-800'
};

const ReminderCard = ({ reminder, onAction }) => {
  const { title, count, urgency, desc } = reminder;

  const getIcon = () => {
    if (title.includes('Leave')) return <CalendarClock className="w-5 h-5 text-amber-500" />;
    if (title.includes('Payroll')) return <CreditCard className="w-5 h-5 text-emerald-500" />;
    if (title.includes('Profile')) return <AlertCircle className="w-5 h-5 text-indigo-500" />;
    return <ShieldAlert className="w-5 h-5 text-rose-500" />;
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-4 hover:shadow transition flex items-center justify-between gap-3 select-none">
      <div className="flex items-center gap-3">
        {/* Left Icon */}
        <div className="p-2.5 bg-slate-50 border border-slate-100 rounded-xl flex-shrink-0">
          {getIcon()}
        </div>
        
        {/* Center Details */}
        <div className="text-xs">
          <h4 className="font-extrabold text-slate-800">{title}</h4>
          <p className="text-slate-500 text-[10px] mt-0.5 leading-relaxed">{desc}</p>
        </div>
      </div>

      {/* Right Urgent count Badge */}
      <span className={`h-6 min-w-6 flex items-center justify-center rounded-full text-[10px] font-bold px-2 py-0.5 shadow-sm flex-shrink-0 ${urgencyStyles[urgency] || urgencyStyles.Low}`}>
        {count > 0 ? count : '✓'}
      </span>
    </div>
  );
};

export default ReminderCard;
