import { z } from 'zod';

export const createLeaveSchema = z.object({
  body: z.object({
    employeeId: z.string().trim().min(1, 'Employee ID is required.'),
    leaveType: z.enum([
      'Casual Leave', 'Sick Leave', 'Earned Leave', 'Maternity Leave', 
      'Paternity Leave', 'Work From Home', 'Compensatory Off', 'Unpaid Leave', 
      'Emergency Leave'
    ]),
    startDate: z.string().min(1, 'Start date is required.'),
    endDate: z.string().min(1, 'End date is required.'),
    halfDay: z.boolean().default(false),
    reason: z.string().trim().min(1, 'Reason for leave is required.'),
    emergencyPhone: z.string().trim().min(10, 'Emergency phone number must be at least 10 digits.'),
    managerId: z.string().trim().optional(),
    comments: z.string().trim().optional(),
  }),
});

export const updateLeaveSchema = z.object({
  body: z.object({
    leaveType: z.enum([
      'Casual Leave', 'Sick Leave', 'Earned Leave', 'Maternity Leave', 
      'Paternity Leave', 'Work From Home', 'Compensatory Off', 'Unpaid Leave', 
      'Emergency Leave'
    ]).optional(),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
    halfDay: z.boolean().optional(),
    reason: z.string().trim().optional(),
    emergencyPhone: z.string().trim().optional(),
    comments: z.string().trim().optional(),
  }),
});

export const actionLeaveSchema = z.object({
  body: z.object({
    comments: z.string().trim().optional(),
    approverId: z.string().trim().optional(), // Server defaults to logged-in user if missing
  }),
});
