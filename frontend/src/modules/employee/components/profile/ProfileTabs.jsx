import React from 'react';
import { User, Briefcase, Phone, AlertCircle, FileText, Lock, Settings } from 'lucide-react';

const ProfileTabs = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'personal', label: 'Personal Info', icon: User },
    { id: 'employment', label: 'Employment', icon: Briefcase },
    { id: 'contact', label: 'Contacts', icon: Phone },
    { id: 'emergency', label: 'Emergency Contacts', icon: AlertCircle },
    { id: 'documents', label: 'Documents', icon: FileText },
    { id: 'security', label: 'Security', icon: Lock },
    { id: 'preferences', label: 'Preferences', icon: Settings },
  ];

  return (
    <div className="flex flex-col gap-1.5 bg-white border border-slate-200 p-3 rounded-2xl shadow-sm w-full">
      <p className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Profile Sections</p>
      <div className="flex flex-row overflow-x-auto md:flex-col gap-1 no-scrollbar pb-1 md:pb-0">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex items-center px-4 py-2.5 text-xs font-bold rounded-xl transition duration-150 flex-shrink-0 cursor-pointer ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/10'
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
              }`}
            >
              <Icon className="mr-2.5 h-4.5 w-4.5 flex-shrink-0" />
              {tab.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ProfileTabs;
