import { z } from 'zod';

export const checkInSchema = z.object({
  body: z.object({
    employeeId: z.string().trim().min(1, 'Employee ID is required.'),
    location: z.string().trim().default('Office'),
    checkInTime: z.string().optional(), // Server defaults to current time if missing
  }),
});

export const checkOutSchema = z.object({
  body: z.object({
    employeeId: z.string().trim().min(1, 'Employee ID is required.'),
    checkOutTime: z.string().optional(), // Server defaults to current time if missing
  }),
});

export const editAttendanceSchema = z.object({
  body: z.object({
    checkIn: z.string().trim().optional(),
    checkOut: z.string().trim().nullable().optional(),
    status: z.enum(['Present', 'Absent', 'Late', 'Half Day', 'Leave', 'Work From Home', 'Holiday', 'Weekend']).optional(),
    location: z.string().trim().optional(),
  }),
});
