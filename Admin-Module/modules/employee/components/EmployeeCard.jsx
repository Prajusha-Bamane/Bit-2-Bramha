import React from 'react';
import { StatusBadge, DepartmentBadge } from './EmployeeTable';
import { Mail, Phone, User2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const EmployeeCard = ({ employee }) => {
  const navigate = useNavigate();
  const initials = `${employee.firstName.charAt(0)}${employee.lastName.charAt(0)}`;

  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:border-slate-200/80 hover:-translate-y-0.5 transition-all duration-200 flex flex-col items-center text-center relative group">
      {/* Top right status flag */}
      <div className="absolute top-4 right-4">
        <StatusBadge status={employee.status} />
      </div>
      
      {/* Profile avatar representation */}
      <div className="w-16 h-16 rounded-full bg-indigo-50 border-2 border-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-lg mb-3 shadow-sm group-hover:scale-105 transition-transform duration-200">
        {initials}
      </div>
      
      <h4 className="text-sm font-bold text-slate-800 tracking-tight leading-tight group-hover:text-primary transition-colors">
        {employee.firstName} {employee.lastName}
      </h4>
      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">{employee.designation}</p>
      
      <div className="mt-2.5">
        <DepartmentBadge dept={employee.department} />
      </div>
      
      <div className="w-full border-t border-slate-100/50 my-4"></div>
      
      {/* Contact stats */}
      <div className="w-full space-y-2 text-left text-xs text-slate-500">
        <div className="flex items-center gap-2 truncate">
          <Mail className="h-3.5 w-3.5 text-slate-400 flex-shrink-0" />
          <span className="truncate">{employee.email}</span>
        </div>
        <div className="flex items-center gap-2">
          <Phone className="h-3.5 w-3.5 text-slate-400 flex-shrink-0" />
          <span className="font-semibold text-slate-600">{employee.phone}</span>
        </div>
      </div>
      
      {/* Button profile trigger */}
      <button
        onClick={() => navigate(`/employees/${employee.id}`)}
        className="w-full mt-5 inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-slate-50 border border-slate-200 hover:bg-slate-100/80 hover:border-slate-300 rounded-xl text-slate-700 font-bold text-xs transition cursor-pointer"
      >
        <User2 className="h-4 w-4" />
        View Profile
      </button>
    </div>
  );
};

export default EmployeeCard;
