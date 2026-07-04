import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockEmployees } from '../data/mockEmployees';
import EmployeeTable from '../components/EmployeeTable';
import EmployeeCard from '../components/EmployeeCard';
import OrgChart from '../components/OrgChart';
import { 
  Plus, 
  Search, 
  List, 
  Grid, 
  Network, 
  RefreshCw, 
  Download 
} from 'lucide-react';

const EmployeeList = () => {
  const navigate = useNavigate();

  // Local state for filters
  const [search, setSearch] = useState('');
  const [selectedDept, setSelectedDept] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  
  // View states: 'table', 'grid', 'chart'
  const [viewMode, setViewMode] = useState('table');

  // Sorting state
  const [sortField, setSortField] = useState('id');
  const [sortOrder, setSortOrder] = useState('asc');

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // List of departments and roles for dropdowns
  const departmentsList = [
    'Software Development', 'QA', 'Human Resources', 'Finance', 'Marketing', 
    'Sales', 'Administration', 'Support', 'Design', 'Operations'
  ];

  const handleReset = () => {
    setSearch('');
    setSelectedDept('');
    setSelectedStatus('');
    setSelectedRole('');
    setCurrentPage(1);
  };

  // 1. Filter employees locally
  const filteredEmployees = useMemo(() => {
    return mockEmployees.filter(emp => {
      const matchSearch = search.trim() === '' || 
        emp.firstName.toLowerCase().includes(search.toLowerCase()) ||
        emp.lastName.toLowerCase().includes(search.toLowerCase()) ||
        emp.id.toLowerCase().includes(search.toLowerCase());

      const matchDept = selectedDept === '' || emp.department === selectedDept;
      const matchStatus = selectedStatus === '' || emp.status === selectedStatus;
      const matchRole = selectedRole === '' || emp.role === selectedRole;

      return matchSearch && matchDept && matchStatus && matchRole;
    });
  }, [search, selectedDept, selectedStatus, selectedRole]);

  // 2. Sort employees locally
  const sortedEmployees = useMemo(() => {
    const sorted = [...filteredEmployees];
    sorted.sort((a, b) => {
      let aVal = a[sortField] || '';
      let bVal = b[sortField] || '';

      if (typeof aVal === 'string') {
        aVal = aVal.toLowerCase();
        bVal = bVal.toLowerCase();
      }

      if (aVal < bVal) return sortOrder === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
    return sorted;
  }, [filteredEmployees, sortField, sortOrder]);

  // 3. Paginate employees locally
  const paginatedEmployees = useMemo(() => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    return sortedEmployees.slice(startIndex, startIndex + rowsPerPage);
  }, [sortedEmployees, currentPage, rowsPerPage]);

  const totalPages = Math.ceil(sortedEmployees.length / rowsPerPage);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const handleExport = () => {
    // Generate simple csv download mock
    const headers = 'ID,First Name,Last Name,Email,Department,Designation,Status,Joining Date\n';
    const rows = sortedEmployees.map(emp => 
      `"${emp.id}","${emp.firstName}","${emp.lastName}","${emp.email}","${emp.department}","${emp.designation}","${emp.status}","${emp.joiningDate}"`
    ).join('\n');
    
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'HRMS_Employee_Directory.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      
      {/* Upper header action bar */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-800 tracking-tight font-sans">Employee Management</h1>
          <p className="text-xs text-slate-500 mt-0.5">Manage details, roles, and view organizational structures</p>
        </div>

        <div className="flex items-center gap-2">
          {/* Export triggers */}
          <button 
            onClick={handleExport}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl text-slate-700 font-bold text-xs shadow-sm transition cursor-pointer"
          >
            <Download className="h-4 w-4" />
            Export CSV
          </button>
          
          {/* Add triggers */}
          <button 
            onClick={() => navigate('/employees/new')}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-primary text-white hover:bg-indigo-700 rounded-xl text-xs font-bold shadow-md shadow-indigo-500/20 transition cursor-pointer"
          >
            <Plus className="h-4.5 w-4.5" />
            Add Employee
          </button>
        </div>
      </div>

      {/* Filter toolbar panel */}
      <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          
          {/* Search Input */}
          <div className="relative rounded-xl shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Search className="h-4.5 w-4.5" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent transition-all duration-200"
              placeholder="Search Name or Employee ID..."
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
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="Probation">Probation</option>
            <option value="Resigned">Resigned</option>
            <option value="Suspended">Suspended</option>
          </select>

          {/* Role Filter */}
          <select
            value={selectedRole}
            onChange={(e) => { setSelectedRole(e.target.value); setCurrentPage(1); }}
            className="block w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700"
          >
            <option value="">All Roles</option>
            <option value="Admin">Administrator</option>
            <option value="Manager">Manager</option>
            <option value="Employee">Employee</option>
          </select>

        </div>

        {/* Toolbar triggers and view switcher */}
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
              Showing {filteredEmployees.length} profiles
            </span>
          </div>

          {/* View mode switcher tabs */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-lg transition cursor-pointer ${
                viewMode === 'table' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-800'
              }`}
              title="Table View"
            >
              <List className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg transition cursor-pointer ${
                viewMode === 'grid' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-800'
              }`}
              title="Directory Grid"
            >
              <Grid className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode('chart')}
              className={`p-1.5 rounded-lg transition cursor-pointer ${
                viewMode === 'chart' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-800'
              }`}
              title="Organization Chart"
            >
              <Network className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main content viewport */}
      <div className="space-y-4">
        {viewMode === 'table' && (
          <EmployeeTable 
            employees={paginatedEmployees} 
            onSort={handleSort}
            sortField={sortField}
            sortOrder={sortOrder}
            onDelete={(id) => alert(`Delete triggered for employee: ${id} (MySQL cascade blocks this for safety)`)}
          />
        )}

        {viewMode === 'grid' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
            {paginatedEmployees.map(emp => (
              <EmployeeCard key={emp.id} employee={emp} />
            ))}
            {paginatedEmployees.length === 0 && (
              <div className="col-span-full bg-white p-12 text-center rounded-2xl border border-slate-100 text-slate-400 font-bold">
                No matching directory cards found.
              </div>
            )}
          </div>
        )}

        {viewMode === 'chart' && <OrgChart />}
      </div>

      {/* Custom pagination panel */}
      {viewMode !== 'chart' && sortedEmployees.length > 0 && (
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

export default EmployeeList;
