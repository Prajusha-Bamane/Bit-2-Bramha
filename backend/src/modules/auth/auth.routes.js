import { Router } from 'express';
import { AuthController } from './auth.controller.js';
import { validateSchema } from '../../middleware/validation.middleware.js';
import { loginSchema } from './auth.validation.js';
import { authMiddleware } from '../../middleware/auth.middleware.js';

const router = Router();

// Public routes
router.post('/login', validateSchema(loginSchema), AuthController.login);
router.post('/refresh', AuthController.refresh);
router.post('/logout', AuthController.logout);

// Protected routes
router.get('/me', authMiddleware, AuthController.me);

export default router;
