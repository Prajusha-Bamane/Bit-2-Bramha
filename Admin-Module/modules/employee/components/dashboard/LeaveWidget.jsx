import React from 'react';
import { CalendarCheck, ChevronRight } from 'lucide-react';

const LeaveWidget = ({ leaves }) => {
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between h-full">
      <div>
        <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
          <h3 className="text-base font-bold text-slate-800 font-sans flex items-center gap-2">
            <CalendarCheck className="h-4.5 w-4.5 text-indigo-500" />
            Leave Quota Summary
          </h3>
          <span className="text-xs font-bold text-slate-500 font-sans">
            Total Leave: {leaves.total} Days
          </span>
        </div>

        {/* Progress Grid */}
        <div className="space-y-4 mb-6">
          {leaves.balances.map((bal, idx) => {
            const percentage = Math.round((bal.used / bal.total) * 100);
            return (
              <div key={idx} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-700 font-sans">{bal.type}</span>
                  <span className="font-semibold text-slate-500">
                    {bal.used}/{bal.total} Days Used ({100 - percentage}% left)
                  </span>
                </div>
                {/* Visual Bar */}
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${bal.color}`}
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Additional details footer */}
      <div className="bg-indigo-50/40 p-4 rounded-xl border border-indigo-100/50 flex flex-col gap-2">
        <div className="flex justify-between items-center text-xs">
          <span className="font-bold text-slate-500">Upcoming Leave:</span>
          <span className="font-bold text-indigo-700">{leaves.upcoming}</span>
        </div>
        <div className="flex justify-between items-center text-xs">
          <span className="font-bold text-slate-500">Pending Approval:</span>
          <span className="font-bold text-amber-700">{leaves.pending} Request</span>
        </div>
      </div>
    </div>
  );
};

export default LeaveWidget;
