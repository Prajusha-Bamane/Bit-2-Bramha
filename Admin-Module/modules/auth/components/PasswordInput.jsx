import React, { useState } from 'react';
import { Lock, Eye, EyeOff } from 'lucide-react';

const PasswordInput = ({ id, placeholder, error, registerProps }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div>
      <div className="relative rounded-xl shadow-sm">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
          <Lock className="h-4.5 w-4.5" />
        </div>
        <input
          id={id}
          type={showPassword ? 'text' : 'password'}
          autoComplete="current-password"
          className={`block w-full pl-10 pr-10 py-3 bg-slate-900 border ${
            error ? 'border-red-500/80 focus:ring-red-500' : 'border-slate-800 focus:ring-indigo-500'
          } rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 text-sm`}
          placeholder={placeholder || '••••••••'}
          {...registerProps}
        />
        <button
          type="button"
          tabIndex="-1"
          className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-500 hover:text-slate-300 transition-colors duration-150 cursor-pointer"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <EyeOff className="h-4.5 w-4.5" /> : <Eye className="h-4.5 w-4.5" />}
        </button>
      </div>
      {error && (
        <p className="mt-1.5 text-xs text-red-400 font-medium font-sans flex items-center gap-1.5">
          <span className="w-1 h-1 bg-red-400 rounded-full inline-block"></span>
          {error.message}
        </p>
      )}
    </div>
  );
};

export default PasswordInput;
