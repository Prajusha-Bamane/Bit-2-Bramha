import React, { useState, useMemo } from 'react';
import { Plus, Search, Calendar, Trash2, ArrowLeft, ArrowRight } from 'lucide-react';

const HolidayTable = ({ holidays, onAdd, onDelete }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Add holiday state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newHoliday, setNewHoliday] = useState({ name: '', date: '', type: 'National', status: 'Active' });

  // Filter
  const filteredHolidays = useMemo(() => {
    return holidays
      .filter((h) => {
        if (typeFilter === 'all') return true;
        return h.type === typeFilter;
      })
      .filter((h) => {
        if (!searchQuery) return true;
        return (
          h.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          h.date.toLowerCase().includes(searchQuery.toLowerCase()) ||
          h.type.toLowerCase().includes(searchQuery.toLowerCase())
        );
      });
  }, [holidays, searchQuery, typeFilter]);

  // Pagination
  const totalPages = Math.ceil(filteredHolidays.length / itemsPerPage) || 1;
  const paginatedHolidays = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredHolidays.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredHolidays, currentPage]);

  const handleOpenAdd = () => {
    setNewHoliday({ name: '', date: '', type: 'National', status: 'Active' });
    setIsModalOpen(true);
  };

  const handleModalSubmit = (e) => {
    e.preventDefault();
    const dateObj = new Date(newHoliday.date);
    const dayName = dateObj.toLocaleDateString('en-US', { weekday: 'long' });
    
    onAdd({
      ...newHoliday,
      id: `hol-${Date.now()}`,
      day: dayName
    });
    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to remove this holiday?")) {
      onDelete(id);
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-md p-6 space-y-5 select-none">
      
      {/* Header controls */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-sm font-black text-slate-800 tracking-tight">Holiday Management</h2>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">Corporate calendar</p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-750 text-white font-bold text-xs rounded-xl shadow transition cursor-pointer self-start md:self-auto"
        >
          <Plus className="w-4 h-4" />
          Add Holiday
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 border border-slate-350 px-3 py-1.5 rounded-xl bg-white w-full sm:max-w-xs">
          <Search className="w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search holidays..."
            value={searchQuery}
            onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
            className="w-full focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="font-bold text-slate-500">Holiday Type:</span>
          <select
            value={typeFilter}
            onChange={(e) => { setTypeFilter(e.target.value); setCurrentPage(1); }}
            className="px-3 py-1.5 border border-slate-350 rounded-xl focus:ring-1 focus:ring-indigo-500 focus:outline-none"
          >
            <option value="all">All Types</option>
            <option value="National">National Holiday</option>
            <option value="Regional">Regional Holiday</option>
            <option value="Optional">Optional / Restricted</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto border border-slate-100 rounded-xl">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-slate-50 text-slate-500 font-bold border-b border-slate-100">
              <th className="p-3.5">Holiday Name</th>
              <th className="p-3.5">Scheduled Date</th>
              <th className="p-3.5">Day of Week</th>
              <th className="p-3.5 text-center">Type</th>
              <th className="p-3.5 text-center">Status</th>
              <th className="p-3.5 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium">
            {paginatedHolidays.length > 0 ? (
              paginatedHolidays.map((hol) => (
                <tr key={hol.id} className="hover:bg-slate-50/50 transition-colors duration-150">
                  <td className="p-3.5 font-bold text-slate-800">{hol.name}</td>
                  <td className="p-3.5 font-mono text-indigo-650 font-bold">{hol.date}</td>
                  <td className="p-3.5 text-slate-650">{hol.day}</td>
                  <td className="p-3.5 text-center">
                    <span className={`inline-flex px-2 py-0.5 rounded-full text-[9px] font-bold border ${
                      hol.type === 'National'
                        ? 'bg-blue-50 text-blue-700 border-blue-100'
                        : (hol.type === 'Regional' ? 'bg-amber-50 text-amber-700 border-amber-100' : 'bg-slate-50 text-slate-600 border-slate-200')
                    }`}>
                      {hol.type}
                    </span>
                  </td>
                  <td className="p-3.5 text-center">
                    <span className={`inline-flex px-2 py-0.5 rounded-full text-[9px] font-bold border ${
                      hol.status === 'Active'
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-100'
                        : 'bg-rose-50 text-rose-700 border-rose-100'
                    }`}>
                      {hol.status}
                    </span>
                  </td>
                  <td className="p-3.5">
                    <div className="flex items-center justify-center">
                      <button
                        onClick={() => handleDelete(hol.id)}
                        className="p-1 hover:bg-slate-100 rounded text-slate-500 hover:text-rose-600 transition cursor-pointer"
                        title="Delete Holiday"
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
                  No scheduled holidays match.
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

      {/* Add Holiday Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xl max-w-md w-full overflow-hidden">
            <div className="bg-slate-900 px-6 py-4 flex items-center justify-between text-white">
              <h3 className="font-extrabold text-sm tracking-tight">Add New Holiday</h3>
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
                  <label htmlFor="holName font-bold" className="font-bold text-slate-500">Holiday Label / Name</label>
                  <input
                    id="holName"
                    type="text"
                    value={newHoliday.name}
                    onChange={(e) => setNewHoliday(prev => ({ ...prev, name: e.target.value }))}
                    className="px-3 py-2 border border-slate-350 rounded-xl focus:ring-1 focus:ring-indigo-500"
                    placeholder="e.g. Independence Day"
                    required
                  />
                </div>
                
                <div className="flex flex-col gap-1">
                  <label htmlFor="holDate font-bold" className="font-bold text-slate-500">Scheduled Date</label>
                  <input
                    id="holDate"
                    type="date"
                    value={newHoliday.date}
                    onChange={(e) => setNewHoliday(prev => ({ ...prev, date: e.target.value }))}
                    className="px-3 py-2 border border-slate-350 rounded-xl focus:ring-1 focus:ring-indigo-500"
                    required
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label htmlFor="holType font-bold" className="font-bold text-slate-500">Holiday Classification</label>
                  <select
                    id="holType"
                    value={newHoliday.type}
                    onChange={(e) => setNewHoliday(prev => ({ ...prev, type: e.target.value }))}
                    className="px-3 py-2 border border-slate-350 rounded-xl focus:ring-1 focus:ring-indigo-500"
                  >
                    <option value="National">National Holiday</option>
                    <option value="Regional">Regional Holiday</option>
                    <option value="Optional">Optional / Restricted</option>
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
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default HolidayTable;
