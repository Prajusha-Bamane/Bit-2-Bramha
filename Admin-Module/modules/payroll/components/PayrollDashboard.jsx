import React from 'react';
import { 
  Banknote, 
  Users, 
  HelpCircle, 
  TrendingUp, 
  MinusCircle, 
  Gift, 
  Clock, 
  FileText,
  Award
} from 'lucide-react';
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

const StatCard = ({ title, value, sub, icon: Icon, color, bg }) => {
  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between hover:shadow-md transition-all duration-200 group">
      <div className="space-y-1.5">
        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{title}</span>
        <p className="text-xl font-black text-slate-805 tracking-tight group-hover:text-indigo-650 transition-colors">{value}</p>
        <span className="text-[10px] text-slate-500 font-bold block">{sub}</span>
      </div>
      <div className={`p-3 rounded-xl ${bg} ${color} group-hover:scale-105 transition-transform duration-200`}>
        <Icon className="h-5 w-5" />
      </div>
    </div>
  );
};

const PayrollDashboard = () => {
  // Recharts mock datasets
  const monthlyTrends = [
    { name: 'Jan', outflow: 4.8 },
    { name: 'Feb', outflow: 5.2 },
    { name: 'Mar', outflow: 4.9 },
    { name: 'Apr', outflow: 5.6 },
    { name: 'May', outflow: 5.8 },
    { name: 'Jun', outflow: 6.2 },
  ];

  const salaryDistribution = [
    { name: 'Development', avg: 135000, color: '#4F46E5' },
    { name: 'QA', avg: 98000, color: '#10B981' },
    { name: 'HR', avg: 85000, color: '#3B82F6' },
    { name: 'Finance', avg: 110000, color: '#F59E0B' },
    { name: 'Marketing', avg: 92000, color: '#8B5CF6' },
    { name: 'Sales', avg: 88000, color: '#EC4899' },
  ];

  const topEarners = [
    { name: 'Amit Kumar', salary: '₹1,80,000', bonus: '₹8,000', dept: 'Software Dev', initials: 'AK' },
    { name: 'Manoj Vyas', salary: '₹2,20,000', bonus: '₹12,000', dept: 'Operations', initials: 'MV' },
    { name: 'Rahul Sharma', salary: '₹1,50,000', bonus: '₹6,000', dept: 'Human Resources', initials: 'RS' },
  ];

  return (
    <div className="space-y-6">
      
      {/* 8 KPI cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard 
          title="Total Monthly Payroll" 
          value="₹6.2 Lakhs" 
          sub="Outflow June 2026" 
          icon={Banknote} 
          color="text-indigo-600" 
          bg="bg-indigo-50" 
        />
        <StatCard 
          title="Employees Paid" 
          value="45 / 52" 
          sub="June cycle release check" 
          icon={Users} 
          color="text-emerald-600" 
          bg="bg-emerald-50" 
        />
        <StatCard 
          title="Pending Payroll" 
          value="7 profiles" 
          sub="Requires manual audit release" 
          icon={HelpCircle} 
          color="text-amber-600" 
          bg="bg-amber-50" 
        />
        <StatCard 
          title="Average Salary" 
          value="₹1.15 Lakhs" 
          sub="Cost to Company (CTC) avg" 
          icon={TrendingUp} 
          color="text-blue-600" 
          bg="bg-blue-50" 
        />
        <StatCard 
          title="Total Deductions" 
          value="₹1.36 Lakhs" 
          sub="PF & Professional Tax sum" 
          icon={MinusCircle} 
          color="text-rose-600" 
          bg="bg-rose-50" 
        />
        <StatCard 
          title="Bonuses Released" 
          value="₹42,000" 
          sub="Performance incentives" 
          icon={Gift} 
          color="text-purple-600" 
          bg="bg-purple-50" 
        />
        <StatCard 
          title="Overtime Amount" 
          value="₹14,500" 
          sub="Shift duration calculations" 
          icon={Clock} 
          color="text-cyan-600" 
          bg="bg-cyan-50" 
        />
        <StatCard 
          title="Tax Deducted (TDS)" 
          value="₹62,000" 
          sub="Income tax slab deposits" 
          icon={FileText} 
          color="text-teal-600" 
          bg="bg-teal-50" 
        />
      </div>

      {/* Analytics Trend charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Monthly Trend area chart */}
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col h-[320px]">
          <div>
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Payroll Outflow Trend</h3>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">Total payout amount (in Lakhs) by month</p>
          </div>
          <div className="flex-1 mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyTrends} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
                <XAxis dataKey="name" stroke="#94A3B8" fontSize={10} tickLine={false} />
                <YAxis stroke="#94A3B8" fontSize={10} tickLine={false} />
                <Tooltip />
                <Area type="monotone" dataKey="outflow" stroke="#4F46E5" fillOpacity={0.1} fill="#4F46E5" strokeWidth={2.5} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Department Distribution bar chart */}
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col h-[320px]">
          <div>
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Department Salary Distribution</h3>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">Average salary CTC payouts by structures</p>
          </div>
          <div className="flex-1 mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={salaryDistribution} margin={{ top: 5, right: 5, left: -25, bottom: 5 }}>
                <XAxis dataKey="name" stroke="#94A3B8" fontSize={9} tickLine={false} />
                <YAxis stroke="#94A3B8" fontSize={10} tickLine={false} />
                <Tooltip />
                <Bar dataKey="avg" radius={[6, 6, 0, 0]}>
                  {salaryDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* Top earners list */}
      <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-4">
        <div className="border-b border-slate-50 pb-2.5">
          <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
            <Award className="h-4.5 w-4.5 text-indigo-650" />
            Top Earners List
          </h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {topEarners.map(t => (
            <div key={t.name} className="flex items-center justify-between p-3.5 bg-slate-50 border border-slate-100 rounded-xl hover:shadow-sm transition-shadow">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-700 text-xs">
                  {t.initials}
                </div>
                <div>
                  <span className="font-extrabold text-slate-800 block text-xs">{t.name}</span>
                  <span className="text-[9px] text-slate-400 font-bold uppercase">{t.dept}</span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-xs font-black text-slate-750 block">{t.salary}</span>
                <span className="text-[9px] text-emerald-600 font-bold block mt-0.5">Bonus: {t.bonus}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default PayrollDashboard;
