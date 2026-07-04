import { Router } from 'express';
import { EmployeeController } from './employee.controller.js';
import { validateSchema } from '../../middleware/validation.middleware.js';
import { createEmployeeSchema, updateEmployeeSchema } from './employee.validation.js';
import { authMiddleware } from '../../middleware/auth.middleware.js';
import { roleMiddleware } from '../../middleware/role.middleware.js';

const router = Router();

// Protect all employee endpoints with JWT verification
router.use(authMiddleware);

// Query APIs
router.get('/', EmployeeController.list);
router.get('/:id', EmployeeController.get);

// Write/Modify APIs (Restricted to Admin and Manager roles)
router.post(
  '/', 
  roleMiddleware(['Admin', 'Manager']), 
  validateSchema(createEmployeeSchema), 
  EmployeeController.create
);
router.put(
  '/:id', 
  roleMiddleware(['Admin', 'Manager']), 
  validateSchema(updateEmployeeSchema), 
  EmployeeController.update
);
router.delete(
  '/:id', 
  roleMiddleware(['Admin', 'Manager']), 
  EmployeeController.delete
);

export default router;
