import React from 'react';

const AuthLayout = ({ children, illustration }) => {
  return (
    <div className="min-h-screen bg-slate-950 flex overflow-hidden">
      {/* Left Column - Product Branding & Visual Illustration */}
      <div className="hidden lg:block lg:w-1/2 border-r border-slate-900">
        {illustration}
      </div>

      {/* Right Column - Segmented Form Container */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center px-4 sm:px-8 py-12 relative overflow-y-auto">
        {/* Subtle background glow for responsiveness on mobile */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none block lg:hidden"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none block lg:hidden"></div>

        <div className="w-full max-w-md relative z-10">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
