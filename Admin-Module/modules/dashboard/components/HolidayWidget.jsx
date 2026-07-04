import React from 'react';
import { Calendar } from 'lucide-react';

const HolidayWidget = () => {
  const holidays = [
    { 
      name: 'Eid al-Fitr', 
      date: 'Friday, 10 July', 
      daysLeft: '6 days left',
      color: 'bg-emerald-50 border-emerald-100 text-emerald-800'
    },
    { 
      name: 'Independence Day', 
      date: 'Saturday, 15 August', 
      daysLeft: '42 days left',
      color: 'bg-indigo-50 border-indigo-100 text-indigo-800'
    },
    { 
      name: 'Gandhi Jayanti', 
      date: 'Friday, 2 October', 
      daysLeft: '90 days left',
      color: 'bg-slate-50 border-slate-200 text-slate-800'
    },
  ];

  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <Calendar className="h-5 w-5 text-indigo-600" />
        <h3 className="text-sm font-bold text-slate-800 font-sans font-bold">Public Holidays</h3>
      </div>
      
      <div className="space-y-3">
        {holidays.map((h, idx) => (
          <div key={idx} className="flex items-center justify-between p-2.5 hover:bg-slate-50 rounded-xl transition-colors duration-150">
            <div className="min-w-0">
              <p className="text-xs font-bold text-slate-800 truncate">{h.name}</p>
              <p className="text-[10px] text-slate-400 mt-0.5">{h.date}</p>
            </div>
            
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${h.color} whitespace-nowrap`}>
              {h.daysLeft}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HolidayWidget;
