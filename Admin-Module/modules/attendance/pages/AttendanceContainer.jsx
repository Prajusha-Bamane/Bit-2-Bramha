import React, { useState } from 'react';
import AttendanceDashboard from '../components/AttendanceDashboard';
import AttendanceTable from '../components/AttendanceTable';
import AttendanceProfileView from './AttendanceProfileView';
import ClockWidget from '../components/ClockWidget';
import TimelineWidgets from '../components/TimelineWidgets';
import { mockAttendance } from '../data/mockAttendance';
import { LayoutDashboard, List, UserCheck } from 'lucide-react';

const AttendanceContainer = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="space-y-6 pb-12">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-850 tracking-tight font-sans">Attendance Registers</h1>
          <p className="text-xs text-slate-500 mt-0.5">Track daily check-ins, manage timesheet logs, and inspect individual calendars.</p>
        </div>

        {/* Sub-tab switcher */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl self-start md:self-auto border border-slate-200/50">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'dashboard' ? 'bg-white text-primary shadow-sm' : 'text-slate-550 hover:text-slate-850'
            }`}
          >
            <LayoutDashboard className="h-4 w-4" />
            Dashboard
          </button>
          <button
            onClick={() => setActiveTab('logs')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'logs' ? 'bg-white text-primary shadow-sm' : 'text-slate-550 hover:text-slate-850'
            }`}
          >
            <List className="h-4 w-4" />
            Logs Directory
          </button>
          <button
            onClick={() => setActiveTab('profile')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'profile' ? 'bg-white text-primary shadow-sm' : 'text-slate-550 hover:text-slate-850'
            }`}
          >
            <UserCheck className="h-4 w-4" />
            Staff Profiler
          </button>
        </div>
      </div>

      {/* Rendering Active Tab */}
      <div className="space-y-6">
        {activeTab === 'dashboard' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
            {/* Center Area metrics & Recharts */}
            <div className="lg:col-span-2 space-y-6">
              <AttendanceDashboard />
            </div>

            {/* Sidebar shift clocks and updates */}
            <div className="space-y-6">
              <ClockWidget />
              <TimelineWidgets />
            </div>
          </div>
        )}

        {activeTab === 'logs' && (
          <AttendanceTable logs={mockAttendance} />
        )}

        {activeTab === 'profile' && (
          <AttendanceProfileView />
        )}
      </div>

    </div>
  );
};

export default AttendanceContainer;
