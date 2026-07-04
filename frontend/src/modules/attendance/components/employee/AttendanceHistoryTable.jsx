import React, { useState, useMemo } from 'react';
import StatusBadge from './StatusBadge';
import { Search, ChevronLeft, ChevronRight, FileSpreadsheet, Download, Printer } from 'lucide-react';

const AttendanceHistoryTable = ({ attendanceHistory }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [monthFilter, setMonthFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Compute month names from date string
  const getMonthName = (dateStr) => {
    const monthIndex = parseInt(dateStr.split('-')[1], 10) - 1;
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return months[monthIndex];
  };

  // Filter lists
  const filteredHistory = useMemo(() => {
    return attendanceHistory.filter((item) => {
      // Search matches
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch = 
        item.date.includes(searchTerm) ||
        item.location.toLowerCase().includes(searchLower) ||
        item.device.toLowerCase().includes(searchLower) ||
        item.status.toLowerCase().includes(searchLower);

      // Month matches
      const itemMonth = getMonthName(item.date);
      const matchesMonth = monthFilter === 'All' || itemMonth === monthFilter;

      // Status matches
      const matchesStatus = statusFilter === 'All' || item.status === statusFilter;

      return matchesSearch && matchesMonth && matchesStatus;
    });
  }, [attendanceHistory, searchTerm, monthFilter, statusFilter]);

  // Reset pagination on filter changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, monthFilter, statusFilter]);

  // Compute pagination details
  const totalPages = Math.ceil(filteredHistory.length / itemsPerPage) || 1;
  const paginatedItems = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredHistory.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredHistory, currentPage]);

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handleExportCSV = () => {
    alert("Compiling historical logs... Attendance_Statement_90_Days.csv has been successfully exported.");
  };

  const handlePrint = () => {
    alert("Routing logs to system print dialog... Action logged.");
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
      {/* Filtering Actions bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h3 className="text-base font-bold text-slate-800 font-sans">
          Logs & Audit History
        </h3>
        
        {/* Quick action exporters */}
        <div className="flex gap-2 self-start md:self-auto">
          <button 
            onClick={handleExportCSV}
            className="px-3.5 py-2 border border-slate-100 hover:border-slate-200 text-xs font-bold text-slate-600 bg-slate-50 hover:bg-slate-100 rounded-xl transition cursor-pointer flex items-center gap-1.5"
          >
            <FileSpreadsheet className="h-4 w-4" />
            CSV Export
          </button>
          <button 
            onClick={handlePrint}
            className="px-3.5 py-2 border border-slate-100 hover:border-slate-200 text-xs font-bold text-slate-600 bg-slate-50 hover:bg-slate-100 rounded-xl transition cursor-pointer flex items-center gap-1.5"
          >
            <Printer className="h-4 w-4" />
            Print
          </button>
        </div>
      </div>

      {/* Filters Form grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-2">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
          <input
            type="text"
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-100 focus:border-indigo-500/50 rounded-xl text-xs text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-indigo-500/20 transition-all font-sans"
            placeholder="Search location, device, status..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Month Selector */}
        <select
          className="px-4 py-2.5 bg-slate-50 border border-slate-100 focus:border-indigo-500/50 rounded-xl text-xs text-slate-650 focus:outline-none focus:ring-1 focus:ring-indigo-500/20 font-sans cursor-pointer"
          value={monthFilter}
          onChange={(e) => setMonthFilter(e.target.value)}
        >
          <option value="All">All Months (90+ Days)</option>
          <option value="July">July 2026</option>
          <option value="June">June 2026</option>
          <option value="May">May 2026</option>
          <option value="April">April 2026</option>
        </select>

        {/* Status Selector */}
        <select
          className="px-4 py-2.5 bg-slate-50 border border-slate-100 focus:border-indigo-500/50 rounded-xl text-xs text-slate-650 focus:outline-none focus:ring-1 focus:ring-indigo-500/20 font-sans cursor-pointer"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="All">All Statuses</option>
          <option value="Present">Present</option>
          <option value="Late">Late</option>
          <option value="Absent">Absent</option>
          <option value="Half-Day">Half-Day</option>
          <option value="Leave">Leave</option>
          <option value="Holiday">Holiday</option>
          <option value="Weekend">Weekend</option>
        </select>
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto border border-slate-100 rounded-2xl max-h-[480px]">
        <table className="min-w-full divide-y divide-slate-100 text-left relative">
          <thead className="bg-slate-50 text-slate-500 text-[10px] font-bold uppercase tracking-wider sticky top-0 z-10">
            <tr>
              <th className="px-5 py-4 bg-slate-50">Date</th>
              <th className="px-5 py-4 bg-slate-50">Check-In</th>
              <th className="px-5 py-4 bg-slate-50">Check-Out</th>
              <th className="px-5 py-4 bg-slate-50">Hours Worked</th>
              <th className="px-5 py-4 bg-slate-50">Break Hours</th>
              <th className="px-5 py-4 bg-slate-50">Status</th>
              <th className="px-5 py-4 bg-slate-50">Location</th>
              <th className="px-5 py-4 bg-slate-50">Device</th>
              <th className="px-5 py-4 bg-slate-50">Overtime</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-100 text-xs text-slate-600 font-sans">
            {paginatedItems.length > 0 ? (
              paginatedItems.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-50/50 transition-colors duration-150">
                  <td className="px-5 py-3.5 font-bold font-mono text-slate-800">{item.date}</td>
                  <td className="px-5 py-3.5 font-mono">{item.checkIn}</td>
                  <td className="px-5 py-3.5 font-mono">{item.checkOut}</td>
                  <td className="px-5 py-3.5 font-bold font-mono text-slate-850">
                    {item.workingHours > 0 ? `${item.workingHours} hrs` : '--'}
                  </td>
                  <td className="px-5 py-3.5 font-mono">
                    {item.breakHours > 0 ? `${item.breakHours} hrs` : '--'}
                  </td>
                  <td className="px-5 py-3.5">
                    <StatusBadge status={item.status} />
                  </td>
                  <td className="px-5 py-3.5 font-medium">{item.location}</td>
                  <td className="px-5 py-3.5 text-slate-450">{item.device}</td>
                  <td className="px-5 py-3.5 font-mono text-emerald-600">
                    {item.overtime > 0 ? `+${item.overtime} hrs` : '--'}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="text-center py-10 text-slate-400 font-medium">
                  No attendance records found matching filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination controls */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-150 text-xs">
        <span className="font-bold text-slate-500 font-sans">
          Showing {filteredHistory.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0} to{' '}
          {Math.min(currentPage * itemsPerPage, filteredHistory.length)} of{' '}
          {filteredHistory.length} logs
        </span>

        <div className="flex items-center gap-2">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className="p-1.5 border border-slate-100 hover:border-slate-200 bg-slate-50 hover:bg-slate-100 rounded-lg text-slate-500 transition cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <span className="font-bold text-slate-700 select-none font-sans px-1">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="p-1.5 border border-slate-100 hover:border-slate-200 bg-slate-50 hover:bg-slate-100 rounded-lg text-slate-500 transition cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AttendanceHistoryTable;
