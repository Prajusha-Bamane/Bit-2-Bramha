const leaveTypes = ['Casual Leave', 'Sick Leave', 'Earned Leave', 'Work From Home', 'Compensatory Off', 'Emergency Leave'];
const reasons = [
  'Planned family vacation',
  'Medical consultation and recovery',
  'Personal wellness reset',
  'Home renovation and relocation',
  'Festival celebrations with family',
  'Emergency travel for a close relative',
  'Wellness and preventive care',
  'Academic commitments and exams',
  'Short personal break and recharge',
  'Training and upskilling program',
];
const managers = ['Aarav Mehta', 'Nisha Rao', 'Rohit Sharma', 'Maya Chen', 'Devansh Kapoor'];
const statuses = ['Approved', 'Pending', 'Rejected', 'Cancelled'];

const formatDate = (date) => date.toISOString().split('T')[0];

const buildLeaveRecords = () => {
  const records = [];
  for (let index = 0; index < 50; index += 1) {
    const startDate = new Date(2026, 0, 3 + index * 2);
    const duration = [1, 2, 3, 4, 5][index % 5];
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + duration - 1);
    const status = statuses[index % statuses.length];
    const appliedDate = new Date(startDate);
    appliedDate.setDate(startDate.getDate() - 3);

    records.push({
      id: `LV-${String(index + 1).padStart(3, '0')}`,
      employeeId: 'EMP-1087',
      leaveType: leaveTypes[index % leaveTypes.length],
      startDate: formatDate(startDate),
      endDate: formatDate(endDate),
      duration,
      reason: reasons[index % reasons.length],
      status,
      appliedDate: formatDate(appliedDate),
      manager: managers[index % managers.length],
      approver: 'HR Ops Team',
      comments: index % 2 === 0 ? 'Please align with the delivery timeline before approval.' : 'Shared with the team and updated the calendar.',
      emergencyContact: '+91 98765 43210',
      documentPlaceholder: index % 3 === 0 ? 'Medical certificate attached' : 'No document attached',
      timeline: [
        { label: 'Applied', timestamp: formatDate(new Date(appliedDate)) },
        { label: 'Manager Review', timestamp: formatDate(new Date(appliedDate.getTime() + 86400000)) },
        { label: 'HR Review', timestamp: formatDate(new Date(appliedDate.getTime() + 172800000)) },
        { label: status === 'Rejected' ? 'Rejected' : status === 'Cancelled' ? 'Cancelled' : 'Approved', timestamp: formatDate(new Date(endDate.getTime() + 86400000)) },
      ],
    });
  }

  return records;
};

export const mockLeaveRequests = buildLeaveRecords();

export const employeeLeaveBalances = {
  casualLeave: { available: 8, used: 2, remaining: 6 },
  sickLeave: { available: 10, used: 3, remaining: 7 },
  earnedLeave: { available: 16, used: 5, remaining: 11 },
  workFromHome: { available: 12, used: 4, remaining: 8 },
  compensatoryOff: { available: 6, used: 1, remaining: 5 },
  emergencyLeave: { available: 5, used: 1, remaining: 4 },
};

export const companyHolidays = [
  { name: 'Independence Day', date: '2026-08-15', day: 'Friday', remainingDays: 42 },
  { name: 'Ganesh Chaturthi', date: '2026-08-27', day: 'Wednesday', remainingDays: 54 },
  { name: 'Navratri', date: '2026-10-02', day: 'Friday', remainingDays: 90 },
  { name: 'Diwali', date: '2026-11-08', day: 'Sunday', remainingDays: 126 },
];

export const recentActivities = [
  { title: 'Applied Leave', time: '15 mins ago', detail: 'Casual Leave requested for 2 days' },
  { title: 'Cancelled Leave', time: '1 hour ago', detail: 'Leave request LV-013 was withdrawn' },
  { title: 'Leave Approved', time: '3 hours ago', detail: 'Sick Leave approved by manager' },
  { title: 'Leave Rejected', time: 'Yesterday', detail: 'Emergency Leave was not approved' },
];
