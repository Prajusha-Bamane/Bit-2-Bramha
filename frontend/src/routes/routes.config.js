export const ROUTES = {
  PUBLIC: {
    LOGIN: '/login',
  },
  ADMIN: {
    DASHBOARD: '/admin/dashboard',
    EMPLOYEES: '/admin/employees',
    ATTENDANCE: '/admin/attendance',
    LEAVES: '/admin/leaves',
    PAYROLL: '/admin/payroll',
    REPORTS: '/admin/reports',
  },
  EMPLOYEE: {
    DASHBOARD: '/employee/dashboard',
    ATTENDANCE: '/employee/attendance',
    LEAVES: '/employee/leaves',
    PAYROLL: '/employee/payroll',
    PROFILE: '/employee/profile',
    DOCUMENTS: '/employee/documents',
    NOTIFICATIONS: '/employee/notifications',
    SETTINGS: '/employee/settings',
  },
  PROTECTED: {
    DASHBOARD: '/dashboard',
    EMPLOYEES: '/employees',
    ATTENDANCE: '/attendance',
    LEAVES: '/leaves',
    PAYROLL: '/payroll',
    REPORTS: '/reports',
    UNAUTHORIZED: '/unauthorized',
  },
};
