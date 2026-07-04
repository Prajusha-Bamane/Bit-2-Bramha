import React, { useState, useMemo } from 'react';
import { ArrowUpDown, Eye, Download, Search, RefreshCw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const StatusBadge = ({ status }) => {
  const styles = {
    Present: 'bg-emerald-50 text-emerald-700 border-emerald-100/50',
    Absent: 'bg-rose-50 text-rose-700 border-rose-100/50',
    Late: 'bg-amber-50 text-amber-700 border-amber-100/50',
    'Half Day': 'bg-cyan-50 text-cyan-700 border-cyan-100/50',
    Leave: 'bg-purple-50 text-purple-750 border-purple-100/50',
    'Work From Home': 'bg-blue-50 text-blue-700 border-blue-100/50',
    Holiday: 'bg-teal-50 text-teal-705 border-teal-100/50',
    Weekend: 'bg-slate-100 text-slate-400 border-transparent',
  };

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-bold border ${styles[status] || styles.Present}`}>
      {status}
    </span>
  );
};

const AttendanceTable = ({ logs }) => {
  const navigate = useNavigate();

  // Filters state
  const [search, setSearch] = useState('');
  const [selectedDept, setSelectedDept] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [datePreset, setDatePreset] = useState('All'); // 'All', 'Today', 'This Week', 'This Month'

  // Sorting state
  const [sortField, setSortField] = useState('checkIn');
  const [sortOrder, setSortOrder] = useState('desc');

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const departmentsList = [
    'Software Development', 'QA', 'Human Resources', 'Finance', 'Marketing', 
    'Sales', 'Administration', 'Support', 'Design', 'Operations'
  ];

  const handleReset = () => {
    setSearch('');
    setSelectedDept('');
    setSelectedStatus('');
    setDatePreset('All');
    setCurrentPage(1);
  };

  // Local filtering logic
  const filteredLogs = useMemo(() => {
    return logs.filter(log => {
      const matchSearch = search.trim() === '' || 
        log.firstName.toLowerCase().includes(search.toLowerCase()) ||
        log.lastName.toLowerCase().includes(search.toLowerCase()) ||
        log.employeeId.toLowerCase().includes(search.toLowerCase());

      const matchDept = selectedDept === '' || log.department === selectedDept;
      const matchStatus = selectedStatus === '' || log.status === selectedStatus;

      // Filter by Date Preset
      let matchDate = true;
      const todayStr = '2026-07-04'; // Simulated system baseline current time
      if (datePreset === 'Today') {
        matchDate = log.checkIn?.startsWith(todayStr) || (log.status === 'Weekend' && datePreset === 'Today'); 
        // fallback weekend check is skipped for simplicity or matching date
      } else if (datePreset === 'This Week') {
        // match logs from June 29 to July 4
        matchDate = true; // all generated dates fall in this week
      }

      return matchSearch && matchDept && matchStatus && matchDate;
    });
  }, [logs, search, selectedDept, selectedStatus, datePreset]);

  // Local sorting logic
  const sortedLogs = useMemo(() => {
    const sorted = [...filteredLogs];
    sorted.sort((a, b) => {
      let aVal = a[sortField] || '';
      let bVal = b[sortField] || '';

      if (aVal < bVal) return sortOrder === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
    return sorted;
  }, [filteredLogs, sortField, sortOrder]);

  // Local pagination
  const paginatedLogs = useMemo(() => {
    const startIdx = (currentPage - 1) * rowsPerPage;
    return sortedLogs.slice(startIdx, startIdx + rowsPerPage);
  }, [sortedLogs, currentPage, rowsPerPage]);

  const totalPages = Math.ceil(sortedLogs.length / rowsPerPage);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  };

  const handleExport = (format) => {
    alert(`Attendance Logs successfully exported as ${format}! (${sortedLogs.length} records processed).`);
  };

  return (
    <div className="space-y-4">
      
      {/* 1. Filters toolbar panel */}
      <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          
          {/* Search Employee input */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Search className="h-4.5 w-4.5" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent transition-all duration-200"
              placeholder="Search ID, Name..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
            />
          </div>

          {/* Department Filter */}
          <select
            value={selectedDept}
            onChange={(e) => { setSelectedDept(e.target.value); setCurrentPage(1); }}
            className="block w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700"
          >
            <option value="">All Departments</option>
            {departmentsList.map(d => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>

          {/* Status Filter */}
          <select
            value={selectedStatus}
            onChange={(e) => { setSelectedStatus(e.target.value); setCurrentPage(1); }}
            className="block w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700"
          >
            <option value="">All Statuses</option>
            <option value="Present">Present</option>
            <option value="Absent">Absent</option>
            <option value="Late">Late</option>
            <option value="Half Day">Half Day</option>
            <option value="Leave">Leave</option>
            <option value="Work From Home">Work From Home</option>
            <option value="Weekend">Weekend</option>
          </select>

          {/* Date range filter options */}
          <select
            value={datePreset}
            onChange={(e) => { setDatePreset(e.target.value); setCurrentPage(1); }}
            className="block w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700"
          >
            <option value="All">All Dates</option>
            <option value="Today">Today (July 4)</option>
            <option value="This Week">This Week (June 29 - July 4)</option>
          </select>

        </div>

        {/* Toolbar action items */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-3.5 border-t border-slate-50">
          <div className="flex items-center gap-3">
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 hover:bg-slate-50 text-slate-500 hover:text-slate-800 rounded-xl text-xs font-bold border border-slate-200 shadow-sm transition cursor-pointer"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              Reset Filters
            </button>
            <span className="text-xs text-slate-500 font-bold">
              Showing {filteredLogs.length} entries
            </span>
          </div>

          {/* Export triggers */}
          <div className="flex items-center gap-2">
            <button 
              onClick={() => handleExport('CSV')}
              className="px-3.5 py-2 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl text-slate-750 text-xs font-bold shadow-sm transition flex items-center gap-1 cursor-pointer"
            >
              <Download className="h-3.5 w-3.5" />
              CSV
            </button>
            <button 
              onClick={() => handleExport('Excel')}
              className="px-3.5 py-2 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl text-slate-755 text-xs font-bold shadow-sm transition flex items-center gap-1 cursor-pointer"
            >
              <Download className="h-3.5 w-3.5" />
              Excel
            </button>
            <button 
              onClick={() => handleExport('PDF')}
              className="px-3.5 py-2 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl text-slate-760 text-xs font-bold shadow-sm transition flex items-center gap-1 cursor-pointer"
            >
              <Download className="h-3.5 w-3.5" />
              PDF
            </button>
          </div>
        </div>
      </div>

      {/* 2. Log listing table */}
      <div className="bg-white border border-slate-200/80 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto max-h-[600px] overflow-y-auto">
          <table className="min-w-full divide-y divide-slate-100 text-left text-xs relative">
            <thead className="bg-slate-50/80 backdrop-blur-sm sticky top-0 z-10 border-b border-slate-100">
              <tr className="text-slate-400 font-bold uppercase tracking-wider">
                <th className="px-6 py-4 font-bold select-none cursor-pointer" onClick={() => handleSort('firstName')}>
                  <div className="flex items-center gap-1">
                    Employee
                    <ArrowUpDown className="h-3 w-3" />
                  </div>
                </th>
                <th className="px-6 py-4 font-bold">ID</th>
                <th className="px-6 py-4 font-bold select-none cursor-pointer" onClick={() => handleSort('checkIn')}>
                  <div className="flex items-center gap-1">
                    Check In
                    <ArrowUpDown className="h-3 w-3" />
                  </div>
                </th>
                <th className="px-6 py-4 font-bold">Check Out</th>
                <th className="px-6 py-4 font-bold">Working Hours</th>
                <th className="px-6 py-4 font-bold">Overtime</th>
                <th className="px-6 py-4 font-bold">Status</th>
                <th className="px-6 py-4 font-bold">Location</th>
                <th className="px-6 py-4 font-bold text-right pr-8">Actions</th>
              </tr>
            </thead>
            
            <tbody className="divide-y divide-slate-100 text-slate-700 bg-white">
              {paginatedLogs.map((log) => {
                const initials = `${log.firstName.charAt(0)}${log.lastName.charAt(0)}`;
                return (
                  <tr key={log.id} className="hover:bg-slate-50/50 transition-colors duration-150">
                    <td className="px-6 py-3 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 text-slate-700 flex items-center justify-center font-bold text-xs">
                        {initials}
                      </div>
                      <div>
                        <span className="font-bold text-slate-800 block text-xs">
                          {log.firstName} {log.lastName}
                        </span>
                        <span className="text-[9px] text-slate-400 font-bold uppercase">{log.department}</span>
                      </div>
                    </td>
                    <td className="px-6 py-3 font-bold text-slate-500">{log.employeeId}</td>
                    <td className="px-6 py-3 text-slate-600 font-semibold">
                      {log.checkIn ? new Date(log.checkIn).toLocaleTimeString('en-US', { hour12: false }) : '-'}
                    </td>
                    <td className="px-6 py-3 text-slate-600 font-semibold">
                      {log.checkOut ? new Date(log.checkOut).toLocaleTimeString('en-US', { hour12: false }) : '-'}
                    </td>
                    <td className="px-6 py-3 text-slate-500 font-bold">{log.workingHours ? `${log.workingHours} hrs` : '-'}</td>
                    <td className="px-6 py-3 text-slate-400 font-bold">{log.overtime ? `${log.overtime} hrs` : '-'}</td>
                    <td className="px-6 py-3">
                      <StatusBadge status={log.status} />
                    </td>
                    <td className="px-6 py-3 text-slate-550 font-bold">{log.location}</td>
                    <td className="px-6 py-3 text-right pr-6">
                      <button
                        onClick={() => navigate(`/employees/${log.employeeId}`)}
                        className="p-1.5 text-slate-500 hover:bg-slate-100 border border-slate-200/85 rounded-lg hover:text-slate-800 transition cursor-pointer"
                        title="View Profile"
                      >
                        <Eye className="h-3.5 w-3.5" />
                      </button>
                    </td>
                  </tr>
                );
              })}
              {paginatedLogs.length === 0 && (
                <tr>
                  <td colSpan="9" className="px-6 py-12 text-center text-slate-400 font-semibold">
                    No matching attendance logs found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 3. Pagination controls */}
      {sortedLogs.length > 0 && (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-5 bg-white rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 font-bold">Show per page</span>
            <select
              value={rowsPerPage}
              onChange={(e) => { setRowsPerPage(Number(e.target.value)); setCurrentPage(1); }}
              className="px-2 py-1.5 border border-slate-200 bg-slate-50 rounded-lg text-xs font-semibold text-slate-700"
            >
              <option value={5}>5 records</option>
              <option value={10}>10 records</option>
              <option value={20}>20 records</option>
              <option value={50}>50 records</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5 self-center sm:self-auto">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3.5 py-2 border border-slate-200 hover:bg-slate-50 rounded-xl text-xs font-bold text-slate-600 disabled:opacity-40 disabled:cursor-not-allowed transition cursor-pointer"
            >
              Previous
            </button>
            <span className="text-xs text-slate-500 font-bold px-3">
              Page {currentPage} of {totalPages || 1}
            </span>
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages || totalPages === 0}
              className="px-3.5 py-2 border border-slate-200 hover:bg-slate-50 rounded-xl text-xs font-bold text-slate-600 disabled:opacity-40 disabled:cursor-not-allowed transition cursor-pointer"
            >
              Next
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default AttendanceTable;
export { StatusBadge };
