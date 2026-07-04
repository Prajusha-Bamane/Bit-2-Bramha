import React, { useState } from 'react';
import ReportsDashboard from '../components/ReportsDashboard';
import EmployeeChart from '../components/EmployeeChart';
import AttendanceChart from '../components/AttendanceChart';
import LeaveChart from '../components/LeaveChart';
import PayrollChart from '../components/PayrollChart';
import FilterSidebar from '../components/FilterSidebar';
import ExportCard from '../components/ExportCard';
import { 
  BarChart, 
  Users, 
  CalendarDays, 
  FileSpreadsheet, 
  Banknote, 
  Download 
} from 'lucide-react';

const ReportsContainer = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [currentFilters, setCurrentFilters] = useState(null);

  const handleApplyFilters = (filters) => {
    setCurrentFilters(filters);
    alert(`Applied report filters: Department: ${filters.dept || 'All'}, Time Range: ${filters.range || 'Default'}`);
  };

  const handleResetFilters = () => {
    setCurrentFilters(null);
    alert('Reset report filters to baseline cycles.');
  };

  return (
    <div className="space-y-6 pb-12">
      
      {/* 1. Header controls */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 no-print">
        <div>
          <h1 className="text-2xl font-black text-slate-850 tracking-tight font-sans">Reports & Analytics</h1>
          <p className="text-xs text-slate-500 mt-0.5">Inspect company growth trends, audit overtime hours, and compile tax deduction logs.</p>
        </div>

        {/* Tab switchers */}
        <div className="flex flex-wrap items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200/50">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1 cursor-pointer ${
              activeTab === 'dashboard' ? 'bg-white text-primary shadow-sm' : 'text-slate-550 hover:text-slate-850'
            }`}
          >
            <BarChart className="h-3.5 w-3.5" />
            Dashboard
          </button>
          <button
            onClick={() => setActiveTab('employee')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1 cursor-pointer ${
              activeTab === 'employee' ? 'bg-white text-primary shadow-sm' : 'text-slate-550 hover:text-slate-850'
            }`}
          >
            <Users className="h-3.5 w-3.5" />
            Employees
          </button>
          <button
            onClick={() => setActiveTab('attendance')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1 cursor-pointer ${
              activeTab === 'attendance' ? 'bg-white text-primary shadow-sm' : 'text-slate-550 hover:text-slate-850'
            }`}
          >
            <CalendarDays className="h-3.5 w-3.5" />
            Attendance
          </button>
          <button
            onClick={() => setActiveTab('leave')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1 cursor-pointer ${
              activeTab === 'leave' ? 'bg-white text-primary shadow-sm' : 'text-slate-550 hover:text-slate-850'
            }`}
          >
            <FileSpreadsheet className="h-3.5 w-3.5" />
            Leaves
          </button>
          <button
            onClick={() => setActiveTab('payroll')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1 cursor-pointer ${
              activeTab === 'payroll' ? 'bg-white text-primary shadow-sm' : 'text-slate-550 hover:text-slate-850'
            }`}
          >
            <Banknote className="h-3.5 w-3.5" />
            Payroll
          </button>
          <button
            onClick={() => setActiveTab('export')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1 cursor-pointer ${
              activeTab === 'export' ? 'bg-white text-primary shadow-sm' : 'text-slate-550 hover:text-slate-850'
            }`}
          >
            <Download className="h-3.5 w-3.5" />
            Export Center
          </button>
        </div>
      </div>

      {/* 2. Page layout columns */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        
        {/* Left Side: Sub-tab Visual Content */}
        <div className="lg:col-span-3 space-y-6">
          {activeTab === 'dashboard' && <ReportsDashboard />}
          {activeTab === 'employee' && <EmployeeChart />}
          {activeTab === 'attendance' && <AttendanceChart />}
          {activeTab === 'leave' && <LeaveChart />}
          {activeTab === 'payroll' && <PayrollChart />}
          {activeTab === 'export' && <ExportCard />}
        </div>

        {/* Right Side: Filters Sidebar & Export Shortcut */}
        <div className="space-y-6 no-print">
          <FilterSidebar 
            onApply={handleApplyFilters} 
            onReset={handleResetFilters} 
          />
          {activeTab !== 'export' && <ExportCard />}
        </div>

      </div>

    </div>
  );
};

export default ReportsContainer;
