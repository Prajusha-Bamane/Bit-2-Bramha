import React from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import StatusBadge from './StatusBadge';

const LeaveHistoryTable = ({ records, search, onSearchChange, statusFilter, onStatusChange, typeFilter, onTypeChange, dateFilter, onDateChange, onSelectLeave }) => {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white shadow-sm">
      <div className="flex flex-col gap-4 border-b border-slate-200 p-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">My Leave Requests</p>
          <h3 className="mt-1 text-xl font-semibold text-slate-900">Leave history</h3>
        </div>
        <div className="flex flex-col gap-2 md:flex-row md:items-center">
          <div className="flex items-center rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-500">
            <Search className="mr-2 h-4 w-4" />
            <input value={search} onChange={(event) => onSearchChange(event.target.value)} placeholder="Search leave" className="w-full bg-transparent outline-none" />
          </div>
          <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-500">
            <SlidersHorizontal className="h-4 w-4" />
            <select value={statusFilter} onChange={(event) => onStatusChange(event.target.value)} className="bg-transparent outline-none">
              <option value="All">Status</option>
              <option value="Approved">Approved</option>
              <option value="Pending">Pending</option>
              <option value="Rejected">Rejected</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
          <select value={typeFilter} onChange={(event) => onTypeChange(event.target.value)} className="rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-500 outline-none">
            <option value="All">Type</option>
            <option value="Casual Leave">Casual Leave</option>
            <option value="Sick Leave">Sick Leave</option>
            <option value="Earned Leave">Earned Leave</option>
            <option value="Work From Home">Work From Home</option>
            <option value="Compensatory Off">Compensatory Off</option>
            <option value="Emergency Leave">Emergency Leave</option>
          </select>
          <select value={dateFilter} onChange={(event) => onDateChange(event.target.value)} className="rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-500 outline-none">
            <option value="All">All dates</option>
            <option value="This Month">This Month</option>
            <option value="Last Month">Last Month</option>
            <option value="Past Year">Past Year</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200 text-sm">
          <thead className="bg-slate-50 text-left text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            <tr>
              <th className="px-4 py-3">Request ID</th>
              <th className="px-4 py-3">Leave Type</th>
              <th className="px-4 py-3">Start Date</th>
              <th className="px-4 py-3">End Date</th>
              <th className="px-4 py-3">Duration</th>
              <th className="px-4 py-3">Reason</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Applied</th>
              <th className="px-4 py-3">Manager</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white">
            {records.map((record) => (
              <tr key={record.id} className="cursor-pointer transition-colors hover:bg-slate-50" onClick={() => onSelectLeave(record)}>
                <td className="px-4 py-4 font-semibold text-slate-700">{record.id}</td>
                <td className="px-4 py-4 text-slate-600">{record.leaveType}</td>
                <td className="px-4 py-4 text-slate-600">{record.startDate}</td>
                <td className="px-4 py-4 text-slate-600">{record.endDate}</td>
                <td className="px-4 py-4 text-slate-600">{record.duration} day{record.duration > 1 ? 's' : ''}</td>
                <td className="px-4 py-4 text-slate-600">{record.reason}</td>
                <td className="px-4 py-4"><StatusBadge status={record.status} /></td>
                <td className="px-4 py-4 text-slate-600">{record.appliedDate}</td>
                <td className="px-4 py-4 text-slate-600">{record.manager}</td>
                <td className="px-4 py-4 text-slate-600">View</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-between border-t border-slate-200 p-4 text-sm text-slate-500">
        <span>Showing {records.length} requests</span>
        <div className="flex items-center gap-2">
          <button className="rounded-full border border-slate-200 px-3 py-1">Previous</button>
          <button className="rounded-full bg-slate-900 px-3 py-1 text-white">1</button>
          <button className="rounded-full border border-slate-200 px-3 py-1">2</button>
          <button className="rounded-full border border-slate-200 px-3 py-1">Next</button>
        </div>
      </div>
    </div>
  );
};

export default LeaveHistoryTable;
