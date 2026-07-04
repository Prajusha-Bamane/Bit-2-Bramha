import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';
import apiClient from '../../../services/api.client';
import { mockNotificationData } from '../data/mockNotificationData';

const NotificationContext = createContext(null);

export const NotificationProvider = ({ children }) => {
  const { user } = useAuth();
  
  const [notifications, setNotifications] = useState([]);
  const [activities, setActivities] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [events, setEvents] = useState([]);
  const [reminders, setReminders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load initial notifications targeted to the user's role
  useEffect(() => {
    const fetchNotifications = async () => {
      setLoading(true);
      try {
        const [notifRes, actRes, annRes] = await Promise.all([
          apiClient.get('/notifications'),
          apiClient.get('/activities'),
          apiClient.get('/announcements')
        ]);
        
        // Target filtering based on role if backend doesn't filter
        const userRole = user?.role === 'Admin' || user?.role === 'Manager' ? 'Admin' : 'Employee';
        const filteredNotifs = notifRes.data.data.filter(n => n.targetRole === userRole);
        
        setNotifications(filteredNotifs);
        setActivities(actRes.data.data);
        setAnnouncements(annRes.data.data);
      } catch (err) {
        console.warn('Notification REST API not active yet. Gracefully falling back to mock data engine.', err);
        
        const userRole = user?.role === 'Admin' || user?.role === 'Manager' ? 'Admin' : 'Employee';
        const filteredNotifs = mockNotificationData.notifications.filter(
          (n) => n.targetRole === userRole
        );
        
        setNotifications(filteredNotifs);
        setActivities(mockNotificationData.activities);
        setAnnouncements(mockNotificationData.announcements);
        setEvents(mockNotificationData.colleagueEvents);
        
        // Filter compliance reminders depending on role
        if (userRole === 'Admin') {
          setReminders(mockNotificationData.complianceReminders.filter(r => r.title.includes('Leave') || r.title.includes('Attendance')));
        } else {
          setReminders(mockNotificationData.complianceReminders.filter(r => !r.title.includes('Leave') || r.title.includes('Pending Attendance')));
        }
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchNotifications();
    } else {
      setNotifications([]);
      setActivities([]);
      setAnnouncements([]);
      setEvents([]);
      setReminders([]);
    }
  }, [user]);

  // WebSocket Live simulation trigger
  useEffect(() => {
    if (!user) return;

    const userRole = user.role === 'Admin' || user.role === 'Manager' ? 'Admin' : 'Employee';

    // Simulate WebSocket connection and events arriving
    const liveSocketSimulation = setInterval(() => {
      const randomId = Math.floor(Math.random() * 10000);
      const isHighPriority = Math.random() > 0.7;
      
      const newAlerts = userRole === 'Admin' ? [
        { title: 'Late Clock-in Registered', desc: 'Rahul Sharma clocked in 15 mins late today.', cat: 'Attendance' },
        { title: 'New Leave Request Received', desc: 'Priya Nair submitted a request for Casual Leave.', cat: 'Leave' },
        { title: 'NDA Doc Uploaded', desc: 'Vikas Sawant uploaded the signed NDA compliance document.', cat: 'Documents' },
      ] : [
        { title: 'Leave Request Approved', desc: 'Your manager approved your leaves requested for next week.', cat: 'Leave' },
        { title: 'Payroll Slips Released', desc: 'Form 16 Tax certificates are ready in your Documents Vault.', cat: 'Documents' },
        { title: 'Direct Bank Deposit Credited', desc: 'Monthly compensation successfully credited to your account.', cat: 'Payroll' },
      ];

      const item = newAlerts[Math.floor(Math.random() * newAlerts.length)];
      
      const incomingPayload = {
        id: `NTF-LIVE-${randomId}`,
        targetRole: userRole,
        title: item.title,
        description: item.desc,
        category: item.cat,
        priority: isHighPriority ? 'High' : 'Low',
        read: false,
        timestamp: new Date().toISOString()
      };

      // Push real-time event log
      setNotifications((prev) => [incomingPayload, ...prev]);

      // Add to activities timeline too
      const newActivity = {
        id: `ACT-LIVE-${randomId}`,
        userName: userRole === 'Admin' ? 'System Auditor' : `${user.firstName} ${user.lastName}`,
        userAvatar: userRole === 'Admin' ? 'SA' : `${user.firstName[0]}${user.lastName[0]}`,
        title: item.title,
        description: item.desc,
        timestamp: new Date().toISOString(),
        priority: isHighPriority ? 'High' : 'Low',
        status: 'Success',
        category: item.cat
      };
      setActivities((prev) => [newActivity, ...prev]);

      // Trigger a browser notification sound or toast simulation in state
      console.log('🔔 [WebSocket] Live notification received:', incomingPayload);
    }, 45000); // Emits every 45 seconds for visual presentation

    return () => clearInterval(liveSocketSimulation);
  }, [user]);

  // Operations handlers
  const markAsRead = async (id) => {
    try {
      await apiClient.put('/notifications/read', { ids: [id] });
    } catch (err) {
      console.warn('API update failed. Updating context locally.', err);
    }
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = async () => {
    const unreadIds = notifications.filter((n) => !n.read).map((n) => n.id);
    if (unreadIds.length === 0) return;
    try {
      await apiClient.put('/notifications/read', { ids: unreadIds });
    } catch (err) {
      console.warn('API update failed. Marking all read locally.', err);
    }
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const deleteNotification = async (id) => {
    try {
      await apiClient.delete(`/notifications/${id}`);
    } catch (err) {
      console.warn('API deletion failed. Deleting locally.', err);
    }
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const addNotification = (notif) => {
    setNotifications((prev) => [notif, ...prev]);
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        activities,
        announcements,
        events,
        reminders,
        loading,
        markAsRead,
        markAllAsRead,
        deleteNotification,
        addNotification
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used inside a NotificationProvider context wrapper.');
  }
  return context;
};

export default NotificationContext;
