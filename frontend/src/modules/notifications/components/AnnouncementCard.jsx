import React from 'react';
import { Megaphone, FileText, Download, Calendar, User } from 'lucide-react';

const priorityColors = {
  High: 'bg-rose-50 text-rose-700 border border-rose-100',
  Medium: 'bg-amber-50 text-amber-700 border border-amber-100',
  Low: 'bg-slate-50 text-slate-600 border border-slate-200'
};

const AnnouncementCard = ({ announcement }) => {
  const { title, description, department, priority, publishDate, author, attachment } = announcement;

  const handleDownload = () => {
    if (attachment) {
      alert(`Downloading attachment file: ${attachment}`);
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-md p-5 hover:shadow-lg transition-shadow duration-200 flex flex-col justify-between select-none">
      <div className="space-y-3">
        {/* Banner metadata */}
        <div className="flex flex-wrap items-center justify-between gap-2 text-[10px] font-bold tracking-wide uppercase">
          <span className="bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-full border border-indigo-100">
            {department}
          </span>
          <span className={`px-2 py-0.5 rounded-full ${priorityColors[priority] || priorityColors.Low}`}>
            {priority} Priority
          </span>
        </div>

        {/* Title & Description */}
        <div className="space-y-1">
          <h4 className="font-extrabold text-slate-800 text-sm leading-snug">{title}</h4>
          <p className="text-slate-500 text-xs leading-relaxed line-clamp-3">{description}</p>
        </div>
      </div>

      {/* Author and Date Footer */}
      <div className="space-y-3 pt-4 border-t border-slate-100 mt-4">
        <div className="flex items-center justify-between text-[10px] text-slate-400 font-bold uppercase tracking-wider">
          <div className="flex items-center gap-1.5">
            <User className="w-3.5 h-3.5 text-slate-400" />
            <span>By: {author}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            <span>{publishDate}</span>
          </div>
        </div>

        {/* Attachment box */}
        {attachment && (
          <div 
            onClick={handleDownload}
            className="flex items-center justify-between p-2.5 bg-slate-50 hover:bg-indigo-50 border border-slate-100 hover:border-indigo-200 rounded-xl cursor-pointer transition text-xs font-semibold text-slate-700"
          >
            <div className="flex items-center gap-2 truncate">
              <FileText className="w-4 h-4 text-indigo-500 flex-shrink-0" />
              <span className="truncate">{attachment}</span>
            </div>
            <Download className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
          </div>
        )}
      </div>
    </div>
  );
};

export default AnnouncementCard;
export { priorityColors };
