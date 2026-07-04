import React, { useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mockEmployees } from '../data/mockEmployees';
import { StatusBadge, DepartmentBadge } from '../components/EmployeeTable';
import { 
  ArrowLeft, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Briefcase, 
  AlertCircle,
  TrendingUp,
  Award,
  Clock,
  DollarSign
} from 'lucide-react';

const EmployeeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Find employee from mock data list
  const employee = useMemo(() => {
    return mockEmployees.find(emp => emp.id === id);
  }, [id]);

  if (!employee) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-center bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
        <AlertCircle className="h-10 w-10 text-rose-500 mb-2" />
        <h1 className="text-xl font-bold text-slate-800">Profile Record Not Found</h1>
        <p className="text-slate-500 text-xs mt-1">The requested employee ID is either missing or deleted.</p>
        <button 
          onClick={() => navigate('/employees')}
          className="mt-4 px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-xl hover:bg-slate-800 transition"
        >
          Back to Directory
        </button>
      </div>
    );
  }

  const initials = `${employee.firstName.charAt(0)}${employee.lastName.charAt(0)}`;
  
  // Custom mock values for stats dashboard
  const attendanceRate = employee.attendance || '95.5%';
  const leaveBalance = employee.leaveBalance !== undefined ? employee.leaveBalance : 14;
  const currentSalary = employee.salary || '₹65,000';
  const projectsCount = employee.projects !== undefined ? employee.projects : 2;

  // Compute profile completion percentage
  const profileCompletion = 85; // Mock percentage based on fields filled

  return (
    <div className="space-y-6">
      
      {/* Upper navigation header */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate('/employees')}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl text-slate-600 font-bold text-xs shadow-sm transition cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Directory
        </button>
        
        <button
          onClick={() => navigate(`/employees/edit/${employee.id}`)}
          className="px-4 py-2 bg-primary text-white hover:bg-indigo-700 rounded-xl text-xs font-bold shadow-md shadow-indigo-500/20 transition cursor-pointer"
        >
          Edit Profile
        </button>
      </div>

      {/* Main Profile Header Card */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 p-6 rounded-2xl border border-slate-800 shadow-xl relative overflow-hidden text-white">
        <div className="absolute right-0 top-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
        
        <div className="flex flex-col md:flex-row items-center gap-6 relative z-10">
          <div className="w-20 h-20 rounded-full bg-slate-800/80 border-2 border-indigo-500/30 flex items-center justify-center font-bold text-2xl shadow-inner text-indigo-300">
            {initials}
          </div>
          
          <div className="flex-1 text-center md:text-left">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2.5">
              <h1 className="text-2xl font-extrabold tracking-tight">{employee.firstName} {employee.lastName}</h1>
              <StatusBadge status={employee.status} />
            </div>
            
            <p className="text-sm text-slate-300 mt-1 uppercase tracking-wider font-semibold">
              {employee.designation}
            </p>
            <div className="mt-2.5 flex flex-wrap items-center justify-center md:justify-start gap-2 text-xs text-slate-400">
              <span className="font-semibold text-slate-300">ID: {employee.id}</span>
              <span className="w-1 h-1 bg-slate-600 rounded-full"></span>
              <span>{employee.email}</span>
            </div>
          </div>

          {/* Profile Completion Panel */}
          <div className="w-full md:w-52 p-4 bg-slate-800/50 border border-slate-700/30 rounded-xl">
            <div className="flex items-center justify-between text-xs font-bold mb-1.5">
              <span className="text-slate-300">Profile Integrity</span>
              <span className="text-indigo-400">{profileCompletion}%</span>
            </div>
            <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
              <div className="bg-indigo-500 h-full rounded-full" style={{ width: `${profileCompletion}%` }}></div>
            </div>
            <p className="text-[10px] text-slate-500 mt-1 font-bold uppercase tracking-wider text-right">8 fields remaining</p>
          </div>
        </div>
      </div>

      {/* KPI statistics row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex items-center gap-3.5">
          <div className="p-2.5 rounded-lg bg-emerald-50 text-emerald-600">
            <Clock className="h-5 w-5" />
          </div>
          <div>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Attendance Rate</p>
            <p className="text-lg font-black text-slate-800 tracking-tight">{attendanceRate}</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex items-center gap-3.5">
          <div className="p-2.5 rounded-lg bg-indigo-50 text-indigo-600">
            <Calendar className="h-5 w-5" />
          </div>
          <div>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Leave Balance</p>
            <p className="text-lg font-black text-slate-800 tracking-tight">{leaveBalance} days</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex items-center gap-3.5">
          <div className="p-2.5 rounded-lg bg-blue-50 text-blue-600">
            <TrendingUp className="h-5 w-5" />
          </div>
          <div>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Assigned Projects</p>
            <p className="text-lg font-black text-slate-800 tracking-tight">{projectsCount} active</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex items-center gap-3.5">
          <div className="p-2.5 rounded-lg bg-teal-50 text-teal-600">
            <DollarSign className="h-5 w-5" />
          </div>
          <div>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Monthly Salary</p>
            <p className="text-lg font-black text-slate-800 tracking-tight">{currentSalary}</p>
          </div>
        </div>

      </div>

      {/* Main splits */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Side: General Profile Information (Spans 2 columns) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Employee Information */}
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <Briefcase className="h-4.5 w-4.5 text-indigo-600" />
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Employment Details</h3>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-2 text-xs">
              <div>
                <p className="text-slate-400 font-bold">Department</p>
                <p className="text-slate-800 font-semibold mt-1">{employee.department}</p>
              </div>
              <div>
                <p className="text-slate-400 font-bold">Designation</p>
                <p className="text-slate-800 font-semibold mt-1">{employee.designation}</p>
              </div>
              <div>
                <p className="text-slate-400 font-bold">Portal Role</p>
                <p className="text-slate-800 font-semibold mt-1">{employee.role}</p>
              </div>
              <div>
                <p className="text-slate-400 font-bold">Joining Date</p>
                <p className="text-slate-800 font-semibold mt-1">{employee.joiningDate}</p>
              </div>
              <div>
                <p className="text-slate-400 font-bold">Employment Status</p>
                <p className="text-slate-800 font-semibold mt-1">{employee.status}</p>
              </div>
            </div>
          </div>

          {/* Contact Details */}
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <Phone className="h-4.5 w-4.5 text-indigo-600" />
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Contact Information</h3>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-2 text-xs">
              <div>
                <p className="text-slate-400 font-bold">Personal Email</p>
                <p className="text-slate-800 font-semibold mt-1">{employee.email}</p>
              </div>
              <div>
                <p className="text-slate-400 font-bold">Contact Number</p>
                <p className="text-slate-800 font-semibold mt-1">{employee.phone}</p>
              </div>
              <div>
                <p className="text-slate-400 font-bold">Work Location</p>
                <p className="text-slate-800 font-semibold mt-1">Bangalore Head Office</p>
              </div>
            </div>
          </div>

        </div>

        {/* Right Side: Emergency Contact Panel (Spans 1 column) */}
        <div className="space-y-6">
          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <AlertCircle className="h-4.5 w-4.5 text-rose-600 animate-pulse" />
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Emergency Contact</h3>
            </div>
            
            <div className="space-y-3 text-xs">
              <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl">
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Contact Name</p>
                <p className="text-sm font-extrabold text-slate-850 mt-0.5">
                  {employee.emergencyContact?.name || 'Sanjay Iyer'}
                </p>
              </div>
              <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl">
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Relation</p>
                <p className="text-sm font-extrabold text-slate-850 mt-0.5">
                  {employee.emergencyContact?.relation || 'Parent'}
                </p>
              </div>
              <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl">
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Emergency Phone</p>
                <p className="text-sm font-extrabold text-slate-850 mt-0.5">
                  {employee.emergencyContact?.phone || '+91 98334 45500'}
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};

export default EmployeeDetails;
