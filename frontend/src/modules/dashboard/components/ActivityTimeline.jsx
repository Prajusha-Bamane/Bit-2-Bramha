import React from 'react';
import { Clock, CheckCircle2, UserPlus, FileText } from 'lucide-react';

const ActivityTimeline = () => {
  const events = [
    {
      time: '09:00 AM',
      title: 'Rahul Sharma Checked In',
      description: 'Department: Human Resources | Status: On time',
      icon: Clock,
      color: 'bg-emerald-500 ring-emerald-100',
    },
    {
      time: '09:30 AM',
      title: 'Payroll Generated',
      description: 'Operations team initiated monthly payout calculations.',
      icon: FileText,
      color: 'bg-indigo-500 ring-indigo-100',
    },
    {
      time: '10:00 AM',
      title: 'Leave Approved',
      description: 'Manager approved Jane Doe\'s vacation request (3 days).',
      icon: CheckCircle2,
      color: 'bg-emerald-500 ring-emerald-100',
    },
    {
      time: '11:15 AM',
      title: 'New Employee Joined',
      description: 'Aditya Patel added to software development directory.',
      icon: UserPlus,
      color: 'bg-blue-500 ring-blue-100',
    },
  ];

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm h-full">
      <h3 className="text-base font-bold text-slate-800 mb-6 font-sans">Activity Timeline</h3>
      
      <div className="flow-root pl-1">
        <ul className="-mb-8">
          {events.map((evt, idx) => (
            <li key={idx}>
              <div className="relative pb-8">
                {/* Connecting line */}
                {idx !== events.length - 1 && (
                  <span 
                    className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-slate-100" 
                    aria-hidden="true"
                  />
                )}
                
                <div className="relative flex space-x-3.5">
                  <div>
                    <span className={`h-8.5 w-8.5 rounded-full flex items-center justify-center text-white ring-4 ${evt.color}`}>
                      <evt.icon className="h-4.5 w-4.5" />
                    </span>
                  </div>
                  
                  <div className="flex-1 min-w-0 pt-0.5">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-xs font-bold text-slate-800 leading-normal">{evt.title}</p>
                      <span className="text-[10px] font-bold text-slate-400 whitespace-nowrap">{evt.time}</span>
                    </div>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                      {evt.description}
                    </p>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ActivityTimeline;
