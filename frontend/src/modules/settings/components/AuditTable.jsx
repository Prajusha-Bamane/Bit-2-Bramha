import React, { useState, useMemo } from 'react';
import { History, Search, ArrowLeft, ArrowRight, ShieldAlert } from 'lucide-react';

const formatTimeAgo = (isoString) => {
  const date = new Date(isoString);
  return date.toLocaleString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' });
};

const AuditTable = ({ auditLogs }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [modFilter, setModFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const modulesList = ['Auth', 'Employee', 'Leaves', 'Attendance', 'Payroll', 'Settings', 'Documents', 'Notifications'];

  // Filter logs
  const filteredLogs = useMemo(() => {
    return auditLogs
      .filter((l) => {
        if (modFilter === 'all') return true;
        return l.module === modFilter;
      })
      .filter((l) => {
        if (!searchQuery) return true;
        return (
          l.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
          l.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
          l.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          l.ipAddress.toLowerCase().includes(searchQuery.toLowerCase())
        );
      });
  }, [auditLogs, searchQuery, modFilter]);

  // Pagination
  const totalPages = Math.ceil(filteredLogs.length / itemsPerPage) || 1;
  const paginatedLogs = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredLogs.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredLogs, currentPage]);

  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-md p-6 space-y-5 select-none font-sans">
      
      {/* Header */}
      <div className="flex items-center gap-2 border-b border-slate-100 pb-4">
        <History className="w-5 h-5 text-indigo-650" />
        <div>
          <h2 className="text-sm font-bold text-slate-800">System Transaction Audit Logs</h2>
          <p className="text-[10px] text-slate-500 mt-0.5 font-medium">Compliance logging monitors</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 border border-slate-350 px-3 py-1.5 rounded-xl bg-white w-full sm:max-w-xs">
          <Search className="w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search audit logs..."
            value={searchQuery}
            onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
            className="w-full focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="font-bold text-slate-500">Module:</span>
          <select
            value={modFilter}
            onChange={(e) => { setModFilter(e.target.value); setCurrentPage(1); }}
            className="px-3 py-1.5 border border-slate-350 rounded-xl focus:ring-1 focus:ring-indigo-500 focus:outline-none"
          >
            <option value="all">All Modules</option>
            {modulesList.map((m) => (
              <option key={m} value={m}>
                {m} Module
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
              <th className="p-3.5">User</th>
              <th className="p-3.5">Module</th>
              <th className="p-3.5">Operation / Action</th>
              <th className="p-3.5">IP Address</th>
              <th className="p-3.5">User Device</th>
              <th className="p-3.5">Timestamp</th>
              <th className="p-3.5 text-center">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium">
            {paginatedLogs.length > 0 ? (
              paginatedLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50/40 transition">
                  <td className="p-3.5 font-bold text-slate-800">{log.user}</td>
                  <td className="p-3.5">
                    <span className="inline-flex px-2 py-0.5 rounded-full text-[9px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-100 font-mono">
                      {log.module}
                    </span>
                  </td>
                  <td className="p-3.5">
                    <span className="font-bold text-slate-800 block">{log.action}</span>
                    <span className="text-[10px] text-slate-400 block mt-0.5 leading-snug">{log.description}</span>
                  </td>
                  <td className="p-3.5 font-mono text-slate-600">{log.ipAddress}</td>
                  <td className="p-3.5 text-slate-500 truncate max-w-[120px]" title={log.device}>{log.device}</td>
                  <td className="p-3.5 text-slate-400 font-semibold">{formatTimeAgo(log.date)}</td>
                  <td className="p-3.5 text-center">
                    <span className={`inline-flex px-2.5 py-0.5 rounded-full text-[9px] font-bold gap-1 items-center border ${
                      log.status === 'Success'
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-100'
                        : 'bg-rose-50 text-rose-700 border-rose-100 animate-pulse'
                    }`}>
                      {log.status === 'Failure' && <ShieldAlert className="w-3 h-3 text-rose-500" />}
                      {log.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="text-center p-8 text-slate-400">
                  No transaction audit logs found.
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

    </div>
  );
};

export default AuditTable;
export { formatTimeAgo };
