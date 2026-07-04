import React from 'react';
import { Award, Zap, CheckSquare, CalendarDays } from 'lucide-react';

const PerformanceWidget = () => {
  const metrics = [
    {
      title: 'Company Productivity',
      value: '91%',
      icon: Zap,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
      barColor: 'bg-indigo-600',
      percent: 91
    },
    {
      title: 'Average Attendance',
      value: '94.5%',
      icon: CalendarDays,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      barColor: 'bg-emerald-600',
      percent: 94.5
    },
    {
      title: 'Employee Performance',
      value: '88%',
      icon: Award,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      barColor: 'bg-blue-600',
      percent: 88
    },
    {
      title: 'Task Completion Rate',
      value: '85%',
      icon: CheckSquare,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      barColor: 'bg-purple-600',
      percent: 85
    }
  ];

  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm h-full">
      <h3 className="text-sm font-bold text-slate-800 mb-4 font-sans font-bold">Organizational Metrics</h3>
      
      <div className="space-y-4">
        {metrics.map((item, idx) => (
          <div key={idx} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className={`p-1 rounded-lg ${item.bgColor} ${item.color}`}>
                  <item.icon className="h-4 w-4" />
                </div>
                <span className="text-xs font-bold text-slate-600">{item.title}</span>
              </div>
              <span className="text-xs font-extrabold text-slate-800">{item.value}</span>
            </div>
            
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div 
                className={`h-full rounded-full transition-all duration-500 ${item.barColor}`}
                style={{ width: `${item.percent}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PerformanceWidget;
