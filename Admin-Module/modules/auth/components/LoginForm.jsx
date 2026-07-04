import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Mail, HelpCircle } from 'lucide-react';
import PasswordInput from './PasswordInput';

const loginSchema = z.object({
  email: z.string().trim().min(1, 'Employee ID / Email is required'),
  password: z.string().min(6, 'Password must be at least 6 characters.'),
  rememberMe: z.boolean().optional(),
});

const LoginForm = ({ role, onSubmit, isLoading, apiError }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  const buttonAccentClass = role === 'Admin'
    ? 'bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 shadow-indigo-900/30'
    : 'bg-emerald-600 hover:bg-emerald-700 focus:ring-emerald-500 shadow-emerald-900/30';

  return (
    <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
      {/* API Exception Error Notice */}
      {apiError && (
        <div className="bg-red-950/20 border border-red-500/20 p-4 rounded-xl flex items-start gap-3">
          <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2 flex-shrink-0 animate-ping"></div>
          <div className="text-xs text-red-300 font-medium font-sans">
            {apiError}
          </div>
        </div>
      )}

      {/* Employee ID / Email field */}
      <div>
        <label htmlFor="email" className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 font-sans">
          Employee ID / Corporate Email
        </label>
        <div className="relative rounded-xl shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
            <Mail className="h-4.5 w-4.5" />
          </div>
          <input
            id="email"
            type="text"
            autoComplete="username"
            className={`block w-full pl-10 pr-3.5 py-3 bg-slate-900 border ${
              errors.email ? 'border-red-500/80 focus:ring-red-500' : 'border-slate-800 focus:ring-indigo-500'
            } rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 text-sm`}
            placeholder="e.g. admin@hrms.com"
            {...register('email')}
          />
        </div>
        {errors.email && (
          <p className="mt-1.5 text-xs text-red-400 font-medium font-sans flex items-center gap-1.5">
            <span className="w-1 h-1 bg-red-400 rounded-full inline-block"></span>
            {errors.email.message}
          </p>
        )}
      </div>

      {/* Password field */}
      <div>
        <label htmlFor="password" className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 font-sans">
          Password
        </label>
        <PasswordInput
          id="password"
          placeholder="••••••••"
          error={errors.password}
          registerProps={register('password')}
        />
      </div>

      {/* Remember Me and Forgot Password Placeholders */}
      <div className="flex items-center justify-between pt-1">
        <label className="flex items-center gap-2 cursor-pointer group select-none">
          <input
            type="checkbox"
            className="w-4 h-4 rounded border-slate-850 bg-slate-900 text-indigo-600 focus:ring-indigo-500 focus:ring-offset-slate-900"
            {...register('rememberMe')}
          />
          <span className="text-xs text-slate-400 group-hover:text-slate-350 transition-colors duration-150 font-sans">
            Remember me
          </span>
        </label>
        
        <button
          type="button"
          onClick={() => alert("Password recovery details have been routed to corporate security. Please contact HR.")}
          className="text-xs text-slate-400 hover:text-slate-200 transition-colors duration-150 flex items-center gap-1 cursor-pointer font-sans"
        >
          <HelpCircle className="h-3.5 w-3.5 text-slate-500" />
          Forgot Password?
        </button>
      </div>

      {/* Submit Button */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full flex justify-center items-center py-3.5 px-4 border border-transparent rounded-xl shadow-lg text-sm font-bold text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-950 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.01] active:scale-[0.99] ${buttonAccentClass}`}
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Verifying Profile...</span>
            </div>
          ) : (
            `Login as ${role === 'Admin' ? 'Administrator' : 'Employee'}`
          )}
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
