import React from 'react';
import { 
  LogIn, 
  LogOut, 
  MapPin, 
  Laptop, 
  AlertTriangle, 
  Clock, 
  Coffee, 
  CalendarClock 
} from 'lucide-react';
import StatusBadge from './StatusBadge';

const TodayAttendanceCard = ({ checkInTime, checkOutTime, status, timer, breakTimer, location, device, lateBy, overtime }) => {
  const metrics = [
    {
      label: 'Check-In Stamp',
      value: checkInTime,
      icon: LogIn,
      color: 'text-emerald-600 bg-emerald-50'
    },
    {
      label: 'Check-Out Stamp',
      value: checkOutTime,
      icon: LogOut,
      color: 'text-slate-600 bg-slate-50'
    },
    {
      label: 'Working Hours',
      value: timer,
      icon: Clock,
      color: 'text-indigo-650 bg-indigo-50'
    },
    {
      label: 'Break Duration',
      value: breakTimer,
      icon: Coffee,
      color: 'text-amber-600 bg-amber-50'
    },
    {
      label: 'IP Location',
      value: location,
      icon: MapPin,
      color: 'text-sky-600 bg-sky-50'
    },
    {
      label: 'Logged Device',
      value: device,
      icon: Laptop,
      color: 'text-purple-600 bg-purple-50'
    },
    {
      label: 'Late Duration',
      value: lateBy || 'On Time',
      icon: AlertTriangle,
      color: lateBy ? 'text-rose-600 bg-rose-50' : 'text-slate-400 bg-slate-50'
    },
    {
      label: 'Overtime Hours',
      value: overtime ? `${overtime} hrs` : '0h 0m',
      icon: CalendarClock,
      color: overtime ? 'text-emerald-600 bg-emerald-50' : 'text-slate-400 bg-slate-50'
    }
  ];

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
        <h3 className="text-base font-bold text-slate-800 font-sans">
          Active Session Information
        </h3>
        <StatusBadge status={status === 'Clocked In' ? 'Present' : status} />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {metrics.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div 
              key={idx} 
              className="p-4 bg-slate-50/50 hover:bg-slate-50 border border-slate-100 hover:border-slate-200 rounded-xl transition-all duration-200 group flex flex-col gap-1.5"
            >
              <div className={`p-1.5 h-8 w-8 flex items-center justify-center rounded-lg ${item.color} group-hover:scale-105 transition-transform duration-200`}>
                <Icon className="h-4.5 w-4.5" />
              </div>
              <div className="text-left">
                <span className="text-[10px] font-bold text-slate-450 uppercase tracking-wide block font-sans">
                  {item.label}
                </span>
                <span className="text-xs font-bold text-slate-700 font-mono block mt-0.5 select-all">
                  {item.value}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TodayAttendanceCard;
