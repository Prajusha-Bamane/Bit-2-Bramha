import React from 'react';
import { Gift, Trophy, Tent, Video, GraduationCap } from 'lucide-react';

const typeConfig = {
  Birthday: { icon: Gift, color: 'text-pink-500 bg-pink-50 border-pink-100' },
  Anniversary: { icon: Trophy, color: 'text-amber-500 bg-amber-50 border-amber-100' },
  Holiday: { icon: Tent, color: 'text-emerald-500 bg-emerald-50 border-emerald-100' },
  Meeting: { icon: Video, color: 'text-indigo-500 bg-indigo-50 border-indigo-100' },
  Training: { icon: GraduationCap, color: 'text-blue-500 bg-blue-50 border-blue-100' },
};

const EventCard = ({ event }) => {
  const { type, name, detail, date } = event;
  const config = typeConfig[type] || typeConfig.Meeting;
  const Icon = config.icon;

  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-4 hover:shadow transition flex items-center gap-3.5 select-none">
      {/* Category Icon */}
      <div className={`p-2.5 rounded-xl border flex-shrink-0 ${config.color}`}>
        <Icon className="w-5 h-5" />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0 text-xs">
        <div className="flex items-center justify-between gap-2">
          <span className="font-bold text-slate-800">{name}</span>
          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">{date}</span>
        </div>
        <p className="text-slate-500 text-[10px] mt-0.5 leading-relaxed truncate">{detail}</p>
      </div>
    </div>
  );
};

export default EventCard;
