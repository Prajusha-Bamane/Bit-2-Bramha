import { mockEmployees } from '../../employee/data/mockEmployees';

export const mockLeaves = [];

const leaveTypes = [
  'Casual Leave', 'Sick Leave', 'Earned Leave', 'Maternity Leave', 
  'Paternity Leave', 'Work From Home', 'Compensatory Off', 'Unpaid Leave', 
  'Emergency Leave'
];

const leaveReasons = [
  'Fever and medical rest advised by physician',
  'Family function at native place in Pune',
  'Urgent personal bank work in local branch',
  'Maternity care support duties',
  'Migraine headache and home rest',
  'Regional wedding ceremony travel',
  'Broadband outage at home residence',
  'Stomach infection treatment and recovery',
  'Accompanying parent to routine hospital checkup',
  'Regional festival celebrations with relatives'
];

const approversList = [
  'Rahul Sharma (HR Director)',
  'Amit Kumar (Technical Architect)',
  'Manoj Vyas (COO)'
];

const statusesList = ['Approved', 'Approved', 'Approved', 'Rejected', 'Pending'];

let counter = 1;

// Generate 4 requests per employee (4 * 52 = 208 entries)
mockEmployees.forEach((emp, index) => {
  for (let i = 0; i < 4; i++) {
    const id = `LEV-${counter.toString().padStart(4, '0')}`;
    counter++;

    const leaveType = leaveTypes[(index + i) % leaveTypes.length];
    const status = statusesList[(index + i * 7) % statusesList.length];
    const reason = leaveReasons[(index + i * 3) % leaveReasons.length];
    const approver = status === 'Pending' ? '-' : approversList[(index + i) % approversList.length];

    // Compute dates back in time
    const startDay = 1 + ((index + i * 6) % 25);
    const startMonth = 4 + (i % 3); // April, May, June 2026
    const startDate = `2026-0${startMonth}-${startDay.toString().padStart(2, '0')}`;
    
    // 1-3 days duration
    const duration = 1 + ((index + i) % 3);
    const endDay = startDay + duration - 1;
    const endDate = `2026-0${startMonth}-${endDay.toString().padStart(2, '0')}`;

    const requestDay = startDay - 5 > 0 ? startDay - 5 : 1;
    const requestedOn = `2026-0${startMonth}-${requestDay.toString().padStart(2, '0')}`;

    mockLeaves.push({
      id,
      employeeId: emp.id,
      firstName: emp.firstName,
      lastName: emp.lastName,
      department: emp.department,
      designation: emp.designation,
      leaveType,
      startDate,
      endDate,
      duration,
      halfDay: i % 7 === 0,
      reason,
      status,
      approver,
      requestedOn,
      comments: status === 'Approved' ? 'Approved by supervisor' : (status === 'Rejected' ? 'Rejected due to urgent client delivery schedules' : ''),
      emergencyPhone: emp.phone || '+91 98765 43210',
    });
  }
});
