import React from 'react';
import { Calendar, CreditCard, Download, Gift, Activity } from 'lucide-react';

const PayrollTimeline = ({ activities }) => {
  const getTimelineIcon = (type) => {
    switch (type) {
      case 'generated':
      case 'Payroll Generated':
        return <Calendar className="h-4 w-4 text-blue-500" />;
      case 'credited':
      case 'Salary Credited':
        return <CreditCard className="h-4 w-4 text-emerald-500" />;
      case 'downloaded':
      case 'Payslip Downloaded':
        return <Download className="h-4 w-4 text-purple-500" />;
      case 'bonus':
      case 'Bonus Added':
        return <Gift className="h-4 w-4 text-pink-500" />;
      default:
        return <Activity className="h-4 w-4 text-slate-500" />;
    }
  };

  const getTimelineColor = (type) => {
    switch (type) {
      case 'generated':
      case 'Payroll Generated':
        return 'bg-blue-50 border-blue-200';
      case 'credited':
      case 'Salary Credited':
        return 'bg-emerald-50 border-emerald-200';
      case 'downloaded':
      case 'Payslip Downloaded':
        return 'bg-purple-50 border-purple-200';
      case 'bonus':
      case 'Bonus Added':
        return 'bg-pink-50 border-pink-200';
      default:
        return 'bg-slate-50 border-slate-200';
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-md">
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-slate-400">Activity Feed</p>
          <h3 className="mt-1 text-lg font-bold text-slate-800">Recent Payroll Activity</h3>
        </div>
        <div className="rounded-full bg-slate-100 p-2 text-slate-700">
          <Activity className="h-5 w-5" />
        </div>
      </div>
      
      <div className="relative border-l-2 border-slate-100 ml-4 space-y-6">
        {activities && activities.length > 0 ? (
          activities.map((item, idx) => (
            <div key={idx} className="relative pl-6 flex items-start gap-3 group">
              {/* Timeline dot/icon */}
              <div className={`absolute -left-3.5 top-0.5 rounded-full border p-1.5 bg-white transition-transform group-hover:scale-110 shadow-sm flex items-center justify-center`}>
                {getTimelineIcon(item.type)}
              </div>
              
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-slate-800 text-sm">{item.title}</p>
                <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{item.detail}</p>
                <time className="mt-1 block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  {item.time}
                </time>
              </div>
            </div>
          ))
        ) : (
          <p className="text-sm text-slate-500 pl-4">No recent payroll activity recorded.</p>
        )}
      </div>
    </div>
  );
};

export default PayrollTimeline;
