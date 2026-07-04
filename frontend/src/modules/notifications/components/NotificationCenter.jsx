import React, { useState, useMemo } from 'react';
import { useNotifications } from '../context/NotificationContext';
import NotificationList from './NotificationList';
import NotificationFilters from './NotificationFilters';
import ActivityTimeline from './ActivityTimeline';
import AnnouncementCard from './AnnouncementCard';
import ReminderCard from './ReminderCard';
import EventCard from './EventCard';
import { 
  Bell, 
  Activity, 
  Megaphone, 
  CalendarClock, 
  Sparkles, 
  CheckCheck, 
  AlertTriangle 
} from 'lucide-react';

const NotificationCenter = ({ role }) => {
  const {
    notifications,
    unreadCount,
    activities,
    announcements,
    events,
    reminders,
    markAsRead,
    markAllAsRead,
    deleteNotification
  } = useNotifications();

  const [activeCenterTab, setActiveCenterTab] = useState('inbox');
  
  // Filtering states
  const [searchQuery, setSearchQuery] = useState('');
  const [dateFilter, setDateFilter] = useState('all');
  const [readFilter, setReadFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');

  // Categories list based on mock data categories
  const categoriesList = ['Attendance', 'Leave', 'Payroll', 'Employees', 'Documents', 'Announcements', 'Security', 'System'];
  const prioritiesList = ['High', 'Medium', 'Low'];

  // Filter computation
  const filteredNotifications = useMemo(() => {
    let list = [...notifications];

    // 1. Search Query
    if (searchQuery) {
      list = list.filter(
        (n) =>
          n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          n.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // 2. Read status
    if (readFilter === 'unread') {
      list = list.filter((n) => !n.read);
    }

    // 3. Category
    if (categoryFilter !== 'all') {
      list = list.filter((n) => n.category === categoryFilter);
    }

    // 4. Priority
    if (priorityFilter !== 'all') {
      list = list.filter((n) => n.priority === priorityFilter);
    }

    // 5. Date intervals
    if (dateFilter !== 'all') {
      const now = new Date();
      list = list.filter((n) => {
        const date = new Date(n.timestamp);
        const diffMs = now - date;
        const diffDays = diffMs / (1000 * 60 * 60 * 24);

        if (dateFilter === 'today') {
          return date.toDateString() === now.toDateString();
        }
        if (dateFilter === 'yesterday') {
          const yesterday = new Date();
          yesterday.setDate(now.getDate() - 1);
          return date.toDateString() === yesterday.toDateString();
        }
        if (dateFilter === 'week') {
          return diffDays <= 7;
        }
        return true;
      });
    }

    return list;
  }, [notifications, searchQuery, dateFilter, readFilter, categoryFilter, priorityFilter]);

  // Tab views
  return (
    <div className="space-y-6 font-sans select-none">
      
      {/* 1. Header controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white border border-slate-200 p-5 rounded-2xl shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-indigo-600 text-white rounded-xl shadow-md">
            <Bell className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-800 tracking-tight">Notification & Activity Center</h2>
            <p className="text-xs text-slate-500 mt-0.5">Manage target notifications, announcements, and timeline audits.</p>
          </div>
        </div>

        {unreadCount > 0 && activeCenterTab === 'inbox' && (
          <button
            onClick={markAllAsRead}
            className="flex items-center gap-1.5 px-4 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 hover:text-indigo-850 font-bold text-xs rounded-xl border border-indigo-200/50 shadow-sm transition cursor-pointer self-start sm:self-auto"
          >
            <CheckCheck className="w-4 h-4" />
            Mark All as Read
          </button>
        )}
      </div>

      {/* 2. Primary tab switches */}
      <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl self-start border border-slate-200/50 w-fit no-print">
        <button
          onClick={() => setActiveCenterTab('inbox')}
          className={`px-4 py-2.5 rounded-lg text-xs font-bold transition flex items-center gap-2 cursor-pointer ${
            activeCenterTab === 'inbox'
              ? 'bg-white text-indigo-600 shadow-sm'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Bell className="w-4.5 h-4.5" />
          Inbox Alerts ({filteredNotifications.length})
        </button>
        <button
          onClick={() => setActiveCenterTab('timeline')}
          className={`px-4 py-2.5 rounded-lg text-xs font-bold transition flex items-center gap-2 cursor-pointer ${
            activeCenterTab === 'timeline'
              ? 'bg-white text-indigo-600 shadow-sm'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Activity className="w-4.5 h-4.5" />
          Audit Timeline ({activities.length})
        </button>
        <button
          onClick={() => setActiveCenterTab('announcements')}
          className={`px-4 py-2.5 rounded-lg text-xs font-bold transition flex items-center gap-2 cursor-pointer ${
            activeCenterTab === 'announcements'
              ? 'bg-white text-indigo-600 shadow-sm'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Megaphone className="w-4.5 h-4.5" />
          Announcements ({announcements.length})
        </button>
      </div>

      {/* 3. Panel render */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        
        {activeCenterTab === 'inbox' && (
          <>
            {/* Filters Left column */}
            <div className="lg:col-span-1">
              <NotificationFilters
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                dateFilter={dateFilter}
                onDateFilterChange={setDateDate => setDateFilter(setDateDate)}
                readFilter={readFilter}
                onReadFilterChange={setReadDate => setReadFilter(setReadDate)}
                categoryFilter={categoryFilter}
                onCategoryFilterChange={setCatDate => setCategoryFilter(setCatDate)}
                priorityFilter={priorityFilter}
                onPriorityFilterChange={setPriDate => setPriorityFilter(setPriDate)}
                categoriesList={categoriesList}
                prioritiesList={prioritiesList}
              />
            </div>

            {/* List Middle column */}
            <div className="lg:col-span-2 space-y-4">
              <NotificationList
                notifications={filteredNotifications}
                onMarkRead={markAsRead}
                onDelete={deleteNotification}
              />
            </div>

            {/* Sidebar Right: Reminders & Events */}
            <div className="lg:col-span-1 space-y-6">
              {/* Reminders section */}
              <div className="space-y-3.5">
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                  <CalendarClock className="w-4.5 h-4.5 text-indigo-500" />
                  Compliance Reminders
                </h3>
                {reminders && reminders.length > 0 ? (
                  reminders.map((rem) => (
                    <ReminderCard key={rem.id} reminder={rem} />
                  ))
                ) : (
                  <p className="text-xs text-slate-500 bg-white border p-4 rounded-xl">No pending tasks.</p>
                )}
              </div>

              {/* Events section */}
              <div className="space-y-3.5">
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-4.5 h-4.5 text-amber-500" />
                  Colleague Board
                </h3>
                {events && events.length > 0 ? (
                  events.map((ev) => (
                    <EventCard key={ev.id} event={ev} />
                  ))
                ) : (
                  <p className="text-xs text-slate-500 bg-white border p-4 rounded-xl">No upcoming events.</p>
                )}
              </div>
            </div>
          </>
        )}

        {activeCenterTab === 'timeline' && (
          <div className="lg:col-span-4">
            <ActivityTimeline activities={activities} />
          </div>
        )}

        {activeCenterTab === 'announcements' && (
          <div className="lg:col-span-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {announcements.map((ann) => (
              <AnnouncementCard key={ann.id} announcement={ann} />
            ))}
          </div>
        )}

      </div>

    </div>
  );
};

export default NotificationCenter;
