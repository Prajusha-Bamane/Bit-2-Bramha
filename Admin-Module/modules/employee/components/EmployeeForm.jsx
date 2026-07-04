import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { 
  User, 
  Briefcase, 
  PhoneCall, 
  ShieldAlert, 
  UploadCloud, 
  ArrowLeft,
  Save
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const employeeFormSchema = z.object({
  firstName: z.string().trim().min(1, 'First name is required.'),
  lastName: z.string().trim().min(1, 'Last name is required.'),
  email: z.string().trim().min(1, 'Email is required.').email('Invalid email address format.'),
  phone: z.string().trim().min(10, 'Phone number must be at least 10 digits.'),
  department: z.string().min(1, 'Please select a department.'),
  designation: z.string().trim().min(1, 'Designation is required.'),
  status: z.enum(['Active', 'Inactive', 'Probation', 'Resigned', 'Suspended']).default('Active'),
  joiningDate: z.string().min(1, 'Joining date is required.'),
  role: z.enum(['Admin', 'Manager', 'Employee']).default('Employee'),
  emergencyName: z.string().trim().min(1, 'Emergency contact name is required.'),
  emergencyRelation: z.string().trim().min(1, 'Emergency relation is required.'),
  emergencyPhone: z.string().trim().min(10, 'Emergency phone must be at least 10 digits.'),
});

const EmployeeForm = ({ initialValues, onSubmit, isEdit }) => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(employeeFormSchema),
    defaultValues: initialValues || {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      department: 'Software Development',
      designation: '',
      status: 'Active',
      joiningDate: new Date().toISOString().split('T')[0],
      role: 'Employee',
      emergencyName: '',
      emergencyRelation: '',
      emergencyPhone: '',
    },
  });

  const departmentsList = [
    'Software Development', 'QA', 'Human Resources', 'Finance', 'Marketing', 
    'Sales', 'Administration', 'Support', 'Design', 'Operations'
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-4xl mx-auto">
      
      {/* SECTION 1: Basic Information */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
          <User className="h-5 w-5 text-indigo-600" />
          <h3 className="text-sm font-bold text-slate-800 font-sans uppercase tracking-wider">Basic Information</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wide mb-1.5">First Name</label>
            <input
              type="text"
              className={`block w-full px-3.5 py-2.5 bg-slate-50/50 border ${
                errors.firstName ? 'border-red-500' : 'border-slate-200'
              } rounded-xl text-xs text-slate-800 focus:ring-1 focus:ring-primary focus:border-transparent transition-all duration-200`}
              placeholder="e.g. Swati"
              {...register('firstName')}
            />
            {errors.firstName && <p className="text-[10px] text-red-500 mt-1">{errors.firstName.message}</p>}
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wide mb-1.5">Last Name</label>
            <input
              type="text"
              className={`block w-full px-3.5 py-2.5 bg-slate-50/50 border ${
                errors.lastName ? 'border-red-500' : 'border-slate-200'
              } rounded-xl text-xs text-slate-800 focus:ring-1 focus:ring-primary focus:border-transparent transition-all duration-200`}
              placeholder="e.g. Iyer"
              {...register('lastName')}
            />
            {errors.lastName && <p className="text-[10px] text-red-500 mt-1">{errors.lastName.message}</p>}
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wide mb-1.5">Email Address</label>
            <input
              type="email"
              className={`block w-full px-3.5 py-2.5 bg-slate-50/50 border ${
                errors.email ? 'border-red-500' : 'border-slate-200'
              } rounded-xl text-xs text-slate-800 focus:ring-1 focus:ring-primary focus:border-transparent transition-all duration-200`}
              placeholder="name@enterprise.com"
              {...register('email')}
            />
            {errors.email && <p className="text-[10px] text-red-500 mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wide mb-1.5">Contact Number</label>
            <input
              type="text"
              className={`block w-full px-3.5 py-2.5 bg-slate-50/50 border ${
                errors.phone ? 'border-red-500' : 'border-slate-200'
              } rounded-xl text-xs text-slate-800 focus:ring-1 focus:ring-primary focus:border-transparent transition-all duration-200`}
              placeholder="+91 XXXXX XXXXX"
              {...register('phone')}
            />
            {errors.phone && <p className="text-[10px] text-red-500 mt-1">{errors.phone.message}</p>}
          </div>
        </div>
      </div>

      {/* SECTION 2: Employment Details */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
          <Briefcase className="h-5 w-5 text-indigo-600" />
          <h3 className="text-sm font-bold text-slate-800 font-sans uppercase tracking-wider">Employment Details</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wide mb-1.5">Department</label>
            <select
              className="block w-full px-3 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl text-xs text-slate-700"
              {...register('department')}
            >
              {departmentsList.map(d => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wide mb-1.5">Designation</label>
            <input
              type="text"
              className={`block w-full px-3.5 py-2.5 bg-slate-50/50 border ${
                errors.designation ? 'border-red-500' : 'border-slate-200'
              } rounded-xl text-xs text-slate-800 focus:ring-1 focus:ring-primary focus:border-transparent transition-all duration-200`}
              placeholder="e.g. Senior Visual Designer"
              {...register('designation')}
            />
            {errors.designation && <p className="text-[10px] text-red-500 mt-1">{errors.designation.message}</p>}
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wide mb-1.5">Employment Status</label>
            <select
              className="block w-full px-3 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl text-xs text-slate-700"
              {...register('status')}
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Probation">Probation</option>
              <option value="Resigned">Resigned</option>
              <option value="Suspended">Suspended</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wide mb-1.5">Joining Date</label>
            <input
              type="date"
              className="block w-full px-3.5 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl text-xs text-slate-800"
              {...register('joiningDate')}
            />
          </div>
        </div>
      </div>

      {/* SECTION 3: Emergency Contacts */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
          <PhoneCall className="h-5 w-5 text-indigo-600" />
          <h3 className="text-sm font-bold text-slate-800 font-sans uppercase tracking-wider">Emergency Contact</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wide mb-1.5">Contact Name</label>
            <input
              type="text"
              className={`block w-full px-3.5 py-2.5 bg-slate-50/50 border ${
                errors.emergencyName ? 'border-red-500' : 'border-slate-200'
              } rounded-xl text-xs text-slate-800 focus:ring-1 focus:ring-primary focus:border-transparent transition-all duration-200`}
              placeholder="e.g. Ramesh Iyer"
              {...register('emergencyName')}
            />
            {errors.emergencyName && <p className="text-[10px] text-red-500 mt-1">{errors.emergencyName.message}</p>}
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wide mb-1.5">Relation</label>
            <input
              type="text"
              className={`block w-full px-3.5 py-2.5 bg-slate-50/50 border ${
                errors.emergencyRelation ? 'border-red-500' : 'border-slate-200'
              } rounded-xl text-xs text-slate-800 focus:ring-1 focus:ring-primary focus:border-transparent transition-all duration-200`}
              placeholder="e.g. Spouse / Parent"
              {...register('emergencyRelation')}
            />
            {errors.emergencyRelation && <p className="text-[10px] text-red-500 mt-1">{errors.emergencyRelation.message}</p>}
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wide mb-1.5">Phone Number</label>
            <input
              type="text"
              className={`block w-full px-3.5 py-2.5 bg-slate-50/50 border ${
                errors.emergencyPhone ? 'border-red-500' : 'border-slate-200'
              } rounded-xl text-xs text-slate-800 focus:ring-1 focus:ring-primary focus:border-transparent transition-all duration-200`}
              placeholder="+91 XXXXX XXXXX"
              {...register('emergencyPhone')}
            />
            {errors.emergencyPhone && <p className="text-[10px] text-red-500 mt-1">{errors.emergencyPhone.message}</p>}
          </div>
        </div>
      </div>

      {/* SECTION 4: Account Details */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
          <ShieldAlert className="h-5 w-5 text-indigo-600" />
          <h3 className="text-sm font-bold text-slate-800 font-sans uppercase tracking-wider">Account Settings</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wide mb-1.5">Portal Access Role</label>
            <select
              className="block w-full px-3 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl text-xs text-slate-700"
              {...register('role')}
            >
              <option value="Employee">Employee Mode</option>
              <option value="Manager">Manager Mode</option>
              <option value="Admin">Administrator Mode</option>
            </select>
          </div>

          {/* Profile Image mock upload */}
          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wide mb-1.5">Avatar Image</label>
            <div className="flex items-center justify-center border border-dashed border-slate-200 rounded-xl px-4 py-2 hover:bg-slate-50 cursor-pointer text-slate-500 gap-2">
              <UploadCloud className="h-4.5 w-4.5" />
              <span className="text-[11px] font-bold">Select PNG/JPG files (max 2MB)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Action buttons */}
      <div className="flex items-center justify-end gap-3 pt-4">
        <button
          type="button"
          onClick={() => navigate('/employees')}
          className="px-5 py-2.5 border border-slate-200 hover:bg-slate-100 text-slate-600 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4" />
          Cancel
        </button>
        <button
          type="submit"
          className="px-6 py-2.5 bg-primary text-white hover:bg-indigo-700 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-md shadow-indigo-500/25"
        >
          <Save className="h-4 w-4" />
          {isEdit ? 'Save Changes' : 'Create Record'}
        </button>
      </div>

    </form>
  );
};

export default EmployeeForm;
