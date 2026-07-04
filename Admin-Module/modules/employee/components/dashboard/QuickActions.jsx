import React from 'react';
import { 
  Play, 
  Square, 
  CalendarPlus, 
  Download, 
  UserCheck, 
  UserCog, 
  FileText 
} from 'lucide-react';

const QuickActions = ({ isClockedIn, onClockToggle, onApplyLeave, onDownloadPayslip, onViewAttendance, onEditProfile }) => {
  const actions = [
    {
      title: isClockedIn ? 'Clock Out' : 'Clock In',
      desc: isClockedIn ? 'End active day logs' : 'Register start hours',
      icon: isClockedIn ? Square : Play,
      color: isClockedIn 
        ? 'text-rose-600 bg-rose-50 hover:bg-rose-100 border-rose-100' 
        : 'text-emerald-600 bg-emerald-50 hover:bg-emerald-100 border-emerald-100',
      action: onClockToggle
    },
    {
      title: 'Apply Leave',
      desc: 'Submit time-off requests',
      icon: CalendarPlus,
      color: 'text-amber-600 bg-amber-50 hover:bg-amber-100 border-amber-100',
      action: onApplyLeave
    },
    {
      title: 'Download Payslip',
      desc: 'Export compensation slips',
      icon: Download,
      color: 'text-indigo-600 bg-indigo-50 hover:bg-indigo-100 border-indigo-100',
      action: onDownloadPayslip
    },
    {
      title: 'View Attendance',
      desc: 'Inspect monthly rosters',
      icon: UserCheck,
      color: 'text-sky-600 bg-sky-50 hover:bg-sky-100 border-sky-100',
      action: onViewAttendance
    },
    {
      title: 'Edit Profile',
      desc: 'Modify emergency numbers',
      icon: UserCog,
      color: 'text-purple-600 bg-purple-50 hover:bg-purple-100 border-purple-100',
      action: onEditProfile
    },
    {
      title: 'View Documents',
      desc: 'Policy & insurance forms',
      icon: FileText,
      color: 'text-slate-650 bg-slate-150 hover:bg-slate-200 border-slate-200',
      action: () => alert('Redirecting to Documents Module...')
    }
  ];

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
      <h3 className="text-base font-bold text-slate-800 mb-4 font-sans">Self-Service Actions</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {actions.map((act, idx) => (
          <button
            key={idx}
            onClick={act.action}
            className={`flex flex-col items-center justify-center p-4 border rounded-xl transition-all duration-200 cursor-pointer text-center gap-2 group ${act.color}`}
          >
            <act.icon className="h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
            <div className="text-center select-none">
              <span className="text-xs font-bold font-sans tracking-wide block">{act.title}</span>
              <span className="text-[9px] font-semibold text-slate-400 block mt-0.5 leading-tight">{act.desc}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;
