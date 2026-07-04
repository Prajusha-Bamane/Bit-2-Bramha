import React, { useState } from 'react';
import { Check, X } from 'lucide-react';

const LeaveRequestTable = () => {
  const [requests, setRequests] = useState([
    {
      id: 1,
      name: 'Ramesh Patel',
      role: 'Software Developer',
      initial: 'RP',
      type: 'Sick Leave',
      start: '06 July 2026',
      end: '07 July 2026',
      status: 'Pending',
      color: 'bg-indigo-100 text-indigo-700'
    },
    {
      id: 2,
      name: 'Priya Nair',
      role: 'Marketing Head',
      initial: 'PN',
      type: 'Casual Leave',
      start: '09 July 2026',
      end: '10 July 2026',
      status: 'Approved',
      color: 'bg-rose-100 text-rose-700'
    },
    {
      id: 3,
      name: 'Amit Deshmukh',
      role: 'QA Engineer',
      initial: 'AD',
      type: 'Maternity/Paternity',
      start: '12 July 2026',
      end: '24 July 2026',
      status: 'Pending',
      color: 'bg-blue-100 text-blue-700'
    },
    {
      id: 4,
      name: 'Sneha Reddy',
      role: 'UI/UX Designer',
      initial: 'SR',
      type: 'Casual Leave',
      start: '15 July 2026',
      end: '16 July 2026',
      status: 'Rejected',
      color: 'bg-amber-100 text-amber-700'
    }
  ]);

  const handleAction = (id, newStatus) => {
    setRequests(prev => prev.map(r => r.id === id ? { ...r, status: newStatus } : r));
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm h-full">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-base font-bold text-slate-800 font-sans">Recent Leave Requests</h3>
        <span className="text-xs font-bold text-slate-400">June - July</span>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-100 text-left text-xs">
          <thead>
            <tr className="text-slate-400 uppercase font-bold tracking-wider border-b border-slate-100">
              <th className="pb-3 font-semibold">Employee</th>
              <th className="pb-3 font-semibold">Leave Type</th>
              <th className="pb-3 font-semibold">Start Date</th>
              <th className="pb-3 font-semibold">End Date</th>
              <th className="pb-3 font-semibold">Status</th>
              <th className="pb-3 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700">
            {requests.map((item) => (
              <tr key={item.id} className="hover:bg-slate-50/50 transition-colors duration-150">
                <td className="py-3.5 flex items-center gap-2.5">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${item.color}`}>
                    {item.initial}
                  </div>
                  <div>
                    <span className="font-bold text-slate-800 block">{item.name}</span>
                    <span className="text-[10px] text-slate-400 font-semibold">{item.role}</span>
                  </div>
                </td>
                <td className="py-3.5 text-slate-500 font-semibold">{item.type}</td>
                <td className="py-3.5 font-semibold text-slate-600">{item.start}</td>
                <td className="py-3.5 font-semibold text-slate-600">{item.end}</td>
                <td className="py-3.5">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    item.status === 'Approved' 
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-100/50' 
                      : item.status === 'Rejected'
                      ? 'bg-rose-50 text-rose-700 border border-rose-100/50'
                      : 'bg-amber-50 text-amber-700 border border-amber-100/50'
                  }`}>
                    {item.status}
                  </span>
                </td>
                <td className="py-3.5 text-right">
                  {item.status === 'Pending' ? (
                    <div className="flex items-center justify-end gap-1.5">
                      <button 
                        onClick={() => handleAction(item.id, 'Approved')}
                        className="p-1 text-emerald-600 hover:bg-emerald-50 border border-slate-200 hover:border-emerald-200 rounded-lg transition cursor-pointer"
                        title="Approve Leave"
                      >
                        <Check className="h-3.5 w-3.5" />
                      </button>
                      <button 
                        onClick={() => handleAction(item.id, 'Rejected')}
                        className="p-1 text-rose-600 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 rounded-lg transition cursor-pointer"
                        title="Reject Leave"
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  ) : (
                    <span className="text-[10px] text-slate-400 font-semibold italic">Processed</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeaveRequestTable;
