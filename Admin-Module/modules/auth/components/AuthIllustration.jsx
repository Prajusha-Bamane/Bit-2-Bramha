import React from 'react';
import { Building2, Sparkles, Shield, Clock, Landmark, BarChart4 } from 'lucide-react';

const AuthIllustration = () => {
  const highlights = [
    {
      title: 'Unified Org Management',
      desc: 'Seamless employee records, role governance, and interactive departments.',
      icon: Shield,
      color: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20'
    },
    {
      title: 'Time & Attendance Logs',
      desc: 'Automated rosters, shift patterns, geo-clocking, and real-time trackers.',
      icon: Clock,
      color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
    },
    {
      title: 'Automated Payroll Suite',
      desc: 'Accurate tax computations, direct deposits, and instant payslips.',
      icon: Landmark,
      color: 'bg-amber-500/10 text-amber-400 border-amber-500/20'
    },
    {
      title: 'Business Intelligence',
      desc: 'Granular workforce analytics, charts, predictive turnover metrics.',
      icon: BarChart4,
      color: 'bg-sky-500/10 text-sky-400 border-sky-500/20'
    }
  ];

  return (
    <div className="relative hidden lg:flex flex-col justify-between p-12 overflow-hidden h-full">
      {/* Background Gradient & Animated Orbs */}
      <div className="absolute inset-0 bg-slate-950">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/40 via-slate-950 to-emerald-950/20"></div>
        {/* Dynamic Orbs */}
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-indigo-500/15 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute -bottom-40 right-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px] animate-pulse duration-5000"></div>
      </div>

      <div className="relative z-10">
        {/* Logo and Brand */}
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-gradient-to-tr from-indigo-600 to-indigo-400 rounded-2xl shadow-lg shadow-indigo-500/30 text-white border border-indigo-300/20">
            <Building2 className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-xl font-black text-white tracking-wider font-sans flex items-center gap-1.5">
              AURA <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">HRMS</span>
            </h1>
            <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Enterprise Suite</p>
          </div>
        </div>

        {/* Product Heading & Description */}
        <div className="mt-16 max-w-lg">
          <h2 className="text-4xl font-extrabold text-white tracking-tight leading-tight font-sans">
            The intelligent center for <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-sky-300 to-emerald-400">your workforce.</span>
          </h2>
          <p className="mt-4 text-slate-400 text-sm leading-relaxed font-sans font-medium">
            Manage payroll, coordinate leaves, log work hours, and derive powerful analytics inside a single, highly integrated corporate dashboard.
          </p>
        </div>
      </div>

      {/* Interactive CSS Dashboard Illustration Placeholder */}
      <div className="relative z-10 my-8 mx-auto w-full max-w-md bg-slate-900/60 border border-slate-800/80 rounded-2xl p-5 shadow-2xl backdrop-blur-md">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-rose-500/70"></span>
            <span className="w-3 h-3 rounded-full bg-amber-500/70"></span>
            <span className="w-3 h-3 rounded-full bg-emerald-500/70"></span>
          </div>
          <span className="text-[10px] font-bold text-slate-500 font-mono tracking-widest uppercase">Live Pulse Monitoring</span>
        </div>

        <div className="space-y-3.5">
          <div className="flex items-center justify-between bg-slate-950/50 p-3 rounded-xl border border-slate-850">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-600 to-indigo-400 flex items-center justify-center text-xs font-bold text-white shadow-inner">
                JD
              </div>
              <div>
                <p className="text-xs font-bold text-slate-200">Jane Doe</p>
                <p className="text-[10px] text-slate-500">Engineering</p>
              </div>
            </div>
            <span className="text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full">
              Clocked In
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-slate-950/30 p-3 rounded-xl border border-slate-850">
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Attendance Rate</span>
              <p className="text-lg font-bold text-slate-200 mt-0.5">98.4%</p>
            </div>
            <div className="bg-slate-950/30 p-3 rounded-xl border border-slate-850">
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Open Leaves</span>
              <p className="text-lg font-bold text-slate-200 mt-0.5">14 Requests</p>
            </div>
          </div>
        </div>
      </div>

      {/* Feature list */}
      <div className="relative z-10">
        <div className="grid grid-cols-2 gap-4 border-t border-slate-900 pt-8">
          {highlights.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="flex gap-3">
                <div className={`p-2.5 h-10 w-10 flex items-center justify-center rounded-xl border flex-shrink-0 mt-0.5 ${item.color}`}>
                  <Icon className="h-4.5 w-4.5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white font-sans">{item.title}</h4>
                  <p className="text-[10px] text-slate-400 leading-normal font-sans mt-0.5">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer Branding */}
      <div className="relative z-10 border-t border-slate-900/60 pt-6 mt-8 flex items-center justify-between text-[11px] text-slate-500 font-sans">
        <span>© 2026 Aura Systems Inc.</span>
        <span className="flex items-center gap-1">
          <Sparkles className="h-3 w-3 text-indigo-400" />
          ISO 27001 Certified
        </span>
      </div>
    </div>
  );
};

export default AuthIllustration;
