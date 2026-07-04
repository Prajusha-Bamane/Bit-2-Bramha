import React, { useState, useEffect } from 'react';
import { Briefcase, Settings, RefreshCw, CheckCircle2, ChevronRight, Calculator } from 'lucide-react';
import { mockEmployees } from '../../employee/data/mockEmployees';

const PayrollGenerator = ({ onComplete }) => {
  const [month, setMonth] = useState(7); // July default
  const [year, setYear] = useState(2026);
  const [selectedDept, setSelectedDept] = useState('');
  
  // States: 'idle', 'running', 'summary'
  const [runState, setRunState] = useState('idle');
  const [progress, setProgress] = useState(0);

  const departmentsList = [
    'Software Development', 'QA', 'Human Resources', 'Finance', 'Marketing', 
    'Sales', 'Administration', 'Support', 'Design', 'Operations'
  ];

  const handleStart = (e) => {
    e.preventDefault();
    setRunState('running');
    setProgress(0);
  };

  useEffect(() => {
    let timer = null;
    if (runState === 'running') {
      timer = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(timer);
            setRunState('summary');
            return 100;
          }
          return prev + 10;
        });
      }, 250);
    }
    return () => clearInterval(timer);
  }, [runState]);

  // Compute mock batch summaries based on selected department count
  const matchingEmployeesCount = selectedDept 
    ? mockEmployees.filter(e => e.department === selectedDept).length 
    : mockEmployees.length;

  const totalBasic = matchingEmployeesCount * 68000;
  const totalAllowances = totalBasic * 0.55;
  const totalDeductions = totalBasic * 0.22;
  const totalNet = totalBasic + totalAllowances - totalDeductions;

  const handleConfirm = () => {
    alert(`Batch payroll generated successfully for ${matchingEmployeesCount} profiles!`);
    setRunState('idle');
    if (onComplete) onComplete(month, year, selectedDept);
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm max-w-2xl mx-auto space-y-6">
      
      {/* Header title */}
      <div className="flex items-center gap-2 border-b border-slate-50 pb-3">
        <Settings className="h-5 w-5 text-indigo-600 animate-spin-slow" />
        <div>
          <h3 className="text-sm font-bold text-slate-800 font-sans uppercase tracking-wider">Payroll Run Generator</h3>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">Process salary payouts for the current cycle</p>
        </div>
      </div>

      {runState === 'idle' && (
        <form onSubmit={handleStart} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* Month select */}
            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wide mb-1.5">Cycle Month</label>
              <select
                value={month}
                onChange={e => setMonth(Number(e.target.value))}
                className="block w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 font-semibold"
              >
                <option value={1}>January</option>
                <option value={2}>February</option>
                <option value={3}>March</option>
                <option value={4}>April</option>
                <option value={5}>May</option>
                <option value={6}>June</option>
                <option value={7}>July</option>
                <option value={8}>August</option>
                <option value={9}>September</option>
                <option value={10}>October</option>
                <option value={11}>November</option>
                <option value={12}>December</option>
              </select>
            </div>

            {/* Year select */}
            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wide mb-1.5">Cycle Year</label>
              <select
                value={year}
                onChange={e => setYear(Number(e.target.value))}
                className="block w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 font-semibold"
              >
                <option value={2026}>2026</option>
                <option value={2025}>2025</option>
              </select>
            </div>

            {/* Department select */}
            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wide mb-1.5">Department</label>
              <select
                value={selectedDept}
                onChange={e => setSelectedDept(e.target.value)}
                className="block w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 font-semibold"
              >
                <option value="">All Structures</option>
                {departmentsList.map(d => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>

          </div>

          <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl text-xs text-slate-500 space-y-1">
            <span className="font-bold text-slate-700">Execution Scope Summary</span>
            <p>Ready to calculate allowances, provident fund, and professional tax for **{matchingEmployeesCount} active employees** matching filters.</p>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-primary text-white hover:bg-indigo-700 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer shadow-md shadow-indigo-500/20"
          >
            <Calculator className="h-4.5 w-4.5" />
            Calculate & Generate Payouts
          </button>
        </form>
      )}

      {runState === 'running' && (
        <div className="py-8 text-center space-y-4">
          <RefreshCw className="h-10 w-10 text-indigo-600 animate-spin mx-auto" />
          <div>
            <h4 className="text-sm font-bold text-slate-800">Processing calculations...</h4>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">Calculating slabs for index {Math.min(matchingEmployeesCount, Math.ceil((progress / 100) * matchingEmployeesCount))} of {matchingEmployeesCount}</p>
          </div>
          
          <div className="max-w-md mx-auto bg-slate-100 h-2 rounded-full overflow-hidden">
            <div className="bg-indigo-600 h-full rounded-full transition-all duration-200" style={{ width: `${progress}%` }}></div>
          </div>
        </div>
      )}

      {runState === 'summary' && (
        <div className="space-y-6">
          <div className="text-center space-y-1">
            <div className="w-10 h-10 bg-emerald-100 border border-emerald-200 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-2 text-lg">✓</div>
            <h4 className="text-sm font-bold text-slate-800">Batch Computations Completed!</h4>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Review payout aggregates below</p>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl">
              <span className="text-[9px] text-slate-400 font-bold uppercase">Staff Calculated</span>
              <p className="text-sm font-black text-slate-705 mt-0.5">{matchingEmployeesCount} employees</p>
            </div>
            <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl">
              <span className="text-[9px] text-slate-400 font-bold uppercase">Net Batch Outflow</span>
              <p className="text-sm font-black text-slate-705 mt-0.5">₹{totalNet.toLocaleString('en-IN')}</p>
            </div>
            <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl">
              <span className="text-[9px] text-slate-400 font-bold uppercase">Total Allowances (HRA/MA)</span>
              <p className="text-sm font-black text-emerald-650 mt-0.5">₹{totalAllowances.toLocaleString('en-IN')}</p>
            </div>
            <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl">
              <span className="text-[9px] text-slate-400 font-bold uppercase">Total Deductions (PF/PT)</span>
              <p className="text-sm font-black text-rose-650 mt-0.5">₹{totalDeductions.toLocaleString('en-IN')}</p>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setRunState('idle')}
              className="flex-1 py-2.5 border border-slate-200 hover:bg-slate-100 text-slate-650 rounded-xl text-xs font-bold transition cursor-pointer"
            >
              Cancel Run
            </button>
            <button
              onClick={handleConfirm}
              className="flex-1 py-2.5 bg-primary text-white hover:bg-indigo-700 rounded-xl text-xs font-bold shadow-md shadow-indigo-500/20 transition cursor-pointer"
            >
              Approve & Release Payments
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default PayrollGenerator;
