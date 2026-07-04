import React, { useState } from 'react';
import { Lock, ShieldAlert, Monitor, Smartphone, AlertTriangle, Key } from 'lucide-react';

const SecurityCard = ({ lastLogin, onPasswordChange }) => {
  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [tfaEnabled, setTfaEnabled] = useState(false);
  const [sessions, setSessions] = useState([
    { id: 1, device: 'Chrome on Windows 11', ip: '103.45.89.12', location: 'Bengaluru, India', active: true },
    { id: 2, device: 'Safari on iPhone 15 Pro', ip: '192.168.1.104', location: 'Delhi, India', active: false }
  ]);

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswords(prev => ({ ...prev, [name]: value }));
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (passwords.newPassword !== passwords.confirmPassword) {
      alert("New passwords do not match!");
      return;
    }
    if (onPasswordChange) {
      onPasswordChange(passwords.currentPassword, passwords.newPassword);
    }
    setPasswords({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  const handleRevokeSession = (id) => {
    setSessions(prev => prev.filter(s => s.id !== id));
    alert('Session successfully terminated across other active channels.');
  };

  return (
    <div className="space-y-6">
      
      {/* 1. Change Password panel */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-md p-6">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-4 mb-5">
          <Key className="h-5 w-5 text-indigo-600" />
          <h2 className="text-lg font-bold text-slate-800">Change Security Password</h2>
        </div>
        
        <form onSubmit={handlePasswordSubmit} className="space-y-4 text-xs max-w-md">
          <div className="flex flex-col gap-1">
            <label htmlFor="currentPassword font-bold" className="font-bold text-slate-500">Current Password</label>
            <input
              id="currentPassword"
              type="password"
              name="currentPassword"
              value={passwords.currentPassword}
              onChange={handlePasswordChange}
              className="w-full px-3 py-2 border border-slate-350 rounded-xl focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="newPassword font-bold" className="font-bold text-slate-500">New Secure Password</label>
            <input
              id="newPassword"
              type="password"
              name="newPassword"
              value={passwords.newPassword}
              onChange={handlePasswordChange}
              className="w-full px-3 py-2 border border-slate-350 rounded-xl focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="confirmPassword font-bold" className="font-bold text-slate-500">Confirm New Password</label>
            <input
              id="confirmPassword"
              type="password"
              name="confirmPassword"
              value={passwords.confirmPassword}
              onChange={handlePasswordChange}
              className="w-full px-3 py-2 border border-slate-350 rounded-xl focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          
          <button
            type="submit"
            className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl shadow transition duration-150 cursor-pointer"
          >
            Update Password
          </button>
        </form>
      </div>

      {/* 2. 2FA Placeholder */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-md p-6">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-4 mb-4">
          <ShieldAlert className="h-5 w-5 text-indigo-600" />
          <h2 className="text-lg font-bold text-slate-800">Two-Factor Authentication (2FA)</h2>
        </div>
        <div className="flex items-start md:items-center justify-between gap-4 flex-col md:flex-row bg-slate-50 border border-slate-100 p-4 rounded-xl">
          <div className="space-y-1">
            <p className="text-xs font-bold text-slate-800">Secure Account Authentication</p>
            <p className="text-[10px] text-slate-500 max-w-md">
              Confirm your identity with verification codes sent via a dedicated mobile authenticator app.
            </p>
          </div>
          <button
            onClick={() => {
              setTfaEnabled(!tfaEnabled);
              alert(tfaEnabled ? 'Two-Factor Authentication has been disabled.' : '2FA Authenticator setup instructions sent to corporate inbox.');
            }}
            className={`px-4 py-2 text-xs font-bold rounded-xl border transition cursor-pointer flex-shrink-0 ${
              tfaEnabled 
                ? 'bg-rose-50 text-rose-600 border-rose-200 hover:bg-rose-100'
                : 'bg-indigo-50 text-indigo-600 border-indigo-200 hover:bg-indigo-100'
            }`}
          >
            {tfaEnabled ? 'Disable 2FA' : 'Enable 2FA'}
          </button>
        </div>
      </div>

      {/* 3. Active Sessions details */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-md p-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-5">
          <div className="flex items-center gap-2">
            <Monitor className="h-5 w-5 text-indigo-600" />
            <h2 className="text-lg font-bold text-slate-800">Active Device Sessions</h2>
          </div>
          <span className="text-[10px] text-slate-400 font-bold">Last Login: {lastLogin || 'Today, 02:30 PM'}</span>
        </div>
        
        <div className="space-y-3">
          {sessions.map((sess) => (
            <div
              key={sess.id}
              className="flex items-center justify-between p-4 border border-slate-100 rounded-xl hover:border-slate-200 bg-slate-50/50 hover:bg-white transition-all duration-300 gap-3"
            >
              <div className="flex items-center gap-3.5">
                <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl">
                  {sess.device.includes('iPhone') ? <Smartphone className="w-5 h-5" /> : <Monitor className="w-5 h-5" />}
                </div>
                <div className="text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-slate-850">{sess.device}</span>
                    {sess.active && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-100">
                        Current Session
                      </span>
                    )}
                  </div>
                  <p className="text-[10px] text-slate-500 mt-1">IP: {sess.ip} • Location: {sess.location}</p>
                </div>
              </div>
              
              {!sess.active && (
                <button
                  onClick={() => handleRevokeSession(sess.id)}
                  className="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 rounded-lg text-[10px] font-bold transition cursor-pointer"
                >
                  Terminate
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default SecurityCard;
