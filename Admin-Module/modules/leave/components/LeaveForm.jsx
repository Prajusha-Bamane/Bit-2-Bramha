import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { 
  FileText, 
  Calendar, 
  HelpCircle, 
  UploadCloud, 
  ArrowLeft, 
  Send 
} from 'lucide-react';
import { mockEmployees } from '../../employee/data/mockEmployees';

const leaveFormSchema = z.object({
  employeeId: z.string().min(1, 'Please select an employee profile.'),
  leaveType: z.enum([
    'Casual Leave', 'Sick Leave', 'Earned Leave', 'Maternity Leave', 
    'Paternity Leave', 'Work From Home', 'Compensatory Off', 'Unpaid Leave', 
    'Emergency Leave'
  ], { invalid_type_error: 'Please select a leave type.' }),
  startDate: z.string().min(1, 'Start date is required.'),
  endDate: z.string().min(1, 'End date is required.'),
  halfDay: z.boolean().default(false),
  reason: z.string().trim().min(5, 'Reason must be at least 5 characters long.'),
  emergencyPhone: z.string().trim().min(10, 'Emergency phone number must be at least 10 digits.'),
  managerId: z.string().min(1, 'Please select a reporting manager.'),
  comments: z.string().trim().optional(),
});

const LeaveForm = ({ onSubmit, onCancel }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(leaveFormSchema),
    defaultValues: {
      employeeId: 'EMP-2020-01',
      leaveType: 'Casual Leave',
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date().toISOString().split('T')[0],
      halfDay: false,
      reason: '',
      emergencyPhone: '+91 98765 43210',
      managerId: 'EMP-2022-08',
      comments: '',
    },
  });

  const leaveTypesList = [
    'Casual Leave', 'Sick Leave', 'Earned Leave', 'Maternity Leave', 
    'Paternity Leave', 'Work From Home', 'Compensatory Off', 'Unpaid Leave', 
    'Emergency Leave'
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-3xl mx-auto">
      
      {/* Basic form block info */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
          <FileText className="h-5 w-5 text-indigo-600" />
          <h3 className="text-sm font-bold text-slate-800 font-sans uppercase tracking-wider">Leave Application Details</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Employee dropdown selector */}
          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wide mb-1.5">Applying Employee</label>
            <select
              className="block w-full px-3 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl text-xs text-slate-700"
              {...register('employeeId')}
            >
              {mockEmployees.map(e => (
                <option key={e.id} value={e.id}>{e.firstName} {e.lastName} ({e.id})</option>
              ))}
            </select>
          </div>

          {/* Leave Type selector */}
          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wide mb-1.5">Leave Type</label>
            <select
              className="block w-full px-3 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl text-xs text-slate-700"
              {...register('leaveType')}
            >
              {leaveTypesList.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          {/* Date range inputs */}
          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wide mb-1.5">Start Date</label>
            <input
              type="date"
              className="block w-full px-3.5 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl text-xs text-slate-800"
              {...register('startDate')}
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wide mb-1.5">End Date</label>
            <input
              type="date"
              className="block w-full px-3.5 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl text-xs text-slate-800"
              {...register('endDate')}
            />
          </div>

          {/* Half day triggers */}
          <div className="flex items-center gap-2 md:col-span-2 py-1">
            <input
              type="checkbox"
              id="halfDay"
              className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
              {...register('halfDay')}
            />
            <label htmlFor="halfDay" className="text-xs font-bold text-slate-650 cursor-pointer">Apply for Half Day Shift</label>
          </div>

          {/* Reason text */}
          <div className="md:col-span-2">
            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wide mb-1.5">Reason Description</label>
            <textarea
              rows="3"
              className={`block w-full px-3.5 py-2.5 bg-slate-50/50 border ${
                errors.reason ? 'border-red-500' : 'border-slate-200'
              } rounded-xl text-xs text-slate-800`}
              placeholder="Provide a detailed explanation for your leave request..."
              {...register('reason')}
            />
            {errors.reason && <p className="text-[10px] text-red-500 mt-1">{errors.reason.message}</p>}
          </div>

          {/* Emergency contacts phone */}
          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wide mb-1.5">Emergency Phone</label>
            <input
              type="text"
              className={`block w-full px-3.5 py-2.5 bg-slate-50/50 border ${
                errors.emergencyPhone ? 'border-red-500' : 'border-slate-200'
              } rounded-xl text-xs text-slate-800`}
              placeholder="+91 XXXXX XXXXX"
              {...register('emergencyPhone')}
            />
            {errors.emergencyPhone && <p className="text-[10px] text-red-500 mt-1">{errors.emergencyPhone.message}</p>}
          </div>

          {/* Manager selector */}
          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wide mb-1.5">Reporting Manager</label>
            <select
              className="block w-full px-3 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl text-xs text-slate-700"
              {...register('managerId')}
            >
              <option value="EMP-2022-08">Amit Kumar (Tech Architect)</option>
              <option value="EMP-2020-01">Rahul Sharma (HR Director)</option>
              <option value="EMP-2022-01">Manoj Vyas (COO)</option>
            </select>
          </div>

          {/* Attachments Upload Mock */}
          <div className="md:col-span-2">
            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wide mb-1.5">Supporting Attachments</label>
            <div className="flex items-center justify-center border border-dashed border-slate-200 rounded-xl px-6 py-4 hover:bg-slate-50 cursor-pointer text-slate-500 gap-2">
              <UploadCloud className="h-5 w-5" />
              <span className="text-xs font-bold">Select medical certificates or references (max 5MB)</span>
            </div>
          </div>

          {/* Comments section */}
          <div className="md:col-span-2">
            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wide mb-1.5">Comments (Optional)</label>
            <textarea
              rows="2"
              className="block w-full px-3.5 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl text-xs text-slate-800"
              placeholder="Additional notes for HR review..."
              {...register('comments')}
            />
          </div>

        </div>
      </div>

      {/* Button Actions */}
      <div className="flex items-center justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-5 py-2.5 border border-slate-200 hover:bg-slate-100 text-slate-650 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4" />
          Cancel
        </button>
        <button
          type="submit"
          className="px-6 py-2.5 bg-primary text-white hover:bg-indigo-700 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-md shadow-indigo-500/20"
        >
          <Send className="h-4 w-4" />
          Submit Application
        </button>
      </div>

    </form>
  );
};

export default LeaveForm;
