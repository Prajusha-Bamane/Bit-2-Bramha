import React, { useState } from 'react';
import LeaveDashboard from '../components/LeaveDashboard';
import LeaveTable from '../components/LeaveTable';
import LeaveCalendar from '../components/LeaveCalendar';
import LeaveForm from '../components/LeaveForm';
import LeaveDetails from './LeaveDetails';
import { HolidayTable } from '../components/WorkflowWidgets';
import { mockLeaves } from '../data/mockLeaves';
import { mockEmployees } from '../../employee/data/mockEmployees';
import { LayoutDashboard, FileSpreadsheet, PlusCircle, CalendarDays } from 'lucide-react';

const LeaveContainer = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedLeave, setSelectedLeave] = useState(null);

  // Apply leave submit handler
  const handleApplySubmit = (data) => {
    // Find matching employee details
    const emp = mockEmployees.find(e => e.id === data.employeeId) || mockEmployees[0];
    
    // Calculate duration in days
    const start = new Date(data.startDate);
    const end = new Date(data.endDate);
    const duration = Math.max(1, Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1);

    const newRecord = {
      id: `LEV-${(mockLeaves.length + 1).toString().padStart(4, '0')}`,
      employeeId: data.employeeId,
      firstName: emp.firstName,
      lastName: emp.lastName,
      department: emp.department,
      designation: emp.designation,
      leaveType: data.leaveType,
      startDate: data.startDate,
      endDate: data.endDate,
      duration,
      halfDay: data.halfDay,
      reason: data.reason,
      status: 'Pending',
      approver: '-',
      requestedOn: new Date().toISOString().split('T')[0],
      comments: data.comments || '',
      emergencyPhone: data.emergencyPhone,
    };

    mockLeaves.unshift(newRecord); // Place on top
    alert(`Leave application submitted successfully! Duration computed: ${duration} days.`);
    setActiveTab('directory');
  };

  const handleApprove = (id) => {
    const idx = mockLeaves.findIndex(l => l.id === id);
    if (idx !== -1) {
      mockLeaves[idx].status = 'Approved';
      mockLeaves[idx].approver = 'System Admin (HR)';
      mockLeaves[idx].comments = 'Approved automatically by Admin Review override';
      alert(`Leave request ${id} approved.`);
      setSelectedLeave(null);
    }
  };

  const handleReject = (id) => {
    const idx = mockLeaves.findIndex(l => l.id === id);
    if (idx !== -1) {
      mockLeaves[idx].status = 'Rejected';
      mockLeaves[idx].approver = 'System Admin (HR)';
      mockLeaves[idx].comments = 'Rejected due to operational constraints';
      alert(`Leave request ${id} rejected.`);
      setSelectedLeave(null);
    }
  };

  return (
    <div className="space-y-6 pb-12">
      
      {/* 1. Header controls */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-850 tracking-tight font-sans">Leave Management</h1>
          <p className="text-xs text-slate-500 mt-0.5">Submit applications, audit timesheets, and approve time-off requests.</p>
        </div>

        {/* Tab switchers */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl self-start md:self-auto border border-slate-200/50">
          <button
            onClick={() => { setActiveTab('dashboard'); setSelectedLeave(null); }}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'dashboard' ? 'bg-white text-primary shadow-sm' : 'text-slate-550 hover:text-slate-850'
            }`}
          >
            <LayoutDashboard className="h-4 w-4" />
            Dashboard
          </button>
          <button
            onClick={() => { setActiveTab('apply'); setSelectedLeave(null); }}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'apply' ? 'bg-white text-primary shadow-sm' : 'text-slate-550 hover:text-slate-850'
            }`}
          >
            <PlusCircle className="h-4 w-4" />
            Apply Leave
          </button>
          <button
            onClick={() => { setActiveTab('directory'); setSelectedLeave(null); }}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'directory' ? 'bg-white text-primary shadow-sm' : 'text-slate-550 hover:text-slate-850'
            }`}
          >
            <FileSpreadsheet className="h-4 w-4" />
            Requests
          </button>
          <button
            onClick={() => { setActiveTab('calendar'); setSelectedLeave(null); }}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'calendar' ? 'bg-white text-primary shadow-sm' : 'text-slate-550 hover:text-slate-850'
            }`}
          >
            <CalendarDays className="h-4 w-4" />
            Calendar
          </button>
        </div>
      </div>

      {/* 2. Main Viewport routing */}
      <div className="space-y-6">
        
        {activeTab === 'dashboard' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
            <div className="lg:col-span-2 space-y-6">
              <LeaveDashboard />
            </div>
            <div className="space-y-6">
              <HolidayTable />
            </div>
          </div>
        )}

        {activeTab === 'apply' && (
          <LeaveForm 
            onSubmit={handleApplySubmit} 
            onCancel={() => setActiveTab('dashboard')} 
          />
        )}

        {activeTab === 'directory' && (
          <>
            {selectedLeave ? (
              <LeaveDetails 
                leave={selectedLeave} 
                onBack={() => setSelectedLeave(null)} 
                onApprove={handleApprove}
                onReject={handleReject}
                showActions={true}
              />
            ) : (
              <LeaveTable 
                leaves={mockLeaves} 
                onViewDetails={(log) => setSelectedLeave(log)}
                onApprove={handleApprove}
                onReject={handleReject}
              />
            )}
          </>
        )}

        {activeTab === 'calendar' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
            <div className="lg:col-span-2">
              <LeaveCalendar />
            </div>
            <div className="space-y-6">
              <HolidayTable />
            </div>
          </div>
        )}

      </div>

    </div>
  );
};

export default LeaveContainer;
