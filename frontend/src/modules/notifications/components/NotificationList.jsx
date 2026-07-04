import React from 'react';
import NotificationCard from './NotificationCard';
import { BellOff } from 'lucide-react';

const NotificationList = ({ notifications, onMarkRead, onDelete }) => {
  if (!notifications || notifications.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center text-slate-400 font-sans border-2 border-dashed border-slate-200 rounded-2xl bg-white space-y-3">
        <div className="p-4 bg-slate-50 text-slate-400 rounded-full border border-slate-100">
          <BellOff className="w-8 h-8" />
        </div>
        <div>
          <p className="font-bold text-slate-700 text-sm">No Notifications Found</p>
          <p className="text-xs text-slate-400 mt-1 max-w-xs leading-relaxed">
            All caught up! You don't have any pending alerts matching the selected filters.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3.5 max-h-[70vh] overflow-y-auto no-scrollbar pr-1">
      {notifications.map((notif) => (
        <NotificationCard
          key={notif.id}
          notification={notif}
          onMarkRead={onMarkRead}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default NotificationList;
