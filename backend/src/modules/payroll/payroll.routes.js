import { Router } from 'express';
import { PayrollController } from './payroll.controller.js';
import { validateSchema } from '../../middleware/validation.middleware.js';
import { createPayrollSchema, updatePayrollSchema, generatePayrollSchema } from './payroll.validation.js';
import { authMiddleware } from '../../middleware/auth.middleware.js';
import { roleMiddleware } from '../../middleware/role.middleware.js';

const router = Router();

// Protect all payroll actions: require authenticated user
router.use(authMiddleware);

// Restrict globally to Administrator role as per enterprise layout rules
router.use(roleMiddleware(['Admin']));

// Ledgers listing
router.get('/', PayrollController.list);
router.get('/:id', PayrollController.get);

// Manual records edits
router.post('/', validateSchema(createPayrollSchema), PayrollController.create);
router.put('/:id', validateSchema(updatePayrollSchema), PayrollController.update);
router.delete('/:id', PayrollController.delete);

// Batch run calculations
router.post('/generate', validateSchema(generatePayrollSchema), PayrollController.generate);

export default router;
