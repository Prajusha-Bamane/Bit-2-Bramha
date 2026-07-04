import { z } from 'zod';

export const createEmployeeSchema = z.object({
  body: z.object({
    firstName: z.string().trim().min(1, 'First name is required.'),
    lastName: z.string().trim().min(1, 'Last name is required.'),
    email: z.string().trim().email('Invalid email address format.'),
    password: z.string().min(6, 'Password must be at least 6 characters long.').optional(),
    role: z.enum(['Admin', 'Manager', 'Employee']).default('Employee'),
    department: z.string().trim().nullable().optional(),
    status: z.enum(['Active', 'Inactive', 'Probation', 'Resigned', 'Suspended']).default('Active'),
    joiningDate: z.string().nullable().optional(),
    phone: z.string().trim().nullable().optional(),
  }),
});

export const updateEmployeeSchema = z.object({
  body: z.object({
    firstName: z.string().trim().min(1, 'First name cannot be empty.').optional(),
    lastName: z.string().trim().min(1, 'Last name cannot be empty.').optional(),
    email: z.string().trim().email('Invalid email address format.').optional(),
    role: z.enum(['Admin', 'Manager', 'Employee']).optional(),
    department: z.string().trim().nullable().optional(),
    status: z.enum(['Active', 'Inactive', 'Probation', 'Resigned', 'Suspended']).optional(),
    joiningDate: z.string().nullable().optional(),
    phone: z.string().trim().nullable().optional(),
  }),
});
