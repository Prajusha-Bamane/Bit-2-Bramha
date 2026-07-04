import React from 'react';
import { 
  FileText, 
  CheckCircle2, 
  XCircle, 
  Users, 
  CalendarDays, 
  PieChart as ChartIcon,
  Clock,
  Briefcase,
  AlertCircle
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  Tooltip, 
  BarChart, 
  Bar, 
  Cell 
} from 'recharts';

const DashboardCard = ({ title, value, sub, icon: Icon, color, bg }) => {
  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between hover:shadow-md transition-all duration-250 group">
      <div className="space-y-1">
        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{title}</span>
        <p className="text-xl font-black text-slate-800 tracking-tight group-hover:text-primary transition-colors">{value}</p>
        <span className="text-[10px] text-slate-500 font-bold block">{sub}</span>
      </div>
      <div className={`p-3 rounded-xl ${bg} ${color} group-hover:scale-105 transition-transform duration-200`}>
        <Icon className="h-5 w-5" />
      </div>
    </div>
  );
};

const LeaveDashboard = () => {
  // Recharts data
  const monthlyTrends = [
    { name: 'Jan', requests: 12 },
    { name: 'Feb', requests: 18 },
    { name: 'Mar', requests: 15 },
    { name: 'Apr', requests: 22 },
    { name: 'May', requests: 28 },
    { name: 'Jun', requests: 35 },
  ];

  const leaveDistribution = [
    { name: 'Casual', value: 45, color: '#4F46E5' },
    { name: 'Sick', value: 30, color: '#10B981' },
    { name: 'Earned', value: 15, color: '#3B82F6' },
    { name: 'WFH', value: 8, color: '#F59E0B' },
    { name: 'Unpaid', value: 2, color: '#EC4899' },
  ];

  const balancesList = [
    { name: 'Total Allotted', value: '30 days', icon: Briefcase, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { name: 'Leave Taken', value: '12 days', icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { name: 'Casual balance', value: '8 days', icon: CalendarDays, color: 'text-blue-600', bg: 'bg-blue-50' },
    { name: 'Sick Balance', value: '10 days', icon: Clock, color: 'text-purple-600', bg: 'bg-purple-50' },
  ];

  return (
    <div className="space-y-6">
      
      {/* 8 KPI cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <DashboardCard 
          title="Pending Requests" 
          value="8 requests" 
          sub="3 urgent review flags" 
          icon={FileText} 
          color="text-amber-600" 
          bg="bg-amber-50" 
        />
        <DashboardCard 
          title="Approved Requests" 
          value="142 approved" 
          sub="84.2% approval rate" 
          icon={CheckCircle2} 
          color="text-emerald-600" 
          bg="bg-emerald-50" 
        />
        <DashboardCard 
          title="Rejected Requests" 
          value="18 requests" 
          sub="12.4% rejection rate" 
          icon={XCircle} 
          color="text-rose-600" 
          bg="bg-rose-50" 
        />
        <DashboardCard 
          title="On Leave Today" 
          value="4 employees" 
          sub="Ramesh, Priya, Swati, Sunil" 
          icon={Users} 
          color="text-indigo-600" 
          bg="bg-indigo-50" 
        />
        <DashboardCard 
          title="Upcoming Leaves" 
          value="12 scheduled" 
          sub="Next 14 days calendar" 
          icon={CalendarDays} 
          color="text-blue-600" 
          bg="bg-blue-50" 
        />
        <DashboardCard 
          title="Leave Utilization" 
          value="40.0%" 
          sub="Used vs yearly budget" 
          icon={ChartIcon} 
          color="text-teal-600" 
          bg="bg-teal-50" 
        />
        <DashboardCard 
          title="Avg Leave Duration" 
          value="2.4 days" 
          sub="Consistent with benchmark" 
          icon={Clock} 
          color="text-cyan-600" 
          bg="bg-cyan-50" 
        />
        <DashboardCard 
          title="Monthly Requests" 
          value="35 applications" 
          sub="+8.2% than last month" 
          icon={FileText} 
          color="text-purple-600" 
          bg="bg-purple-50" 
        />
      </div>

      {/* Leave balance allocations */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {balancesList.map(b => (
          <div key={b.name} className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex items-center gap-3.5 hover:shadow-md transition-shadow">
            <div className={`p-2.5 rounded-lg ${b.bg} ${b.color}`}>
              <b.icon className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{b.name}</p>
              <p className="text-lg font-black text-slate-805 tracking-tight">{b.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Analytics trends */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Monthly line trend */}
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col h-[320px]">
          <div>
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Leave Applications Trend</h3>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">Submitted requests count over time</p>
          </div>
          <div className="flex-1 mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyTrends} margin={{ top: 5, right: 5, left: -25, bottom: 5 }}>
                <XAxis dataKey="name" stroke="#94A3B8" fontSize={10} tickLine={false} />
                <YAxis stroke="#94A3B8" fontSize={10} tickLine={false} />
                <Tooltip />
                <Line type="monotone" dataKey="requests" stroke="#4F46E5" strokeWidth={2.5} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Leave distribution bar chart */}
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col h-[320px]">
          <div>
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Leave Category Distribution</h3>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">Applications ratio by status type</p>
          </div>
          <div className="flex-1 mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={leaveDistribution} margin={{ top: 5, right: 5, left: -25, bottom: 5 }}>
                <XAxis dataKey="name" stroke="#94A3B8" fontSize={10} tickLine={false} />
                <YAxis stroke="#94A3B8" fontSize={10} tickLine={false} />
                <Tooltip />
                <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                  {leaveDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* Notification banner */}
      <div className="p-4 bg-amber-50 border border-amber-100 rounded-2xl flex items-start gap-2 text-xs text-amber-900 shadow-sm">
        <AlertCircle className="h-4.5 w-4.5 text-amber-600 flex-shrink-0 mt-0.5 animate-pulse" />
        <div>
          <span className="font-bold">Pending Approval Review Action Required</span>
          <p className="text-[10px] text-amber-700 mt-0.5">You have 8 pending leave requests awaiting your decision. 3 requests are expiring in the next 48 hours.</p>
        </div>
      </div>

    </div>
  );
};

export default LeaveDashboard;
