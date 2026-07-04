import React, { useState, useMemo } from 'react';
import { mockEmployees } from '../../employee/data/mockEmployees';
import { mockAttendance } from '../data/mockAttendance';
import AttendanceCalendar from '../components/AttendanceCalendar';
import { Search, User, Clock, Calendar, AlertCircle } from 'lucide-react';
import { StatusBadge } from '../components/AttendanceTable';

const AttendanceProfileView = () => {
  const [searchId, setSearchId] = useState('EMP-2020-01');

  // Search selector matching employee
  const employee = useMemo(() => {
    return mockEmployees.find(e => e.id === searchId) || mockEmployees[0];
  }, [searchId]);

  // Retrieve matching attendance entries for this employee
  const employeeLogs = useMemo(() => {
    return mockAttendance.filter(log => log.employeeId === employee.id);
  }, [employee]);

  // Compute metrics summary
  const summary = useMemo(() => {
    const total = employeeLogs.length || 1;
    const present = employeeLogs.filter(l => l.status === 'Present' || l.status === 'Work From Home' || l.status === 'Late').length;
    const late = employeeLogs.filter(l => l.status === 'Late').length;
    const wfh = employeeLogs.filter(l => l.status === 'Work From Home').length;
    const leaves = employeeLogs.filter(l => l.status === 'Leave').length;
    const absents = employeeLogs.filter(l => l.status === 'Absent').length;

    return {
      rate: ((present / total) * 100).toFixed(1),
      late,
      wfh,
      leaves,
      absents,
    };
  }, [employeeLogs]);

  const initials = `${employee.firstName.charAt(0)}${employee.lastName.charAt(0)}`;

  return (
    <div className="space-y-6">
      
      {/* 1. Employee selection selector */}
      <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Inspect Employee Directory Card</h3>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">Select a staff profile to view calendar sheets</p>
        </div>

        <div className="w-full sm:w-80 relative">
          <select
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            className="block w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 font-semibold"
          >
            {mockEmployees.map(e => (
              <option key={e.id} value={e.id}>{e.firstName} {e.lastName} ({e.id})</option>
            ))}
          </select>
        </div>
      </div>

      {/* 2. Main profile layout grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        
        {/* Left Sidebar: Info Card & Calendar */}
        <div className="lg:col-span-2 space-y-6">
          
          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col md:flex-row gap-5 items-center">
            <div className="w-16 h-16 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center font-bold text-indigo-700 text-lg">
              {initials}
            </div>
            
            <div className="flex-1 text-center md:text-left space-y-1">
              <h3 className="text-base font-black text-slate-800 tracking-tight leading-none">
                {employee.firstName} {employee.lastName}
              </h3>
              <p className="text-[10px] text-slate-400 font-bold uppercase mt-0.5">{employee.designation}</p>
              <p className="text-[11px] text-slate-500 font-semibold">{employee.department}</p>
            </div>

            {/* Profile Statistics metrics */}
            <div className="grid grid-cols-3 gap-2 w-full md:w-auto text-center text-xs">
              <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl">
                <span className="text-[8px] text-slate-400 font-bold uppercase">Attendance</span>
                <p className="text-sm font-black text-emerald-600 mt-0.5">{summary.rate}%</p>
              </div>
              <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl">
                <span className="text-[8px] text-slate-400 font-bold uppercase">WFH Shifts</span>
                <p className="text-sm font-black text-blue-600 mt-0.5">{summary.wfh}</p>
              </div>
              <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl">
                <span className="text-[8px] text-slate-400 font-bold uppercase">Late Arrival</span>
                <p className="text-sm font-black text-amber-600 mt-0.5">{summary.late}</p>
              </div>
            </div>
          </div>

          {/* Details list logs */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-slate-50 bg-slate-50/50">
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Recent Logs History</h4>
            </div>
            
            <div className="overflow-x-auto max-h-[300px] overflow-y-auto">
              <table className="min-w-full divide-y divide-slate-100 text-left text-xs">
                <thead className="bg-slate-50 text-slate-400 font-bold uppercase tracking-wider">
                  <tr>
                    <th className="px-5 py-3">Date</th>
                    <th className="px-5 py-3">Check In</th>
                    <th className="px-5 py-3">Check Out</th>
                    <th className="px-5 py-3">Duration</th>
                    <th className="px-5 py-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {employeeLogs.map((log) => {
                    const datePart = log.checkIn?.split('T')[0] || '-';
                    const inPart = log.checkIn ? log.checkIn.split('T')[1] : '-';
                    const outPart = log.checkOut ? log.checkOut.split('T')[1] : '-';
                    
                    return (
                      <tr key={log.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-5 py-3 font-semibold text-slate-500">{datePart}</td>
                        <td className="px-5 py-3 font-medium">{inPart}</td>
                        <td className="px-5 py-3 font-medium">{outPart}</td>
                        <td className="px-5 py-3 font-bold text-slate-500">{log.workingHours ? `${log.workingHours} hrs` : '-'}</td>
                        <td className="px-5 py-3">
                          <StatusBadge status={log.status} />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

        </div>

        {/* Right Sidebar: Calendar display */}
        <div className="space-y-6">
          <AttendanceCalendar employeeId={employee.id} />
        </div>

      </div>

    </div>
  );
};

export default AttendanceProfileView;
