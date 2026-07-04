// Mock Attendance Logs Generator for Jane Doe (90+ entries)

const generateAttendanceRecords = () => {
  const records = [];
  const startDate = new Date('2026-04-01');
  const endDate = new Date('2026-07-03'); // Total 94 days

  const locations = ['Remote', 'Office', 'WFH'];
  const devices = ['Web Portal', 'Mobile App'];

  const holidays = {
    '2026-05-01': 'May Day',
    '2026-07-04': 'Independence Day',
  };

  const currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    const dateStr = currentDate.toISOString().split('T')[0];
    const dayOfWeek = currentDate.getDay(); // 0 = Sunday, 6 = Saturday

    let record = {
      date: dateStr,
      checkIn: '--:--',
      checkOut: '--:--',
      workingHours: 0,
      breakHours: 0,
      status: 'Absent',
      location: '--',
      device: '--',
      overtime: 0,
    };

    if (dayOfWeek === 0 || dayOfWeek === 6) {
      record.status = 'Weekend';
    } else if (holidays[dateStr]) {
      record.status = 'Holiday';
      record.location = 'Corporate Holiday';
    } else {
      // 5% chance of being on approved Leave
      const isLeave = Math.random() < 0.05;
      if (isLeave) {
        record.status = 'Leave';
        record.location = 'Approved Time Off';
      } else {
        // Working Day
        const checkInHour = 8 + (Math.random() < 0.2 ? 1 : 0); // 80% 8 AM, 20% 9 AM
        const checkInMinute = Math.floor(Math.random() * 60);
        
        // Late Entry if check-in is after 09:15 AM
        const isLate = (checkInHour === 9 && checkInMinute > 15) || checkInHour > 9;
        
        // Check-in formatting
        const checkInPadHour = checkInHour > 12 ? checkInHour - 12 : checkInHour;
        const checkInAMPM = checkInHour >= 12 ? 'PM' : 'AM';
        record.checkIn = `${String(checkInPadHour).padStart(2, '0')}:${String(checkInMinute).padStart(2, '0')} ${checkInAMPM}`;
        
        // 5% chance of Half-Day
        const isHalfDay = Math.random() < 0.05;
        let workingHoursDec = 0;
        let breakHoursDec = 0;
        
        if (isHalfDay) {
          record.status = 'Half-Day';
          // Check-out around 1:00 PM - 2:00 PM
          const checkOutHour = 13 + Math.floor(Math.random() * 2);
          const checkOutMinute = Math.floor(Math.random() * 60);
          record.checkOut = `${String(checkOutHour - 12).padStart(2, '0')}:${String(checkOutMinute).padStart(2, '0')} PM`;
          
          breakHoursDec = 0.5; // 30 min break
          workingHoursDec = (checkOutHour + checkOutMinute / 60) - (checkInHour + checkInMinute / 60) - breakHoursDec;
        } else {
          record.status = isLate ? 'Late' : 'Present';
          // Standard check-out around 5:00 PM - 6:30 PM (17:00 - 18:30)
          const checkOutHour = 17 + Math.floor(Math.random() * 2);
          const checkOutMinute = Math.floor(Math.random() * 60);
          record.checkOut = `${String(checkOutHour - 12).padStart(2, '0')}:${String(checkOutMinute).padStart(2, '0')} PM`;
          
          breakHoursDec = 1.0 + (Math.random() * 0.5 - 0.25); // ~1 hr break
          workingHoursDec = (checkOutHour + checkOutMinute / 60) - (checkInHour + checkInMinute / 60) - breakHoursDec;
        }

        record.workingHours = parseFloat(workingHoursDec.toFixed(2));
        record.breakHours = parseFloat(breakHoursDec.toFixed(2));
        record.location = locations[Math.floor(Math.random() * locations.length)];
        record.device = devices[Math.floor(Math.random() * devices.length)];
        
        // Overtime check (standard hours = 8.0)
        if (record.workingHours > 8.0 && record.status !== 'Half-Day') {
          record.overtime = parseFloat((record.workingHours - 8.0).toFixed(2));
        }
      }
    }

    records.push(record);
    currentDate.setDate(currentDate.getDate() + 1);
  }

  // Reverse list to show newest records first
  return records.reverse();
};

export const mockAttendanceHistory = generateAttendanceRecords();

export const mockAttendanceSummary = {
  presentDays: mockAttendanceHistory.filter(r => r.status === 'Present' || r.status === 'Late').length,
  absentDays: mockAttendanceHistory.filter(r => r.status === 'Absent').length,
  lateArrivals: mockAttendanceHistory.filter(r => r.status === 'Late').length,
  halfDays: mockAttendanceHistory.filter(r => r.status === 'Half-Day').length,
  wfhDays: mockAttendanceHistory.filter(r => r.location === 'WFH' || r.location === 'Remote').length,
  avgWorkingHours: parseFloat((mockAttendanceHistory
    .filter(r => r.workingHours > 0)
    .reduce((acc, r) => acc + r.workingHours, 0) / mockAttendanceHistory.filter(r => r.workingHours > 0).length).toFixed(2)),
  attendancePercentage: parseFloat(((mockAttendanceHistory.filter(r => r.status === 'Present' || r.status === 'Late' || r.status === 'Half-Day').length / 
    mockAttendanceHistory.filter(r => r.status !== 'Weekend' && r.status !== 'Holiday').length) * 100).toFixed(2))
};
