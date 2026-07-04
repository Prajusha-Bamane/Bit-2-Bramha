import { Router } from 'express';
import { AttendanceController } from './attendance.controller.js';
import { validateSchema } from '../../middleware/validation.middleware.js';
import { checkInSchema, checkOutSchema, editAttendanceSchema } from './attendance.validation.js';
import { authMiddleware } from '../../middleware/auth.middleware.js';
import { roleMiddleware } from '../../middleware/role.middleware.js';

const router = Router();

// Require authenticated sessions on all endpoints
router.use(authMiddleware);

// Query operations
router.get('/', AttendanceController.list);
router.get('/:id', AttendanceController.get);

// Clock operations
router.post('/check-in', validateSchema(checkInSchema), AttendanceController.checkIn);
router.post('/check-out', validateSchema(checkOutSchema), AttendanceController.checkOut);

// Write/Edit logs (Restricted to Admin and Manager roles)
router.put('/:id', roleMiddleware(['Admin', 'Manager']), validateSchema(editAttendanceSchema), AttendanceController.update);
router.delete('/:id', roleMiddleware(['Admin', 'Manager']), AttendanceController.delete);

export default router;
