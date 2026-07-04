import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

const PersonalStatCard = ({ title, value, icon: Icon, description, trend, trendType, iconBg = 'bg-indigo-50 text-indigo-600' }) => {
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md group">
      <div className="flex items-center justify-between mb-4">
        {/* Rounded Icon */}
        <div className={`p-3 rounded-xl transition-all duration-300 group-hover:scale-110 ${iconBg}`}>
          <Icon className="h-5 w-5" />
        </div>

        {/* Trend Indicator */}
        {trend && (
          <span className={`inline-flex items-center gap-0.5 px-2.5 py-0.5 rounded-full text-xs font-bold ${
            trendType === 'up'
              ? 'bg-emerald-50 text-emerald-700'
              : trendType === 'down'
              ? 'bg-rose-50 text-rose-700'
              : 'bg-slate-50 text-slate-600'
          }`}>
            {trendType === 'up' ? (
              <ArrowUpRight className="h-3 w-3" />
            ) : (
              <ArrowDownRight className="h-3 w-3" />
            )}
            {trend}
          </span>
        )}
      </div>

      <div className="space-y-1">
        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider font-sans">
          {title}
        </p>
        <p className="text-2xl font-extrabold text-slate-800 tracking-tight font-sans">
          {value}
        </p>
        <p className="text-xs text-slate-500 font-sans mt-1">
          {description}
        </p>
      </div>
    </div>
  );
};

export default PersonalStatCard;
