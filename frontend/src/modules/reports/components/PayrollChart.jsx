import React from 'react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  BarChart, 
  Bar, 
  Cell 
} from 'recharts';
import { mockReportsData } from '../data/mockReportsData';

const PayrollChart = () => {
  const salaryRanges = [
    { range: '₹30k-₹60k', count: 28, color: '#4F46E5' },
    { range: '₹60k-₹90k', count: 14, color: '#10B981' },
    { range: '₹90k-₹120k', count: 6, color: '#3B82F6' },
    { range: '₹120k-₹150k', count: 3, color: '#F59E0B' },
    { range: '₹150k+', count: 1, color: '#EC4899' },
  ];

  return (
    <div className="space-y-6">
      
      {/* Monthly line trend */}
      <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col h-[320px]">
        <div>
          <h3 className="text-xs font-bold text-slate-805 uppercase tracking-wider">Payroll Outflow Expense</h3>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">Total payout amount (in Lakhs) by month</p>
        </div>
        <div className="flex-1 mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={mockReportsData.payrollOutflow} margin={{ top: 5, right: 5, left: -25, bottom: 5 }}>
              <XAxis dataKey="name" stroke="#94A3B8" fontSize={10} tickLine={false} />
              <YAxis stroke="#94A3B8" fontSize={10} tickLine={false} />
              <Tooltip />
              <Area type="monotone" dataKey="expense" stroke="#EC4899" fillOpacity={0.08} fill="#EC4899" strokeWidth={2.5} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Salary ranges bar */}
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col h-[300px]">
          <div>
            <h3 className="text-xs font-bold text-slate-850 uppercase tracking-wider">Salary Range Distribution</h3>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">Employee count divided by CTC ranges</p>
          </div>
          <div className="flex-1 mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={salaryRanges} margin={{ top: 5, right: 5, left: -25, bottom: 5 }}>
                <XAxis dataKey="range" stroke="#94A3B8" fontSize={9} tickLine={false} />
                <YAxis stroke="#94A3B8" fontSize={10} tickLine={false} />
                <Tooltip />
                <Bar dataKey="count" fill="#4F46E5" radius={[6, 6, 0, 0]}>
                  {salaryRanges.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Deductions Pie Chart UI placeholder */}
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-4">
          <div>
            <h3 className="text-xs font-bold text-slate-850 uppercase tracking-wider">Deductions Breakdown Summary</h3>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">Ratio of PF, Professional Tax, and TDS deductions</p>
          </div>
          
          <div className="space-y-3.5 pt-2 text-xs">
            <div className="flex items-center justify-between border-b border-slate-50 pb-2">
              <span className="text-slate-500 font-semibold">Provident Fund (PF)</span>
              <span className="font-extrabold text-slate-800">55.2%</span>
            </div>
            <div className="flex items-center justify-between border-b border-slate-50 pb-2">
              <span className="text-slate-500 font-semibold">Income Tax (TDS)</span>
              <span className="font-extrabold text-slate-800">42.4%</span>
            </div>
            <div className="flex items-center justify-between border-b border-slate-50 pb-2">
              <span className="text-slate-500 font-semibold">Professional Tax (PT)</span>
              <span className="font-extrabold text-slate-800">2.4%</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};

export default PayrollChart;
