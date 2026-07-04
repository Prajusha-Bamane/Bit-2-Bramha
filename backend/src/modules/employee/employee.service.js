import crypto from 'crypto';
import bcrypt from 'bcrypt';
import { EmployeeRepository } from './employee.repository.js';

export const EmployeeService = {
  getEmployees: async ({ 
    search, 
    department, 
    role, 
    status, 
    sortBy, 
    sortOrder, 
    page = 1, 
    limit = 10 
  }) => {
    const parsedPage = parseInt(page, 10) || 1;
    const parsedLimit = parseInt(limit, 10) || 10;
    const offset = (parsedPage - 1) * parsedLimit;

    const items = await EmployeeRepository.findAll({
      search,
      department,
      role,
      status,
      sortBy,
      sortOrder,
      limit: parsedLimit,
      offset,
    });

    const totalRecords = await EmployeeRepository.countAll({ search, department, role, status });
    const totalPages = Math.ceil(totalRecords / parsedLimit);

    const formattedItems = items.map((item) => ({
      id: item.id,
      firstName: item.first_name,
      lastName: item.last_name,
      email: item.email,
      role: item.role,
      department: item.department,
      status: item.status,
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

  getEmployeeById: async (id) => {
    const employee = await EmployeeRepository.findById(id);
    if (!employee) {
      const error = new Error('Requested employee record not found.');
      error.status = 404;
      error.code = 'NOT_FOUND';
      throw error;
    }

    return {
      id: employee.id,
      firstName: employee.first_name,
      lastName: employee.last_name,
      email: employee.email,
      role: employee.role,
      department: employee.department,
      status: employee.status,
      createdAt: employee.created_at,
      updatedAt: employee.updated_at,
    };
  },

  createEmployee: async (data) => {
    const existing = await EmployeeRepository.findByEmail(data.email);
    if (existing) {
      const error = new Error('An employee profile is already registered with this email.');
      error.status = 409;
      error.code = 'CONFLICT';
      throw error;
    }

    const id = crypto.randomUUID();
    const defaultPassword = data.password || 'password123';
    const hashedPassword = await bcrypt.hash(defaultPassword, 12);

    const employeePayload = {
      ...data,
      id,
      password: hashedPassword,
    };

    const newEmp = await EmployeeRepository.create(employeePayload);

    return {
      id: newEmp.id,
      firstName: newEmp.first_name,
      lastName: newEmp.last_name,
      email: newEmp.email,
      role: newEmp.role,
      department: newEmp.department,
      status: newEmp.status,
    };
  },

  updateEmployee: async (id, data) => {
    const employee = await EmployeeRepository.findById(id);
    if (!employee) {
      const error = new Error('Employee profile not found.');
      error.status = 404;
      error.code = 'NOT_FOUND';
      throw error;
    }

    if (data.email && data.email !== employee.email) {
      const existing = await EmployeeRepository.findByEmail(data.email);
      if (existing) {
        const error = new Error('Email address already associated with another profile.');
        error.status = 409;
        error.code = 'CONFLICT';
        throw error;
      }
    }

    const updated = await EmployeeRepository.update(id, data);

    return {
      id: updated.id,
      firstName: updated.first_name,
      lastName: updated.last_name,
      email: updated.email,
      role: updated.role,
      department: updated.department,
      status: updated.status,
    };
  },

  deleteEmployee: async (id) => {
    const employee = await EmployeeRepository.findById(id);
    if (!employee) {
      const error = new Error('Employee profile not found.');
      error.status = 404;
      error.code = 'NOT_FOUND';
      throw error;
    }

    await EmployeeRepository.delete(id);
  },
};
