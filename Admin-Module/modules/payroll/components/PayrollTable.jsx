import React, { useState, useMemo } from 'react';
import { ArrowUpDown, Eye, Download, Search, RefreshCw, FileText } from 'lucide-react';

const PaymentStatusBadge = ({ status }) => {
  const styles = {
    Paid: 'bg-emerald-50 text-emerald-700 border-emerald-105/50',
    Pending: 'bg-amber-50 text-amber-700 border-amber-105/50',
    Processing: 'bg-indigo-50 text-indigo-700 border-indigo-105/50',
    Failed: 'bg-rose-50 text-rose-700 border-rose-105/50',
    Scheduled: 'bg-slate-50 text-slate-700 border-slate-205/50',
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[9px] font-bold border ${styles[status] || styles.Pending}`}>
      {status}
    </span>
  );
};

const PayrollTable = ({ records, onViewSlip }) => {
  const [search, setSearch] = useState('');
  const [selectedDept, setSelectedDept] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');

  // Sorting state
  const [sortField, setSortField] = useState('employeeId');
  const [sortOrder, setSortOrder] = useState('asc');

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
    setSelectedMonth('');
    setCurrentPage(1);
  };

  // Filter logs locally
  const filteredRecords = useMemo(() => {
    return records.filter(log => {
      const matchSearch = search.trim() === '' || 
        log.firstName.toLowerCase().includes(search.toLowerCase()) ||
        log.lastName.toLowerCase().includes(search.toLowerCase()) ||
        log.employeeId.toLowerCase().includes(search.toLowerCase());

      const matchDept = selectedDept === '' || log.department === selectedDept;
      const matchStatus = selectedStatus === '' || log.status === selectedStatus;
      const matchMonth = selectedMonth === '' || log.month === Number(selectedMonth);

      return matchSearch && matchDept && matchStatus && matchMonth;
    });
  }, [records, search, selectedDept, selectedStatus, selectedMonth]);

  // Sort logs locally
  const sortedRecords = useMemo(() => {
    const sorted = [...filteredRecords];
    sorted.sort((a, b) => {
      let aVal = a[sortField] || '';
      let bVal = b[sortField] || '';

      if (aVal < bVal) return sortOrder === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
    return sorted;
  }, [filteredRecords, sortField, sortOrder]);

  // Paginated logs
  const paginatedRecords = useMemo(() => {
    const startIdx = (currentPage - 1) * rowsPerPage;
    return sortedRecords.slice(startIdx, startIdx + rowsPerPage);
  }, [sortedRecords, currentPage, rowsPerPage]);

  const totalPages = Math.ceil(sortedRecords.length / rowsPerPage);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
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

          {/* Month Filter */}
          <select
            value={selectedMonth}
            onChange={(e) => { setSelectedMonth(e.target.value); setCurrentPage(1); }}
            className="block w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700"
          >
            <option value="">All Cycles</option>
            <option value="4">April 2026</option>
            <option value="5">May 2026</option>
            <option value="6">June 2026</option>
          </select>

          {/* Status Filter */}
          <select
            value={selectedStatus}
            onChange={(e) => { setSelectedStatus(e.target.value); setCurrentPage(1); }}
            className="block w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700"
          >
            <option value="">All Payment Statuses</option>
            <option value="Paid">Paid</option>
            <option value="Pending">Pending</option>
            <option value="Processing">Processing</option>
            <option value="Failed">Failed</option>
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
            <span className="text-xs text-slate-500 font-bold font-sans">
              Showing {filteredRecords.length} payroll lines
            </span>
          </div>

          <button 
            onClick={() => alert(`Exported ${sortedRecords.length} payroll lines as CSV.`)}
            className="px-3.5 py-2 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl text-slate-700 text-xs font-bold shadow-sm transition flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
          >
            <Download className="h-3.5 w-3.5" />
            Export CSV
          </button>
        </div>
      </div>

      {/* 2. Ledger logs table */}
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
                <th className="px-6 py-4 font-bold">Cycle</th>
                <th className="px-6 py-4 font-bold select-none cursor-pointer" onClick={() => handleSort('basicSalary')}>
                  <div className="flex items-center gap-1">
                    Basic Salary
                    <ArrowUpDown className="h-3 w-3" />
                  </div>
                </th>
                <th className="px-6 py-4 font-bold">Allowances</th>
                <th className="px-6 py-4 font-bold">Deductions</th>
                <th className="px-6 py-4 font-bold">Bonus</th>
                <th className="px-6 py-4 font-bold select-none cursor-pointer" onClick={() => handleSort('netSalary')}>
                  <div className="flex items-center gap-1">
                    Net Salary
                    <ArrowUpDown className="h-3 w-3" />
                  </div>
                </th>
                <th className="px-6 py-4 font-bold">Status</th>
                <th className="px-6 py-4 font-bold text-right pr-8">Actions</th>
              </tr>
            </thead>
            
            <tbody className="divide-y divide-slate-100 text-slate-700 bg-white">
              {paginatedRecords.map((log) => {
                const initials = `${log.firstName.charAt(0)}${log.lastName.charAt(0)}`;
                const cycleName = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][log.month - 1];

                return (
                  <tr key={log.id} className="hover:bg-slate-50/50 transition-colors duration-150">
                    <td className="px-6 py-3 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 text-slate-700 flex items-center justify-center font-bold text-xs">
                        {initials}
                      </div>
                      <div>
                        <span className="font-bold text-slate-850 block text-xs">
                          {log.firstName} {log.lastName}
                        </span>
                        <span className="text-[9px] text-slate-400 font-bold uppercase">{log.department}</span>
                      </div>
                    </td>
                    <td className="px-6 py-3 font-bold text-slate-500">{log.employeeId}</td>
                    <td className="px-6 py-3 text-slate-500 font-semibold">{cycleName} {log.year}</td>
                    <td className="px-6 py-3 text-slate-700 font-bold">₹{log.basicSalary.toLocaleString('en-IN')}</td>
                    <td className="px-6 py-3 text-emerald-600 font-semibold">+₹{log.allowances.toLocaleString('en-IN')}</td>
                    <td className="px-6 py-3 text-rose-600 font-semibold">-₹{log.deductions.toLocaleString('en-IN')}</td>
                    <td className="px-6 py-3 text-indigo-600 font-semibold">₹{log.bonus.toLocaleString('en-IN')}</td>
                    <td className="px-6 py-3 text-slate-800 font-black">₹{log.netSalary.toLocaleString('en-IN')}</td>
                    <td className="px-6 py-3">
                      <PaymentStatusBadge status={log.status} />
                    </td>
                    <td className="px-6 py-3 text-right pr-6">
                      <button
                        onClick={() => onViewSlip(log)}
                        className="px-3 py-1.5 hover:bg-slate-50 border border-slate-200 rounded-lg text-slate-650 hover:text-slate-800 font-bold flex items-center gap-1.5 transition ml-auto cursor-pointer"
                      >
                        <FileText className="h-3.5 w-3.5" />
                        View Slip
                      </button>
                    </td>
                  </tr>
                );
              })}
              {paginatedRecords.length === 0 && (
                <tr>
                  <td colSpan="10" className="px-6 py-12 text-center text-slate-400 font-semibold">
                    No matching payroll records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 3. Pagination controls */}
      {sortedRecords.length > 0 && (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-5 bg-white rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 font-bold">Show per page</span>
            <select
              value={rowsPerPage}
              onChange={(e) => { setRowsPerPage(Number(e.target.value)); setCurrentPage(1); }}
              className="px-2 py-1.5 border border-slate-200 bg-slate-50 rounded-lg text-xs font-semibold text-slate-750"
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

export default PayrollTable;
export { PaymentStatusBadge };
