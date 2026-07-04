export const mockEmployees = [
  {
    id: 'EMP-2020-01',
    firstName: 'Rahul',
    lastName: 'Sharma',
    email: 'rahul.sharma@enterprise.com',
    department: 'Human Resources',
    designation: 'HR Director',
    role: 'Admin',
    status: 'Active',
    joiningDate: '2020-01-15',
    phone: '+91 98765 43210',
    salary: '₹1,50,000',
    attendance: '98.5%',
    leaveBalance: 18,
    projects: 2,
    emergencyContact: { name: 'Kiran Sharma', relation: 'Spouse', phone: '+91 98765 43211' }
  },
  {
    id: 'EMP-2021-04',
    firstName: 'Priya',
    lastName: 'Nair',
    email: 'priya.nair@enterprise.com',
    department: 'Marketing',
    designation: 'Marketing Head',
    role: 'Manager',
    status: 'Active',
    joiningDate: '2021-04-12',
    phone: '+91 87654 32109',
    salary: '₹1,20,000',
    attendance: '96.2%',
    leaveBalance: 14,
    projects: 3,
    emergencyContact: { name: 'Gopal Nair', relation: 'Parent', phone: '+91 87654 32100' }
  },
  {
    id: 'EMP-2022-08',
    firstName: 'Amit',
    lastName: 'Kumar',
    email: 'amit.kumar@enterprise.com',
    department: 'Software Development',
    designation: 'Technical Architect',
    role: 'Manager',
    status: 'Active',
    joiningDate: '2022-08-10',
    phone: '+91 76543 21098',
    salary: '₹1,80,000',
    attendance: '95.0%',
    leaveBalance: 12,
    projects: 4,
    emergencyContact: { name: 'Sunita Kumar', relation: 'Spouse', phone: '+91 76543 21000' }
  },
  {
    id: 'EMP-2023-02',
    firstName: 'Ramesh',
    lastName: 'Patel',
    email: 'ramesh.patel@enterprise.com',
    department: 'Software Development',
    designation: 'Senior Frontend Engineer',
    role: 'Employee',
    status: 'Probation',
    joiningDate: '2026-05-15',
    phone: '+91 65432 10987',
    salary: '₹85,000',
    attendance: '94.0%',
    leaveBalance: 8,
    projects: 2,
    emergencyContact: { name: 'Dinesh Patel', relation: 'Sibling', phone: '+91 65432 10000' }
  },
  {
    id: 'EMP-2023-11',
    firstName: 'Pooja',
    lastName: 'Reddy',
    email: 'pooja.reddy@enterprise.com',
    department: 'Quality Assurance',
    designation: 'QA Lead',
    role: 'Manager',
    status: 'Active',
    joiningDate: '2023-11-01',
    phone: '+91 99887 76655',
    salary: '₹95,000',
    attendance: '97.4%',
    leaveBalance: 15,
    projects: 3,
    emergencyContact: { name: 'Venkat Reddy', relation: 'Parent', phone: '+91 99887 76600' }
  },
  {
    id: 'EMP-2024-03',
    firstName: 'Vikram',
    lastName: 'Singh',
    email: 'vikram.singh@enterprise.com',
    department: 'Marketing',
    designation: 'SEO Specialist',
    role: 'Employee',
    status: 'Active',
    joiningDate: '2024-03-20',
    phone: '+91 88776 65544',
    salary: '₹55,000',
    attendance: '92.1%',
    leaveBalance: 10,
    projects: 2,
    emergencyContact: { name: 'Harbhajan Singh', relation: 'Parent', phone: '+91 88776 65500' }
  },
  {
    id: 'EMP-2024-06',
    firstName: 'Anjali',
    lastName: 'Sharma',
    email: 'anjali.sharma@enterprise.com',
    department: 'Human Resources',
    designation: 'HR Executive',
    role: 'Employee',
    status: 'Active',
    joiningDate: '2024-06-01',
    phone: '+91 77665 54433',
    salary: '₹45,000',
    attendance: '98.0%',
    leaveBalance: 20,
    projects: 1,
    emergencyContact: { name: 'Sanjay Sharma', relation: 'Parent', phone: '+91 77665 54400' }
  },
  {
    id: 'EMP-2024-09',
    firstName: 'Rohan',
    lastName: 'Deshmukh',
    email: 'rohan.deshmukh@enterprise.com',
    department: 'Finance',
    designation: 'Accounts Manager',
    role: 'Employee',
    status: 'Active',
    joiningDate: '2024-09-18',
    phone: '+91 66554 43322',
    salary: '₹70,000',
    attendance: '95.8%',
    leaveBalance: 11,
    projects: 2,
    emergencyContact: { name: 'Meena Deshmukh', relation: 'Spouse', phone: '+91 66554 43300' }
  },
  {
    id: 'EMP-2025-01',
    firstName: 'Sneha',
    lastName: 'Reddy',
    email: 'sneha.reddy@enterprise.com',
    department: 'Design',
    designation: 'UI/UX Designer',
    role: 'Employee',
    status: 'Rejected', // maps locally to 'Inactive'
    joiningDate: '2025-01-10',
    phone: '+91 55443 32211',
    salary: '₹60,000',
    attendance: '85.2%',
    leaveBalance: 6,
    projects: 1,
    emergencyContact: { name: 'Anil Reddy', relation: 'Spouse', phone: '+91 55443 32200' }
  },
  {
    id: 'EMP-2025-05',
    firstName: 'Aditya',
    lastName: 'Patel',
    email: 'aditya.patel@enterprise.com',
    department: 'Software Development',
    designation: 'Frontend Engineer',
    role: 'Employee',
    status: 'Active',
    joiningDate: '2026-07-04',
    phone: '+91 91234 56789',
    salary: '₹50,000',
    attendance: '99.0%',
    leaveBalance: 5,
    projects: 1,
    emergencyContact: { name: 'Bharat Patel', relation: 'Parent', phone: '+91 91234 56700' }
  },
  {
    id: 'EMP-2022-01',
    firstName: 'Manoj',
    lastName: 'Vyas',
    email: 'manoj.vyas@enterprise.com',
    department: 'Operations',
    designation: 'COO',
    role: 'Admin',
    status: 'Active',
    joiningDate: '2022-01-01',
    phone: '+91 98112 23344',
    salary: '₹2,20,000',
    attendance: '98.9%',
    leaveBalance: 22,
    projects: 4,
    emergencyContact: { name: 'Kavita Vyas', relation: 'Spouse', phone: '+91 98112 23300' }
  },
  {
    id: 'EMP-2023-05',
    firstName: 'Arjun',
    lastName: 'Dave',
    email: 'arjun.dave@enterprise.com',
    department: 'Software Development',
    designation: 'DevOps Lead',
    role: 'Employee',
    status: 'Active',
    joiningDate: '2023-05-12',
    phone: '+91 98223 34455',
    salary: '₹1,15,000',
    attendance: '96.8%',
    leaveBalance: 16,
    projects: 3,
    emergencyContact: { name: 'Devendra Dave', relation: 'Parent', phone: '+91 98223 34400' }
  },
  {
    id: 'EMP-2024-01',
    firstName: 'Divya',
    lastName: 'Mehta',
    email: 'divya.mehta@enterprise.com',
    department: 'Design',
    designation: 'Senior UX Architect',
    role: 'Employee',
    status: 'Active',
    joiningDate: '2024-01-20',
    phone: '+91 98334 45566',
    salary: '₹1,10,000',
    attendance: '95.4%',
    leaveBalance: 13,
    projects: 2,
    emergencyContact: { name: 'Tarun Mehta', relation: 'Spouse', phone: '+91 98334 45500' }
  },
  {
    id: 'EMP-2024-11',
    firstName: 'Sanjay',
    lastName: 'Gupta',
    email: 'sanjay.gupta@enterprise.com',
    department: 'Sales',
    designation: 'Sales Executive',
    role: 'Employee',
    status: 'Probation',
    joiningDate: '2024-11-15',
    phone: '+91 98445 56677',
    salary: '₹40,000',
    attendance: '91.2%',
    leaveBalance: 7,
    projects: 1,
    emergencyContact: { name: 'Sarita Gupta', relation: 'Parent', phone: '+91 98445 56600' }
  },
  {
    id: 'EMP-2025-02',
    firstName: 'Neha',
    lastName: 'Verma',
    email: 'neha.verma@enterprise.com',
    department: 'QA',
    designation: 'Automation Engineer',
    role: 'Employee',
    status: 'Active',
    joiningDate: '2025-02-05',
    phone: '+91 98556 67788',
    salary: '₹55,000',
    attendance: '94.8%',
    leaveBalance: 9,
    projects: 2,
    emergencyContact: { name: 'Ashok Verma', relation: 'Parent', phone: '+91 98556 67700' }
  },
  {
    id: 'EMP-2025-07',
    firstName: 'Rajesh',
    lastName: 'Rao',
    email: 'rajesh.rao@enterprise.com',
    department: 'Support',
    designation: 'Helpdesk Coordinator',
    role: 'Employee',
    status: 'Active',
    joiningDate: '2025-07-22',
    phone: '+91 98667 78899',
    salary: '₹42,000',
    attendance: '97.2%',
    leaveBalance: 12,
    projects: 1,
    emergencyContact: { name: 'Prema Rao', relation: 'Spouse', phone: '+91 98667 78800' }
  },
  {
    id: 'EMP-2025-08',
    firstName: 'Deepa',
    lastName: 'Iyer',
    email: 'deepa.iyer@enterprise.com',
    department: 'Marketing',
    designation: 'Content Writer',
    role: 'Employee',
    status: 'Suspended',
    joiningDate: '2025-08-11',
    phone: '+91 98778 89900',
    salary: '₹45,000',
    attendance: '82.5%',
    leaveBalance: 8,
    projects: 1,
    emergencyContact: { name: 'K. S. Iyer', relation: 'Parent', phone: '+91 98778 89900' }
  },
  {
    id: 'EMP-2025-10',
    firstName: 'Swati',
    lastName: 'Shah',
    email: 'swati.shah@enterprise.com',
    department: 'Finance',
    designation: 'Financial Analyst',
    role: 'Employee',
    status: 'Resigned',
    joiningDate: '2025-10-01',
    phone: '+91 98889 90011',
    salary: '₹65,000',
    attendance: '90.0%',
    leaveBalance: 4,
    projects: 0,
    emergencyContact: { name: 'Manish Shah', relation: 'Spouse', phone: '+91 98889 90000' }
  },
  {
    id: 'EMP-2025-12',
    firstName: 'Sunil',
    lastName: 'Modi',
    email: 'sunil.modi@enterprise.com',
    department: 'Administration',
    designation: 'Facility Executive',
    role: 'Employee',
    status: 'Active',
    joiningDate: '2025-12-15',
    phone: '+91 98990 01122',
    salary: '₹38,000',
    attendance: '96.5%',
    leaveBalance: 11,
    projects: 1,
    emergencyContact: { name: 'Kishori Modi', relation: 'Spouse', phone: '+91 98990 01100' }
  },
  {
    id: 'EMP-2026-01',
    firstName: 'Kavita',
    lastName: 'Bhatt',
    email: 'kavita.bhatt@enterprise.com',
    department: 'Operations',
    designation: 'Operations Coordinator',
    role: 'Employee',
    status: 'Active',
    joiningDate: '2026-01-20',
    phone: '+91 99001 12233',
    salary: '₹52,000',
    attendance: '95.1%',
    leaveBalance: 8,
    projects: 2,
    emergencyContact: { name: 'Sanjay Bhatt', relation: 'Spouse', phone: '+91 99001 12200' }
  }
];

// Generate additional 32 items to guarantee 52 records
const indianFirstNames = [
  'Vijay', 'Meera', 'Suresh', 'Ritu', 'Anil', 'Geeta', 'Sandeep', 'Shweta', 'Alok', 'Jyoti',
  'Manish', 'Sunita', 'Harish', 'Preeti', 'Naveen', 'Rekha', 'Gautam', 'Vandana', 'Ajay', 'Shikha',
  'Rajiv', 'Poonam', 'Dinesh', 'Neetu', 'Prakash', 'Pinky', 'Ashish', 'Aarti', 'Vikas', 'Kiran',
  'Vinay', 'Nisha'
];

const indianLastNames = [
  'Sen', 'Chawla', 'Rao', 'Menon', 'Pillai', 'Hegde', 'Kulkarni', 'Joshi', 'Shinde', 'Patil',
  'Jadhav', 'Tambe', 'Rane', 'Sawant', 'Parab', 'Dave', 'Trivedi', 'Rawal', 'Shah', 'Modi',
  'Somaiya', 'Merchant', 'Doshi', 'Sanghvi', 'Choksi', 'Gandhi', 'Jhaveri', 'Kapoor', 'Mehta',
  'Mukherjee', 'Roy', 'Nair'
];

const depts = [
  'Software Development', 'QA', 'Human Resources', 'Finance', 'Marketing', 'Sales',
  'Administration', 'Support', 'Design', 'Operations'
];

const roles = ['Employee', 'Manager', 'Admin'];

const statuses = ['Active', 'Inactive', 'Probation', 'Suspended', 'Resigned'];

for (let i = 0; i < indianFirstNames.length; i++) {
  const fName = indianFirstNames[i];
  const lName = indianLastNames[i % indianLastNames.length];
  const dept = depts[i % depts.length];
  const status = statuses[i % statuses.length];
  const role = i % 8 === 0 ? 'Manager' : 'Employee';
  
  let designation = 'Specialist';
  if (dept === 'Software Development') designation = 'Software Engineer';
  else if (dept === 'QA') designation = 'Quality Analyst';
  else if (dept === 'Human Resources') designation = 'HR Executive';
  else if (dept === 'Finance') designation = 'Finance Specialist';
  else if (dept === 'Design') designation = 'Visual Designer';
  else if (dept === 'Marketing') designation = 'SEO Analyst';
  else if (dept === 'Sales') designation = 'Account Executive';

  mockEmployees.push({
    id: `EMP-2026-${(i + 21).toString().padStart(2, '0')}`,
    firstName: fName,
    lastName: lName,
    email: `${fName.toLowerCase()}.${lName.toLowerCase()}@enterprise.com`,
    department: dept,
    designation,
    role,
    status,
    joiningDate: `2026-02-${(1 + (i % 25)).toString().padStart(2, '0')}`,
    phone: `+91 98${(10000 + i * 37).toString().padStart(5, '0')}`,
    salary: `₹${(45000 + (i % 5) * 8000).toLocaleString('en-IN')}`,
    attendance: `${(90 + (i % 10) * 1).toFixed(1)}%`,
    leaveBalance: 6 + (i % 12),
    projects: 1 + (i % 3),
    emergencyContact: {
      name: `${lName} Family`,
      relation: 'Parent',
      phone: `+91 98${(20000 + i * 37).toString().padStart(5, '0')}`
    }
  });
}
