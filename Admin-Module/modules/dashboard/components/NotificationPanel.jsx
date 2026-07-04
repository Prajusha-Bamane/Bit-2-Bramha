import React from 'react';
import { 
  Bell, 
  Clock, 
  FileClock, 
  Info, 
  Users, 
  Calendar 
} from 'lucide-react';

const NotificationPanel = () => {
  const notifications = [
    {
      text: '5 Employees checked in late today.',
      icon: Clock,
      color: 'text-orange-600 bg-orange-50 border-orange-100',
      time: '10m ago',
    },
    {
      text: '3 Leave Requests awaiting approval.',
      icon: FileClock,
      color: 'text-amber-600 bg-amber-50 border-amber-100',
      time: '30m ago',
    },
    {
      text: 'Payroll processing due tomorrow.',
      icon: Info,
      color: 'text-indigo-600 bg-indigo-50 border-indigo-100',
      time: '2h ago',
    },
    {
      text: 'All-hands company meeting scheduled today at 4 PM.',
      icon: Users,
      color: 'text-blue-600 bg-blue-50 border-blue-100',
      time: '3h ago',
    },
    {
      text: 'Upcoming public holiday: Eid al-Fitr (Friday).',
      icon: Calendar,
      color: 'text-emerald-600 bg-emerald-50 border-emerald-100',
      time: '1d ago',
    },
  ];

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Bell className="h-5 w-5 text-indigo-600" />
          <h3 className="text-base font-bold text-slate-800 font-sans">System Alerts</h3>
        </div>
        <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold border border-indigo-100">
          5
        </span>
      </div>
      
      <div className="flex-1 space-y-3.5 overflow-y-auto max-h-[320px] pr-1">
        {notifications.map((notif, idx) => (
          <div 
            key={idx} 
            className={`p-3 border rounded-xl flex items-start gap-3 transition-colors duration-150 ${notif.color}`}
          >
            <div className="mt-0.5">
              <notif.icon className="h-4.5 w-4.5 flex-shrink-0" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-slate-700 leading-normal">{notif.text}</p>
              <span className="text-[10px] text-slate-400 font-medium block mt-1">{notif.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationPanel;
