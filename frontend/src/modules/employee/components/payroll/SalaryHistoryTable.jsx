/**
 * SalaryHistoryTable Component
 * Responsive table with search, filter, sort, and pagination
 */

import React, { useState, useMemo } from 'react';
import { Search, ChevronUp, ChevronDown, Download, Eye } from 'lucide-react';

const SalaryHistoryTable = ({ data, onViewPayslip }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [yearFilter, setYearFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortField, setSortField] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Filter and sort data
  const filteredData = useMemo(() => {
    let result = [...data];

    // Search filter
    if (searchTerm) {
      result = result.filter(
        (item) =>
          item.monthYear.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.payrollMonth.includes(searchTerm)
      );
    }

    // Year filter
    if (yearFilter !== 'all') {
      result = result.filter((item) => item.year === parseInt(yearFilter));
    }

    // Status filter
    if (statusFilter !== 'all') {
      result = result.filter((item) => item.statusBadge === statusFilter);
    }

    // Sort
    result.sort((a, b) => {
      let aVal = a[sortField];
      let bVal = b[sortField];

      if (sortField === 'date' || sortField === 'paymentDate') {
        aVal = new Date(a.paymentDate);
        bVal = new Date(b.paymentDate);
      }

      if (sortOrder === 'asc') {
        return aVal > bVal ? 1 : -1;
      } else {
        return aVal < bVal ? 1 : -1;
      }
    });

    return result;
  }, [data, searchTerm, yearFilter, statusFilter, sortField, sortOrder]);

  // Pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  const toggleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  };

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case 'credited':
        return 'bg-green-100 text-green-800';
      case 'generated':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const years = [...new Set(data.map((item) => item.year))].sort().reverse();

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Salary History</h2>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6 pb-6 border-b border-gray-200">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by month..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Year Filter */}
        <select
          value={yearFilter}
          onChange={(e) => {
            setYearFilter(e.target.value);
            setCurrentPage(1);
          }}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Years</option>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>

        {/* Status Filter */}
        <select
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
            setCurrentPage(1);
          }}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Status</option>
          <option value="credited">Credited</option>
          <option value="generated">Generated</option>
          <option value="pending">Pending</option>
        </select>

        {/* Results count */}
        <div className="flex items-center justify-end">
          <span className="text-sm text-gray-600">
            {filteredData.length} result{filteredData.length !== 1 ? 's' : ''}
          </span>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="px-4 py-3 text-left">
                <button
                  onClick={() => toggleSort('monthYear')}
                  className="flex items-center space-x-2 font-semibold text-gray-700 hover:text-gray-900"
                >
                  <span>Payroll Month</span>
                  {sortField === 'monthYear' &&
                    (sortOrder === 'asc' ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    ))}
                </button>
              </th>
              <th className="px-4 py-3 text-right">
                <button
                  onClick={() => toggleSort('grossSalary')}
                  className="flex items-center justify-end space-x-2 font-semibold text-gray-700 hover:text-gray-900 w-full"
                >
                  <span>Gross Salary</span>
                  {sortField === 'grossSalary' &&
                    (sortOrder === 'asc' ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    ))}
                </button>
              </th>
              <th className="px-4 py-3 text-right">
                <button
                  onClick={() => toggleSort('deductions')}
                  className="flex items-center justify-end space-x-2 font-semibold text-gray-700 hover:text-gray-900 w-full"
                >
                  <span>Deductions</span>
                  {sortField === 'deductions' &&
                    (sortOrder === 'asc' ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    ))}
                </button>
              </th>
              <th className="px-4 py-3 text-right">
                <button
                  onClick={() => toggleSort('netSalary')}
                  className="flex items-center justify-end space-x-2 font-semibold text-gray-700 hover:text-gray-900 w-full"
                >
                  <span>Net Salary</span>
                  {sortField === 'netSalary' &&
                    (sortOrder === 'asc' ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    ))}
                </button>
              </th>
              <th className="px-4 py-3 text-left">
                <button
                  onClick={() => toggleSort('status')}
                  className="flex items-center space-x-2 font-semibold text-gray-700 hover:text-gray-900"
                >
                  <span>Status</span>
                  {sortField === 'status' &&
                    (sortOrder === 'asc' ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    ))}
                </button>
              </th>
              <th className="px-4 py-3 text-left">
                <button
                  onClick={() => toggleSort('paymentDate')}
                  className="flex items-center space-x-2 font-semibold text-gray-700 hover:text-gray-900"
                >
                  <span>Payment Date</span>
                  {sortField === 'paymentDate' &&
                    (sortOrder === 'asc' ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    ))}
                </button>
              </th>
              <th className="px-4 py-3 text-center font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.length > 0 ? (
              paginatedData.map((row, index) => (
                <tr
                  key={row.id}
                  className={`border-b border-gray-200 hover:bg-gray-50 transition-colors ${
                    index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                  }`}
                >
                  <td className="px-4 py-3 font-medium text-gray-800">{row.monthYear}</td>
                  <td className="px-4 py-3 text-right text-gray-700">
                    ₹{row.grossSalary?.toLocaleString() || '0'}
                  </td>
                  <td className="px-4 py-3 text-right text-gray-700">
                    ₹{row.deductions?.toLocaleString() || '0'}
                  </td>
                  <td className="px-4 py-3 text-right font-semibold text-green-600">
                    ₹{row.netSalary?.toLocaleString() || '0'}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadgeColor(
                        row.statusBadge
                      )}`}
                    >
                      {row.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-700">{row.paymentDate}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-center space-x-2">
                      <button
                        onClick={() => onViewPayslip && onViewPayslip(row.id)}
                        className="text-blue-600 hover:text-blue-800 hover:bg-blue-50 p-2 rounded-lg transition-colors"
                        title="View Payslip"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        className="text-purple-600 hover:text-purple-800 hover:bg-purple-50 p-2 rounded-lg transition-colors"
                        title="Download PDF"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="px-4 py-8 text-center text-gray-600">
                  No payroll records found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-200">
          <div className="text-sm text-gray-600">
            Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredData.length)} of{' '}
            {filteredData.length}
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="px-3 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-2 rounded-lg transition-colors ${
                  currentPage === page
                    ? 'bg-blue-600 text-white'
                    : 'border border-gray-300 hover:bg-gray-50'
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SalaryHistoryTable;
