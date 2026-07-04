import React, { useState } from 'react';
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend 
} from 'recharts';
import { TrendingUp, Calendar } from 'lucide-react';

const AttendanceChart = () => {
  const [activeTab, setActiveTab] = useState('weekly');

  const weeklyData = [
    { name: 'Mon', Present: 96, Target: 95 },
    { name: 'Tue', Present: 95, Target: 95 },
    { name: 'Wed', Present: 94, Target: 95 },
    { name: 'Thu', Present: 97, Target: 95 },
    { name: 'Fri', Present: 93, Target: 95 },
    { name: 'Sat', Present: 88, Target: 95 },
  ];

  const monthlyData = [
    { name: 'Jan', Rate: 92 },
    { name: 'Feb', Rate: 93 },
    { name: 'Mar', Rate: 95 },
    { name: 'Apr', Rate: 94 },
    { name: 'May', Rate: 93 },
    { name: 'Jun', Rate: 94.5 },
  ];

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm h-full flex flex-col">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h3 className="text-base font-bold text-slate-800 font-sans">Attendance Analytics</h3>
          <p className="text-xs text-slate-500 mt-0.5">Real-time check-in compliance logs</p>
        </div>
        
        {/* Chart switch tabs */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl self-start sm:self-auto">
          <button
            onClick={() => setActiveTab('weekly')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
              activeTab === 'weekly' 
                ? 'bg-white text-indigo-600 shadow-sm' 
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Weekly Trend
          </button>
          <button
            onClick={() => setActiveTab('monthly')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
              activeTab === 'monthly' 
                ? 'bg-white text-indigo-600 shadow-sm' 
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Monthly Summary
          </button>
        </div>
      </div>

      <div className="flex-1 min-h-[280px]">
        {activeTab === 'weekly' ? (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={weeklyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
              <XAxis dataKey="name" stroke="#94A3B8" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis stroke="#94A3B8" fontSize={11} tickLine={false} axisLine={false} domain={[80, 100]} />
              <Tooltip 
                contentStyle={{ background: '#0F172A', borderRadius: '12px', border: 'none' }}
                labelStyle={{ color: '#94A3B8', fontWeight: 'bold' }}
                itemStyle={{ color: '#FFF' }}
              />
              <Legend verticalAlign="top" height={36} iconType="circle" wrapperStyle={{ fontSize: 11, fontWeight: 'bold' }} />
              <Line type="monotone" dataKey="Present" stroke="#4F46E5" strokeWidth={3} activeDot={{ r: 6 }} dot={{ r: 4 }} name="Present %" />
              <Line type="monotone" dataKey="Target" stroke="#CBD5E1" strokeDasharray="5 5" strokeWidth={2} dot={false} name="Target Threshold" />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
              <XAxis dataKey="name" stroke="#94A3B8" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis stroke="#94A3B8" fontSize={11} tickLine={false} axisLine={false} domain={[80, 100]} />
              <Tooltip 
                contentStyle={{ background: '#0F172A', borderRadius: '12px', border: 'none' }}
                labelStyle={{ color: '#94A3B8', fontWeight: 'bold' }}
                itemStyle={{ color: '#FFF' }}
              />
              <Legend verticalAlign="top" height={36} iconType="circle" wrapperStyle={{ fontSize: 11, fontWeight: 'bold' }} />
              <Bar dataKey="Rate" fill="#4F46E5" radius={[6, 6, 0, 0]} name="Average Rate %" maxBarSize={30} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default AttendanceChart;
