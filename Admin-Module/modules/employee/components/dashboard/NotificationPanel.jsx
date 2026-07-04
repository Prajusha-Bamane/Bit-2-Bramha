import React from 'react';
import { Bell, Sparkles } from 'lucide-react';

const NotificationPanel = ({ notifications }) => {
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col h-full justify-between">
      <div>
        <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
          <h3 className="text-base font-bold text-slate-800 font-sans flex items-center gap-2">
            <Bell className="h-4.5 w-4.5 text-indigo-500" />
            Inbox & Alerts
          </h3>
          {notifications.some(n => n.unread) && (
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-100 animate-pulse">
              New Alerts
            </span>
          )}
        </div>

        <div className="space-y-4">
          {notifications.map((notif) => (
            <div 
              key={notif.id} 
              className={`p-3 rounded-xl border transition-colors duration-150 relative ${
                notif.unread 
                  ? 'bg-indigo-50/30 border-indigo-100/50 hover:bg-indigo-50/50' 
                  : 'bg-slate-50/40 border-slate-100 hover:bg-slate-50'
              }`}
            >
              {notif.unread && (
                <span className="w-2 h-2 rounded-full bg-indigo-650 absolute top-3 right-3 animate-ping"></span>
              )}
              <p className="text-xs text-slate-700 font-semibold leading-relaxed font-sans pr-4">
                {notif.message}
              </p>
              <span className="text-[10px] text-slate-450 font-bold block mt-1.5 font-sans">
                {notif.time}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NotificationPanel;
