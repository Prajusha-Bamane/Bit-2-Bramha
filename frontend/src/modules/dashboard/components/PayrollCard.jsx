import React from 'react';
import { IndianRupee, HelpCircle, CheckCircle2, TrendingUp } from 'lucide-react';

const PayrollCard = () => {
  const items = [
    {
      title: 'Monthly Payroll',
      value: '₹48,25,000',
      icon: IndianRupee,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
      desc: 'June total payout',
    },
    {
      title: 'Average Salary',
      value: '₹65,000',
      icon: TrendingUp,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      desc: 'Per active employee',
    },
    {
      title: 'Pending Payroll',
      value: '₹95,000',
      icon: HelpCircle,
      color: 'text-amber-600',
      bgColor: 'bg-amber-50',
      desc: '8 contractor balances',
    },
    {
      title: 'Processed Payroll',
      value: '₹47,30,000',
      icon: CheckCircle2,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      desc: 'Transferred via bank',
    },
  ];

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-bold text-slate-800 font-sans">Payroll Summary</h3>
        <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-100/50">
          Monthly Payout Cycle
        </span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {items.map((item, idx) => (
          <div key={idx} className="p-4 bg-slate-50/50 rounded-xl border border-slate-100">
            <div className="flex items-center gap-2 mb-2">
              <div className={`p-1.5 rounded-lg ${item.bgColor} ${item.color}`}>
                <item.icon className="h-4 w-4" />
              </div>
              <span className="text-xs font-bold text-slate-500">{item.title}</span>
            </div>
            <p className="text-xl font-extrabold text-slate-800 tracking-tight">{item.value}</p>
            <p className="text-[10px] text-slate-400 mt-1">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PayrollCard;
