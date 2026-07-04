import React from 'react';
import { Briefcase } from 'lucide-react';

const EmploymentCard = ({ profile }) => {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-md p-6">
      <div className="flex items-center gap-2 border-b border-slate-100 pb-4 mb-5">
        <Briefcase className="h-5 w-5 text-indigo-600" />
        <h2 className="text-lg font-bold text-slate-800">Employment Details</h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 text-xs">
        <div>
          <p className="text-slate-400 font-bold">Employee ID</p>
          <p className="text-slate-850 font-bold mt-1">{profile.employeeId}</p>
        </div>
        <div>
          <p className="text-slate-400 font-bold">Department</p>
          <p className="text-slate-800 font-semibold mt-1">{profile.department}</p>
        </div>
        <div>
          <p className="text-slate-400 font-bold">Designation</p>
          <p className="text-slate-800 font-semibold mt-1">{profile.designation}</p>
        </div>
        <div>
          <p className="text-slate-400 font-bold">Reporting Manager</p>
          <p className="text-slate-800 font-semibold mt-1">{profile.reportingManager || 'Sanjay Kumar (HR Director)'}</p>
        </div>
        <div>
          <p className="text-slate-400 font-bold">Employment Type</p>
          <p className="text-slate-800 font-semibold mt-1">{profile.employmentType || 'Permanent Full-time'}</p>
        </div>
        <div>
          <p className="text-slate-400 font-bold">Joining Date</p>
          <p className="text-slate-800 font-semibold mt-1">{profile.joiningDate}</p>
        </div>
        <div>
          <p className="text-slate-400 font-bold">Office Location</p>
          <p className="text-slate-800 font-semibold mt-1">{profile.officeLocation || 'Bangalore HQ, Tech Park'}</p>
        </div>
        <div>
          <p className="text-slate-400 font-bold">Work Mode</p>
          <p className="text-slate-800 font-semibold mt-1">{profile.workMode || 'Hybrid (3 Days Office)'}</p>
        </div>
        <div>
          <p className="text-slate-400 font-bold">Company Email</p>
          <p className="text-indigo-600 font-semibold mt-1 break-all">{profile.companyEmail}</p>
        </div>
      </div>
    </div>
  );
};

export default EmploymentCard;
