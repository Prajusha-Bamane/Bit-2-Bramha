import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

const StatCard = ({ 
  icon: Icon, 
  title, 
  value, 
  comparison, 
  trend, 
  isPositive, 
  accentColor 
}) => {
  const TrendIcon = isPositive ? ArrowUpRight : ArrowDownRight;

  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:border-slate-200/80 hover:-translate-y-0.5 transition-all duration-200 group cursor-pointer">
      <div className="flex items-center justify-between">
        <div className={`p-3 rounded-xl ${accentColor.bg} ${accentColor.text} group-hover:scale-105 transition-transform duration-250`}>
          <Icon className="h-6 w-6" />
        </div>
        {trend && (
          <span className={`inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-xs font-semibold ${
            isPositive 
              ? 'bg-emerald-50 text-emerald-700 border border-emerald-100/50' 
              : 'bg-rose-50 text-rose-700 border border-rose-100/50'
          }`}>
            <TrendIcon className="h-3.5 w-3.5" />
            {trend}
          </span>
        )}
      </div>
      
      <div className="mt-4">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">{title}</h3>
        <p className="text-3xl font-extrabold text-slate-800 mt-1 tracking-tight">{value}</p>
        {comparison && <p className="text-xs text-slate-500 mt-1.5">{comparison}</p>}
      </div>
    </div>
  );
};

export default StatCard;
