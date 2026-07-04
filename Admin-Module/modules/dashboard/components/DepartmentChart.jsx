import React from 'react';
import { 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  Tooltip, 
  Legend 
} from 'recharts';

const DepartmentChart = () => {
  const data = [
    { name: 'Software Dev', value: 450, color: '#4F46E5' },
    { name: 'Sales', value: 300, color: '#10B981' },
    { name: 'Marketing', value: 180, color: '#3B82F6' },
    { name: 'Quality Assurance', value: 120, color: '#F59E0B' },
    { name: 'Administration', value: 80, color: '#8B5CF6' },
    { name: 'Finance', value: 70, color: '#EC4899' },
    { name: 'Human Resources', value: 48, color: '#06B6D4' },
  ];

  const totalHeadcount = data.reduce((acc, curr) => acc + curr.value, 0);

  const customTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const dataVal = payload[0].payload;
      const percentage = ((dataVal.value / totalHeadcount) * 100).toFixed(1);
      return (
        <div className="bg-slate-900 border-none p-3 rounded-xl text-white shadow-lg text-xs">
          <p className="font-bold">{dataVal.name}</p>
          <p className="mt-1 font-semibold">Headcount: <span className="text-indigo-300">{dataVal.value}</span></p>
          <p className="font-semibold">Ratio: <span className="text-emerald-300">{percentage}%</span></p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm h-full flex flex-col">
      <div>
        <h3 className="text-base font-bold text-slate-800 font-sans">Department Headcount</h3>
        <p className="text-xs text-slate-500 mt-0.5">Distribution of {totalHeadcount} active employees</p>
      </div>

      <div className="flex-1 min-h-[280px] relative flex items-center justify-center">
        {/* Render Chart */}
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Tooltip content={customTooltip} />
            <Legend 
              verticalAlign="bottom" 
              height={40} 
              iconType="circle" 
              wrapperStyle={{ fontSize: 10, fontWeight: 'bold' }} 
            />
            <Pie
              data={data}
              cx="50%"
              cy="45%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={4}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        {/* Center overlay label */}
        <div className="absolute top-[40%] flex flex-col items-center">
          <span className="text-slate-400 text-[10px] uppercase font-bold tracking-wider">Total</span>
          <span className="text-xl font-black text-slate-800 leading-none mt-0.5">{totalHeadcount}</span>
        </div>
      </div>
    </div>
  );
};

export default DepartmentChart;
