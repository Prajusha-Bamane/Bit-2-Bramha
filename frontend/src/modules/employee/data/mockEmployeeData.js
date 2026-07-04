export const mockEmployee = {
  id: 'b81ef392-12d8-4f92-9b21-4fa3e46c78bc',
  employeeId: 'EMP-2026-98',
  firstName: 'Jane',
  lastName: 'Doe',
  email: 'jane@hrms.com',
  role: 'Senior React Engineer',
  department: 'Engineering',
  avatar: 'JD',
  manager: 'System Administrator',
  status: 'Active',
  motivationalMessage: '🚀 "Code is like humor. When you have to explain it, it’s bad." Keep pushing elegant commits today!',
  
  kpis: {
    attendanceRate: 98.2,
    leaveBalance: 16,
    nextSalaryDate: 'July 31, 2026',
    hoursThisWeek: 38.5,
    pendingLeaves: 1,
    approvedLeaves: 5
  },
  
  attendance: {
    status: 'Clocked Out',
    checkInTime: '--:--',
    checkOutTime: '--:--',
    workingHoursToday: '0h 0m',
    location: 'Remote (Vpn Secure)',
    summary: {
      attendanceRate: 98.2,
      presentDays: 21,
      absentDays: 0,
      lateArrivals: 1,
      halfDays: 0
    },
    logs: [
      { date: '2026-07-03', status: 'Present', checkIn: '09:02 AM', checkOut: '06:05 PM', hours: 9.05 },
      { date: '2026-07-02', status: 'Present', checkIn: '08:58 AM', checkOut: '05:45 PM', hours: 8.78 },
      { date: '2026-07-01', status: 'Present', checkIn: '09:15 AM', checkOut: '06:00 PM', hours: 8.75 },
      { date: '2026-06-30', status: 'Leave', checkIn: '--:--', checkOut: '--:--', hours: 0 },
      { date: '2026-06-29', status: 'Present', checkIn: '09:00 AM', checkOut: '05:30 PM', hours: 8.5 }
    ]
  },
  
  leaves: {
    total: 26,
    used: 10,
    remaining: 16,
    upcoming: 'July 14, 2026 (Annual Leave)',
    pending: 1,
    balances: [
      { type: 'Annual Leave', total: 12, used: 5, remaining: 7, color: 'bg-indigo-600' },
      { type: 'Casual Leave', total: 6, used: 2, remaining: 4, color: 'bg-emerald-600' },
      { type: 'Medical Leave', total: 8, used: 3, remaining: 5, color: 'bg-amber-600' }
    ],
    history: [
      { type: 'Annual Leave', startDate: '2026-07-14', endDate: '2026-07-16', days: 3, status: 'Pending Approval' },
      { type: 'Casual Leave', startDate: '2026-06-30', endDate: '2026-06-30', days: 1, status: 'Approved' },
      { type: 'Medical Leave', startDate: '2026-05-12', endDate: '2026-05-13', days: 2, status: 'Approved' }
    ]
  },
  
  payroll: {
    currentSalary: '$8,500.00',
    lastSalaryDate: 'June 30, 2026',
    upcomingPayroll: 'July 31, 2026',
    latestPayslip: {
      month: 'June 2026',
      basicPay: '$6,000.00',
      allowances: '$2,900.00',
      deductions: '$400.00',
      netPay: '$8,500.00',
      bankName: 'HDFC Bank',
      accountNum: '•••• 4321',
      status: 'Paid'
    }
  },
  
  events: [
    { type: 'Meeting', title: 'Sprint Retrospective', time: 'Today, 03:00 PM', desc: 'Engineering sync-up' },
    { type: 'Birthday', title: 'Sarah Jenkins (UX Designer)', time: 'July 07, 2026', desc: 'Wish her a happy birthday!' },
    { type: 'Holiday', title: 'Independence Day', time: 'July 04, 2026', desc: 'Public Holiday' },
    { type: 'Training', title: 'Docker Orchestration', time: 'July 18, 2026', desc: 'Mandatory tech course' }
  ],
  
  notifications: [
    { id: 1, message: 'Your casual leave request for June 30 has been Approved.', time: '2 days ago', unread: false },
    { id: 2, message: 'Salary payslip for June 2026 is ready for download.', time: '4 days ago', unread: false },
    { id: 3, message: 'HR uploaded new Insurance Policies to the Documents module.', time: '1 week ago', unread: true },
    { id: 4, message: 'System Update: Node server migrate completed successfully.', time: '1 week ago', unread: false }
  ],
  
  activities: [
    { icon: 'CheckIn', text: 'Checked in remotely from VPN.', time: 'Yesterday, 09:02 AM' },
    { icon: 'LeaveApply', text: 'Submitted request for 3 days of Annual Leave.', time: '2 days ago' },
    { icon: 'Payslip', text: 'Downloaded Payslip for June 2026.', time: '4 days ago' },
    { icon: 'ProfileUpdate', text: 'Updated corporate emergency phone numbers.', time: '2 weeks ago' }
  ]
};
