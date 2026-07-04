import React from 'react';
import { Activity, Clock, ShieldAlert, Award, FileSpreadsheet } from 'lucide-react';

const ActivityTimeline = ({ activities }) => {
  const getTimelineIcon = (icon) => {
    switch (icon) {
      case 'CheckIn': return { icon: Clock, color: 'bg-emerald-500' };
      case 'LeaveApply': return { icon: FileSpreadsheet, color: 'bg-orange-500' };
      case 'Payslip': return { icon: Award, color: 'bg-indigo-650' };
      default: return { icon: Activity, color: 'bg-slate-500' };
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col h-full justify-between">
      <div>
        <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
          <h3 className="text-base font-bold text-slate-800 font-sans flex items-center gap-2">
            <Activity className="h-4.5 w-4.5 text-indigo-500" />
            Audit & Activity Logs
          </h3>
        </div>

        <div className="relative border-l border-slate-100 ml-3.5 pl-5 space-y-6 py-2">
          {activities.map((act, idx) => {
            const config = getTimelineIcon(act.icon);
            const ActIcon = config.icon;
            
            return (
              <div key={idx} className="relative">
                {/* Timeline node circle */}
                <div className={`absolute -left-8.5 top-0.5 p-1 rounded-full text-white shadow-inner flex items-center justify-center ${config.color}`}>
                  <ActIcon className="h-3 w-3" />
                </div>
                <div className="text-left font-sans">
                  <p className="text-xs font-bold text-slate-700 leading-normal">
                    {act.text}
                  </p>
                  <p className="text-[10px] text-slate-450 mt-1">
                    {act.time}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ActivityTimeline;
