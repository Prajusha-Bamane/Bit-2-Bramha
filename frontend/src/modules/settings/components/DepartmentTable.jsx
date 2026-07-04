import React, { useState, useMemo } from 'react';
import { Plus, Search, Edit2, Trash2, ToggleLeft, ToggleRight, X, ArrowLeft, ArrowRight } from 'lucide-react';

const DepartmentTable = ({ departments, onAdd, onEdit, onDelete, onToggleStatus }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Modal forms
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add'); // 'add' or 'edit'
  const [currentDept, setCurrentDept] = useState({ id: '', name: '', code: '', head: '', employees: 0, status: 'Active' });

  // Filter & Search
  const filteredDepts = useMemo(() => {
    return departments
      .filter((d) => {
        if (statusFilter === 'active') return d.status === 'Active';
        if (statusFilter === 'inactive') return d.status === 'Inactive';
        return true;
      })
      .filter((d) => {
        if (!searchQuery) return true;
        return (
          d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          d.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
          d.head.toLowerCase().includes(searchQuery.toLowerCase())
        );
      });
  }, [departments, searchQuery, statusFilter]);

  // Pagination
  const totalPages = Math.ceil(filteredDepts.length / itemsPerPage) || 1;
  const paginatedDepts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredDepts.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredDepts, currentPage]);

  const handleOpenAdd = () => {
    setCurrentDept({ id: '', name: '', code: '', head: '', employees: 0, status: 'Active' });
    setModalMode('add');
    setIsModalOpen(true);
  };

  const handleOpenEdit = (dept) => {
    setCurrentDept({ ...dept });
    setModalMode('edit');
    setIsModalOpen(true);
  };

  const handleModalSubmit = (e) => {
    e.preventDefault();
    if (modalMode === 'add') {
      onAdd({
        ...currentDept,
        id: `dept-${Date.now()}`
      });
    } else {
      onEdit(currentDept);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this department? This action cannot be undone.")) {
      onDelete(id);
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-md p-6 space-y-5 select-none">
      
      {/* 1. Header controls */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-sm font-black text-slate-800 tracking-tight">Organization Departments</h2>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">Management desk</p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-750 text-white font-bold text-xs rounded-xl shadow transition cursor-pointer self-start md:self-auto"
        >
          <Plus className="w-4 h-4" />
          Add Department
        </button>
      </div>

      {/* 2. Filters & Searches */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 border border-slate-350 px-3 py-1.5 rounded-xl bg-white w-full sm:max-w-xs">
          <Search className="w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search departments..."
            value={searchQuery}
            onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
            className="w-full focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="font-bold text-slate-500">Status:</span>
          <select
            value={statusFilter}
            onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }}
            className="px-3 py-1.5 border border-slate-350 rounded-xl focus:ring-1 focus:ring-indigo-500 focus:outline-none"
          >
            <option value="all">All statuses</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      {/* 3. Table */}
      <div className="overflow-x-auto border border-slate-100 rounded-xl">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-slate-50 text-slate-500 font-bold border-b border-slate-100 select-none">
              <th className="p-3.5">Dept Code</th>
              <th className="p-3.5">Department Name</th>
              <th className="p-3.5">Head of Department</th>
              <th className="p-3.5 text-center">Employees</th>
              <th className="p-3.5 text-center">Status</th>
              <th className="p-3.5 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium">
            {paginatedDepts.length > 0 ? (
              paginatedDepts.map((dept) => (
                <tr key={dept.id} className="hover:bg-slate-50/50 transition-colors duration-150">
                  <td className="p-3.5 font-mono text-indigo-650 font-bold">{dept.code}</td>
                  <td className="p-3.5 font-bold text-slate-800">{dept.name}</td>
                  <td className="p-3.5 text-slate-650">{dept.head || 'N/A'}</td>
                  <td className="p-3.5 text-center font-bold text-slate-700">{dept.employees}</td>
                  <td className="p-3.5 text-center">
                    <span className={`inline-flex px-2 py-0.5 rounded-full text-[9px] font-bold border ${
                      dept.status === 'Active'
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-100'
                        : 'bg-rose-50 text-rose-700 border-rose-100'
                    }`}>
                      {dept.status}
                    </span>
                  </td>
                  <td className="p-3.5">
                    <div className="flex items-center justify-center gap-1.5">
                      <button
                        onClick={() => onToggleStatus(dept.id)}
                        className="p-1 hover:bg-slate-100 rounded text-slate-500 hover:text-indigo-600 transition cursor-pointer"
                        title={dept.status === 'Active' ? 'Deactivate' : 'Activate'}
                      >
                        {dept.status === 'Active' ? <ToggleRight className="w-4 h-4 text-indigo-600" /> : <ToggleLeft className="w-4 h-4 text-slate-400" />}
                      </button>
                      <button
                        onClick={() => handleOpenEdit(dept)}
                        className="p-1 hover:bg-slate-100 rounded text-slate-500 hover:text-indigo-600 transition cursor-pointer"
                        title="Edit Department"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(dept.id)}
                        className="p-1 hover:bg-slate-100 rounded text-slate-500 hover:text-rose-600 transition cursor-pointer"
                        title="Delete Department"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="text-center p-8 text-slate-400">
                  No departments found matching the criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* 4. Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between text-xs pt-3 border-t border-slate-100 select-none">
          <span className="text-slate-400 font-bold uppercase tracking-wider">
            Page {currentPage} of {totalPages}
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="p-1.5 border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 text-slate-600" />
            </button>
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="p-1.5 border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition cursor-pointer"
            >
              <ArrowRight className="w-4 h-4 text-slate-600" />
            </button>
          </div>
        </div>
      )}

      {/* CRUD Modal overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xl max-w-md w-full overflow-hidden">
            <div className="bg-slate-900 px-6 py-4 flex items-center justify-between text-white">
              <h3 className="font-extrabold text-sm tracking-tight">
                {modalMode === 'add' ? 'Add New Department' : 'Edit Department Settings'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-white transition font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>
            
            <form onSubmit={handleModalSubmit}>
              <div className="p-6 space-y-4 text-xs">
                <div className="flex flex-col gap-1">
                  <label htmlFor="deptName font-bold" className="font-bold text-slate-500">Department Name</label>
                  <input
                    id="deptName"
                    type="text"
                    value={currentDept.name}
                    onChange={(e) => setCurrentDept(prev => ({ ...prev, name: e.target.value }))}
                    className="px-3 py-2 border border-slate-350 rounded-xl focus:ring-1 focus:ring-indigo-500"
                    required
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="deptCode font-bold" className="font-bold text-slate-500">Department Code</label>
                  <input
                    id="deptCode"
                    type="text"
                    value={currentDept.code}
                    onChange={(e) => setCurrentDept(prev => ({ ...prev, code: e.target.value.toUpperCase() }))}
                    className="px-3 py-2 border border-slate-350 rounded-xl focus:ring-1 focus:ring-indigo-500 font-mono"
                    required
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="deptHead font-bold" className="font-bold text-slate-500">Head of Department (Manager)</label>
                  <input
                    id="deptHead"
                    type="text"
                    value={currentDept.head}
                    onChange={(e) => setCurrentDept(prev => ({ ...prev, head: e.target.value }))}
                    className="px-3 py-2 border border-slate-350 rounded-xl focus:ring-1 focus:ring-indigo-500"
                  />
                </div>
              </div>
              
              <div className="bg-slate-50 px-6 py-4 border-t border-slate-100 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-white hover:bg-slate-100 border border-slate-200 font-bold text-xs rounded-xl text-slate-700 transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-750 text-white font-bold text-xs rounded-xl transition cursor-pointer"
                >
                  {modalMode === 'add' ? 'Create' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default DepartmentTable;
