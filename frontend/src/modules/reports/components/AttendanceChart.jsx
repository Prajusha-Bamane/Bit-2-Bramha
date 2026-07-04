import React from 'react';
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
import { mockReportsData } from '../data/mockReportsData';

const AttendanceChart = () => {
  const lateArrivalsByDept = [
    { name: 'Dev', count: 6, color: '#4F46E5' },
    { name: 'QA', count: 3, color: '#10B981' },
    { name: 'HR', count: 1, color: '#3B82F6' },
    { name: 'Sales', count: 4, color: '#F59E0B' },
    { name: 'Admin', count: 0, color: '#EC4899' },
  ];

  return (
    <div className="space-y-6">
      
      {/* Weekday line trend */}
      <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col h-[320px]">
        <div>
          <h3 className="text-xs font-bold text-slate-805 uppercase tracking-wider">Weekly Attendance Presence Rate</h3>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">Average active check-in presence percentage</p>
        </div>
        <div className="flex-1 mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={mockReportsData.attendanceTrends} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
              <XAxis dataKey="day" stroke="#94A3B8" fontSize={10} tickLine={false} />
              <YAxis stroke="#94A3B8" fontSize={10} domain={[85, 100]} tickLine={false} />
              <Tooltip />
              <Line type="monotone" dataKey="rate" stroke="#10B981" strokeWidth={2.5} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Late arrival stats */}
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col h-[300px]">
          <div>
            <h3 className="text-xs font-bold text-slate-850 uppercase tracking-wider">Late Arrivals by Department</h3>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">Total count of delay occurrences</p>
          </div>
          <div className="flex-1 mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={lateArrivalsByDept} margin={{ top: 5, right: 5, left: -25, bottom: 5 }}>
                <XAxis dataKey="name" stroke="#94A3B8" fontSize={10} tickLine={false} />
                <YAxis stroke="#94A3B8" fontSize={10} tickLine={false} />
                <Tooltip />
                <Bar dataKey="count" fill="#EC4899" radius={[6, 6, 0, 0]}>
                  {lateArrivalsByDept.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Heatmap UI Placeholder grid */}
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-4">
          <div>
            <h3 className="text-xs font-bold text-slate-850 uppercase tracking-wider font-sans">Attendance Heatmap (June 2026)</h3>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">Presence density indicator by weekday cycles</p>
          </div>
          
          <div className="grid grid-cols-6 gap-2 text-center text-[10px] font-bold text-slate-500 uppercase tracking-wider pt-2">
            <span>Mon</span>
            <span>Tue</span>
            <span>Wed</span>
            <span>Thu</span>
            <span>Fri</span>
            <span>Sat</span>
          </div>

          <div className="grid grid-cols-6 gap-2 flex-1">
            {Array.from({ length: 24 }).map((_, i) => {
              const densities = ['bg-emerald-500', 'bg-emerald-400', 'bg-emerald-300', 'bg-emerald-200', 'bg-emerald-100', 'bg-amber-100'];
              const cellBg = densities[(i * 3 + 1) % densities.length];
              return (
                <div 
                  key={i} 
                  className={`aspect-square rounded-lg ${cellBg} border border-white hover:ring-2 hover:ring-indigo-500 hover:ring-offset-1 transition cursor-pointer`}
                  title={`Cycle index ${i + 1}: Density verified`}
                />
              );
            })}
          </div>
        </div>

      </div>

    </div>
  );
};

export default AttendanceChart;
