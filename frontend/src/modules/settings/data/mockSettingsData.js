// Mock Data Registry for Settings & Administration Module

const indianNames = [
  'Rahul Sharma', 'Priya Nair', 'Amit Patel', 'Sneha Reddy', 'Rajesh Sharma',
  'Anjali Sen', 'Vikram Singh', 'Pooja Gupta', 'Rohan Deshmukh', 'Divya Mehta',
  'Arjun Dave', 'Neha Verma', 'Sanjay Chawla', 'Kavita Pillai', 'Manoj Hegde'
];

const departments = [
  { id: 'dept-01', name: 'Software Development', code: 'DEV', head: 'Rahul Sharma', employees: 42, status: 'Active' },
  { id: 'dept-02', name: 'Human Resources', code: 'HR', head: 'Priya Nair', employees: 8, status: 'Active' },
  { id: 'dept-03', name: 'Finance & Accounts', code: 'FIN', head: 'Amit Patel', employees: 6, status: 'Active' },
  { id: 'dept-04', name: 'Product Management', code: 'PROD', head: 'Sneha Reddy', employees: 12, status: 'Active' },
  { id: 'dept-05', name: 'Quality Assurance', code: 'QA', head: 'Manoj Hegde', employees: 15, status: 'Active' },
  { id: 'dept-06', name: 'Marketing & Sales', code: 'MKT', head: 'Divya Mehta', employees: 10, status: 'Active' },
  { id: 'dept-07', name: 'Operations & IT Support', code: 'OPS', head: 'Rohan Deshmukh', employees: 14, status: 'Active' },
  { id: 'dept-08', name: 'UX/UI Creative Design', code: 'DSN', head: 'Arjun Dave', employees: 7, status: 'Active' },
  { id: 'dept-09', name: 'Legal & Compliance', code: 'LGL', head: 'Kavita Pillai', employees: 3, status: 'Active' },
  { id: 'dept-10', name: 'Customer Success', code: 'CS', head: 'Sanjay Chawla', employees: 18, status: 'Inactive' }
];

const designations = [
  { id: 'des-01', name: 'Junior Software Engineer', department: 'Software Development', level: 'L1', status: 'Active' },
  { id: 'des-02', name: 'Software Engineer', department: 'Software Development', level: 'L2', status: 'Active' },
  { id: 'des-03', name: 'Senior Software Engineer', department: 'Software Development', level: 'L3', status: 'Active' },
  { id: 'des-04', name: 'Lead Engineer', department: 'Software Development', level: 'L4', status: 'Active' },
  { id: 'des-05', name: 'Engineering Manager', department: 'Software Development', level: 'L5', status: 'Active' },
  { id: 'des-06', name: 'HR Recruiter', department: 'Human Resources', level: 'L1', status: 'Active' },
  { id: 'des-07', name: 'HR Generalist', department: 'Human Resources', level: 'L2', status: 'Active' },
  { id: 'des-08', name: 'HR Director', department: 'Human Resources', level: 'L5', status: 'Active' },
  { id: 'des-09', name: 'Accounts Officer', department: 'Finance & Accounts', level: 'L2', status: 'Active' },
  { id: 'des-10', name: 'Finance Controller', department: 'Finance & Accounts', level: 'L5', status: 'Active' },
  { id: 'des-11', name: 'Associate Product Manager', department: 'Product Management', level: 'L2', status: 'Active' },
  { id: 'des-12', name: 'Product Manager', department: 'Product Management', level: 'L3', status: 'Active' },
  { id: 'des-13', name: 'Senior Product Manager', department: 'Product Management', level: 'L4', status: 'Active' },
  { id: 'des-14', name: 'QA Engineer', department: 'Quality Assurance', level: 'L2', status: 'Active' },
  { id: 'des-15', name: 'QA Team Lead', department: 'Quality Assurance', level: 'L3', status: 'Active' },
  { id: 'des-16', name: 'SEO Specialist', department: 'Marketing & Sales', level: 'L1', status: 'Active' },
  { id: 'des-17', name: 'Marketing Manager', department: 'Marketing & Sales', level: 'L3', status: 'Active' },
  { id: 'des-18', name: 'UI Designer', department: 'UX/UI Creative Design', level: 'L2', status: 'Active' },
  { id: 'des-19', name: 'UX Lead Architect', department: 'UX/UI Creative Design', level: 'L4', status: 'Active' },
  { id: 'des-20', name: 'Compliance Specialist', department: 'Legal & Compliance', level: 'L3', status: 'Inactive' }
];

const holidays = [
  { id: 'hol-01', name: 'New Year Day', date: '2026-01-01', day: 'Thursday', type: 'National', status: 'Active' },
  { id: 'hol-02', name: 'Republic Day', date: '2026-01-26', day: 'Monday', type: 'National', status: 'Active' },
  { id: 'hol-03', name: 'Holi Festival', date: '2026-03-04', day: 'Wednesday', type: 'Regional', status: 'Active' },
  { id: 'hol-04', name: 'Good Friday', date: '2026-04-03', day: 'Friday', type: 'National', status: 'Active' },
  { id: 'hol-05', name: 'Ambedkar Jayanti', date: '2026-04-14', day: 'Tuesday', type: 'Regional', status: 'Active' },
  { id: 'hol-06', name: 'May Day (Labour Day)', date: '2026-05-01', day: 'Friday', type: 'National', status: 'Active' },
  { id: 'hol-07', name: 'Eid-ul-Adha (Bakrid)', date: '2026-07-15', day: 'Wednesday', type: 'Regional', status: 'Active' },
  { id: 'hol-08', name: 'Independence Day', date: '2026-08-15', day: 'Saturday', type: 'National', status: 'Active' },
  { id: 'hol-09', name: 'Ganesh Chaturthi', date: '2026-09-17', day: 'Thursday', type: 'Regional', status: 'Active' },
  { id: 'hol-10', name: 'Gandhi Jayanti', date: '2026-10-02', day: 'Friday', type: 'National', status: 'Active' },
  { id: 'hol-11', name: 'Dussehra (Vijayadashami)', date: '2026-10-22', day: 'Thursday', type: 'National', status: 'Active' },
  { id: 'hol-12', name: 'Diwali (Deepavali)', date: '2026-11-09', day: 'Monday', type: 'National', status: 'Active' },
  { id: 'hol-13', name: 'Guru Nanak Jayanti', date: '2026-11-25', day: 'Wednesday', type: 'Optional', status: 'Active' },
  { id: 'hol-14', name: 'Christmas Day', date: '2026-12-25', day: 'Friday', type: 'National', status: 'Active' },
  { id: 'hol-15', name: 'New Year Eve (Restricted)', date: '2026-12-31', day: 'Thursday', type: 'Optional', status: 'Inactive' }
];

const workLocations = [
  { id: 'loc-01', name: 'Bengaluru R&D Hub', city: 'Bengaluru', state: 'Karnataka', country: 'India', employees: 85 },
  { id: 'loc-02', name: 'Noida Operations Office', city: 'Noida', state: 'Uttar Pradesh', country: 'India', employees: 34 },
  { id: 'loc-03', name: 'Mumbai Financial Desk', city: 'Mumbai', state: 'Maharashtra', country: 'India', employees: 12 },
  { id: 'loc-04', name: 'Singapore APAC HQ', city: 'Singapore City', state: 'Downtown Core', country: 'Singapore', employees: 8 },
  { id: 'loc-05', name: 'Remote Hub India', city: 'Various Cities', state: 'Work from Home', country: 'India', employees: 22 }
];

const emailTemplates = [
  {
    id: 'tmp-01',
    name: 'Welcome Email Template',
    subject: 'Welcome to Enterprise HRMS, {{employee_name}}!',
    body: `Hello {{employee_name}},\n\nWe are absolutely thrilled to welcome you to the {{company_name}} family as our new {{designation}} in the {{department}} team. Your joining date is scheduled for {{joining_date}}.\n\nTo help you get started, please log into your Self-Service portal using the credentials below:\n- Username: {{username}}\n- Initial Password: {{temp_password}}\n\nWarm regards,\nHR Operations team`,
    variables: ['employee_name', 'company_name', 'designation', 'department', 'joining_date', 'username', 'temp_password']
  },
  {
    id: 'tmp-02',
    name: 'Leave Request Approved',
    subject: 'Leave Approved: {{leave_type}} from {{start_date}} to {{end_date}}',
    body: `Hi {{employee_name}},\n\nYour request for {{leave_type}} from {{start_date}} to {{end_date}} (total {{days}} days) has been approved by your reporting manager, {{manager_name}}.\n\nEnjoy your time-off!\n\nBest,\nHR Operations`,
    variables: ['employee_name', 'leave_type', 'start_date', 'end_date', 'days', 'manager_name']
  },
  {
    id: 'tmp-03',
    name: 'Leave Request Rejected',
    subject: 'Leave Rejected: {{leave_type}} request update',
    body: `Hi {{employee_name}},\n\nYour request for {{leave_type}} starting {{start_date}} has been rejected by {{manager_name}} due to project release cycles. Please connect with your manager directly for clarifications.\n\nBest,\nHR Admin`,
    variables: ['employee_name', 'leave_type', 'start_date', 'manager_name']
  },
  {
    id: 'tmp-04',
    name: 'Payroll Slip Generated',
    subject: 'Payslip Released for {{month}} {{year}}',
    body: `Hello {{employee_name}},\n\nYour digital payslip for the month of {{month}} {{year}} has been generated and is available for download on the Employee portal. Your net take-home salary has been credited to your bank account on file.\n\nGo to Employee Desk → My Payroll to review details.\n\nRegards,\nPayroll & Accounts Team`,
    variables: ['employee_name', 'month', 'year']
  },
  {
    id: 'tmp-05',
    name: 'Attendance Audit Reminder',
    subject: 'Alert: Missing Check-out logs for {{date}}',
    body: `Hi {{employee_name}},\n\nWe noticed a missing check-out register log for {{date}}. Please submit an attendance regularization request on your portal to avoid deduction cycles.\n\nRegards,\nTime & Attendance Systems`,
    variables: ['employee_name', 'date']
  },
  {
    id: 'tmp-06',
    name: 'Reset Password Request',
    subject: 'Password Recovery Code: {{reset_code}}',
    body: `Hello {{employee_name}},\n\nWe received a request to change your portal credentials. Your recovery code is: {{reset_code}}. This code expires in 15 minutes.\n\nIf you did not make this request, notify your IT Administrator immediately.\n\nRegards,\nCyber Security Officer`,
    variables: ['employee_name', 'reset_code']
  },
  {
    id: 'tmp-07',
    name: 'KYC Document Verification Status',
    subject: 'Verification Update: {{document_name}}',
    body: `Hi {{employee_name}},\n\nYour uploaded copy of {{document_name}} has been successfully verified by our HR Audits team.\n\nStatus: VERIFIED.\n\nRegards,\nCompliance Desk`,
    variables: ['employee_name', 'document_name']
  },
  {
    id: 'tmp-08',
    name: 'Annual Town Hall Broadcaster',
    subject: 'Broadcast: Join us for the Annual General Town Hall 2026',
    body: `Hello Team,\n\nWe invite everyone to join the Annual Town Hall on {{date}} at {{time}}. Our CEO will outline key business projections and product roadmap milestones.\n\nLink: {{meeting_url}}\n\nWarm regards,\nCommunications Desk`,
    variables: ['date', 'time', 'meeting_url']
  },
  {
    id: 'tmp-09',
    name: 'Security Alert: New Device Login',
    subject: 'Alert: Login from New Device - {{device}}',
    body: `Hello {{employee_name}},\n\nA successful login was recorded on your portal from a new device ({{device}}) at {{timestamp}} from IP: {{ip_address}}.\n\nIf this was you, no action is needed. Otherwise, reset password immediately.\n\nRegards,\nSecurity Systems`,
    variables: ['employee_name', 'device', 'timestamp', 'ip_address']
  },
  {
    id: 'tmp-10',
    name: 'Performance Review Process Launch',
    subject: 'Appraisal Cycle Launch: FY 2025-26',
    body: `Hi {{employee_name}},\n\nThe annual self-appraisal cycle is officially open. Please submit your reviews before {{deadline}} so that your manager {{manager_name}} can proceed with evaluation panels.\n\nRegards,\nTalent Management team`,
    variables: ['employee_name', 'deadline', 'manager_name']
  }
];

// Generate 100 System Audit Logs
const generateAuditLogs = () => {
  const list = [];
  const modules = ['Auth', 'Employee', 'Leaves', 'Attendance', 'Payroll', 'Settings', 'Documents', 'Notifications'];
  const actions = [
    { title: 'User Login', desc: 'Successful login session started.', status: 'Success' },
    { title: 'Employee Created', desc: 'Added new payroll index and personal data.', status: 'Success' },
    { title: 'Leave Status Changed', desc: 'Modified vacation quota values.', status: 'Success' },
    { title: 'Timesheet Rectified', desc: 'Manual regularization approved.', status: 'Success' },
    { title: 'Salary Ledger Audited', desc: 'Recalculated deductions parameters.', status: 'Success' },
    { title: 'Permission Modified', desc: 'Elevated role privileges configuration.', status: 'Success' },
    { title: 'Document Upload Audited', desc: 'Aadhaar copy compliance flag added.', status: 'Success' },
    { title: 'Reset password triggered', desc: 'Mailed temporary credentials link.', status: 'Success' },
    { title: 'Unauthorized Route Blocked', desc: 'Admin route access rejected.', status: 'Failure' }
  ];

  const devices = ['Chrome / Windows 11', 'Safari / iPhone 15 Pro', 'Firefox / macOS Sonoma', 'Edge / Windows 10'];

  for (let i = 1; i <= 100; i++) {
    const act = actions[i % actions.length];
    const mod = modules[i % modules.length];
    const name = indianNames[i % indianNames.length];
    const dev = devices[i % devices.length];
    
    const date = new Date();
    date.setHours(date.getHours() - i * 1.8);

    list.push({
      id: `AUD-${String(i).padStart(4, '0')}`,
      user: name,
      module: mod,
      action: act.title,
      description: act.desc,
      ipAddress: `103.45.${80 + (i % 20)}.${10 + (i % 80)}`,
      device: dev,
      date: date.toISOString(),
      status: i % 25 === 0 ? 'Failure' : act.status
    });
  }

  return list;
};

// Initial permissions structure for 4 roles
const initialRolesPermissions = [
  {
    role: 'Super Admin',
    permissions: {
      viewEmployees: true, createEmployees: true, updateEmployees: true, deleteEmployees: true,
      attendanceAccess: true, leaveApproval: true, payrollAccess: true, reportsAccess: true, settingsAccess: true
    }
  },
  {
    role: 'HR Admin',
    permissions: {
      viewEmployees: true, createEmployees: true, updateEmployees: true, deleteEmployees: false,
      attendanceAccess: true, leaveApproval: true, payrollAccess: true, reportsAccess: true, settingsAccess: false
    }
  },
  {
    role: 'Manager',
    permissions: {
      viewEmployees: true, createEmployees: false, updateEmployees: false, deleteEmployees: false,
      attendanceAccess: true, leaveApproval: true, payrollAccess: false, reportsAccess: true, settingsAccess: false
    }
  },
  {
    role: 'Employee',
    permissions: {
      viewEmployees: false, createEmployees: false, updateEmployees: false, deleteEmployees: false,
      attendanceAccess: false, leaveApproval: false, payrollAccess: false, reportsAccess: false, settingsAccess: false
    }
  }
];

export const mockSettingsData = {
  departments,
  designations,
  holidays,
  workLocations,
  emailTemplates,
  auditLogs: generateAuditLogs(),
  rolesPermissions: initialRolesPermissions,
  general: {
    companyName: 'AURA Solutions Pvt. Ltd.',
    appName: 'AURA Portal Suite',
    timezone: 'Asia/Kolkata (GMT+05:30)',
    currency: 'INR (₹) - Indian Rupee',
    dateFormat: 'YYYY-MM-DD',
    language: 'English (United States)',
    workingDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    workingHours: { start: '09:00', end: '18:00' },
    theme: 'light'
  },
  profile: {
    companyLogo: null,
    companyName: 'AURA Solutions Pvt. Ltd.',
    address: 'Block C, Embassy Tech Village, Outer Ring Road, Devarabisanahalli, Bengaluru, Karnataka, 560103',
    email: 'operations@aurasolutions.com',
    phone: '+91 80 4567 8900',
    website: 'https://aurasolutions.com',
    gstNumber: '29AAAAA0000A1Z2',
    regNumber: 'U72200KA2015PTC081234',
    hrContact: 'Priya Nair (hr@aurasolutions.com)',
    supportContact: 'support@aurasolutions.com',
    socialLinks: {
      linkedin: 'https://linkedin.com/company/aurasolutions',
      twitter: 'https://twitter.com/aurasolutions',
      github: 'https://github.com/aurasolutions'
    }
  }
};
