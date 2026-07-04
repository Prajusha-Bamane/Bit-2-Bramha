import { Router } from 'express';
import { ReportsController } from './reports.controller.js';
import { validateSchema } from '../../middleware/validation.middleware.js';
import { reportQuerySchema } from './reports.validation.js';
import { authMiddleware } from '../../middleware/auth.middleware.js';
import { roleMiddleware } from '../../middleware/role.middleware.js';

const router = Router();

// Protect globally: require authentication
router.use(authMiddleware);

// Restrict access to Admins and Managers for Executive Analytics
router.use(roleMiddleware(['Admin', 'Manager']));

router.get('/dashboard', validateSchema(reportQuerySchema), ReportsController.getDashboard);
router.get('/attendance', validateSchema(reportQuerySchema), ReportsController.getAttendance);
router.get('/payroll', validateSchema(reportQuerySchema), ReportsController.getPayroll);
router.get('/leaves', validateSchema(reportQuerySchema), ReportsController.getLeaves);
router.get('/employees', validateSchema(reportQuerySchema), ReportsController.getEmployees);

export default router;
