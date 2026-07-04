import { Router } from 'express';
import { LeaveController } from './leave.controller.js';
import { validateSchema } from '../../middleware/validation.middleware.js';
import { createLeaveSchema, updateLeaveSchema, actionLeaveSchema } from './leave.validation.js';
import { authMiddleware } from '../../middleware/auth.middleware.js';
import { roleMiddleware } from '../../middleware/role.middleware.js';

const router = Router();

// Apply Authentication middleware globally on all routes
router.use(authMiddleware);

// Query APIs
router.get('/', LeaveController.list);
router.get('/:id', LeaveController.get);

// Submit leave
router.post('/', validateSchema(createLeaveSchema), LeaveController.create);

// Update/Edit leaves (Restricted to creator or Pending state)
router.put('/:id', validateSchema(updateLeaveSchema), LeaveController.update);
router.delete('/:id', LeaveController.delete);

// Approval actions (Restricted to Admin and Manager roles)
router.post('/:id/approve', roleMiddleware(['Admin', 'Manager']), validateSchema(actionLeaveSchema), LeaveController.approve);
router.post('/:id/reject', roleMiddleware(['Admin', 'Manager']), validateSchema(actionLeaveSchema), LeaveController.reject);

export default router;
