import React from 'react';
import { WorkflowTimeline } from '../components/WorkflowWidgets';
import { StatusBadge, LeaveTypeBadge } from '../components/LeaveTable';
import { ArrowLeft, User, Phone, Briefcase, FileText, CheckCircle, XCircle } from 'lucide-react';

const LeaveDetails = ({ leave, onBack, onApprove, onReject, showActions }) => {
  const initials = `${leave.firstName.charAt(0)}${leave.lastName.charAt(0)}`;

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-6 max-w-4xl mx-auto">
      
      {/* 1. Header controls */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-1.5 hover:bg-slate-50 border border-slate-200 rounded-lg text-slate-500 transition cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <div>
            <h3 className="text-sm font-bold text-slate-800 font-sans tracking-tight">Leave Audit Review</h3>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">ID: {leave.id}</p>
          </div>
        </div>

        <StatusBadge status={leave.status} />
      </div>

      {/* 2. Employee details card */}
      <div className="flex items-center gap-4 p-4 bg-slate-50 border border-slate-100 rounded-2xl">
        <div className="w-12 h-12 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-700">
          {initials}
        </div>
        <div>
          <span className="text-sm font-extrabold text-slate-850 block">{leave.firstName} {leave.lastName}</span>
          <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wide block mt-0.5">{leave.designation}</span>
          <span className="text-[10px] text-slate-500 font-semibold">{leave.department}</span>
        </div>
      </div>

      {/* 3. Leave application statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        
        {/* Left Side: General Fields */}
        <div className="space-y-4">
          
          <div className="space-y-3 text-xs">
            <div className="p-3.5 bg-slate-50/50 border border-slate-100 rounded-xl space-y-1">
              <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Leave Category</span>
              <div className="pt-0.5">
                <LeaveTypeBadge type={leave.leaveType} />
              </div>
            </div>

            <div className="p-3.5 bg-slate-50/50 border border-slate-100 rounded-xl space-y-1">
              <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Requested Duration</span>
              <p className="text-sm font-black text-slate-800">{leave.duration} days</p>
              <p className="text-[10px] text-slate-500 font-semibold">{leave.startDate} to {leave.endDate}</p>
            </div>

            <div className="p-3.5 bg-slate-50/50 border border-slate-100 rounded-xl space-y-1">
              <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Reason</span>
              <p className="text-slate-700 leading-relaxed font-medium">{leave.reason}</p>
            </div>

            <div className="p-3.5 bg-slate-50/50 border border-slate-100 rounded-xl space-y-1">
              <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Emergency Contact</span>
              <div className="flex items-center gap-1 text-slate-700 font-semibold mt-0.5">
                <Phone className="h-3.5 w-3.5 text-slate-400" />
                <span>{leave.emergencyPhone}</span>
              </div>
            </div>

            {leave.comments && (
              <div className="p-3.5 bg-slate-50/50 border border-slate-100 rounded-xl space-y-1">
                <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Supervisor Comments</span>
                <p className="text-slate-650 italic font-semibold">{leave.comments}</p>
              </div>
            )}
          </div>

        </div>

        {/* Right Side: Timeline checklist details */}
        <div className="p-4 border border-slate-100 rounded-2xl">
          <WorkflowTimeline status={leave.status} />
        </div>

      </div>

      {/* 4. Action triggers for supervisor role */}
      {showActions && leave.status === 'Pending' && (
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
          <button
            onClick={() => onReject(leave.id)}
            className="px-5 py-2.5 bg-rose-50 hover:bg-rose-100/80 border border-rose-200 rounded-xl text-rose-700 text-xs font-bold transition flex items-center gap-1 cursor-pointer"
          >
            <XCircle className="h-4 w-4" />
            Reject Leave
          </button>
          
          <button
            onClick={() => onApprove(leave.id)}
            className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 rounded-xl text-white text-xs font-bold shadow-md shadow-emerald-500/25 transition flex items-center gap-1 cursor-pointer"
          >
            <CheckCircle className="h-4 w-4" />
            Approve Leave
          </button>
        </div>
      )}

    </div>
  );
};

export default LeaveDetails;
