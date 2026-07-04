import { z } from 'zod';

export const createPayrollSchema = z.object({
  body: z.object({
    employeeId: z.string().trim().min(1, 'Employee ID is required.'),
    basicSalary: z.number().positive('Basic salary must be greater than zero.'),
    allowances: z.number().nonnegative().default(0),
    deductions: z.number().nonnegative().default(0),
    bonus: z.number().nonnegative().default(0),
    month: z.number().min(1).max(12),
    year: z.number().min(2020),
    status: z.enum(['Paid', 'Pending', 'Processing', 'Failed', 'Scheduled']).default('Pending'),
  }),
});

export const updatePayrollSchema = z.object({
  body: z.object({
    basicSalary: z.number().positive().optional(),
    allowances: z.number().nonnegative().optional(),
    deductions: z.number().nonnegative().optional(),
    bonus: z.number().nonnegative().optional(),
    status: z.enum(['Paid', 'Pending', 'Processing', 'Failed', 'Scheduled']).optional(),
  }),
});

export const generatePayrollSchema = z.object({
  body: z.object({
    month: z.number().min(1).max(12, 'Invalid month selected.'),
    year: z.number().min(2020, 'Invalid year selected.'),
    department: z.string().trim().optional(),
  }),
});
