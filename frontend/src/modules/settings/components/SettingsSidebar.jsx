import React from 'react';
import { 
  Building2, 
  Settings, 
  Users, 
  MapPin, 
  CalendarDays, 
  Clock, 
  ShieldCheck, 
  Mail, 
  Bell, 
  Lock, 
  History, 
  Cpu, 
  Tag
} from 'lucide-react';

const categories = [
  {
    title: 'Organization',
    items: [
      { id: 'profile', name: 'Company Profile', icon: Building2 },
      { id: 'departments', name: 'Departments', icon: Users },
      { id: 'designations', name: 'Designations', icon: Tag },
      { id: 'locations', name: 'Work Locations', icon: MapPin },
    ]
  },
  {
    title: 'HR Configurations',
    items: [
      { id: 'general', name: 'General Settings', icon: Settings },
      { id: 'holidays', name: 'Holiday Management', icon: CalendarDays },
      { id: 'shifts', name: 'Shift Management', icon: Clock },
    ]
  },
  {
    title: 'Access & Security',
    items: [
      { id: 'roles', name: 'Roles & Permissions', icon: ShieldCheck },
      { id: 'security', name: 'Security Settings', icon: Lock },
      { id: 'audit', name: 'System Audit Logs', icon: History },
    ]
  },
  {
    title: 'Communications & System',
    items: [
      { id: 'templates', name: 'Email Templates', icon: Mail },
      { id: 'notifications', name: 'Notification Settings', icon: Bell },
      { id: 'preferences', name: 'System Preferences', icon: Cpu },
    ]
  }
];

const SettingsSidebar = ({ activeItem, onItemSelect }) => {
  return (
    <aside className="w-full lg:w-68 bg-white border border-slate-200 rounded-2xl shadow-md p-4 space-y-5 flex-shrink-0 select-none">
      <div className="px-2">
        <h3 className="text-sm font-black text-slate-800 tracking-tight">System Settings</h3>
        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">Control panel</p>
      </div>

      <nav className="space-y-4">
        {categories.map((cat, idx) => (
          <div key={idx} className="space-y-1">
            <span className="px-2.5 text-[9px] font-bold text-slate-400 uppercase tracking-widest block">
              {cat.title}
            </span>
            <div className="space-y-0.5">
              {cat.items.map((item) => {
                const Icon = item.icon;
                const isActive = activeItem === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => onItemSelect(item.id)}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold tracking-wide transition cursor-pointer text-left ${
                      isActive
                        ? 'bg-indigo-600 text-white shadow-sm font-bold'
                        : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
                    }`}
                  >
                    <Icon className="w-4 h-4 flex-shrink-0" />
                    <span className="truncate">{item.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </nav>
    </aside>
  );
};

export default SettingsSidebar;
