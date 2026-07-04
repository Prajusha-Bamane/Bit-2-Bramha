export const mockReportsData = {
  kpis: {
    totalEmployees: 52,
    avgAttendance: '95.4%',
    leaveUtilization: '40.0%',
    payrollExpense: '₹6.2L',
    departmentPerformance: '88.4%',
    newHiresThisMonth: 3,
    attritionRate: '2.8%',
  },
  
  monthlyGrowth: [
    { month: 'Jul 25', headcount: 40 },
    { month: 'Aug 25', headcount: 42 },
    { month: 'Sep 25', headcount: 43 },
    { month: 'Oct 25', headcount: 45 },
    { month: 'Nov 25', headcount: 46 },
    { month: 'Dec 25', headcount: 48 },
    { month: 'Jan 26', headcount: 48 },
    { month: 'Feb 26', headcount: 49 },
    { month: 'Mar 26', headcount: 50 },
    { month: 'Apr 26', headcount: 52 },
    { month: 'May 26', headcount: 52 },
    { month: 'Jun 26', headcount: 52 },
  ],

  attendanceTrends: [
    { day: 'Mon', rate: 96.2 },
    { day: 'Tue', rate: 97.4 },
    { day: 'Wed', rate: 95.8 },
    { day: 'Thu', rate: 94.2 },
    { day: 'Fri', rate: 93.6 },
    { day: 'Sat', rate: 90.5 },
  ],

  payrollOutflow: [
    { name: 'Jan', expense: 4.8 },
    { name: 'Feb', expense: 5.2 },
    { name: 'Mar', expense: 4.9 },
    { name: 'Apr', expense: 5.6 },
    { name: 'May', expense: 5.8 },
    { name: 'Jun', expense: 6.2 },
  ],

  leaveTrends: [
    { name: 'Jan', approved: 12, rejected: 3 },
    { name: 'Feb', approved: 18, rejected: 2 },
    { name: 'Mar', approved: 15, rejected: 1 },
    { name: 'Apr', approved: 22, rejected: 4 },
    { name: 'May', approved: 28, rejected: 3 },
    { name: 'Jun', approved: 35, rejected: 5 },
  ],

  departmentStats: [
    { department: 'Software Development', employees: 18, presence: '96.2%', cost: '₹2.8L', leaves: 45, performance: 92 },
    { department: 'QA', employees: 10, presence: '94.8%', cost: '₹1.2L', leaves: 22, performance: 88 },
    { department: 'Human Resources', employees: 5, presence: '95.0%', cost: '₹0.95L', leaves: 15, performance: 89 },
    { department: 'Finance', employees: 4, presence: '93.4%', cost: '₹1.1L', leaves: 12, performance: 86 },
    { department: 'Marketing', employees: 6, presence: '91.8%', cost: '₹0.92L', leaves: 28, performance: 85 },
    { department: 'Sales', employees: 5, presence: '92.0%', cost: '₹0.88L', leaves: 32, performance: 82 },
    { department: 'Operations', employees: 4, presence: '94.2%', cost: '₹0.80L', leaves: 10, performance: 87 },
  ],

  insights: [
    { message: 'Average attendance increased by 1.2% over the last 30 days due to WFH flexibility policy adjustments.', type: 'positive' },
    { message: 'Operations department salary budget indicates +4.2% variance from initial yearly baseline projections.', type: 'warning' },
    { message: 'Marketing department has the highest leaves count (28 days total). Recommend workload auditing.', type: 'neutral' },
    { message: 'QA absenteeism dropped to the lowest historical level in 6 cycles following the weekly sync restructure.', type: 'positive' },
  ],

  recentReports: [
    { name: 'Staff Annual Salary Ledger', createdBy: 'Amit Kumar', date: '2026-06-30', status: 'Generated' },
    { name: 'Weekly Attendance Performance Logs', createdBy: 'Rahul Sharma', date: '2026-07-02', status: 'Ready' },
    { name: 'Q2 Leaves Utilization Sheet', createdBy: 'Divya Mehta', date: '2026-07-03', status: 'Archived' },
  ],
};
