import React from 'react';
import { CheckCircle2, Circle, AlertCircle, Calendar, ShieldAlert } from 'lucide-react';

const HolidayTable = () => {
  const holidays = [
    { name: 'Bakrid / Eid al-Adha', date: '2026-06-27', day: 'Saturday', type: 'Public Holiday', remaining: 'Passed' },
    { name: 'Muharram', date: '2026-07-27', day: 'Monday', type: 'Gazetted Holiday', remaining: '23 days' },
    { name: 'Independence Day', date: '2026-08-15', day: 'Saturday', type: 'National Holiday', remaining: '42 days' },
    { name: 'Raksha Bandhan', date: '2026-08-28', day: 'Friday', type: 'Restricted Holiday', remaining: '55 days' },
    { name: 'Gandhi Jayanti', date: '2026-10-02', day: 'Friday', type: 'National Holiday', remaining: '90 days' },
  ];

  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between h-full">
      <div>
        <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-4">Holiday Calendar</h3>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-100 text-left text-xs">
            <thead className="bg-slate-50 text-slate-400 font-bold uppercase tracking-wider">
              <tr>
                <th className="px-3 py-2.5">Holiday</th>
                <th className="px-3 py-2.5">Date</th>
                <th className="px-3 py-2.5">Remaining</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {holidays.map((h, i) => (
                <tr key={i} className="hover:bg-slate-50/50">
                  <td className="px-3 py-2.5 font-bold text-slate-800">{h.name}</td>
                  <td className="px-3 py-2.5 text-slate-500 font-semibold">{h.date} ({h.day.slice(0, 3)})</td>
                  <td className="px-3 py-2.5">
                    <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                      h.remaining === 'Passed' ? 'bg-slate-100 text-slate-400' : 'bg-indigo-50 text-indigo-700'
                    }`}>
                      {h.remaining}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const WorkflowTimeline = ({ status }) => {
  const steps = [
    { title: 'Leave Applied', desc: 'Submitted by applicant', status: 'done', date: '04 July 2026, 09:30 AM' },
    { title: 'Manager Review', desc: 'Awaiting Technical Architect signoff', status: status === 'Pending' ? 'current' : 'done', date: status === 'Pending' ? 'In progress' : '04 July 2026, 11:15 AM' },
    { title: 'HR Audit check', desc: 'Review policies alignment', status: status === 'Pending' ? 'upcoming' : (status === 'Approved' ? 'done' : 'upcoming'), date: status === 'Approved' ? '04 July 2026, 12:30 PM' : '-' },
    { title: 'Status Finalized', desc: status === 'Rejected' ? 'Rejected' : (status === 'Approved' ? 'Approved' : 'Pending decision'), status: status === 'Pending' ? 'upcoming' : 'done', date: status === 'Pending' ? '-' : '04 July 2026, 12:45 PM' }
  ];

  return (
    <div className="space-y-4">
      <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2 flex items-center gap-1.5">
        <ShieldAlert className="h-4 w-4 text-indigo-600" />
        Workflow Approval Timeline
      </h4>
      
      <div className="relative border-l-2 border-slate-100 pl-4 space-y-4 text-xs">
        {steps.map((s, index) => (
          <div key={index} className="relative">
            <span className={`absolute -left-[23px] top-0.5 p-0.5 rounded-full text-white bg-white border-2 ${
              s.status === 'done' ? 'border-indigo-600 text-indigo-600 bg-indigo-50' : (
                s.status === 'current' ? 'border-amber-500 text-amber-500 bg-amber-50' : 'border-slate-200 text-slate-350 bg-slate-50'
              )
            }`}>
              {s.status === 'done' ? <CheckCircle2 className="h-3 w-3 fill-current text-white" /> : <Circle className="h-3 w-3" />}
            </span>
            
            <div className="flex items-center justify-between">
              <span className={`font-bold ${s.status === 'done' ? 'text-slate-800' : 'text-slate-500'}`}>{s.title}</span>
              <span className="text-[9px] text-slate-400 font-mono font-semibold">{s.date}</span>
            </div>
            <p className="text-[10px] text-slate-450 mt-0.5">{s.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export { HolidayTable, WorkflowTimeline };
