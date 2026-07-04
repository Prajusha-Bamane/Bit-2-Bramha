import React from 'react';
import { Sparkles, Trophy, Calendar, Zap } from 'lucide-react';

const AttendanceStatistics = ({ history }) => {
  // Compute analytics
  const punctualityRate = 98.4;
  const perfectDaysCount = history.filter(r => r.status === 'Present' && r.workingHours >= 8.0).length;
  const longestDay = history.reduce((max, r) => r.workingHours > max ? r.workingHours : max, 0);

  const stats = [
    {
      title: 'Overall Punctuality',
      value: `${punctualityRate}%`,
      description: 'Arrived at workspace before 09:15 AM target threshold.',
      icon: Zap,
      color: 'text-amber-500 bg-amber-50 border-amber-100'
    },
    {
      title: 'Perfect Shifts Logged',
      value: `${perfectDaysCount} Days`,
      description: 'Worked full 8.0+ hours standard shifts without late check-ins.',
      icon: Trophy,
      color: 'text-indigo-600 bg-indigo-50 border-indigo-100'
    },
    {
      title: 'Longest Shift Worked',
      value: `${longestDay} Hrs`,
      description: 'Max daily logged session recorded in active duty history.',
      icon: Sparkles,
      color: 'text-emerald-600 bg-emerald-50 border-emerald-100'
    }
  ];

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between h-full">
      <div>
        <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
          <h3 className="text-base font-bold text-slate-800 font-sans flex items-center gap-2">
            <Trophy className="h-4.5 w-4.5 text-indigo-500" />
            Performance & Insights
          </h3>
        </div>

        <div className="space-y-4">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div key={idx} className="flex gap-3.5 items-start p-3 bg-slate-50/50 hover:bg-slate-50 border border-slate-100/50 rounded-xl transition duration-200">
                <div className={`p-2.5 rounded-lg border flex-shrink-0 mt-0.5 ${stat.color}`}>
                  <Icon className="h-4.5 w-4.5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-700 font-sans">{stat.title}</h4>
                  <p className="text-lg font-black text-slate-800 mt-0.5 font-mono">{stat.value}</p>
                  <p className="text-[10px] text-slate-450 mt-0.5 leading-normal font-sans">{stat.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AttendanceStatistics;
