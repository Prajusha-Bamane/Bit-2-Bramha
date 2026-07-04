import React, { useState } from 'react';
import NotificationSettings from '../components/NotificationSettings';
import PreferenceCard from '../components/PreferenceCard';
import SecurityCard from '../components/SecurityCard';
import SettingsLayout from '../components/SettingsLayout';

const EmployeeSettings = () => {
  const [activeItem, setActiveItem] = useState('notifications');

  return (
    <div className="space-y-6 font-sans">
      <div>
        <h1 className="text-3xl font-black text-slate-800 tracking-tight">Personal Workspace Settings</h1>
        <p className="text-xs text-slate-500 mt-1">Configure theme preferences, in-app notification alerts, and review security policies.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 items-start">
        {/* Simple Side Nav Bar for Employee */}
        <aside className="w-full lg:w-60 bg-white border border-slate-200 rounded-2xl shadow-md p-4 space-y-2 flex-shrink-0 select-none">
          <button
            onClick={() => setActiveItem('notifications')}
            className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition cursor-pointer ${
              activeItem === 'notifications'
                ? 'bg-indigo-600 text-white font-bold'
                : 'text-slate-500 hover:bg-slate-50'
            }`}
          >
            Notification Alerts
          </button>
          
          <button
            onClick={() => setActiveItem('preferences')}
            className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition cursor-pointer ${
              activeItem === 'preferences'
                ? 'bg-indigo-600 text-white font-bold'
                : 'text-slate-500 hover:bg-slate-50'
            }`}
          >
            Workspace Preferences
          </button>

          <button
            onClick={() => setActiveItem('security')}
            className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition cursor-pointer ${
              activeItem === 'security'
                ? 'bg-indigo-600 text-white font-bold'
                : 'text-slate-500 hover:bg-slate-50'
            }`}
          >
            Access Policies
          </button>
        </aside>

        {/* Main Card displays */}
        <main className="flex-1 w-full min-w-0">
          {activeItem === 'notifications' && (
            <NotificationSettings 
              onSave={(notifs) => console.log('Saved personal alerts settings: ', notifs)} 
            />
          )}

          {activeItem === 'preferences' && (
            <PreferenceCard />
          )}

          {activeItem === 'security' && (
            <div className="space-y-4">
              <SecurityCard 
                onSave={(sec) => console.log('Mock save security configuration: ', sec)} 
              />
              <div className="bg-indigo-50/50 border border-indigo-100 p-4 rounded-xl text-xs text-indigo-805 select-none">
                <p className="font-extrabold text-[10px] uppercase tracking-wider">Access and Security Note</p>
                <p className="text-[10px] text-slate-500 mt-1 leading-relaxed">
                  These security settings are enforced globally by the HR Admin team. To request adjustments to your whitelisted IP ranges or MFA methods, contact support.
                </p>
              </div>
            </div>
          )}
        </main>

      </div>
    </div>
  );
};

export default EmployeeSettings;
