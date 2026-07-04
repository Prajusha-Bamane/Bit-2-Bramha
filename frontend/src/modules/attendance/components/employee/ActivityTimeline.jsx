import React from 'react';
import { Clock, Coffee, LogIn, LogOut, CheckSquare } from 'lucide-react';

const ActivityTimeline = ({ activities }) => {
  const getTimelineVisual = (type) => {
    switch (type) {
      case 'CheckIn': return { icon: LogIn, color: 'bg-emerald-500' };
      case 'CheckOut': return { icon: LogOut, color: 'bg-rose-500' };
      case 'StartBreak': return { icon: Coffee, color: 'bg-amber-500' };
      case 'EndBreak': return { icon: Play, color: 'bg-emerald-600' }; // Wait, import Play or Clock
      default: return { icon: CheckSquare, color: 'bg-indigo-600' };
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between h-full">
      <div>
        <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
          <h3 className="text-base font-bold text-slate-800 font-sans flex items-center gap-2">
            Today's Log Sequence
          </h3>
        </div>

        {activities.length > 0 ? (
          <div className="relative border-l border-slate-100 ml-3 pl-4 space-y-5 py-2">
            {activities.map((act, idx) => {
              const config = getTimelineVisual(act.icon);
              const Icon = config.icon;
              return (
                <div key={idx} className="relative text-left font-sans">
                  {/* Circle indicator */}
                  <div className={`absolute -left-7 top-0.5 p-1 rounded-full text-white shadow flex items-center justify-center ${config.color}`}>
                    <Icon className="h-2.5 w-2.5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-700 leading-normal">{act.text}</p>
                    <span className="text-[10px] text-slate-450 mt-1 block font-mono">{act.time}</span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-6 text-slate-400 text-xs font-semibold font-sans">
            No check-in activities recorded for today yet.
          </div>
        )}
      </div>
    </div>
  );
};

// Supporting Play icon fallback
import { Play } from 'lucide-react';

export default ActivityTimeline;
