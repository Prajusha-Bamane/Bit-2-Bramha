import React, { useState } from 'react';
import { ShieldCheck, Save, Info } from 'lucide-react';

const permissionsConfig = [
  { key: 'viewEmployees', label: 'View Employees Registry', desc: 'Allows viewing coworker contact sheets.' },
  { key: 'createEmployees', label: 'Create New Employee Profiles', desc: 'Allows registering profiles and core metadata.' },
  { key: 'updateEmployees', label: 'Update Corporate Detail sheets', desc: 'Allows modifying manager mappings and lines.' },
  { key: 'deleteEmployees', label: 'Delete Employee Indices', desc: 'Allows purging records from directory tables.' },
  { key: 'attendanceAccess', label: 'Manage Attendance Roster logs', desc: 'Allows modifying clock logs and regularization approvals.' },
  { key: 'leaveApproval', label: 'Approve/Reject Leave submissions', desc: 'Allows signing off vacation and sick leave quotas.' },
  { key: 'payrollAccess', label: 'Process monthly Salary Ledgers', desc: 'Allows generating base ledger runs.' },
  { key: 'reportsAccess', label: 'Export Analytics Reports files', desc: 'Allows auditing reports modules.' },
  { key: 'settingsAccess', label: 'Configure System Settings variables', desc: 'Allows full access to this System Settings board.' }
];

const RolePermissionMatrix = ({ rolesPermissions, onSave }) => {
  const [matrix, setMatrix] = useState([...rolesPermissions]);

  const handleToggle = (roleName, permKey) => {
    setMatrix(prev =>
      prev.map((roleObj) => {
        if (roleObj.role === roleName) {
          return {
            ...roleObj,
            permissions: {
              ...roleObj.permissions,
              [permKey]: !roleObj.permissions[permKey]
            }
          };
        }
        return roleObj;
      })
    );
  };

  const handleSave = () => {
    if (onSave) {
      onSave(matrix);
    }
    alert('Security Access Matrix updated successfully!');
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-md p-6 space-y-5 select-none">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-100 pb-4">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-indigo-650" />
          <div>
            <h2 className="text-sm font-bold text-slate-800">Roles & Security Permissions</h2>
            <p className="text-[10px] text-slate-500 mt-0.5 font-medium">RBAC (Role Based Access Control) setup</p>
          </div>
        </div>
        
        <button
          onClick={handleSave}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-750 text-white font-bold text-xs rounded-xl shadow transition cursor-pointer"
        >
          <Save className="w-4 h-4" />
          Save Access Matrix
        </button>
      </div>

      {/* Info Warning Banner */}
      <div className="bg-indigo-50/50 border border-indigo-100 p-4 rounded-xl flex items-start gap-2.5 text-xs text-indigo-805">
        <Info className="w-4 h-4 text-indigo-650 flex-shrink-0 mt-0.5 animate-pulse" />
        <div>
          <p className="font-extrabold text-[10px] uppercase tracking-wider">Note on Privileges overrides</p>
          <p className="text-[10px] text-slate-500 mt-0.5 leading-relaxed">
            Changes to Super Admin permissions are restricted by core system schemas. Modifications here apply immediately to active sessions.
          </p>
        </div>
      </div>

      {/* Grid Matrix Table */}
      <div className="overflow-x-auto border border-slate-100 rounded-xl">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-slate-50 text-slate-500 font-bold border-b border-slate-100">
              <th className="p-3.5 min-w-[200px]">Permission Flag</th>
              {matrix.map((r) => (
                <th key={r.role} className="p-3.5 text-center select-none min-w-[100px]">
                  {r.role}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {permissionsConfig.map((perm) => (
              <tr key={perm.key} className="hover:bg-slate-50/40 transition-colors">
                <td className="p-3.5">
                  <span className="font-bold text-slate-800 block">{perm.label}</span>
                  <span className="text-[10px] text-slate-400 font-semibold block mt-0.5">{perm.desc}</span>
                </td>
                
                {matrix.map((r) => {
                  const isChecked = r.permissions[perm.key];
                  const isDisabled = r.role === 'Super Admin'; // Super Admin can't be modified to prevent lock-outs

                  return (
                    <td key={r.role} className="p-3.5 text-center">
                      <label className="relative inline-flex items-center cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          disabled={isDisabled}
                          onChange={() => handleToggle(r.role, perm.key)}
                          className="sr-only peer"
                        />
                        <div className={`w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-650 ${
                          isDisabled ? 'opacity-50 cursor-not-allowed' : ''
                        }`}></div>
                      </label>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default RolePermissionMatrix;
export { permissionsConfig };
