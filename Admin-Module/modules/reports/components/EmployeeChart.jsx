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
  Cell, 
  PieChart, 
  Pie 
} from 'recharts';
import { mockReportsData } from '../data/mockReportsData';

const EmployeeChart = () => {
  const genderData = [
    { name: 'Male', value: 32, color: '#3B82F6' },
    { name: 'Female', value: 18, color: '#EC4899' },
    { name: 'Non-binary', value: 2, color: '#10B981' },
  ];

  const ageData = [
    { name: '20-25', count: 12, color: '#4F46E5' },
    { name: '26-30', count: 22, color: '#4F46E5' },
    { name: '31-35', count: 11, color: '#4F46E5' },
    { name: '36-40', count: 5, color: '#4F46E5' },
    { name: '40+', count: 2, color: '#4F46E5' },
  ];

  return (
    <div className="space-y-6">
      
      {/* Growths timeline */}
      <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col h-[320px]">
        <div>
          <h3 className="text-xs font-bold text-slate-805 uppercase tracking-wider">Employee Headcount Growth</h3>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">Total staff active count over 12 months</p>
        </div>
        <div className="flex-1 mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={mockReportsData.monthlyGrowth} margin={{ top: 5, right: 5, left: -25, bottom: 5 }}>
              <XAxis dataKey="month" stroke="#94A3B8" fontSize={9} tickLine={false} />
              <YAxis stroke="#94A3B8" fontSize={10} tickLine={false} />
              <Tooltip />
              <Area type="monotone" dataKey="headcount" stroke="#4F46E5" fillOpacity={0.08} fill="#4F46E5" strokeWidth={2.5} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Age Groups bar */}
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col h-[300px]">
          <div>
            <h3 className="text-xs font-bold text-slate-805 uppercase tracking-wider">Age Distribution</h3>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">Staff headcount ratio divided by age categories</p>
          </div>
          <div className="flex-1 mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ageData} margin={{ top: 5, right: 5, left: -25, bottom: 5 }}>
                <XAxis dataKey="name" stroke="#94A3B8" fontSize={10} tickLine={false} />
                <YAxis stroke="#94A3B8" fontSize={10} tickLine={false} />
                <Tooltip />
                <Bar dataKey="count" fill="#4F46E5" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Gender Distribution Pie */}
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col h-[300px]">
          <div>
            <h3 className="text-xs font-bold text-slate-850 uppercase tracking-wider">Gender Demographics</h3>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">Distribution counts by gender identity</p>
          </div>
          <div className="flex-1 flex items-center justify-center mt-2 relative">
            <div className="w-[180px] h-[180px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Tooltip />
                  <Pie
                    data={genderData}
                    cx="50%"
                    cy="50%"
                    innerRadius={45}
                    outerRadius={65}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {genderData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            <div className="absolute right-4 space-y-2 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
              {genderData.map(g => (
                <div key={g.name} className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: g.color }}></span>
                  <span>{g.name}: {g.value} staff</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};

export default EmployeeChart;
