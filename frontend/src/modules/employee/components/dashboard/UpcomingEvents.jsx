import React from 'react';
import { CalendarDays, Gift, Video, BookOpen, AlertCircle } from 'lucide-react';

const UpcomingEvents = ({ events }) => {
  const getIcon = (type) => {
    switch (type) {
      case 'Meeting': return { icon: Video, color: 'text-sky-600 bg-sky-50 border-sky-100' };
      case 'Birthday': return { icon: Gift, color: 'text-pink-600 bg-pink-50 border-pink-100' };
      case 'Holiday': return { icon: AlertCircle, color: 'text-amber-600 bg-amber-50 border-amber-100' };
      case 'Training': return { icon: BookOpen, color: 'text-purple-600 bg-purple-50 border-purple-100' };
      default: return { icon: CalendarDays, color: 'text-slate-600 bg-slate-50 border-slate-100' };
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between h-full">
      <div>
        <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
          <h3 className="text-base font-bold text-slate-800 font-sans flex items-center gap-2">
            <CalendarDays className="h-4.5 w-4.5 text-indigo-500" />
            Upcoming Activities
          </h3>
        </div>

        <div className="space-y-4">
          {events.map((evt, idx) => {
            const visual = getIcon(evt.type);
            const EvtIcon = visual.icon;
            
            return (
              <div key={idx} className="flex gap-3.5 items-start">
                <div className={`p-2.5 rounded-xl border flex-shrink-0 mt-0.5 ${visual.color}`}>
                  <EvtIcon className="h-4 w-4" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-800 font-sans">{evt.title}</span>
                  </div>
                  <p className="text-[10px] text-slate-400 font-semibold tracking-wide font-sans mt-0.5">{evt.time}</p>
                  <p className="text-xs text-slate-500 font-sans mt-0.5">{evt.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default UpcomingEvents;
