import React, { useState, useMemo } from 'react';
import { ArrowUpDown, Eye, Check, X, Download, Search, RefreshCw } from 'lucide-react';

const StatusBadge = ({ status }) => {
  const styles = {
    Approved: 'bg-emerald-50 text-emerald-700 border-emerald-100/50',
    Pending: 'bg-amber-50 text-amber-700 border-amber-100/50',
    Rejected: 'bg-rose-50 text-rose-700 border-rose-100/50',
  };

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-bold border ${styles[status] || styles.Pending}`}>
      {status}
    </span>
  );
};

const LeaveTypeBadge = ({ type }) => {
  const styles = {
    'Casual Leave': 'bg-indigo-50 text-indigo-700 border-indigo-100/50',
    'Sick Leave': 'bg-rose-50 text-rose-700 border-rose-100/50',
    'Earned Leave': 'bg-emerald-50 text-emerald-700 border-emerald-100/50',
    'Maternity Leave': 'bg-purple-50 text-purple-700 border-purple-100/50',
    'Paternity Leave': 'bg-pink-50 text-pink-700 border-pink-100/50',
    'Work From Home': 'bg-blue-50 text-blue-700 border-blue-100/50',
    'Compensatory Off': 'bg-cyan-50 text-cyan-700 border-cyan-100/50',
    'Unpaid Leave': 'bg-slate-100 text-slate-700 border-slate-200/50',
    'Emergency Leave': 'bg-red-50 text-red-700 border-red-100/50',
  };

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-[9px] font-bold border ${styles[type] || styles['Casual Leave']}`}>
      {type}
    </span>
  );
};

const LeaveTable = ({ leaves, onViewDetails, onApprove, onReject }) => {
  const [search, setSearch] = useState('');
  const [selectedDept, setSelectedDept] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');

  // Sorting state
  const [sortField, setSortField] = useState('requestedOn');
  const [sortOrder, setSortOrder] = useState('desc');

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const departmentsList = [
    'Software Development', 'QA', 'Human Resources', 'Finance', 'Marketing', 
    'Sales', 'Administration', 'Support', 'Design', 'Operations'
  ];

  const leaveTypesList = [
    'Casual Leave', 'Sick Leave', 'Earned Leave', 'Maternity Leave', 
    'Paternity Leave', 'Work From Home', 'Compensatory Off', 'Unpaid Leave', 
    'Emergency Leave'
  ];

  const handleReset = () => {
    setSearch('');
    setSelectedDept('');
    setSelectedType('');
    setSelectedStatus('');
    setCurrentPage(1);
  };

  // Filter logs locally
  const filteredLeaves = useMemo(() => {
    return leaves.filter(log => {
      const matchSearch = search.trim() === '' || 
        log.firstName.toLowerCase().includes(search.toLowerCase()) ||
        log.lastName.toLowerCase().includes(search.toLowerCase()) ||
        log.employeeId.toLowerCase().includes(search.toLowerCase());

      const matchDept = selectedDept === '' || log.department === selectedDept;
      const matchType = selectedType === '' || log.leaveType === selectedType;
      const matchStatus = selectedStatus === '' || log.status === selectedStatus;

      return matchSearch && matchDept && matchType && matchStatus;
    });
  }, [leaves, search, selectedDept, selectedType, selectedStatus]);

  // Sort logs locally
  const sortedLeaves = useMemo(() => {
    const sorted = [...filteredLeaves];
    sorted.sort((a, b) => {
      let aVal = a[sortField] || '';
      let bVal = b[sortField] || '';

      if (aVal < bVal) return sortOrder === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
    return sorted;
  }, [filteredLeaves, sortField, sortOrder]);

  // Paginated logs
  const paginatedLeaves = useMemo(() => {
    const startIdx = (currentPage - 1) * rowsPerPage;
    return sortedLeaves.slice(startIdx, startIdx + rowsPerPage);
  }, [sortedLeaves, currentPage, rowsPerPage]);

  const totalPages = Math.ceil(sortedLeaves.length / rowsPerPage);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  };

  return (
    <div className="space-y-4">
      
      {/* 1. Filter panel */}
      <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          
          {/* Search Input */}
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

          {/* Leave Type Filter */}
          <select
            value={selectedType}
            onChange={(e) => { setSelectedType(e.target.value); setCurrentPage(1); }}
            className="block w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700"
          >
            <option value="">All Leave Types</option>
            {leaveTypesList.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>

          {/* Status Filter */}
          <select
            value={selectedStatus}
            onChange={(e) => { setSelectedStatus(e.target.value); setCurrentPage(1); }}
            className="block w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700"
          >
            <option value="">All Statuses</option>
            <option value="Approved">Approved</option>
            <option value="Pending">Pending</option>
            <option value="Rejected">Rejected</option>
          </select>

        </div>

        {/* Toolbar actions */}
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
              Showing {filteredLeaves.length} requests
            </span>
          </div>

          <button 
            onClick={() => alert(`Exported ${sortedLeaves.length} leave records as CSV.`)}
            className="px-3.5 py-2 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl text-slate-700 text-xs font-bold shadow-sm transition flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
          >
            <Download className="h-3.5 w-3.5" />
            Export CSV
          </button>
        </div>
      </div>

      {/* 2. Directory logs table */}
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
                <th className="px-6 py-4 font-bold">Leave Type</th>
                <th className="px-6 py-4 font-bold select-none cursor-pointer" onClick={() => handleSort('startDate')}>
                  <div className="flex items-center gap-1">
                    Duration
                    <ArrowUpDown className="h-3 w-3" />
                  </div>
                </th>
                <th className="px-6 py-4 font-bold">Reason</th>
                <th className="px-6 py-4 font-bold select-none cursor-pointer" onClick={() => handleSort('requestedOn')}>
                  <div className="flex items-center gap-1">
                    Requested On
                    <ArrowUpDown className="h-3 w-3" />
                  </div>
                </th>
                <th className="px-6 py-4 font-bold">Status</th>
                <th className="px-6 py-4 font-bold">Approver</th>
                <th className="px-6 py-4 font-bold text-right pr-8">Actions</th>
              </tr>
            </thead>
            
            <tbody className="divide-y divide-slate-100 text-slate-700 bg-white">
              {paginatedLeaves.map((log) => {
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
                    <td className="px-6 py-3">
                      <LeaveTypeBadge type={log.leaveType} />
                    </td>
                    <td className="px-6 py-3 text-slate-600 font-semibold">
                      <span>{log.duration} days</span>
                      <span className="block text-[10px] text-slate-400 mt-0.5">{log.startDate} to {log.endDate}</span>
                    </td>
                    <td className="px-6 py-3 text-slate-500 max-w-[200px] truncate" title={log.reason}>
                      {log.reason}
                    </td>
                    <td className="px-6 py-3 text-slate-500 font-semibold">{log.requestedOn}</td>
                    <td className="px-6 py-3">
                      <StatusBadge status={log.status} />
                    </td>
                    <td className="px-6 py-3 text-slate-500 font-semibold">{log.approver}</td>
                    <td className="px-6 py-3 text-right pr-6">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => onViewDetails(log)}
                          className="p-1.5 text-slate-500 hover:bg-slate-100 border border-slate-200/85 rounded-lg hover:text-slate-800 transition cursor-pointer"
                          title="View workflow Details"
                        >
                          <Eye className="h-3.5 w-3.5" />
                        </button>
                        
                        {log.status === 'Pending' && (
                          <>
                            <button
                              onClick={() => onApprove(log.id)}
                              className="p-1.5 text-emerald-600 hover:bg-emerald-50 border border-slate-200 hover:border-emerald-100 rounded-lg transition cursor-pointer"
                              title="Approve Leave"
                            >
                              <Check className="h-3.5 w-3.5" />
                            </button>
                            <button
                              onClick={() => onReject(log.id)}
                              className="p-1.5 text-rose-600 hover:bg-rose-50 border border-slate-200 hover:border-rose-100 rounded-lg transition cursor-pointer"
                              title="Reject Leave"
                            >
                              <X className="h-3.5 w-3.5" />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
              {paginatedLeaves.length === 0 && (
                <tr>
                  <td colSpan="9" className="px-6 py-12 text-center text-slate-400 font-semibold">
                    No matching leave records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 3. Pagination controls */}
      {sortedLeaves.length > 0 && (
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

export default LeaveTable;
export { StatusBadge, LeaveTypeBadge };
