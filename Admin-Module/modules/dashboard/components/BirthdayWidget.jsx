import React from 'react';
import { Cake } from 'lucide-react';

const BirthdayWidget = () => {
  const birthdays = [
    { 
      name: 'Priya Nair', 
      dept: 'Marketing', 
      date: 'Today, 4 July', 
      initial: 'PN', 
      color: 'bg-rose-100 text-rose-700',
    },
    { 
      name: 'Ramesh Patel', 
      dept: 'Software Development', 
      date: '6 July (in 2 days)', 
      initial: 'RP', 
      color: 'bg-indigo-100 text-indigo-700',
    },
    { 
      name: 'Siddharth Joshi', 
      dept: 'Quality Assurance', 
      date: '11 July (in 7 days)', 
      initial: 'SJ', 
      color: 'bg-blue-100 text-blue-700',
    },
  ];

  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <Cake className="h-5 w-5 text-rose-500 animate-bounce" />
        <h3 className="text-sm font-bold text-slate-800 font-sans font-bold">Upcoming Birthdays</h3>
      </div>
      
      <div className="space-y-3">
        {birthdays.map((item, idx) => (
          <div key={idx} className="flex items-center justify-between gap-3 p-2 hover:bg-slate-50 rounded-xl transition-colors duration-150">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs ${item.color}`}>
                {item.initial}
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-slate-800 truncate">{item.name}</p>
                <p className="text-[10px] text-slate-400 truncate">{item.dept}</p>
              </div>
            </div>
            
            <span className="text-[10px] font-bold text-slate-500 bg-slate-50 border border-slate-100 px-2 py-0.5 rounded-full whitespace-nowrap">
              {item.date}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BirthdayWidget;
