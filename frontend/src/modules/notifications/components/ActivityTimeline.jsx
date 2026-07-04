import React from 'react';
import { Clock, CheckCircle2, Hourglass, ShieldAlert } from 'lucide-react';

const priorityColors = {
  High: 'bg-rose-500/10 text-rose-500 border border-rose-500/20',
  Medium: 'bg-amber-500/10 text-amber-500 border border-amber-500/20',
  Low: 'bg-slate-500/10 text-slate-400 border border-slate-500/20'
};

const statusConfig = {
  Success: { icon: CheckCircle2, color: 'text-emerald-500' },
  Pending: { icon: Hourglass, color: 'text-amber-500 animate-pulse' },
  Failed: { icon: ShieldAlert, color: 'text-rose-500' }
};

const formatTimeAgoFull = (isoString) => {
  const date = new Date(isoString);
  const timeStr = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const dateStr = date.toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' });
  return `${dateStr} at ${timeStr}`;
};

const ActivityTimeline = ({ activities }) => {
  if (!activities || activities.length === 0) {
    return (
      <div className="bg-white border border-slate-200 rounded-2xl shadow-md p-6 text-center text-slate-500 text-xs">
        No recent audit logs available.
      </div>
    );
  }

  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-md p-6">
      <div className="flex items-center gap-2 border-b border-slate-100 pb-4 mb-5">
        <Clock className="w-5 h-5 text-indigo-600" />
        <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Corporate Activity Feed</h3>
      </div>

      <div className="relative border-l-2 border-slate-150 ml-5 space-y-6">
        {activities.map((act) => {
          const StatusIcon = statusConfig[act.status]?.icon || CheckCircle2;
          const statusColor = statusConfig[act.status]?.color || 'text-slate-400';

          return (
            <div key={act.id} className="relative pl-6 flex items-start gap-4 group">
              {/* User Avatar Circle */}
              <div className="absolute -left-5 top-0.5 rounded-full w-9.5 h-9.5 bg-slate-900 border border-slate-800 text-white flex items-center justify-center font-bold text-xs shadow-md transition-transform group-hover:scale-105 select-none">
                {act.userAvatar}
              </div>

              {/* Detail block */}
              <div className="flex-1 bg-slate-50 hover:bg-white border border-slate-100 hover:border-slate-200 p-4 rounded-xl shadow-sm transition duration-200 space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-extrabold text-slate-850">{act.userName}</span>
                    <span className="text-[10px] text-slate-400 font-semibold">•</span>
                    <span className="text-[10px] text-slate-500 font-bold bg-indigo-50 px-2 py-0.5 rounded-full">
                      {act.category}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${priorityColors[act.priority] || priorityColors.Low}`}>
                      {act.priority}
                    </span>
                    <StatusIcon className={`w-4.5 h-4.5 ${statusColor}`} title={act.status} />
                  </div>
                </div>

                <p className="text-slate-700 text-xs leading-relaxed">{act.description}</p>
                
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block pt-1">
                  {formatTimeAgoFull(act.timestamp)}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ActivityTimeline;
