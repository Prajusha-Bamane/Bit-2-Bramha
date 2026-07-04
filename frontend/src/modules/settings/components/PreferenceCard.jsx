import React, { useState } from 'react';
import { Cpu, HardDrive, RefreshCw, Database, ShieldAlert, Sparkles, CheckCircle2 } from 'lucide-react';

const PreferenceCard = () => {
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [backupSchedule, setBackupSchedule] = useState('Daily');
  const [backingUp, setBackingUp] = useState(false);

  const handleBackup = () => {
    setBackingUp(true);
    setTimeout(() => {
      setBackingUp(false);
      alert('Full system database backup completed! Zip package saved in operations cluster root.');
    }, 2000);
  };

  const handleRestore = () => {
    if (window.confirm("WARNING: Restoring will overwrite existing portal variables. Proceed?")) {
      alert("System restore initialized... Checks passed. Restoration complete!");
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-md p-6 space-y-6 select-none font-sans">
      
      {/* Header */}
      <div className="flex items-center gap-2 border-b border-slate-100 pb-4">
        <Cpu className="w-5 h-5 text-indigo-650" />
        <div>
          <h2 className="text-sm font-bold text-slate-800">System Preferences & Maintenance</h2>
          <p className="text-[10px] text-slate-500 mt-0.5 font-medium">Core system variables desk</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Operations Pane */}
        <div className="space-y-4 text-xs">
          
          {/* Maintenance Mode */}
          <div className="flex items-center justify-between p-3.5 border border-slate-100 rounded-xl bg-slate-50/50 hover:bg-white hover:shadow-sm transition">
            <div className="space-y-0.5">
              <p className="font-extrabold text-slate-800 flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4 text-rose-500" />
                Maintenance Mode
              </p>
              <p className="text-[9px] text-slate-400 font-semibold">Blocks non-admin portals logins.</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer select-none">
              <input
                type="checkbox"
                checked={maintenanceMode}
                onChange={() => {
                  setMaintenanceMode(!maintenanceMode);
                  alert(maintenanceMode ? 'Maintenance Mode DISABLED.' : 'Maintenance Mode ENABLED. Employees will see placeholders.');
                }}
                className="sr-only peer"
              />
              <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-rose-550"></div>
            </label>
          </div>

          {/* Backup Config */}
          <div className="p-4 border border-slate-100 rounded-xl space-y-3 bg-slate-50/50">
            <h4 className="font-bold text-slate-700 flex items-center gap-1.5">
              <HardDrive className="w-4 h-4 text-indigo-500" />
              Automated Data Backups
            </h4>
            
            <div className="flex flex-col gap-1">
              <label htmlFor="backupSelect font-bold" className="font-bold text-slate-500">Backup Frequency Schedule</label>
              <select
                id="backupSelect"
                value={backupSchedule}
                onChange={(e) => setBackupSchedule(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-slate-350 rounded-xl focus:ring-1 focus:ring-indigo-500 focus:outline-none"
              >
                <option value="Hourly">Hourly Incremental</option>
                <option value="Daily">Daily Full Backups</option>
                <option value="Weekly">Weekly Sync Archive</option>
              </select>
            </div>

            <div className="flex gap-2 pt-1.5">
              <button
                onClick={handleBackup}
                disabled={backingUp}
                className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 bg-indigo-600 hover:bg-indigo-755 text-white font-bold rounded-xl transition cursor-pointer disabled:opacity-50"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${backingUp ? 'animate-spin' : ''}`} />
                {backingUp ? 'Backing Up...' : 'Run Backup Now'}
              </button>
              <button
                onClick={handleRestore}
                className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-bold rounded-xl transition cursor-pointer"
              >
                Restore System
              </button>
            </div>
          </div>

        </div>

        {/* Analytics Pane */}
        <div className="space-y-4">
          
          {/* Metadata Grid */}
          <div className="grid grid-cols-2 gap-4">
            
            {/* Version */}
            <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl text-xs space-y-0.5">
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wide">Version</span>
              <p className="font-black text-slate-800 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-indigo-500 animate-bounce" />
                v2.4.0 Production
              </p>
            </div>

            {/* DB Status */}
            <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl text-xs space-y-0.5">
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wide">Database Status</span>
              <p className="font-black text-slate-800 flex items-center gap-1.5">
                <Database className="w-3.5 h-3.5 text-emerald-500" />
                <span className="text-emerald-700 flex items-center gap-1">
                  Connected
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                </span>
              </p>
            </div>

          </div>

          {/* Storage Capacity Progress */}
          <div className="border border-slate-100 p-4 rounded-xl space-y-3 bg-slate-50/50">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-slate-650 flex items-center gap-1.5">
                <HardDrive className="w-4 h-4 text-indigo-500" />
                Cloud File Storage
              </span>
              <span className="font-bold text-slate-500">42.8 GB / 100 GB (42%)</span>
            </div>
            
            {/* Progress Bar */}
            <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-full" 
                style={{ width: '42%' }}
              ></div>
            </div>

            <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider leading-relaxed">
              NDA and Aadhaar vault PDFs account for 78% of active space usage.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
};

export default PreferenceCard;
