import React, { useState } from 'react';
import { Search, Eye, Filter } from 'lucide-react';

const RecentEmployeesTable = () => {
  const [search, setSearch] = useState('');

  const employees = [
    {
      id: 'EMP-2026-08',
      name: 'Aditya Patel',
      initial: 'AP',
      dept: 'Software Development',
      role: 'Frontend Engineer',
      status: 'Active',
      date: '04 July 2026',
      color: 'bg-indigo-100 text-indigo-700'
    },
    {
      id: 'EMP-2026-07',
      name: 'Anjali Sharma',
      initial: 'AS',
      dept: 'Human Resources',
      role: 'HR Executive',
      status: 'Active',
      date: '01 July 2026',
      color: 'bg-emerald-100 text-emerald-700'
    },
    {
      id: 'EMP-2026-06',
      name: 'Rohan Deshmukh',
      initial: 'RD',
      dept: 'Finance',
      role: 'Accounts Manager',
      status: 'Active',
      date: '28 June 2026',
      color: 'bg-blue-100 text-blue-700'
    },
    {
      id: 'EMP-2026-05',
      name: 'Pooja Reddy',
      initial: 'PR',
      dept: 'Quality Assurance',
      role: 'QA Automation Engineer',
      status: 'Inactive',
      date: '15 June 2026',
      color: 'bg-rose-100 text-rose-700'
    },
    {
      id: 'EMP-2026-04',
      name: 'Vikram Singh',
      initial: 'VS',
      dept: 'Marketing',
      role: 'SEO Specialist',
      status: 'Active',
      date: '10 June 2026',
      color: 'bg-teal-100 text-teal-700'
    }
  ];

  const filtered = employees.filter(emp => 
    emp.name.toLowerCase().includes(search.toLowerCase()) || 
    emp.id.toLowerCase().includes(search.toLowerCase()) ||
    emp.dept.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm h-full">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h3 className="text-base font-bold text-slate-800 font-sans">Recent Employees</h3>
        
        {/* Search & Filter tools */}
        <div className="flex items-center gap-2.5">
          <div className="relative rounded-lg shadow-sm w-full sm:w-60">
            <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none text-slate-400">
              <Search className="h-4 w-4" />
            </div>
            <input
              type="text"
              className="block w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 placeholder-slate-400 focus:ring-1 focus:ring-primary focus:border-transparent text-xs"
              placeholder="Search ID, name, dept..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <button className="p-1.5 border border-slate-200 hover:bg-slate-50 rounded-lg text-slate-500 cursor-pointer">
            <Filter className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-100 text-left text-xs">
          <thead>
            <tr className="text-slate-400 uppercase font-bold tracking-wider border-b border-slate-100">
              <th className="pb-3 font-semibold">Employee</th>
              <th className="pb-3 font-semibold">ID</th>
              <th className="pb-3 font-semibold">Department</th>
              <th className="pb-3 font-semibold">Designation</th>
              <th className="pb-3 font-semibold">Status</th>
              <th className="pb-3 font-semibold">Joining Date</th>
              <th className="pb-3 font-semibold text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700">
            {filtered.map((emp) => (
              <tr key={emp.id} className="hover:bg-slate-50/50 transition-colors duration-150">
                <td className="py-3 flex items-center gap-2.5">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${emp.color}`}>
                    {emp.initial}
                  </div>
                  <span className="font-bold text-slate-800">{emp.name}</span>
                </td>
                <td className="py-3 text-slate-500 font-semibold">{emp.id}</td>
                <td className="py-3">{emp.dept}</td>
                <td className="py-3 text-slate-500 font-medium">{emp.role}</td>
                <td className="py-3">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    emp.status === 'Active' 
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-100/50' 
                      : 'bg-rose-50 text-rose-700 border border-rose-100/50'
                  }`}>
                    {emp.status}
                  </span>
                </td>
                <td className="py-3 text-slate-500 font-semibold">{emp.date}</td>
                <td className="py-3 text-right">
                  <button className="inline-flex items-center gap-1 px-2.5 py-1 border border-slate-200 hover:bg-slate-50 hover:border-slate-300 rounded-lg text-slate-600 font-semibold transition cursor-pointer">
                    <Eye className="h-3.5 w-3.5" />
                    View
                  </button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan="7" className="py-8 text-center text-slate-400 font-medium">
                  No matching employee records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentEmployeesTable;
