import React from 'react';
import { 
  ResponsiveContainer, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  Radar, 
  PieChart, 
  Pie, 
  Cell, 
  Tooltip,
  BarChart,
  Bar
} from 'recharts';
import { mockReportsData } from '../data/mockReportsData';

const LeaveChart = () => {
  const radarData = [
    { subject: 'Software Dev', A: 90, fullMark: 100 },
    { subject: 'QA', A: 75, fullMark: 100 },
    { subject: 'HR', A: 60, fullMark: 100 },
    { subject: 'Finance', A: 50, fullMark: 100 },
    { subject: 'Marketing', A: 85, fullMark: 100 },
    { subject: 'Sales', A: 80, fullMark: 100 },
  ];

  const pieData = [
    { name: 'Casual', value: 45, color: '#4F46E5' },
    { name: 'Sick', value: 30, color: '#EC4899' },
    { name: 'Earned', value: 15, color: '#10B981' },
    { name: 'WFH', value: 8, color: '#F59E0B' },
    { name: 'Unpaid', value: 2, color: '#3B82F6' },
  ];

  return (
    <div className="space-y-6">
      
      {/* Growths timeline */}
      <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col h-[320px]">
        <div>
          <h3 className="text-xs font-bold text-slate-805 uppercase tracking-wider">Leave Applications Trend</h3>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">Approved requests count over time</p>
        </div>
        <div className="flex-1 mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={mockReportsData.leaveTrends} margin={{ top: 5, right: 5, left: -25, bottom: 5 }}>
              <XAxis dataKey="name" stroke="#94A3B8" fontSize={10} tickLine={false} />
              <YAxis stroke="#94A3B8" fontSize={10} tickLine={false} />
              <Tooltip />
              <Bar dataKey="approved" fill="#10B981" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Radar Leave profile */}
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col h-[320px]">
          <div>
            <h3 className="text-xs font-bold text-slate-850 uppercase tracking-wider">Leave Distribution Radar</h3>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">Calculated utilization averages by teams</p>
          </div>
          <div className="flex-1 mt-2 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" fontSize={9} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} fontSize={8} />
                <Radar name="Utilization %" dataKey="A" stroke="#4F46E5" fill="#4F46E5" fillOpacity={0.15} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Categories Pie */}
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col h-[320px]">
          <div>
            <h3 className="text-xs font-bold text-slate-850 uppercase tracking-wider">Leave Categories Breakdown</h3>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">Ratio distribution of approved leave types</p>
          </div>
          <div className="flex-1 flex items-center justify-center mt-2 relative">
            <div className="w-[180px] h-[180px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Tooltip />
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={45}
                    outerRadius={65}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            <div className="absolute right-4 space-y-1.5 text-[9px] font-bold text-slate-500 uppercase tracking-wider">
              {pieData.map(p => (
                <div key={p.name} className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: p.color }}></span>
                  <span>{p.name}: {p.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};

export default LeaveChart;
