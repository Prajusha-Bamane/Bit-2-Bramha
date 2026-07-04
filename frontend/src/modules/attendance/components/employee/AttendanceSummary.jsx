import React from 'react';
import { 
  UserCheck, 
  UserX, 
  Clock, 
  Hourglass, 
  Map, 
  CalendarClock, 
  Percent 
} from 'lucide-react';

const AttendanceSummary = ({ summary }) => {
  const cards = [
    {
      title: 'Present Days',
      value: `${summary.presentDays} Days`,
      description: 'Total active logged days',
      icon: UserCheck,
      color: 'bg-emerald-50 text-emerald-650 border-emerald-100'
    },
    {
      title: 'Absent Days',
      value: `${summary.absentDays} Days`,
      description: 'Unexcused missing logs',
      icon: UserX,
      color: 'bg-rose-50 text-rose-650 border-rose-100'
    },
    {
      title: 'Late Arrivals',
      value: `${summary.lateArrivals} Days`,
      description: 'Check-in after 09:15 AM',
      icon: Clock,
      color: 'bg-amber-50 text-amber-650 border-amber-100'
    },
    {
      title: 'Half Days',
      value: `${summary.halfDays} Days`,
      description: 'Worked under 5.0 hours',
      icon: CalendarClock,
      color: 'bg-purple-50 text-purple-650 border-purple-100'
    },
    {
      title: 'WFH & Remote',
      value: `${summary.wfhDays} Days`,
      description: 'Out-of-office credentials',
      icon: Map,
      color: 'bg-sky-50 text-sky-650 border-sky-100'
    },
    {
      title: 'Avg Working Hours',
      value: `${summary.avgWorkingHours} Hrs`,
      description: 'Average active shift logged',
      icon: Hourglass,
      color: 'bg-indigo-50 text-indigo-650 border-indigo-100'
    },
    {
      title: 'Attendance Rate',
      value: `${summary.attendancePercentage}%`,
      description: 'Active cycle performance',
      icon: Percent,
      color: 'bg-teal-50 text-teal-650 border-teal-100'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4">
      {cards.map((card, idx) => {
        const Icon = card.icon;
        return (
          <div 
            key={idx} 
            className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`p-2.5 rounded-xl border ${card.color}`}>
                <Icon className="h-4.5 w-4.5" />
              </div>
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide font-sans">
                {card.title}
              </p>
              <p className="text-xl font-black text-slate-800 tracking-tight font-sans mt-0.5">
                {card.value}
              </p>
              <p className="text-[9px] text-slate-400 font-sans mt-1">
                {card.description}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AttendanceSummary;
