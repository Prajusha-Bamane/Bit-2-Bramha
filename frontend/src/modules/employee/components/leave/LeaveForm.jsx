import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ArrowLeft, ArrowRight, CheckCircle2, FileUp, Loader2 } from 'lucide-react';

const leaveSchema = z.object({
  leaveType: z.string().min(1, 'Please choose a leave type'),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().min(1, 'End date is required'),
  halfDay: z.boolean().optional(),
  reason: z.string().min(8, 'Please share a clear reason'),
  emergencyContact: z.string().min(3, 'Emergency contact is required'),
  manager: z.string().min(1, 'Please select a manager'),
  comments: z.string().max(200).optional(),
});

const LeaveForm = ({ onSubmit, isSubmitting }) => {
  const [step, setStep] = useState(1);
  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
    getValues,
  } = useForm({
    resolver: zodResolver(leaveSchema),
    defaultValues: {
      leaveType: 'Casual Leave',
      startDate: '',
      endDate: '',
      halfDay: false,
      reason: '',
      emergencyContact: '+91 98765 43210',
      manager: 'Aarav Mehta',
      comments: '',
    },
  });

  const nextStep = async () => {
    const fields = step === 1 ? ['leaveType', 'startDate', 'endDate', 'reason'] : ['emergencyContact', 'manager'];
    const valid = await trigger(fields);
    if (valid) {
      setStep((current) => current + 1);
    }
  };

  const prevStep = () => setStep((current) => current - 1);

  const handleFormSubmit = (values) => {
    onSubmit(values);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">Apply Leave</p>
          <h3 className="mt-1 text-xl font-semibold text-slate-900">Request a new leave</h3>
        </div>
        <div className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-600">Step {step} / 3</div>
      </div>

      <div className="mt-6 flex items-center gap-2">
        {[1, 2, 3].map((item) => (
          <div key={item} className={`h-2 flex-1 rounded-full ${step >= item ? 'bg-emerald-500' : 'bg-slate-200'}`} />
        ))}
      </div>

      {step === 1 && (
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div>
            <label className="text-sm font-medium text-slate-700">Leave Type</label>
            <select {...register('leaveType')} className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm outline-none ring-0 focus:border-emerald-500">
              <option>Casual Leave</option>
              <option>Sick Leave</option>
              <option>Earned Leave</option>
              <option>Work From Home</option>
              <option>Compensatory Off</option>
              <option>Emergency Leave</option>
            </select>
            {errors.leaveType && <p className="mt-1 text-sm text-rose-600">{errors.leaveType.message}</p>}
          </div>
          <div>
            <label className="text-sm font-medium text-slate-700">Half Day</label>
            <div className="mt-2 flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm">
              <input type="checkbox" {...register('halfDay')} className="h-4 w-4 rounded border-slate-300 text-emerald-500" />
              <span className="text-slate-600">Request a half-day leave</span>
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-slate-700">Start Date</label>
            <input type="date" {...register('startDate')} className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm outline-none focus:border-emerald-500" />
            {errors.startDate && <p className="mt-1 text-sm text-rose-600">{errors.startDate.message}</p>}
          </div>
          <div>
            <label className="text-sm font-medium text-slate-700">End Date</label>
            <input type="date" {...register('endDate')} className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm outline-none focus:border-emerald-500" />
            {errors.endDate && <p className="mt-1 text-sm text-rose-600">{errors.endDate.message}</p>}
          </div>
          <div className="md:col-span-2">
            <label className="text-sm font-medium text-slate-700">Reason</label>
            <textarea rows="3" {...register('reason')} className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm outline-none focus:border-emerald-500" />
            {errors.reason && <p className="mt-1 text-sm text-rose-600">{errors.reason.message}</p>}
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div>
            <label className="text-sm font-medium text-slate-700">Emergency Contact</label>
            <input {...register('emergencyContact')} className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm outline-none focus:border-emerald-500" />
            {errors.emergencyContact && <p className="mt-1 text-sm text-rose-600">{errors.emergencyContact.message}</p>}
          </div>
          <div>
            <label className="text-sm font-medium text-slate-700">Manager</label>
            <select {...register('manager')} className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm outline-none focus:border-emerald-500">
              <option>Aarav Mehta</option>
              <option>Nisha Rao</option>
              <option>Rohit Sharma</option>
              <option>Maya Chen</option>
              <option>Devansh Kapoor</option>
            </select>
            {errors.manager && <p className="mt-1 text-sm text-rose-600">{errors.manager.message}</p>}
          </div>
          <div className="md:col-span-2 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-700">Supporting Document</p>
                <p className="text-sm text-slate-500">Upload a medical note or travel proof if needed.</p>
              </div>
              <button type="button" className="inline-flex items-center rounded-full border border-slate-300 px-3 py-2 text-sm font-medium text-slate-600">
                <FileUp className="mr-2 h-4 w-4" /> Upload Placeholder
              </button>
            </div>
          </div>
          <div className="md:col-span-2">
            <label className="text-sm font-medium text-slate-700">Comments</label>
            <textarea rows="3" {...register('comments')} className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm outline-none focus:border-emerald-500" />
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="mt-6 rounded-2xl border border-emerald-100 bg-emerald-50 p-4 text-sm text-emerald-700">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5" />
            <span className="font-semibold">Review your request before submission</span>
          </div>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            <p><span className="font-semibold">Leave type:</span> {getValues('leaveType')}</p>
            <p><span className="font-semibold">Manager:</span> {getValues('manager')}</p>
            <p><span className="font-semibold">From:</span> {getValues('startDate')}</p>
            <p><span className="font-semibold">To:</span> {getValues('endDate')}</p>
            <p><span className="font-semibold">Reason:</span> {getValues('reason')}</p>
            <p><span className="font-semibold">Emergency contact:</span> {getValues('emergencyContact')}</p>
          </div>
        </div>
      )}

      <div className="mt-6 flex flex-wrap justify-between gap-3">
        <button type="button" onClick={prevStep} disabled={step === 1} className="inline-flex items-center rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-600 disabled:cursor-not-allowed disabled:opacity-60">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </button>
        {step < 3 ? (
          <button type="button" onClick={nextStep} className="inline-flex items-center rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white">
            Continue <ArrowRight className="ml-2 h-4 w-4" />
          </button>
        ) : (
          <button type="submit" disabled={isSubmitting} className="inline-flex items-center rounded-full bg-emerald-600 px-4 py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-70">
            {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <CheckCircle2 className="mr-2 h-4 w-4" />}
            Submit Request
          </button>
        )}
      </div>
    </form>
  );
};

export default LeaveForm;
