import React, { useMemo, useRef, useState } from 'react';
import { BriefcaseBusiness, FileText, Sparkles } from 'lucide-react';
import LeaveHeader from '../components/leave/LeaveHeader';
import LeaveSummary from '../components/leave/LeaveSummary';
import LeaveBalanceCard from '../components/leave/LeaveBalanceCard';
import LeaveForm from '../components/leave/LeaveForm';
import LeaveHistoryTable from '../components/leave/LeaveHistoryTable';
import LeaveCalendar from '../components/leave/LeaveCalendar';
import LeaveAnalytics from '../components/leave/LeaveAnalytics';
import ApprovalTimeline from '../components/leave/ApprovalTimeline';
import HolidayList from '../components/leave/HolidayList';
import QuickActions from '../components/leave/QuickActions';
import ActivityTimeline from '../components/leave/ActivityTimeline';
import { companyHolidays, employeeLeaveBalances, recentActivities, mockLeaveRequests } from '../data/mockLeaveData';
import { employeeLeaveService } from '../services/employeeLeaveService';

const EmployeeLeavePage = () => {
  const [records, setRecords] = useState(mockLeaveRequests);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');
  const [dateFilter, setDateFilter] = useState('All');
  const [selectedLeave, setSelectedLeave] = useState(mockLeaveRequests[0]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formSectionRef = useRef(null);
  const calendarSectionRef = useRef(null);

  const filteredRecords = useMemo(() => {
    const term = search.toLowerCase();
    return records.filter((record) => {
      const matchesSearch = [record.id, record.leaveType, record.reason, record.manager].join(' ').toLowerCase().includes(term);
      const matchesStatus = statusFilter === 'All' || record.status === statusFilter;
      const matchesType = typeFilter === 'All' || record.leaveType === typeFilter;
      const matchesDate = (() => {
        if (dateFilter === 'All') return true;
        const recordDate = new Date(record.startDate);
        const now = new Date();
        if (dateFilter === 'This Month') {
          return recordDate.getMonth() === now.getMonth();
        }
        if (dateFilter === 'Last Month') {
          return recordDate.getMonth() === now.getMonth() - 1;
        }
        return recordDate.getFullYear() < now.getFullYear();
      })();
      return matchesSearch && matchesStatus && matchesType && matchesDate;
    });
  }, [records, search, statusFilter, typeFilter, dateFilter]);

  const handleSubmit = async (values) => {
    setIsSubmitting(true);
    const created = await employeeLeaveService.createLeaveRequest({
      ...values,
      duration: Math.max(1, Math.round((new Date(values.endDate) - new Date(values.startDate)) / 86400000) + 1),
      startDate: values.startDate,
      endDate: values.endDate,
      leaveType: values.leaveType,
      manager: values.manager,
      reason: values.reason,
      emergencyContact: values.emergencyContact,
      comments: values.comments,
      documentPlaceholder: 'Pending upload',
      timeline: [
        { label: 'Applied', timestamp: values.startDate },
        { label: 'Manager Review', timestamp: 'Pending' },
        { label: 'HR Review', timestamp: 'Pending' },
        { label: 'Approved', timestamp: 'Pending' },
      ],
    });

    setRecords((current) => [created, ...current]);
    setSelectedLeave(created);
    setIsSubmitting(false);
    formSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleCancelLeave = async () => {
    if (!selectedLeave || selectedLeave.status !== 'Pending') return;
    const cancelled = await employeeLeaveService.updateLeaveRequest(selectedLeave.id, { ...selectedLeave, status: 'Cancelled' });
    setRecords((current) => current.map((item) => (item.id === selectedLeave.id ? cancelled : item)));
    setSelectedLeave(cancelled);
  };

  const handleDownloadHistory = () => {
    const csv = ['Request ID,Leave Type,Status', ...filteredRecords.map((record) => `${record.id},${record.leaveType},${record.status}`)].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'employee-leave-history.csv');
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleApplyLeave = () => {
    formSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleViewCalendar = () => {
    calendarSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="space-y-6">
      <LeaveHeader />
      <LeaveSummary />

      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {Object.entries(employeeLeaveBalances).map(([key, value], index) => {
            const labels = {
              casualLeave: 'Casual Leave',
              sickLeave: 'Sick Leave',
              earnedLeave: 'Earned Leave',
              workFromHome: 'Work From Home',
              compensatoryOff: 'Compensatory Off',
              emergencyLeave: 'Emergency Leave',
            };
            const colors = ['emerald', 'sky', 'amber', 'violet', 'rose', 'slate'];
            return (
              <LeaveBalanceCard
                key={key}
                title={labels[key]}
                available={value.available}
                used={value.used}
                remaining={value.remaining}
                color={colors[index]}
              />
            );
          })}
        </div>
        <div className="space-y-6">
          <QuickActions onApply={handleApplyLeave} onCancel={handleCancelLeave} onDownload={handleDownloadHistory} onCalendar={handleViewCalendar} />
          <ActivityTimeline activities={recentActivities} />
        </div>
      </div>

      <div ref={formSectionRef} className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <LeaveForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
        <div ref={calendarSectionRef} className="space-y-6">
          <LeaveCalendar records={records} />
          <HolidayList holidays={companyHolidays} />
        </div>
      </div>

      <LeaveAnalytics />

      <div className="grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
        <LeaveHistoryTable
          records={filteredRecords}
          search={search}
          onSearchChange={setSearch}
          statusFilter={statusFilter}
          onStatusChange={setStatusFilter}
          typeFilter={typeFilter}
          onTypeChange={setTypeFilter}
          dateFilter={dateFilter}
          onDateChange={setDateFilter}
          onSelectLeave={setSelectedLeave}
        />
        <div className="space-y-6">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">Leave details</p>
                <h3 className="mt-1 text-xl font-semibold text-slate-900">{selectedLeave?.id}</h3>
              </div>
              <div className="rounded-full bg-slate-100 p-2 text-slate-700">
                <FileText className="h-5 w-5" />
              </div>
            </div>
            <div className="mt-6 space-y-4 text-sm text-slate-600">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="font-semibold text-slate-800">Employee information</p>
                <p className="mt-2">Asha Verma</p>
                <p>Senior Product Designer · EMP-1087</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="font-semibold text-slate-800">Leave information</p>
                <p className="mt-2">{selectedLeave?.leaveType}</p>
                <p>{selectedLeave?.startDate} to {selectedLeave?.endDate}</p>
                <p>Duration: {selectedLeave?.duration} day{selectedLeave?.duration > 1 ? 's' : ''}</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="font-semibold text-slate-800">Reason & comments</p>
                <p className="mt-2">{selectedLeave?.reason}</p>
                <p className="mt-2 text-slate-500">{selectedLeave?.comments}</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="font-semibold text-slate-800">Approver</p>
                <p className="mt-2">{selectedLeave?.manager} · {selectedLeave?.approver}</p>
              </div>
            </div>
          </div>
          <ApprovalTimeline timeline={selectedLeave?.timeline || []} status={selectedLeave?.status} />
          <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center text-sm text-slate-500">
            <BriefcaseBusiness className="mx-auto h-8 w-8 text-slate-400" />
            <p className="mt-3 font-semibold text-slate-700">Supporting document placeholder</p>
            <p className="mt-2">This area will be connected to your future document upload workflow.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeLeavePage;
