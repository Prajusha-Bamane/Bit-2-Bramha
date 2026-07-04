import React from 'react';
import { 
  Clock, 
  Calendar, 
  Banknote, 
  User, 
  FileText, 
  Megaphone, 
  Lock, 
  ShieldAlert, 
  Trash2, 
  Check 
} from 'lucide-react';

const categoryConfig = {
  Attendance: { icon: Clock, bg: 'bg-sky-50 text-sky-600 border-sky-100', border: 'border-l-sky-500' },
  Leave: { icon: Calendar, bg: 'bg-amber-50 text-amber-600 border-amber-100', border: 'border-l-amber-500' },
  Payroll: { icon: Banknote, bg: 'bg-emerald-50 text-emerald-600 border-emerald-100', border: 'border-l-emerald-500' },
  Employees: { icon: User, bg: 'bg-blue-50 text-blue-600 border-blue-100', border: 'border-l-blue-500' },
  Documents: { icon: FileText, bg: 'bg-purple-50 text-purple-600 border-purple-100', border: 'border-l-purple-500' },
  Announcements: { icon: Megaphone, bg: 'bg-pink-50 text-pink-600 border-pink-100', border: 'border-l-pink-500' },
  Security: { icon: Lock, bg: 'bg-rose-50 text-rose-600 border-rose-100', border: 'border-l-rose-500' },
  System: { icon: ShieldAlert, bg: 'bg-slate-100 text-slate-600 border-slate-200', border: 'border-l-slate-500' },
};

const priorityStyles = {
  High: 'bg-rose-100 text-rose-800 border-rose-200',
  Medium: 'bg-amber-100 text-amber-800 border-amber-200',
  Low: 'bg-slate-100 text-slate-650 border-slate-200',
};

const formatTimeAgo = (isoString) => {
  const date = new Date(isoString);
  const seconds = Math.floor((new Date() - date) / 1000);
  
  if (seconds < 60) return 'Just now';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days === 1) return 'Yesterday';
  return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
};

const NotificationCard = ({ notification, onMarkRead, onDelete }) => {
  const { id, title, description, category, priority, read, timestamp } = notification;
  const config = categoryConfig[category] || categoryConfig.System;
  const CategoryIcon = config.icon;

  return (
    <div 
      className={`bg-white border border-slate-200 border-l-4 ${config.border} p-4 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 flex items-start gap-3.5 relative select-none ${
        !read ? 'bg-indigo-50/15' : ''
      }`}
    >
      {/* 1. Category Icon Left */}
      <div className={`p-2 rounded-xl flex-shrink-0 ${config.bg}`}>
        <CategoryIcon className="w-4 h-4" />
      </div>

      {/* 2. Content Middle */}
      <div className="flex-1 min-w-0 pr-6 space-y-1.5">
        <div className="flex flex-wrap items-center gap-2">
          <h4 className={`text-xs font-bold text-slate-800 truncate`}>{title}</h4>
          <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold border uppercase tracking-wider ${priorityStyles[priority] || priorityStyles.Low}`}>
            {priority}
          </span>
          {!read && (
            <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full animate-ping"></span>
          )}
        </div>
        <p className="text-slate-500 text-[11px] leading-relaxed break-words">{description}</p>
        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
          {formatTimeAgo(timestamp)}
        </span>
      </div>

      {/* 3. Actions Right */}
      <div className="absolute right-3 top-3 flex items-center gap-1 opacity-60 hover:opacity-100 transition-opacity duration-150">
        {!read && (
          <button
            onClick={() => onMarkRead && onMarkRead(id)}
            className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-lg transition cursor-pointer"
            title="Mark as read"
          >
            <Check className="w-3.5 h-3.5" />
          </button>
        )}
        <button
          onClick={() => onDelete && onDelete(id)}
          className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg transition cursor-pointer"
          title="Delete notification"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};

export default NotificationCard;
export { categoryConfig, formatTimeAgo };
