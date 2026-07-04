import { mockEmployees } from '../../employee/data/mockEmployees';

export const mockAttendance = [];

const dates = [
  '2026-06-29',
  '2026-06-30',
  '2026-07-01',
  '2026-07-02',
  '2026-07-03',
  '2026-07-04',
];

let counter = 1;

dates.forEach((dateStr) => {
  const dayOfWeek = new Date(dateStr).getDay();
  const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

  mockEmployees.forEach((emp, index) => {
    const id = `ATT-${counter.toString().padStart(4, '0')}`;
    counter++;

    let status = 'Present';
    let checkIn = null;
    let checkOut = null;
    let location = 'Office';
    let workingHours = '0.0';
    let overtime = '0.0';

    if (isWeekend) {
      status = 'Weekend';
      location = '-';
    } else {
      // Create seed values for a realistic distribution
      const hashVal = (index + dateStr.charCodeAt(9)) % 100;

      if (hashVal < 4) {
        status = 'Absent';
        location = '-';
      } else if (hashVal < 8) {
        status = 'Leave';
        location = '-';
      } else if (hashVal < 22) {
        status = 'Work From Home';
        location = 'Remote';
        checkIn = `${dateStr}T09:05:00`;
        checkOut = `${dateStr}T18:10:00`;
        workingHours = '9.1';
        overtime = '1.1';
      } else if (hashVal < 35) {
        status = 'Late';
        checkIn = `${dateStr}T09:38:00`;
        checkOut = `${dateStr}T18:15:00`;
        workingHours = '8.6';
        overtime = '0.6';
      } else if (hashVal < 40) {
        status = 'Half Day';
        checkIn = `${dateStr}T09:02:00`;
        checkOut = `${dateStr}T13:02:00`;
        workingHours = '4.0';
        overtime = '0.0';
      } else {
        status = 'Present';
        checkIn = `${dateStr}T08:52:00`;
        checkOut = `${dateStr}T18:02:00`;
        workingHours = '9.2';
        overtime = '1.2';
      }
    }

    mockAttendance.push({
      id,
      employeeId: emp.id,
      firstName: emp.firstName,
      lastName: emp.lastName,
      department: emp.department,
      designation: emp.designation,
      checkIn,
      checkOut,
      workingHours,
      overtime,
      status,
      location,
    });
  });
});
