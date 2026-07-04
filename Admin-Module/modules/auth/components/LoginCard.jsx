import React from 'react';
import RoleSelector from './RoleSelector';
import LoginForm from './LoginForm';
import { ShieldCheck, User } from 'lucide-react';

const LoginCard = ({ selectedRole, onRoleChange, onSubmit, isLoading, apiError }) => {
  const content = {
    Admin: {
      title: 'Administrator Login',
      subtitle: 'Manage employees, attendance, payroll and reports.',
      welcome: 'Corporate Admin Portal',
      icon: ShieldCheck,
      iconBg: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
      shadowClass: 'shadow-indigo-500/5 border-slate-800'
    },
    Employee: {
      title: 'Employee Login',
      subtitle: 'Access your attendance, leave requests, payroll and profile.',
      welcome: 'Employee Self-Service',
      icon: User,
      iconBg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
      shadowClass: 'shadow-emerald-500/5 border-slate-800'
    }
  };

  const current = content[selectedRole];
  const CardIcon = current.icon;

  return (
    <div className={`w-full max-w-lg mx-auto bg-slate-900/40 backdrop-blur-xl border p-8 md:p-10 rounded-3xl shadow-2xl transition-all duration-500 ${current.shadowClass}`}>
      <div className="text-center mb-8">
        <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border mb-4 text-xs font-semibold tracking-wider uppercase font-sans ${current.iconBg}`}>
          <CardIcon className="h-3.5 w-3.5" />
          {current.welcome}
        </div>
        <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight font-sans transition-all duration-300">
          {current.title}
        </h2>
        <p className="mt-2 text-sm text-slate-400 font-sans transition-all duration-300 max-w-sm mx-auto">
          {current.subtitle}
        </p>
      </div>

      {/* Role Segment Selector */}
      <RoleSelector selectedRole={selectedRole} onChange={onRoleChange} />

      {/* Actual Form */}
      <LoginForm
        role={selectedRole}
        onSubmit={onSubmit}
        isLoading={isLoading}
        apiError={apiError}
      />
    </div>
  );
};

export default LoginCard;
