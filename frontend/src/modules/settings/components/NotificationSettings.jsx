import React, { useState } from 'react';
import { Bell, Save } from 'lucide-react';

const NotificationSettings = ({ onSave }) => {
  const [channels, setChannels] = useState({
    email: true,
    sms: false,
    push: true,
    inApp: true
  });

  const [alerts, setAlerts] = useState({
    attendance: true,
    leave: true,
    payroll: false
  });

  const handleChannelToggle = (key) => {
    setChannels(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleAlertToggle = (key) => {
    setAlerts(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = () => {
    if (onSave) {
      onSave({ channels, alerts });
    }
    alert('System Notification settings saved successfully!');
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-md p-6 space-y-6 select-none font-sans">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div className="flex items-center gap-2">
          <Bell className="w-5 h-5 text-indigo-650" />
          <div>
            <h2 className="text-sm font-bold text-slate-800">System Notification Alerts</h2>
            <p className="text-[10px] text-slate-500 mt-0.5 font-medium">Alert preferences dashboard</p>
          </div>
        </div>
        
        <button
          onClick={handleSave}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-755 text-white font-bold text-xs rounded-xl shadow transition cursor-pointer"
        >
          <Save className="w-4 h-4" />
          Save Notifications
        </button>
      </div>

      {/* Grid splits */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Left pane: Delivery channels */}
        <div className="space-y-3.5">
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Communication Channels</h3>
          
          <div className="space-y-2">
            {[
              { key: 'email', label: 'Email Notifications', desc: 'Sends direct updates regarding approval sheets.' },
              { key: 'sms', label: 'SMS Notifications', desc: 'Sends quick text updates for timesheet deadlines.' },
              { key: 'push', label: 'Push Notifications', desc: 'Sends system alerts to active browser tabs.' },
              { key: 'inApp', label: 'In-App Alerts', desc: 'Renders popups inside Aura notification center.' }
            ].map((c) => (
              <div key={c.key} className="flex items-center justify-between p-3.5 border border-slate-100 rounded-xl hover:bg-slate-50/50">
                <div className="text-xs">
                  <p className="font-extrabold text-slate-800">{c.label}</p>
                  <p className="text-[9px] text-slate-550 mt-0.5">{c.desc}</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={channels[c.key]}
                    onChange={() => handleChannelToggle(c.key)}
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-650"></div>
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Right pane: Module Alerts */}
        <div className="space-y-3.5">
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Transactional Modules alerts</h3>
          
          <div className="space-y-2">
            {[
              { key: 'attendance', label: 'Attendance Check-in warnings', desc: 'Triggers alerts for missing check-outs or delays.' },
              { key: 'leave', label: 'Leave Request updates', desc: 'Triggers alerts for employee leave status revisions.' },
              { key: 'payroll', label: 'Payroll run announcements', desc: 'Broadcasts notifications when salary invoices release.' }
            ].map((a) => (
              <div key={a.key} className="flex items-center justify-between p-3.5 border border-slate-100 rounded-xl hover:bg-slate-50/50">
                <div className="text-xs">
                  <p className="font-extrabold text-slate-800">{a.label}</p>
                  <p className="text-[9px] text-slate-550 mt-0.5">{a.desc}</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={alerts[a.key]}
                    onChange={() => handleAlertToggle(a.key)}
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-650"></div>
                </label>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};

export default NotificationSettings;
