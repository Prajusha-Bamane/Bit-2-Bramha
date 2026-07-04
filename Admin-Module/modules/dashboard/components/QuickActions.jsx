import React from 'react';
import { 
  UserPlus, 
  Clock, 
  CalendarCheck, 
  Banknote, 
  BarChart3, 
  Download 
} from 'lucide-react';

const QuickActions = () => {
  const actions = [
    {
      title: 'Add Employee',
      icon: UserPlus,
      color: 'text-blue-600 bg-blue-50 hover:bg-blue-100/80 border-blue-100',
    },
    {
      title: 'Mark Attendance',
      icon: Clock,
      color: 'text-emerald-600 bg-emerald-50 hover:bg-emerald-100/80 border-emerald-100',
    },
    {
      title: 'Approve Leave',
      icon: CalendarCheck,
      color: 'text-amber-600 bg-amber-50 hover:bg-amber-100/80 border-amber-100',
    },
    {
      title: 'Generate Payroll',
      icon: Banknote,
      color: 'text-indigo-600 bg-indigo-50 hover:bg-indigo-100/80 border-indigo-100',
    },
    {
      title: 'View Reports',
      icon: BarChart3,
      color: 'text-purple-600 bg-purple-50 hover:bg-purple-100/80 border-purple-100',
    },
    {
      title: 'Export Records',
      icon: Download,
      color: 'text-slate-700 bg-slate-100 hover:bg-slate-200/80 border-slate-200',
    },
  ];

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm mb-6">
      <h3 className="text-base font-bold text-slate-800 mb-4 font-sans">Quick Operations</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {actions.map((act, idx) => (
          <button
            key={idx}
            className={`flex flex-col items-center justify-center p-4 border rounded-xl transition-all duration-200 cursor-pointer text-center gap-2 group ${act.color}`}
          >
            <act.icon className="h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
            <span className="text-xs font-bold font-sans tracking-wide">{act.title}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;
