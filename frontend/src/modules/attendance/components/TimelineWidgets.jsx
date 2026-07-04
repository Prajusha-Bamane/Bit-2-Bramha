import React from 'react';
import { Clock, Coffee, LogIn, LogOut, AlertTriangle } from 'lucide-react';

const TimelineWidgets = () => {
  const activities = [
    { time: '09:00', text: 'Rahul Sharma Clocked In', type: 'in', location: 'Office' },
    { time: '09:15', text: 'Priya Nair Clocked In', type: 'in', location: 'Office (Late)' },
    { time: '12:30', text: 'Amit Kumar Started Lunch Break', type: 'break', location: '-' },
    { time: '13:15', text: 'Amit Kumar Resumed Shift', type: 'in', location: '-' },
    { time: '18:00', text: 'Rahul Sharma Clocked Out', type: 'out', location: 'Office' },
  ];

  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between h-full">
      <div>
        <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-4">Recent Shifts Activity</h3>
        
        <div className="relative border-l-2 border-slate-100 pl-4 space-y-4 text-xs">
          {activities.map((act, index) => (
            <div key={index} className="relative">
              
              {/* Dot Icon Indicator */}
              <span className={`absolute -left-[23px] top-0.5 p-1 rounded-full text-white ${
                act.type === 'in' ? 'bg-emerald-500' : (
                  act.type === 'break' ? 'bg-amber-500' : 'bg-rose-500'
                )
              }`}>
                {act.type === 'in' && <LogIn className="h-2.5 w-2.5" />}
                {act.type === 'break' && <Coffee className="h-2.5 w-2.5" />}
                {act.type === 'out' && <LogOut className="h-2.5 w-2.5" />}
              </span>

              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-800">{act.text}</span>
                <span className="text-[10px] text-slate-400 font-mono font-semibold">{act.time}</span>
              </div>
              <span className="text-[10px] text-slate-400 font-semibold">{act.location}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 p-3 bg-rose-50/50 border border-rose-100/50 rounded-xl flex items-start gap-2 text-[11px] text-rose-800">
        <AlertTriangle className="h-4 w-4 text-rose-500 flex-shrink-0 mt-0.5" />
        <div>
          <span className="font-bold">System Warning</span>
          <p className="text-[10px] text-rose-700/80 mt-0.5">3 profiles have slipped below the 75% attendance quota this month.</p>
        </div>
      </div>

    </div>
  );
};

export default TimelineWidgets;
