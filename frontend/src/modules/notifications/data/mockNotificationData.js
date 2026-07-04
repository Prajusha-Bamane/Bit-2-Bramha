// Mock Data Engine for Notification & Activity Center

const categories = ['Attendance', 'Leave', 'Payroll', 'Employees', 'Documents', 'Announcements', 'Security', 'System'];
const priorities = ['High', 'Medium', 'Low'];

const indianNames = [
  'Amit Patel', 'Priya Nair', 'Rajesh Sharma', 'Sneha Reddy', 'Rohan Deshmukh',
  'Anjali Sen', 'Vikram Singh', 'Pooja Gupta', 'Rahul Vyas', 'Divya Mehta',
  'Arjun Dave', 'Neha Verma', 'Sanjay Chawla', 'Kavita Pillai', 'Manoj Hegde',
  'Deepa Iyer', 'Sunil Modi', 'Swati Rawal', 'Vikas Sawant', 'Vinay Kapoor'
];

const departments = ['Engineering', 'Human Resources', 'Finance', 'Operations', 'Marketing', 'Sales', 'Design', 'QA'];

// Generate 100 Notifications (approx. 50 Admin, 50 Employee)
const generateNotifications = () => {
  const list = [];
  
  // 1. Admin notifications (Indices 0 - 49)
  for (let i = 1; i <= 50; i++) {
    const name = indianNames[i % indianNames.length];
    const dept = departments[i % departments.length];
    const category = categories[i % categories.length];
    const priority = i % 7 === 0 ? 'High' : (i % 3 === 0 ? 'Medium' : 'Low');
    const read = i > 12; // first 12 are unread
    
    let title = '';
    let message = '';
    
    switch (category) {
      case 'Employees':
        title = 'New Employee Joined';
        message = `${name} has completed onboarding and joined the ${dept} department.`;
        break;
      case 'Leave':
        if (i % 2 === 0) {
          title = 'Leave Request Submitted';
          message = `${name} submitted a request for 3 days of Paid Vacation.`;
        } else {
          title = i % 3 === 0 ? 'Leave Approved' : 'Leave Rejected';
          message = `HR Manager processed leave logs for ${name}.`;
        }
        break;
      case 'Payroll':
        title = 'Payroll Generated';
        message = `Monthly payroll audit ledger sheets generated for the ${dept} division.`;
        break;
      case 'Attendance':
        if (i % 2 === 0) {
          title = 'Attendance Log Missing';
          message = `${name} failed to clock out for yesterday's shift.`;
        } else {
          title = 'Late Check-in Alert';
          message = `${name} clocked in 45 minutes past scheduled shift start.`;
        }
        break;
      case 'Documents':
        title = 'Compliance Document Uploaded';
        message = `${name} uploaded a signed copy of the updated NDA document.`;
        break;
      case 'Announcements':
        title = 'Corporate Announcement Published';
        message = `A new company policy update was posted regarding hybrid office locations.`;
        break;
      case 'Security':
        title = 'Admin Role Privilege Change';
        message = `Administrative configuration variables were updated by System Auditor.`;
        break;
      case 'System':
        title = 'Database Migrations Checked';
        message = `Automated nightly database backup ran successfully. 0 errors detected.`;
        break;
      default:
        title = 'System Event Logged';
        message = 'Standard corporate portal logs captured.';
    }

    // Determine timestamp
    const date = new Date();
    date.setHours(date.getHours() - i * 2);
    
    list.push({
      id: `NTF-ADM-${String(i).padStart(4, '0')}`,
      targetRole: 'Admin',
      title,
      description: message,
      category,
      priority,
      read,
      timestamp: date.toISOString(),
    });
  }

  // 2. Employee notifications (Indices 50 - 99)
  for (let i = 51; i <= 100; i++) {
    const name = indianNames[i % indianNames.length];
    const category = categories[i % categories.length];
    const priority = i % 9 === 0 ? 'High' : (i % 4 === 0 ? 'Medium' : 'Low');
    const read = i > 62; // first 12 employee notifications are unread
    
    let title = '';
    let message = '';
    
    switch (category) {
      case 'Leave':
        title = i % 2 === 0 ? 'Leave Approved' : 'Leave Request Rejected';
        message = i % 2 === 0 
          ? `Your leave request for July 12-14 has been approved by your Manager.`
          : `Your leave request for August 05 has been rejected due to sprint releases.`;
        break;
      case 'Payroll':
        title = 'Monthly Salary Credited';
        message = `Your take-home compensation for June 2026 was processed into your HDFC Bank account.`;
        break;
      case 'Attendance':
        title = i % 2 === 0 ? 'Attendance Check-in Alert' : 'Clock Out Reminder';
        message = i % 2 === 0 
          ? `Don't forget to record your morning clock-in timesheet log.`
          : `You have been clocked in for 9 hours. Please log check-out details.`;
        break;
      case 'Announcements':
        title = 'Company Holiday Declared';
        message = `Management declared July 15 as a public holiday for Eid-ul-Adha.`;
        break;
      case 'Employees':
        title = 'Colleague Birthday Celebration';
        message = `Wish your teammate, ${name}, a very Happy Birthday today!`;
        break;
      case 'Documents':
        title = 'Corporate Document Available';
        message = `Your digital Form 16 Tax Certificate for FY 2025-26 is ready for download.`;
        break;
      case 'Security':
        title = 'Portal Account Password Changed';
        message = `Your portal security credentials were updated. If this wasn't you, lock active sessions.`;
        break;
      case 'System':
        title = 'Application Updates Deployed';
        message = `Portal desktop frameworks updated to v2.4.0. Clear cache to view enhancements.`;
        break;
      default:
        title = 'Portal Alert Received';
        message = 'Standard employee workspace notification.';
    }

    const date = new Date();
    date.setHours(date.getHours() - (i - 50) * 3);

    list.push({
      id: `NTF-EMP-${String(i).padStart(4, '0')}`,
      targetRole: 'Employee',
      title,
      description: message,
      category,
      priority,
      read,
      timestamp: date.toISOString(),
    });
  }

  return list;
};

// Generate 50 Activity Center Log Audit Entries
const generateActivities = () => {
  const list = [];
  const actions = [
    { title: 'Clocked In Session', desc: 'checked in remotely from VPN secure node.', category: 'Attendance', status: 'Success' },
    { title: 'Leave Request Submitted', desc: 'applied for 4 days of privilege leaves.', category: 'Leave', status: 'Pending' },
    { title: 'Tax Document Uploaded', desc: 'uploaded verified PAN Card document.', category: 'Documents', status: 'Success' },
    { title: 'Onboarding Added', desc: 'added emergency coordinates for new joiner.', category: 'Employees', status: 'Success' },
    { title: 'Password Reset Successful', desc: 'modified portal security passwords.', category: 'Security', status: 'Success' },
    { title: 'Timesheet Verified', desc: 'submitted weekly sprint timesheet.', category: 'Attendance', status: 'Success' },
    { title: 'Leave Request Approved', desc: 'approved vacation request for Priya Nair.', category: 'Leave', status: 'Success' }
  ];

  for (let i = 1; i <= 50; i++) {
    const act = actions[i % actions.length];
    const name = indianNames[i % indianNames.length];
    const priority = i % 8 === 0 ? 'High' : (i % 3 === 0 ? 'Medium' : 'Low');
    const initials = name.split(' ').map(n => n[0]).join('');
    
    const date = new Date();
    date.setHours(date.getHours() - i * 1.5);

    list.push({
      id: `ACT-${String(i).padStart(4, '0')}`,
      userName: name,
      userAvatar: initials,
      title: `${name} ${act.title.toLowerCase()}`,
      description: `${name} ${act.desc}`,
      timestamp: date.toISOString(),
      priority,
      status: act.status,
      category: act.category
    });
  }
  return list;
};

// Generate 20 Announcements
const generateAnnouncements = () => {
  const list = [];
  const titles = [
    { t: 'Annual Town Hall Meeting 2026', desc: 'Our CEO will discuss the company performance, key highlights of Q1 2026, and share growth maps.', dept: 'All Departments' },
    { t: 'Hybrid Policy Modification Updates', desc: 'Effective next week, employees are expected to check in from corporate hubs 3 days per week.', dept: 'All Departments' },
    { t: 'Upgrade to AWS Cloud Infrastructures', desc: 'Operations team is scheduled to migrate core server variables. Expect brief portal down times.', dept: 'Engineering' },
    { t: 'Quarterly Finance Claims Reimbursements', desc: 'Please submit all business travel and medical claim invoices before July 10, 2026.', dept: 'Finance' },
    { t: 'Performance Evaluation Cycle Kickoff', desc: 'Self-appraisal sheets are active. Complete your submissions to initiate manager evaluations.', dept: 'Human Resources' },
    { t: 'New Wellness Benefits Programs', desc: 'We are launching mental health support sessions and gym membership discount partnerships.', dept: 'Human Resources' },
    { t: 'System Database Scheduled Outages', desc: 'Monthly system maintenance schedules are active on Sunday from 02:00 AM to 04:00 AM.', dept: 'IT Systems' }
  ];

  for (let i = 1; i <= 20; i++) {
    const item = titles[i % titles.length];
    const author = indianNames[(i * 3) % indianNames.length];
    const priority = i % 5 === 0 ? 'High' : (i % 2 === 0 ? 'Medium' : 'Low');
    
    const date = new Date();
    date.setDate(date.getDate() - i * 2);

    list.push({
      id: `ANN-${String(i).padStart(4, '0')}`,
      title: item.t,
      description: item.desc,
      department: item.dept,
      priority,
      publishDate: date.toISOString().split('T')[0],
      author,
      attachment: i % 3 === 0 ? 'NDA_Policy_Document_v2.pdf' : null
    });
  }
  return list;
};

// Colleague Events
const colleagueEvents = [
  { id: 'ev-1', type: 'Birthday', name: 'Ramesh Patel', detail: 'Celebrating 28th Birthday today!', date: 'Today' },
  { id: 'ev-2', type: 'Anniversary', name: 'Amit Kumar', detail: 'Completing 5 Years at Enterprise Inc.', date: 'Today' },
  { id: 'ev-3', type: 'Holiday', name: 'Bakrid Holiday', detail: 'National Office Closure', date: 'July 15, 2026' },
  { id: 'ev-4', type: 'Meeting', name: 'Sprint Review Meeting', detail: 'Product releases checkpoint', date: 'Today, 04:00 PM' },
  { id: 'ev-5', type: 'Training', name: 'AWS Security Certification', detail: 'Mandatory technical safety workshop', date: 'July 08, 2026' }
];

// Compliance Reminders
const complianceReminders = [
  { id: 'rem-1', title: 'Pending Leave Approvals', count: 3, urgency: 'High', desc: 'Manager approvals awaiting action.' },
  { id: 'rem-2', title: 'Incomplete KYC Profile', count: 1, urgency: 'Medium', desc: 'Alternate contact number missing.' },
  { id: 'rem-3', title: 'Upcoming Salary Run', count: 0, urgency: 'Low', desc: 'Scheduled for July 31.' },
  { id: 'rem-4', title: 'Document Expiry Warning', count: 2, urgency: 'High', desc: 'NDA signatures expire in 5 days.' },
  { id: 'rem-5', title: 'Pending Attendance logs', count: 1, urgency: 'Medium', desc: 'Clock-out missing for June 30.' }
];

export const mockNotificationData = {
  notifications: generateNotifications(),
  activities: generateActivities(),
  announcements: generateAnnouncements(),
  colleagueEvents,
  complianceReminders
};
