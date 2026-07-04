import React from 'react';
import { Eye, Edit, Trash2, ArrowUpDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const StatusBadge = ({ status }) => {
  const styles = {
    Active: 'bg-emerald-50 text-emerald-700 border-emerald-100/50',
    Inactive: 'bg-slate-50 text-slate-600 border-slate-200/50',
    Probation: 'bg-indigo-50 text-indigo-700 border-indigo-100/50',
    Resigned: 'bg-rose-50 text-rose-700 border-rose-100/50',
    Suspended: 'bg-amber-50 text-amber-700 border-amber-100/50',
  };

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold border ${styles[status] || styles.Inactive}`}>
      {status}
    </span>
  );
};

export const DepartmentBadge = ({ dept }) => {
  return (
    <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-semibold bg-slate-100 text-slate-700">
      {dept}
    </span>
  );
};

const EmployeeTable = ({ 
  employees, 
  onSort, 
  onDelete, 
  sortField, 
  sortOrder 
}) => {
  const navigate = useNavigate();

  const handleSortClick = (field) => {
    onSort(field);
  };

  return (
    <div className="bg-white border border-slate-200/80 rounded-2xl shadow-sm overflow-hidden">
      <div className="overflow-x-auto max-h-[600px] overflow-y-auto">
        <table className="min-w-full divide-y divide-slate-100 text-left text-xs relative">
          <thead className="bg-slate-50/80 backdrop-blur-sm sticky top-0 z-10 border-b border-slate-100">
            <tr className="text-slate-400 font-bold uppercase tracking-wider">
              <th className="px-6 py-4 font-bold select-none cursor-pointer" onClick={() => handleSortClick('firstName')}>
                <div className="flex items-center gap-1">
                  Employee
                  <ArrowUpDown className="h-3 w-3" />
                </div>
              </th>
              <th className="px-6 py-4 font-bold select-none cursor-pointer" onClick={() => handleSortClick('id')}>
                <div className="flex items-center gap-1">
                  ID
                  <ArrowUpDown className="h-3 w-3" />
                </div>
              </th>
              <th className="px-6 py-4 font-bold">Email</th>
              <th className="px-6 py-4 font-bold">Department</th>
              <th className="px-6 py-4 font-bold">Designation</th>
              <th className="px-6 py-4 font-bold">Status</th>
              <th className="px-6 py-4 font-bold select-none cursor-pointer" onClick={() => handleSortClick('joiningDate')}>
                <div className="flex items-center gap-1">
                  Joining Date
                  <ArrowUpDown className="h-3 w-3" />
                </div>
              </th>
              <th className="px-6 py-4 font-bold">Phone</th>
              <th className="px-6 py-4 font-bold text-right pr-8">Actions</th>
            </tr>
          </thead>
          
          <tbody className="divide-y divide-slate-100 text-slate-700 bg-white">
            {employees.map((emp) => {
              const initials = `${emp.firstName.charAt(0)}${emp.lastName.charAt(0)}`;
              return (
                <tr key={emp.id} className="hover:bg-slate-50/50 transition-colors duration-150">
                  <td className="px-6 py-3.5 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-xs">
                      {initials}
                    </div>
                    <div>
                      <span className="font-bold text-slate-800 block text-xs">
                        {emp.firstName} {emp.lastName}
                      </span>
                      <span className="text-[10px] text-slate-400 font-semibold">{emp.designation}</span>
                    </div>
                  </td>
                  <td className="px-6 py-3.5 font-bold text-slate-500">{emp.id}</td>
                  <td className="px-6 py-3.5 text-slate-600">{emp.email}</td>
                  <td className="px-6 py-3.5">
                    <DepartmentBadge dept={emp.department} />
                  </td>
                  <td className="px-6 py-3.5 text-slate-500 font-medium">{emp.designation}</td>
                  <td className="px-6 py-3.5">
                    <StatusBadge status={emp.status} />
                  </td>
                  <td className="px-6 py-3.5 text-slate-500 font-semibold">{emp.joiningDate}</td>
                  <td className="px-6 py-3.5 text-slate-500 font-medium">{emp.phone}</td>
                  <td className="px-6 py-3.5 text-right pr-6">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => navigate(`/employees/${emp.id}`)}
                        className="p-1.5 text-slate-500 hover:bg-slate-100 border border-slate-200/80 rounded-lg hover:text-slate-800 transition cursor-pointer"
                        title="View Profile"
                      >
                        <Eye className="h-3.5 w-3.5" />
                      </button>
                      <button
                        onClick={() => navigate(`/employees/edit/${emp.id}`)}
                        className="p-1.5 text-indigo-600 hover:bg-indigo-50 border border-slate-200/80 hover:border-indigo-100 rounded-lg transition cursor-pointer"
                        title="Edit Record"
                      >
                        <Edit className="h-3.5 w-3.5" />
                      </button>
                      <button
                        onClick={() => onDelete(emp.id)}
                        className="p-1.5 text-rose-600 hover:bg-rose-50 border border-slate-200/80 hover:border-rose-100 rounded-lg transition cursor-pointer"
                        title="Delete Record"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
            {employees.length === 0 && (
              <tr>
                <td colSpan="9" className="px-6 py-12 text-center text-slate-400 font-semibold">
                  No matching employee records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeTable;
