import React, { useState } from 'react';
import { Filter, RotateCcw, Check } from 'lucide-react';

const FilterSidebar = ({ onApply, onReset }) => {
  const [dept, setDept] = useState('');
  const [status, setStatus] = useState('');
  const [range, setRange] = useState('This Month');

  const departmentsList = [
    'Software Development', 'QA', 'Human Resources', 'Finance', 'Marketing', 
    'Sales', 'Administration', 'Support', 'Design', 'Operations'
  ];

  const handleApply = (e) => {
    e.preventDefault();
    if (onApply) onApply({ dept, status, range });
  };

  const handleReset = () => {
    setDept('');
    setStatus('');
    setRange('This Month');
    if (onReset) onReset();
  };

  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-4">
      <div className="flex items-center gap-2 border-b border-slate-50 pb-2.5">
        <Filter className="h-4.5 w-4.5 text-indigo-600" />
        <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Analytics Filter Panel</h3>
      </div>

      <form onSubmit={handleApply} className="space-y-4">
        
        {/* Department select */}
        <div>
          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-1.5">Department Filter</label>
          <select
            value={dept}
            onChange={e => setDept(e.target.value)}
            className="block w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 font-semibold"
          >
            <option value="">All Structures</option>
            {departmentsList.map(d => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>

        {/* Date Ranges */}
        <div>
          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-1.5">Time Range</label>
          <select
            value={range}
            onChange={e => setRange(e.target.value)}
            className="block w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 font-semibold"
          >
            <option value="Today">Today</option>
            <option value="This Week">This Week</option>
            <option value="This Month">This Month</option>
            <option value="Q2 FY26">Q2 FY26</option>
            <option value="Custom Date">Custom Range</option>
          </select>
        </div>

        {/* Status */}
        <div>
          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-1.5">Audit Status</label>
          <select
            value={status}
            onChange={e => setStatus(e.target.value)}
            className="block w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 font-semibold"
          >
            <option value="">All Cycles</option>
            <option value="Approved">Approved</option>
            <option value="Pending">Pending Review</option>
          </select>
        </div>

        <div className="flex gap-2 pt-2">
          <button
            type="button"
            onClick={handleReset}
            className="flex-1 py-2 border border-slate-200 hover:bg-slate-50 rounded-xl text-[10px] font-bold text-slate-550 transition flex items-center justify-center gap-1 cursor-pointer"
          >
            <RotateCcw className="h-3 w-3" />
            Reset
          </button>
          
          <button
            type="submit"
            className="flex-1 py-2 bg-primary text-white hover:bg-indigo-700 rounded-xl text-[10px] font-bold transition flex items-center justify-center gap-1 cursor-pointer"
          >
            <Check className="h-3 w-3" />
            Apply Filter
          </button>
        </div>

      </form>
    </div>
  );
};

export default FilterSidebar;
