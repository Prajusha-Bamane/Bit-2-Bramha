import React from 'react';
import { Calendar, UserCheck, Key, FileUp, PhoneCall, Activity } from 'lucide-react';

const ActivityTimeline = ({ activities }) => {
  const getIcon = (type) => {
    switch (type) {
      case 'Profile Updated':
      case 'profile_updated':
        return <UserCheck className="w-4 h-4 text-emerald-500" />;
      case 'Password Changed':
      case 'password_changed':
        return <Key className="w-4 h-4 text-amber-500" />;
      case 'Document Uploaded':
      case 'document_uploaded':
        return <FileUp className="w-4 h-4 text-blue-500" />;
      case 'Phone Updated':
      case 'phone_updated':
        return <PhoneCall className="w-4 h-4 text-indigo-500" />;
      default:
        return <Activity className="w-4 h-4 text-slate-500" />;
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-md p-6">
      <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-5">
        <div className="flex items-center gap-2">
          <Activity className="h-5 w-5 text-indigo-650" />
          <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Profile Activity Log</h3>
        </div>
      </div>

      <div className="relative border-l-2 border-slate-100 ml-3.5 space-y-5">
        {activities && activities.length > 0 ? (
          activities.map((act, idx) => (
            <div key={idx} className="relative pl-5 flex items-start gap-2.5 group">
              {/* Dot */}
              <div className="absolute -left-[13px] top-0.5 rounded-full border border-slate-200 p-1 bg-white shadow-sm flex items-center justify-center transition-transform group-hover:scale-110">
                {getIcon(act.type)}
              </div>
              <div className="flex-1 min-w-0 text-xs">
                <p className="font-extrabold text-slate-800">{act.title}</p>
                <p className="text-slate-500 text-[10px] mt-0.5 leading-relaxed">{act.detail}</p>
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mt-1 block">
                  {act.time}
                </span>
              </div>
            </div>
          ))
        ) : (
          <p className="text-xs text-slate-500 pl-4">No recent activity logs recorded.</p>
        )}
      </div>
    </div>
  );
};

export default ActivityTimeline;
