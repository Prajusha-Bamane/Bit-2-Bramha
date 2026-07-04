import React from 'react';
import { ShieldCheck } from 'lucide-react';

const AccountInfoCard = ({ profile, lastUpdated }) => {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-md p-6">
      <div className="flex items-center gap-2 border-b border-slate-100 pb-4 mb-4">
        <ShieldCheck className="h-5 w-5 text-emerald-600" />
        <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Account Credentials</h3>
      </div>
      
      <div className="space-y-3.5 text-xs">
        <div className="flex justify-between items-center py-1 border-b border-slate-100/50">
          <span className="text-slate-450 font-bold">Username</span>
          <span className="text-slate-800 font-extrabold">{profile.username || 'jane.doe'}</span>
        </div>
        <div className="flex justify-between items-center py-1 border-b border-slate-100/50">
          <span className="text-slate-450 font-bold">Access Role</span>
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-100">
            {profile.role || 'Employee'}
          </span>
        </div>
        <div className="flex justify-between items-center py-1 border-b border-slate-100/50">
          <span className="text-slate-450 font-bold">Employee ID</span>
          <span className="text-slate-800 font-mono font-bold">{profile.employeeId}</span>
        </div>
        <div className="flex justify-between items-center py-1 border-b border-slate-100/50">
          <span className="text-slate-450 font-bold">Account Created</span>
          <span className="text-slate-500 font-semibold">{profile.joiningDate}</span>
        </div>
        <div className="flex justify-between items-center py-1">
          <span className="text-slate-450 font-bold">Last Updated</span>
          <span className="text-slate-500 font-semibold">{lastUpdated || 'Just Now'}</span>
        </div>
      </div>
    </div>
  );
};

export default AccountInfoCard;
