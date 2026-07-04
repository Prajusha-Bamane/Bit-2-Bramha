import React from 'react';
import { 
  Users, 
  UserMinus, 
  Clock, 
  Home, 
  Calendar, 
  Hourglass, 
  Award,
  TrendingUp,
  AlertCircle
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
        <p className="text-xl font-black text-slate-800 tracking-tight group-hover:text-indigo-600 transition-colors">{value}</p>
        <span className="text-[10px] text-slate-500 font-bold block">{sub}</span>
      </div>
      <div className={`p-3 rounded-xl ${bg} ${color} group-hover:scale-105 transition-transform duration-200`}>
        <Icon className="h-5 w-5" />
      </div>
    </div>
  );
};

const AttendanceDashboard = () => {
  // Recharts mock datasets
  const dailyTrends = [
    { name: 'Mon', Present: 48, Target: 52 },
    { name: 'Tue', Present: 49, Target: 52 },
    { name: 'Wed', Present: 45, Target: 52 },
    { name: 'Thu', Present: 51, Target: 52 },
    { name: 'Fri', Present: 47, Target: 52 },
    { name: 'Sat', Present: 46, Target: 52 },
  ];

  const deptComparison = [
    { name: 'Soft Dev', rate: 96.5, color: '#4F46E5' },
    { name: 'QA', rate: 94.8, color: '#10B981' },
    { name: 'HR', rate: 98.0, color: '#3B82F6' },
    { name: 'Finance', rate: 95.0, color: '#F59E0B' },
    { name: 'Marketing', rate: 92.2, color: '#8B5CF6' },
    { name: 'Sales', rate: 91.0, color: '#EC4899' },
  ];

  const topPerformers = [
    { name: 'Rahul Sharma', rate: '98.5%', punctuality: '99%', hours: '9.2 hrs', initials: 'RS' },
    { name: 'Manoj Vyas', rate: '98.9%', punctuality: '98%', hours: '9.3 hrs', initials: 'MV' },
    { name: 'Swati Modi', rate: '96.5%', punctuality: '97%', hours: '9.1 hrs', initials: 'SM' },
  ];

  return (
    <div className="space-y-6">
      
      {/* 8 KPI cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard 
          title="Present Today" 
          value="45 / 52" 
          sub="86.5% attendance rate" 
          icon={Users} 
          color="text-emerald-600" 
          bg="bg-emerald-50" 
        />
        <StatCard 
          title="Late Arrivals" 
          value="6 employees" 
          sub="+1.2% than yesterday" 
          icon={Clock} 
          color="text-amber-600" 
          bg="bg-amber-50" 
        />
        <StatCard 
          title="Work From Home" 
          value="8 employees" 
          sub="Remote location logged" 
          icon={Home} 
          color="text-blue-600" 
          bg="bg-blue-50" 
        />
        <StatCard 
          title="Employees on Leave" 
          value="4 approved" 
          sub="3 annual, 1 medical" 
          icon={Calendar} 
          color="text-purple-600" 
          bg="bg-purple-50" 
        />
        <StatCard 
          title="Absent Today" 
          value="3 unexcused" 
          sub="Pending supervisor alert" 
          icon={UserMinus} 
          color="text-rose-600" 
          bg="bg-rose-50" 
        />
        <StatCard 
          title="Half Day Logs" 
          value="2 requests" 
          sub="4-hour duration shifts" 
          icon={Hourglass} 
          color="text-cyan-600" 
          bg="bg-cyan-50" 
        />
        <StatCard 
          title="Avg. Working Hours" 
          value="8.8 hrs" 
          sub="Standard 8.0 hr baseline" 
          icon={TrendingUp} 
          color="text-indigo-600" 
          bg="bg-indigo-50" 
        />
        <StatCard 
          title="Overall Attendance" 
          value="95.4%" 
          sub="Year-to-date average" 
          icon={Award} 
          color="text-teal-600" 
          bg="bg-teal-50" 
        />
      </div>

      {/* Analytics Charts split */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Daily Attendance Trend line chart */}
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col h-[320px]">
          <div>
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Weekly Attendance Trend</h3>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">Active checked-in count vs target</p>
          </div>
          <div className="flex-1 mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={dailyTrends} margin={{ top: 5, right: 5, left: -25, bottom: 5 }}>
                <XAxis dataKey="name" stroke="#94A3B8" fontSize={10} tickLine={false} />
                <YAxis stroke="#94A3B8" fontSize={10} tickLine={false} />
                <Tooltip />
                <Area type="monotone" dataKey="Present" stroke="#4F46E5" fillOpacity={0.1} fill="#4F46E5" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Department Comparison bar chart */}
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col h-[320px]">
          <div>
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Department Comparison</h3>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">Percentage average by structures</p>
          </div>
          <div className="flex-1 mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={deptComparison} margin={{ top: 5, right: 5, left: -25, bottom: 5 }}>
                <XAxis dataKey="name" stroke="#94A3B8" fontSize={9} tickLine={false} />
                <YAxis domain={[80, 100]} stroke="#94A3B8" fontSize={10} tickLine={false} />
                <Tooltip />
                <Bar dataKey="rate" radius={[6, 6, 0, 0]}>
                  {deptComparison.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* Performers and Overtime details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Overtime reports */}
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-4">
          <div className="border-b border-slate-50 pb-2.5">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Overtime Reports</h3>
          </div>
          
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl">
              <span className="text-[9px] text-slate-400 font-bold uppercase">Highest Overtime</span>
              <p className="text-sm font-black text-slate-700 mt-0.5">14.5 hrs</p>
            </div>
            <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl">
              <span className="text-[9px] text-slate-400 font-bold uppercase">Average Overtime</span>
              <p className="text-sm font-black text-slate-700 mt-0.5">4.2 hrs</p>
            </div>
            <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl">
              <span className="text-[9px] text-slate-400 font-bold uppercase">Pending Claims</span>
              <p className="text-sm font-black text-amber-600 mt-0.5">8 requests</p>
            </div>
            <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl">
              <span className="text-[9px] text-slate-400 font-bold uppercase">Total Monthly</span>
              <p className="text-sm font-black text-indigo-650 mt-0.5">124 hrs</p>
            </div>
          </div>
        </div>

        {/* Top performers list */}
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-4">
          <div className="border-b border-slate-50 pb-2.5">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Top Performers</h3>
          </div>
          
          <div className="space-y-3">
            {topPerformers.map(p => (
              <div key={p.name} className="flex items-center justify-between text-xs p-1">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center font-bold text-slate-700 text-[10px]">
                    {p.initials}
                  </div>
                  <div>
                    <span className="font-bold text-slate-850 block">{p.name}</span>
                    <span className="text-[9px] text-slate-400 font-bold uppercase">Avg Shift: {p.hours}</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100/50">
                    {p.rate}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Low attendance alerts below 75% */}
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-4">
          <div className="border-b border-slate-50 pb-2.5">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider text-rose-600">Low Attendance Alerts</h3>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs bg-rose-50/50 border border-rose-100/60 p-2.5 rounded-xl">
              <div className="flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-rose-500" />
                <div>
                  <span className="font-bold text-slate-800">Deepa Iyer</span>
                  <span className="text-[9px] text-slate-400 block mt-0.5">Marketing Specialist</span>
                </div>
              </div>
              <span className="font-black text-rose-600 bg-white border border-rose-200/50 px-2.5 py-0.5 rounded-full">
                82.5%
              </span>
            </div>
            
            <p className="text-[10px] text-slate-400 font-semibold text-center italic mt-1">
              Managers notified to review probation thresholds.
            </p>
          </div>
        </div>

      </div>

    </div>
  );
};

export default AttendanceDashboard;
