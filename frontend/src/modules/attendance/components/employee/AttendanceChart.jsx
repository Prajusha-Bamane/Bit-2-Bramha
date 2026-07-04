import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const AttendanceChart = ({ history }) => {
  // 1. Compile past 5 working days for Weekly Trend Chart
  const weeklyData = useMemo(() => {
    const workDaysOnly = history
      .filter((r) => r.status !== 'Weekend' && r.status !== 'Holiday' && r.status !== 'Leave')
      .slice(0, 5)
      .reverse();
      
    return workDaysOnly.map((r) => ({
      name: r.date.split('-')[2], // get day index
      'Worked Hours': r.workingHours,
      'Break Hours': r.breakHours,
    }));
  }, [history]);

  // 2. Compile stats for PieChart
  const pieData = useMemo(() => {
    const present = history.filter(r => r.status === 'Present').length;
    const late = history.filter(r => r.status === 'Late').length;
    const halfDay = history.filter(r => r.status === 'Half-Day').length;
    const absent = history.filter(r => r.status === 'Absent').length;
    
    return [
      { name: 'On-Time', value: present, color: '#10b981' }, // emerald
      { name: 'Late Arrival', value: late, color: '#f59e0b' }, // amber
      { name: 'Half Day', value: halfDay, color: '#8b5cf6' }, // purple
      { name: 'Absent', value: absent, color: '#ef4444' } // rose
    ].filter(item => item.value > 0);
  }, [history]);

  // 3. Compile working hours history trend (past 15 records)
  const areaData = useMemo(() => {
    return history
      .filter(r => r.workingHours > 0)
      .slice(0, 10)
      .reverse()
      .map(r => ({
        date: r.date.split('-')[2],
        Hours: r.workingHours
      }));
  }, [history]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      
      {/* Chart 1: Weekly logged hours */}
      <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
        <div>
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wide font-sans mb-4">
            Weekly Attendance Trend
          </h4>
          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={10} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={10} tickLine={false} />
                <Tooltip contentStyle={{ fontSize: '11px', borderRadius: '8px' }} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '10px', paddingTop: '10px' }} />
                <Bar dataKey="Worked Hours" fill="#4f46e5" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Break Hours" fill="#f59e0b" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Chart 2: Session Hours Area chart */}
      <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
        <div>
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wide font-sans mb-4">
            Shift Hours Distribution
          </h4>
          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={areaData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorHours" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="date" stroke="#94a3b8" fontSize={10} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={10} tickLine={false} />
                <Tooltip contentStyle={{ fontSize: '11px', borderRadius: '8px' }} />
                <Area type="monotone" dataKey="Hours" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorHours)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Chart 3: Punctuality PieChart */}
      <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
        <div>
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wide font-sans mb-4">
            Arrival & Status Allocation
          </h4>
          <div className="h-60 w-full flex items-center justify-center relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ fontSize: '11px', borderRadius: '8px' }} />
              </PieChart>
            </ResponsiveContainer>
            
            {/* Center label */}
            <div className="absolute flex flex-col items-center">
              <span className="text-2xl font-black text-slate-800 font-sans">98%</span>
              <span className="text-[9px] font-bold text-slate-450 uppercase tracking-wide">Punctuality</span>
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="flex justify-center flex-wrap gap-x-3 gap-y-1 text-[9px] font-bold text-slate-500 font-sans pt-2 border-t border-slate-50">
          {pieData.map((item, idx) => (
            <span key={idx} className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: item.color }}></span>
              {item.name}: {item.value}d
            </span>
          ))}
        </div>
      </div>

    </div>
  );
};

// Helper hook for imports mapping
import { useMemo } from 'react';

export default AttendanceChart;
