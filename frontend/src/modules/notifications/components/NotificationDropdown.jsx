import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useNotifications } from '../context/NotificationContext';
import { useAuth } from '../../../context/AuthContext';
import NotificationList from './NotificationList';
import NotificationBadge from './NotificationBadge';
import { Bell, Search, CheckCheck, Trash2, X, Maximize2 } from 'lucide-react';

const NotificationDropdown = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  
  const [isOpen, setIsOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all'); // 'all' or 'unread'
  const [searchQuery, setSearchQuery] = useState('');

  const { 
    notifications, 
    unreadCount, 
    markAsRead, 
    markAllAsRead, 
    deleteNotification 
  } = useNotifications();

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleViewAll = () => {
    setIsOpen(false);
    const path = user?.role === 'Admin' || user?.role === 'Manager' ? '/admin/notifications' : '/employee/notifications';
    navigate(path);
  };

  // Filter and search
  const filteredNotifications = notifications
    .filter((n) => {
      if (activeFilter === 'unread') return !n.read;
      return true;
    })
    .filter((n) => {
      if (!searchQuery) return true;
      return (
        n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        n.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    })
    .slice(0, 5); // Limit dropdown display to 5 latest items for brevity

  return (
    <div className="relative font-sans z-30 no-print" ref={dropdownRef}>
      {/* Toggle button */}
      <button
        onClick={handleToggle}
        className="relative p-2.5 hover:bg-slate-100 border border-slate-200 rounded-xl transition duration-150 flex items-center justify-center text-slate-600 focus:outline-none cursor-pointer"
        aria-label="Open notifications"
      >
        <Bell className="w-5 h-5" />
        <NotificationBadge count={unreadCount} />
      </button>

      {/* Dropdown panel */}
      {isOpen && (
        <div className="absolute right-0 mt-3 w-80 sm:w-96 bg-white border border-slate-250 rounded-2xl shadow-xl overflow-hidden flex flex-col max-h-[85vh] animate-fade-in">
          {/* Header */}
          <div className="bg-slate-900 text-white px-5 py-4 flex items-center justify-between">
            <div>
              <h3 className="font-extrabold text-sm tracking-tight flex items-center gap-2">
                Notifications
                {unreadCount > 0 && (
                  <span className="bg-rose-500 text-white font-bold text-[9px] px-2 py-0.5 rounded-full select-none">
                    {unreadCount} New
                  </span>
                )}
              </h3>
              <p className="text-[10px] text-slate-400 mt-0.5 font-medium">Real-time HR status tracking logs.</p>
            </div>
            
            <div className="flex items-center gap-1 opacity-70 hover:opacity-100 transition-opacity">
              <button
                onClick={markAllAsRead}
                className="p-1.5 hover:bg-slate-800 text-slate-200 hover:text-white rounded-lg transition cursor-pointer"
                title="Mark all as read"
              >
                <CheckCheck className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 hover:bg-slate-800 text-slate-200 hover:text-white rounded-lg transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Search bar */}
          <div className="px-4 py-2 border-b border-slate-150 relative">
            <Search className="absolute left-7 top-4 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search notifications..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs border border-slate-350 rounded-xl focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none"
            />
          </div>

          {/* Filters Tab buttons */}
          <div className="flex px-4 py-2 border-b border-slate-150 bg-slate-50 gap-2">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-3 py-1.5 rounded-lg text-[10px] font-bold tracking-wide uppercase transition cursor-pointer ${
                activeFilter === 'all'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-850'
              }`}
            >
              All Alerts
            </button>
            <button
              onClick={() => setActiveFilter('unread')}
              className={`px-3 py-1.5 rounded-lg text-[10px] font-bold tracking-wide uppercase transition cursor-pointer ${
                activeFilter === 'unread'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-850'
              }`}
            >
              Unread
            </button>
          </div>

          {/* Scrollable list */}
          <div className="flex-1 p-4 overflow-y-auto max-h-80 bg-slate-50/40">
            <NotificationList
              notifications={filteredNotifications}
              onMarkRead={markAsRead}
              onDelete={deleteNotification}
            />
          </div>

          {/* Footer View All link */}
          <div className="border-t border-slate-200 px-4 py-3.5 bg-slate-50 flex items-center justify-between text-xs">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
              Showing {filteredNotifications.length} of {notifications.length}
            </span>
            <button
              onClick={handleViewAll}
              className="inline-flex items-center gap-1.5 font-bold text-indigo-600 hover:text-indigo-850 transition cursor-pointer"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              Activity Center
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationDropdown;
