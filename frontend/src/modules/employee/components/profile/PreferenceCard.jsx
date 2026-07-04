import React, { useState } from 'react';
import { Settings, Check, Bell } from 'lucide-react';

const PreferenceCard = ({ preferences, onSave }) => {
  const [theme, setTheme] = useState(preferences?.theme || 'light');
  const [language, setLanguage] = useState(preferences?.language || 'English');
  const [notifications, setNotifications] = useState({
    email: preferences?.notifications?.email !== false,
    sms: preferences?.notifications?.sms !== false,
  });

  const handleNotificationChange = (type) => {
    setNotifications(prev => ({ ...prev, [type]: !prev[type] }));
  };

  const handleSave = () => {
    if (onSave) {
      onSave({
        theme,
        language,
        notifications
      });
    }
    alert('User preferences saved successfully!');
  };

  const themesList = [
    { id: 'light', name: 'Light Mode', desc: 'Standard visual profile', bg: 'bg-white border-slate-200 text-slate-800' },
    { id: 'dark', name: 'Dark Mode (Beta)', desc: 'Relaxing high-contrast look', bg: 'bg-slate-900 border-slate-850 text-white' },
    { id: 'system', name: 'System Default', desc: 'Follows browser styles', bg: 'bg-slate-100 border-slate-300 text-slate-700' }
  ];

  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-md p-6 space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-5">
        <div className="flex items-center gap-2">
          <Settings className="h-5 w-5 text-indigo-600" />
          <h2 className="text-lg font-bold text-slate-800">Account Preferences</h2>
        </div>
        <button
          onClick={handleSave}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-750 text-white font-bold text-xs rounded-xl shadow-md shadow-indigo-500/20 transition cursor-pointer"
        >
          <Check className="w-3.5 h-3.5" />
          Save Preferences
        </button>
      </div>

      {/* 1. Theme Selector */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Visual Workspace Theme</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {themesList.map((t) => {
            const isSelected = theme === t.id;
            return (
              <div
                key={t.id}
                onClick={() => setTheme(t.id)}
                className={`p-4 border rounded-xl cursor-pointer transition-all duration-200 flex flex-col justify-between ${t.bg} ${
                  isSelected ? 'ring-2 ring-indigo-500 border-transparent shadow' : 'opacity-80 hover:opacity-100'
                }`}
              >
                <div>
                  <h4 className="font-extrabold text-xs">{t.name}</h4>
                  <p className="text-[9px] text-slate-405 mt-0.5 leading-relaxed">{t.desc}</p>
                </div>
                <div className="flex justify-end mt-4">
                  <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                    isSelected ? 'bg-indigo-600 border-transparent text-white' : 'border-slate-300 bg-white'
                  }`}>
                    {isSelected && <Check className="w-2.5 h-2.5" />}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. Language Dropdown */}
      <div className="space-y-3 pt-4 border-t border-slate-100">
        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">System Language</h3>
        <div className="max-w-xs flex flex-col gap-1 text-xs">
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full px-3 py-2 border border-slate-350 rounded-xl focus:ring-2 focus:ring-indigo-500"
          >
            <option value="English">English (United States)</option>
            <option value="Hindi">Hindi (India)</option>
            <option value="Spanish">Spanish (Latin America)</option>
            <option value="French">French (Europe)</option>
          </select>
          <span className="text-[10px] text-slate-400 mt-1">Changes text translation maps across modules.</span>
        </div>
      </div>

      {/* 3. Notification Preferences */}
      <div className="space-y-3 pt-4 border-t border-slate-100">
        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500 uppercase tracking-wider">
          <Bell className="w-4 h-4 text-indigo-500" />
          <span>Notification Logs</span>
        </div>
        
        <div className="space-y-3">
          {/* Email notifications */}
          <div className="flex items-center justify-between p-3 border border-slate-100 rounded-xl hover:bg-slate-50/50">
            <div className="text-xs">
              <p className="font-bold text-slate-800">Email Notifications</p>
              <p className="text-[10px] text-slate-500 mt-0.5">Receive monthly slip audit flags and company updates.</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer select-none">
              <input
                type="checkbox"
                checked={notifications.email}
                onChange={() => handleNotificationChange('email')}
                className="sr-only peer"
              />
              <div className="w-9 h-5 bg-gray-250 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-600"></div>
            </label>
          </div>

          {/* SMS notifications */}
          <div className="flex items-center justify-between p-3 border border-slate-100 rounded-xl hover:bg-slate-50/50">
            <div className="text-xs">
              <p className="font-bold text-slate-800">SMS Notifications</p>
              <p className="text-[10px] text-slate-500 mt-0.5">Direct message logs for attendance triggers and leave status.</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer select-none">
              <input
                type="checkbox"
                checked={notifications.sms}
                onChange={() => handleNotificationChange('sms')}
                className="sr-only peer"
              />
              <div className="w-9 h-5 bg-gray-250 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-600"></div>
            </label>
          </div>
        </div>
      </div>

    </div>
  );
};

export default PreferenceCard;
