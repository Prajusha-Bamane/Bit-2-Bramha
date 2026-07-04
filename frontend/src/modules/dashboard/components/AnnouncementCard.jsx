import React from 'react';
import { Megaphone, MessageSquare, ShieldAlert, Sparkles, Pin } from 'lucide-react';

const AnnouncementCard = () => {
  const announcements = [
    {
      title: 'New Remote Work Guidelines',
      type: 'Policy Update',
      desc: 'Updated criteria for hybrid work allocations starting next month. Please check the document attached in your email.',
      icon: ShieldAlert,
      color: 'bg-rose-50 text-rose-700 border-rose-100',
      date: 'July 3, 2026',
      pinned: true
    },
    {
      title: 'Annual Hackathon Celebration',
      type: 'Office Event',
      desc: 'Hackathon coding blocks end today at 6 PM. Join us in the main cafeteria for snacks, drinks, and results announcement!',
      icon: Sparkles,
      color: 'bg-indigo-50 text-indigo-700 border-indigo-100',
      date: 'July 4, 2026',
      pinned: false
    },
    {
      title: 'Performance Review Prep Sync',
      type: 'Meeting',
      desc: 'Quick Q&A for managers regarding the revised OKR scoring parameters.',
      icon: MessageSquare,
      color: 'bg-blue-50 text-blue-700 border-blue-100',
      date: 'July 1, 2026',
      pinned: false
    }
  ];

  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm h-full">
      <div className="flex items-center gap-2 mb-4">
        <Megaphone className="h-5 w-5 text-indigo-600" />
        <h3 className="text-sm font-bold text-slate-800 font-sans font-bold">Announcements</h3>
      </div>
      
      <div className="space-y-4">
        {announcements.map((item, idx) => (
          <div 
            key={idx} 
            className="p-3.5 bg-slate-50/50 hover:bg-slate-50 border border-slate-100 rounded-xl transition-all duration-150 relative group"
          >
            {item.pinned && (
              <Pin className="h-3 w-3 text-rose-500 absolute top-3.5 right-3.5" />
            )}
            
            <div className="flex items-center gap-2 mb-1.5">
              <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full border ${item.color}`}>
                {item.type}
              </span>
              <span className="text-[10px] text-slate-400 font-semibold">{item.date}</span>
            </div>
            
            <h4 className="text-xs font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">
              {item.title}
            </h4>
            <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnnouncementCard;
