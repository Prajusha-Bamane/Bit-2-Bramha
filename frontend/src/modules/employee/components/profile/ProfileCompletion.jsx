import React from 'react';
import { CheckCircle, AlertTriangle, Lightbulb, ArrowRight } from 'lucide-react';

const ProfileCompletion = ({ percentage, checklist, missingInfo, tips, onTipClick }) => {
  // SVG Ring values
  const radius = 36;
  const strokeWidth = 8;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-md p-6 mb-8 flex flex-col md:flex-row gap-6 items-center">
      
      {/* 1. Circular Gauge */}
      <div className="relative flex flex-col items-center flex-shrink-0">
        <svg className="w-28 h-28 transform -rotate-90">
          {/* Background circle */}
          <circle
            cx="56"
            cy="56"
            r={radius}
            className="text-slate-100"
            strokeWidth={strokeWidth}
            stroke="currentColor"
            fill="transparent"
          />
          {/* Progress circle */}
          <circle
            cx="56"
            cy="56"
            r={radius}
            className="text-indigo-600 transition-all duration-500 ease-out"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            stroke="currentColor"
            fill="transparent"
          />
        </svg>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
          <span className="text-2xl font-black text-slate-800">{percentage}%</span>
          <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Complete</p>
        </div>
      </div>

      {/* 2. Middle Block: Missing details checklists */}
      <div className="flex-1 space-y-3 w-full">
        <div>
          <h3 className="text-sm font-bold text-slate-800">Profile Integrity Center</h3>
          <p className="text-[11px] text-slate-500 mt-0.5">Maintain up-to-date compliance records and emergency linkages.</p>
        </div>

        {/* List of completed vs missing */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
          {checklist.map((item, idx) => (
            <div key={idx} className="flex items-center gap-2">
              {item.done ? (
                <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
              ) : (
                <AlertTriangle className="w-4 h-4 text-amber-500 flex-shrink-0 animate-pulse" />
              )}
              <span className={item.done ? 'text-slate-500 line-through' : 'text-slate-700 font-medium'}>
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Action Block: Tips */}
      <div className="w-full md:w-64 border-t md:border-t-0 md:border-l border-slate-100 pt-4 md:pt-0 md:pl-6 space-y-3">
        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
          <Lightbulb className="w-4 h-4 text-amber-500" />
          <span>Quick Completion Tips</span>
        </div>
        
        {tips && tips.length > 0 ? (
          <div className="space-y-2">
            {tips.map((tip, idx) => (
              <button
                key={idx}
                onClick={() => onTipClick && onTipClick(tip.targetTab)}
                className="w-full text-left p-2.5 bg-slate-50 hover:bg-indigo-50 border border-slate-100 hover:border-indigo-200 rounded-xl transition text-[11px] flex items-center justify-between group cursor-pointer"
              >
                <div className="pr-2">
                  <p className="font-bold text-slate-800">{tip.action}</p>
                  <p className="text-slate-400 mt-0.5 text-[9px]">{tip.reason}</p>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-600 transition-transform group-hover:translate-x-0.5 flex-shrink-0" />
              </button>
            ))}
          </div>
        ) : (
          <p className="text-[11px] text-emerald-600 font-bold bg-emerald-50 p-2.5 rounded-xl border border-emerald-100">
            ✓ Your employee profile is fully compliant!
          </p>
        )}
      </div>

    </div>
  );
};

export default ProfileCompletion;
