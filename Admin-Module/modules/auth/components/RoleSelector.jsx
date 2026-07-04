import React from 'react';
import { UserCheck, ShieldAlert } from 'lucide-react';

const RoleSelector = ({ selectedRole, onChange }) => {
  const options = [
    {
      id: 'Admin',
      label: 'Administrator',
      icon: ShieldAlert,
      desc: 'Portal Management',
      activeColor: 'text-indigo-600 dark:text-indigo-400',
      activeBg: 'bg-indigo-50 dark:bg-indigo-950/40',
      borderActive: 'border-indigo-600/20'
    },
    {
      id: 'Employee',
      label: 'Employee',
      icon: UserCheck,
      desc: 'Self Service',
      activeColor: 'text-emerald-600 dark:text-emerald-400',
      activeBg: 'bg-emerald-50 dark:bg-emerald-950/40',
      borderActive: 'border-emerald-600/20'
    }
  ];

  return (
    <div className="relative grid grid-cols-2 gap-3 p-1.5 bg-slate-900/60 backdrop-blur-md rounded-2xl border border-slate-800/80 mb-6">
      {options.map((opt) => {
        const isActive = selectedRole === opt.id;
        const Icon = opt.icon;
        
        return (
          <button
            key={opt.id}
            type="button"
            onClick={() => onChange(opt.id)}
            className={`relative flex items-center justify-center gap-2.5 px-4 py-3 rounded-xl transition-all duration-300 font-sans cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 ${
              isActive 
                ? `${opt.activeBg} ${opt.activeColor} border ${opt.borderActive} shadow-lg shadow-black/10 scale-[1.02]`
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/30 border border-transparent'
            }`}
          >
            <Icon className={`h-4.5 w-4.5 transition-transform duration-300 ${isActive ? 'scale-110' : ''}`} />
            <div className="text-left">
              <p className="text-xs font-bold tracking-wide uppercase">{opt.label}</p>
            </div>
          </button>
        );
      })}
    </div>
  );
};

export default RoleSelector;
