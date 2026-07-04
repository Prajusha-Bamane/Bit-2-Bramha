import React, { useState } from 'react';
import { Lock, Save, ShieldAlert } from 'lucide-react';

const SecurityCard = ({ onSave }) => {
  const [passwordPolicy, setPasswordPolicy] = useState({
    minLength: 8,
    specialChar: true,
    numbers: true,
    uppercase: true
  });
  
  const [sessionTimeout, setSessionTimeout] = useState('30m');
  const [tfaRequired, setTfaRequired] = useState(false);
  const [loginAttempts, setLoginAttempts] = useState(5);
  const [ipWhitelist, setIpWhitelist] = useState('103.45.0.0/16, 192.168.1.0/24');

  const handlePolicyChange = (key) => {
    setPasswordPolicy(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = () => {
    if (onSave) {
      onSave({
        passwordPolicy,
        sessionTimeout,
        tfaRequired,
        loginAttempts,
        ipWhitelist
      });
    }
    alert('Cyber Security settings saved successfully!');
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-md p-6 space-y-6 select-none font-sans">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div className="flex items-center gap-2">
          <Lock className="w-5 h-5 text-indigo-650" />
          <div>
            <h2 className="text-sm font-bold text-slate-800">Security & Authentication Policy</h2>
            <p className="text-[10px] text-slate-500 mt-0.5 font-medium">Access rules configuration</p>
          </div>
        </div>
        
        <button
          onClick={handleSave}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-755 text-white font-bold text-xs rounded-xl shadow transition cursor-pointer"
        >
          <Save className="w-4 h-4" />
          Save Policy
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Password Policy */}
        <div className="space-y-3.5 border border-slate-100 p-4 rounded-xl bg-slate-50/50">
          <h3 className="text-xs font-bold text-slate-650 uppercase tracking-wider flex items-center gap-1.5">
            <ShieldAlert className="w-4 h-4 text-rose-500 animate-pulse" />
            Password Strength Rules
          </h3>
          
          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-500">Minimum Character Length</span>
              <input
                type="number"
                value={passwordPolicy.minLength}
                onChange={(e) => setPasswordPolicy(prev => ({ ...prev, minLength: Number(e.target.value) }))}
                className="w-16 px-2.5 py-1.5 border border-slate-350 rounded-xl focus:ring-1 focus:ring-indigo-500 text-center"
              />
            </div>

            {[
              { key: 'specialChar', label: 'Require Special Character', desc: 'Needs symbols like @, #, $, %.' },
              { key: 'numbers', label: 'Require Numbers', desc: 'Needs numerals 0-9.' },
              { key: 'uppercase', label: 'Require Uppercase Letter', desc: 'Needs capital letters A-Z.' }
            ].map((p) => (
              <div key={p.key} className="flex items-center justify-between py-1">
                <div>
                  <p className="font-bold text-slate-750">{p.label}</p>
                  <p className="text-[9px] text-slate-400 font-semibold">{p.desc}</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={passwordPolicy[p.key]}
                    onChange={() => handlePolicyChange(p.key)}
                    className="sr-only peer"
                  />
                  <div className="w-8 h-4.5 bg-gray-250 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3.5 after:w-3.5 after:transition-all peer-checked:bg-indigo-650"></div>
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Access and Session Configs */}
        <div className="space-y-4">
          {/* Session timeout */}
          <div className="flex flex-col gap-1 text-xs">
            <label htmlFor="timeout font-bold" className="font-bold text-slate-500">Session Idle Timeout</label>
            <select
              id="timeout"
              value={sessionTimeout}
              onChange={(e) => setSessionTimeout(e.target.value)}
              className="w-full px-3 py-2 border border-slate-350 rounded-xl focus:ring-1 focus:ring-indigo-500 focus:outline-none"
            >
              <option value="15m">15 Minutes</option>
              <option value="30m">30 Minutes</option>
              <option value="1h">1 Hour</option>
              <option value="4h">4 Hours</option>
              <option value="8h">8 Hours</option>
            </select>
          </div>

          {/* Login attempts */}
          <div className="flex flex-col gap-1 text-xs">
            <label htmlFor="attempts font-bold" className="font-bold text-slate-500">Max Failed Login Attempts</label>
            <select
              id="attempts"
              value={loginAttempts}
              onChange={(e) => setLoginAttempts(Number(e.target.value))}
              className="w-full px-3 py-2 border border-slate-350 rounded-xl focus:ring-1 focus:ring-indigo-500 focus:outline-none"
            >
              <option value={3}>3 Attempts (Strict Lock)</option>
              <option value={5}>5 Attempts (Standard)</option>
              <option value={10}>10 Attempts (Relaxed)</option>
            </select>
          </div>

          {/* IP Whitelisting */}
          <div className="flex flex-col gap-1 text-xs">
            <label htmlFor="whitelist font-bold" className="font-bold text-slate-500">IP Whitelisting CIDR tags</label>
            <input
              id="whitelist"
              type="text"
              value={ipWhitelist}
              onChange={(e) => setIpWhitelist(e.target.value)}
              className="w-full px-3 py-2 border border-slate-350 rounded-xl focus:ring-1 focus:ring-indigo-500 font-mono"
            />
            <span className="text-[9px] text-slate-400 font-bold block mt-0.5">Separate with commas (e.g. 10.0.0.0/8).</span>
          </div>

          {/* MFA Switch */}
          <div className="flex items-center justify-between p-3 border border-slate-100 rounded-xl bg-slate-50/50">
            <div className="text-xs">
              <p className="font-extrabold text-slate-800">Enforce Multi-Factor Auth (MFA)</p>
              <p className="text-[9px] text-slate-400 mt-0.5">Requires 2FA login verification checks for all staff.</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer select-none">
              <input
                type="checkbox"
                checked={tfaRequired}
                onChange={() => setTfaRequired(!tfaRequired)}
                className="sr-only peer"
              />
              <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-650"></div>
            </label>
          </div>
        </div>
      </div>

    </div>
  );
};

export default SecurityCard;
