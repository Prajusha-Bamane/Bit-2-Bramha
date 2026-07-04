import crypto from 'crypto';
import { PayrollRepository } from './payroll.repository.js';
import { EmployeeRepository } from '../employee/employee.repository.js';

export const PayrollService = {
  getPayrollRecords: async ({ 
    search, 
    department, 
    status, 
    month, 
    year, 
    sortBy, 
    sortOrder, 
    page = 1, 
    limit = 10 
  }) => {
    const parsedPage = parseInt(page, 10) || 1;
    const parsedLimit = parseInt(limit, 10) || 10;
    const offset = (parsedPage - 1) * parsedLimit;

    const items = await PayrollRepository.findAll({
      search,
      department,
      status,
      month,
      year,
      sortBy,
      sortOrder,
      limit: parsedLimit,
      offset,
    });

    const totalRecords = await PayrollRepository.countAll({
      search,
      department,
      status,
      month,
      year,
    });

    const totalPages = Math.ceil(totalRecords / parsedLimit);

    const formattedItems = items.map((item) => ({
      id: item.id,
      employeeId: item.employee_id,
      firstName: item.first_name,
      lastName: item.last_name,
      email: item.email,
      department: item.department,
      role: item.role,
      basicSalary: Number(item.basic_salary),
      allowances: Number(item.allowances),
      deductions: Number(item.deductions),
      bonus: Number(item.bonus),
      netSalary: Number(item.net_salary),
      status: item.status,
      month: item.month,
      year: item.year,
      paymentDate: item.payment_date,
      createdAt: item.created_at,
      updatedAt: item.updated_at,
    }));

    return {
      items: formattedItems,
      pagination: {
        page: parsedPage,
        limit: parsedLimit,
        totalRecords,
        totalPages,
      },
    };
  },

  getPayrollById: async (id) => {
    const record = await PayrollRepository.findById(id);
    if (!record) {
      const error = new Error('Payroll record not found.');
      error.status = 404;
      error.code = 'NOT_FOUND';
      throw error;
    }
    return record;
  },

  createPayrollRecord: async (data) => {
    const id = crypto.randomUUID();
    const netSalary = data.basicSalary + data.allowances + data.bonus - data.deductions;
    const payload = {
      ...data,
      id,
      netSalary,
    };

    const newRecord = await PayrollRepository.create(payload);
    return newRecord;
  },

  updatePayrollRecord: async (id, data) => {
    const record = await PayrollRepository.findById(id);
    if (!record) {
      const error = new Error('Payroll record not found.');
      error.status = 404;
      error.code = 'NOT_FOUND';
      throw error;
    }

    const basic = data.basicSalary !== undefined ? data.basicSalary : Number(record.basic_salary);
    const allow = data.allowances !== undefined ? data.allowances : Number(record.allowances);
    const bon = data.bonus !== undefined ? data.bonus : Number(record.bonus);
    const ded = data.deductions !== undefined ? data.deductions : Number(record.deductions);
    
    const netSalary = basic + allow + bon - ded;

    const updated = await PayrollRepository.update(id, {
      ...data,
      netSalary,
    });
    return updated;
  },

  deletePayrollRecord: async (id) => {
    const record = await PayrollRepository.findById(id);
    if (!record) {
      const error = new Error('Payroll record not found.');
      error.status = 404;
      error.code = 'NOT_FOUND';
      throw error;
    }

    await PayrollRepository.delete(id);
  },

  generatePayroll: async ({ month, year, department }) => {
    // 1. Fetch active employees (optionally filtered by department)
    const employees = await EmployeeRepository.findAll({ department, limit: 1000 });
    
    const generatedList = [];

    for (const emp of employees) {
      // Basic salary defaults
      const basicSalary = emp.role === 'Admin' ? 150000 : (emp.role === 'Manager' ? 100000 : 50000);
      
      // Compute standard allowance components
      const hra = basicSalary * 0.4;
      const travel = basicSalary * 0.1;
      const medical = basicSalary * 0.05;
      const allowances = hra + travel + medical;

      // Compute standard deduction components
      const pf = basicSalary * 0.12;
      const professionalTax = 200;
      const incomeTax = basicSalary * 0.1;
      const deductions = pf + professionalTax + incomeTax;

      const bonus = 0; // Default zero bonus on bulk generation
      const netSalary = basicSalary + allowances + bonus - deductions;

      const id = crypto.randomUUID();
      const payload = {
        id,
        employeeId: emp.id,
        basicSalary,
        allowances,
        deductions,
        bonus,
        netSalary,
        status: 'Scheduled',
        month,
        year,
        paymentDate: null,
      };

      const newRecord = await PayrollRepository.create(payload);
      generatedList.push(newRecord);
    }

    return {
      count: generatedList.length,
      month,
      year,
    };
  },
};
