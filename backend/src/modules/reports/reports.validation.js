import { z } from 'zod';

export const reportQuerySchema = z.object({
  query: z.object({
    department: z.string().trim().optional(),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
    status: z.string().optional(),
    month: z.string().transform(val => val ? parseInt(val, 10) : undefined).optional(),
    year: z.string().transform(val => val ? parseInt(val, 10) : undefined).optional(),
  }),
});
