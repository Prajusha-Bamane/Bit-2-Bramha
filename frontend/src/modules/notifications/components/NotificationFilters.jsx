import React from 'react';
import { Filter, Calendar, AlertCircle, FileText, CheckCircle } from 'lucide-react';

const NotificationFilters = ({
  searchQuery,
  onSearchChange,
  dateFilter,
  onDateFilterChange,
  readFilter,
  onReadFilterChange,
  categoryFilter,
  onCategoryFilterChange,
  priorityFilter,
  onPriorityFilterChange,
  categoriesList,
  prioritiesList
}) => {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-md p-6 space-y-6">
      
      {/* Filter Header */}
      <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
        <Filter className="w-4.5 h-4.5 text-indigo-600" />
        <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Search & Filters</h3>
      </div>

      {/* Search Input */}
      <div className="flex flex-col gap-1 text-xs">
        <label htmlFor="search" className="font-bold text-slate-500">Query keyword</label>
        <input
          id="search"
          type="text"
          placeholder="Search notifications..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full px-3 py-2 border border-slate-350 rounded-xl focus:ring-1 focus:ring-indigo-500 focus:outline-none"
        />
      </div>

      {/* Unread Status Filter */}
      <div className="space-y-2">
        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
          <CheckCircle className="w-3.5 h-3.5" />
          Read status
        </label>
        <div className="grid grid-cols-2 gap-2 text-[10px] font-bold tracking-wide uppercase">
          <button
            onClick={() => onReadFilterChange('all')}
            className={`px-3 py-2 border rounded-xl transition cursor-pointer text-center ${
              readFilter === 'all'
                ? 'bg-indigo-600 text-white border-transparent shadow-sm'
                : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
            }`}
          >
            All Logs
          </button>
          <button
            onClick={() => onReadFilterChange('unread')}
            className={`px-3 py-2 border rounded-xl transition cursor-pointer text-center ${
              readFilter === 'unread'
                ? 'bg-indigo-600 text-white border-transparent shadow-sm'
                : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
            }`}
          >
            Unread
          </button>
        </div>
      </div>

      {/* Date Filter */}
      <div className="space-y-2">
        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
          <Calendar className="w-3.5 h-3.5" />
          Date intervals
        </label>
        <select
          value={dateFilter}
          onChange={(e) => onDateFilterChange(e.target.value)}
          className="w-full px-3 py-2 text-xs border border-slate-350 rounded-xl focus:ring-1 focus:ring-indigo-500 focus:outline-none"
        >
          <option value="all">All Time</option>
          <option value="today">Today</option>
          <option value="yesterday">Yesterday</option>
          <option value="week">This Week</option>
        </select>
      </div>

      {/* Priority Filter */}
      <div className="space-y-2">
        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
          <AlertCircle className="w-3.5 h-3.5" />
          Priority level
        </label>
        <select
          value={priorityFilter}
          onChange={(e) => onPriorityFilterChange(e.target.value)}
          className="w-full px-3 py-2 text-xs border border-slate-350 rounded-xl focus:ring-1 focus:ring-indigo-500 focus:outline-none"
        >
          <option value="all">All Priorities</option>
          {prioritiesList.map((pri) => (
            <option key={pri} value={pri}>
              {pri} Priority
            </option>
          ))}
        </select>
      </div>

      {/* Category Filter */}
      <div className="space-y-2">
        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
          <FileText className="w-3.5 h-3.5" />
          Notification category
        </label>
        <select
          value={categoryFilter}
          onChange={(e) => onCategoryFilterChange(e.target.value)}
          className="w-full px-3 py-2 text-xs border border-slate-350 rounded-xl focus:ring-1 focus:ring-indigo-500 focus:outline-none"
        >
          <option value="all">All Categories</option>
          {categoriesList.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

    </div>
  );
};

export default NotificationFilters;
