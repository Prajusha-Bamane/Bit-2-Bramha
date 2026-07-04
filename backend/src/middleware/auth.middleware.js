import jwt from 'jsonwebtoken';
import { logger } from '../utils/logger.js';

export const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        status: 'error',
        error: {
          code: 'UNAUTHORIZED',
          message: 'Access token is missing or malformed.',
        },
        meta: {
          timestamp: new Date().toISOString(),
        },
      });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = {
      id: decoded.id,
      email: decoded.email,
      role: decoded.role,
      firstName: decoded.firstName,
      lastName: decoded.lastName,
    };

    next();
  } catch (err) {
    logger.warn('Authentication token verification failed:', { message: err.message });
    const code = err.name === 'TokenExpiredError' ? 'TOKEN_EXPIRED' : 'UNAUTHORIZED';
    const message =
      err.name === 'TokenExpiredError'
        ? 'Access token has expired. Request renewal.'
        : 'Access token signature is invalid.';

    return res.status(401).json({
      status: 'error',
      error: {
        code,
        message,
      },
      meta: {
        timestamp: new Date().toISOString(),
      },
    });
  }
};
