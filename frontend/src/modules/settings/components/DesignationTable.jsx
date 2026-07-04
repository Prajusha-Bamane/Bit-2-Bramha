import React, { useState, useMemo } from 'react';
import { Plus, Search, Edit2, Trash2, ArrowLeft, ArrowRight } from 'lucide-react';

const DesignationTable = ({ designations, departments, onAdd, onEdit, onDelete }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [deptFilter, setDeptFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Add/Edit modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [currentDesg, setCurrentDesg] = useState({ id: '', name: '', department: '', level: 'L1', status: 'Active' });

  // Filter & Search
  const filteredDesgs = useMemo(() => {
    return designations
      .filter((d) => {
        if (deptFilter === 'all') return true;
        return d.department === deptFilter;
      })
      .filter((d) => {
        if (!searchQuery) return true;
        return (
          d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          d.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
          d.level.toLowerCase().includes(searchQuery.toLowerCase())
        );
      });
  }, [designations, searchQuery, deptFilter]);

  // Pagination
  const totalPages = Math.ceil(filteredDesgs.length / itemsPerPage) || 1;
  const paginatedDesgs = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredDesgs.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredDesgs, currentPage]);

  const handleOpenAdd = () => {
    setCurrentDesg({ id: '', name: '', department: departments[0]?.name || '', level: 'L1', status: 'Active' });
    setModalMode('add');
    setIsModalOpen(true);
  };

  const handleOpenEdit = (desg) => {
    setCurrentDesg({ ...desg });
    setModalMode('edit');
    setIsModalOpen(true);
  };

  const handleModalSubmit = (e) => {
    e.preventDefault();
    if (modalMode === 'add') {
      onAdd({
        ...currentDesg,
        id: `desg-${Date.now()}`
      });
    } else {
      onEdit(currentDesg);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this designation?")) {
      onDelete(id);
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-md p-6 space-y-5 select-none">
      
      {/* Header controls */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-sm font-black text-slate-800 tracking-tight">Organization Designations</h2>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">Job profiles registry</p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-750 text-white font-bold text-xs rounded-xl shadow transition cursor-pointer self-start md:self-auto"
        >
          <Plus className="w-4 h-4" />
          Add Designation
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 border border-slate-350 px-3 py-1.5 rounded-xl bg-white w-full sm:max-w-xs">
          <Search className="w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search designations..."
            value={searchQuery}
            onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
            className="w-full focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="font-bold text-slate-500">Department:</span>
          <select
            value={deptFilter}
            onChange={(e) => { setDeptFilter(e.target.value); setCurrentPage(1); }}
            className="px-3 py-1.5 border border-slate-350 rounded-xl focus:ring-1 focus:ring-indigo-500 focus:outline-none"
          >
            <option value="all">All Departments</option>
            {departments.map((d) => (
              <option key={d.id} value={d.name}>
                {d.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto border border-slate-100 rounded-xl">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-slate-50 text-slate-500 font-bold border-b border-slate-100">
              <th className="p-3.5">Designation Title</th>
              <th className="p-3.5">Department</th>
              <th className="p-3.5 text-center">Level</th>
              <th className="p-3.5 text-center">Status</th>
              <th className="p-3.5 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium">
            {paginatedDesgs.length > 0 ? (
              paginatedDesgs.map((desg) => (
                <tr key={desg.id} className="hover:bg-slate-50/50 transition-colors duration-150">
                  <td className="p-3.5 font-bold text-slate-800">{desg.name}</td>
                  <td className="p-3.5 text-slate-650">{desg.department}</td>
                  <td className="p-3.5 text-center">
                    <span className="inline-flex px-2 py-0.5 rounded-full text-[9px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-100 font-mono">
                      {desg.level}
                    </span>
                  </td>
                  <td className="p-3.5 text-center">
                    <span className={`inline-flex px-2 py-0.5 rounded-full text-[9px] font-bold border ${
                      desg.status === 'Active'
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-100'
                        : 'bg-rose-50 text-rose-700 border-rose-100'
                    }`}>
                      {desg.status}
                    </span>
                  </td>
                  <td className="p-3.5">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => handleOpenEdit(desg)}
                        className="p-1 hover:bg-slate-100 rounded text-slate-500 hover:text-indigo-600 transition cursor-pointer"
                        title="Edit Designation"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(desg.id)}
                        className="p-1 hover:bg-slate-100 rounded text-slate-500 hover:text-rose-600 transition cursor-pointer"
                        title="Delete Designation"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center p-8 text-slate-400">
                  No designations found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between text-xs pt-3 border-t border-slate-100">
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

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xl max-w-md w-full overflow-hidden">
            <div className="bg-slate-900 px-6 py-4 flex items-center justify-between text-white">
              <h3 className="font-extrabold text-sm tracking-tight">
                {modalMode === 'add' ? 'Add New Designation' : 'Edit Designation Details'}
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
                  <label htmlFor="desgName font-bold" className="font-bold text-slate-500">Designation Title</label>
                  <input
                    id="desgName"
                    type="text"
                    value={currentDesg.name}
                    onChange={(e) => setCurrentDesg(prev => ({ ...prev, name: e.target.value }))}
                    className="px-3 py-2 border border-slate-350 rounded-xl focus:ring-1 focus:ring-indigo-500"
                    required
                  />
                </div>
                
                <div className="flex flex-col gap-1">
                  <label htmlFor="desgDept font-bold" className="font-bold text-slate-500">Department</label>
                  <select
                    id="desgDept"
                    value={currentDesg.department}
                    onChange={(e) => setCurrentDesg(prev => ({ ...prev, department: e.target.value }))}
                    className="px-3 py-2 border border-slate-350 rounded-xl focus:ring-1 focus:ring-indigo-500"
                  >
                    {departments.map((d) => (
                      <option key={d.id} value={d.name}>
                        {d.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col gap-1">
                  <label htmlFor="desgLevel font-bold" className="font-bold text-slate-500">Job Grading Level</label>
                  <select
                    id="desgLevel"
                    value={currentDesg.level}
                    onChange={(e) => setCurrentDesg(prev => ({ ...prev, level: e.target.value }))}
                    className="px-3 py-2 border border-slate-350 rounded-xl focus:ring-1 focus:ring-indigo-500 font-mono"
                  >
                    <option value="L1">L1 - Entry Associate</option>
                    <option value="L2">L2 - Professional</option>
                    <option value="L3">L3 - Senior</option>
                    <option value="L4">L4 - Principal / Lead</option>
                    <option value="L5">L5 - Director / Executive</option>
                  </select>
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

export default DesignationTable;
