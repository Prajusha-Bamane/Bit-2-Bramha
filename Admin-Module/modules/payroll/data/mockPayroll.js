import { mockEmployees } from '../../employee/data/mockEmployees';

export const mockPayroll = [];

const months = [4, 5, 6]; // April, May, June 2026
const statusesList = ['Paid', 'Paid', 'Paid', 'Processing', 'Pending', 'Failed'];

let counter = 1;

months.forEach((m) => {
  mockEmployees.forEach((emp, index) => {
    const id = `PAY-${counter.toString().padStart(4, '0')}`;
    counter++;

    // Calculate baseline basic salary based on role
    const basicSalary = emp.role === 'Admin' ? 180000 : (emp.role === 'Manager' ? 120000 : 60000);
    
    // Compute allowance breakdown
    const hra = basicSalary * 0.4;
    const travel = basicSalary * 0.1;
    const medical = basicSalary * 0.05;
    const allowances = hra + travel + medical;

    // Compute deduction breakdown
    const pf = basicSalary * 0.12;
    const professionalTax = 200;
    const incomeTax = basicSalary * 0.1;
    const deductions = pf + professionalTax + incomeTax;

    // Add bonus dynamically for variety
    const bonus = index % 5 === 0 ? 8000 : 0;
    const netSalary = basicSalary + allowances + bonus - deductions;

    const status = m === 6 && index % 8 === 0 ? 'Pending' : (m === 6 && index % 12 === 0 ? 'Processing' : 'Paid');
    const paymentDate = status === 'Paid' ? `2026-0${m}-30` : null;

    mockPayroll.push({
      id,
      employeeId: emp.id,
      firstName: emp.firstName,
      lastName: emp.lastName,
      department: emp.department,
      designation: emp.designation,
      basicSalary,
      allowances,
      deductions,
      bonus,
      netSalary,
      status,
      month: m,
      year: 2026,
      paymentDate,
      hra,
      travel,
      medical,
      pf,
      professionalTax,
      incomeTax,
    });
  });
});
