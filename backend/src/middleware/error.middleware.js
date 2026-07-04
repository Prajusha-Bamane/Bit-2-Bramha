import { logger } from '../utils/logger.js';

export const errorMiddleware = (err, req, res, next) => {
  logger.error(`Error processing request ${req.method} ${req.url}:`, err);

  const statusCode = err.status || err.statusCode || 500;
  const errorCode = err.code || 'INTERNAL_SERVER_ERROR';
  const message = err.message || 'An unexpected server error occurred.';
  const details = err.details || null;

  res.status(statusCode).json({
    status: 'error',
    error: {
      code: errorCode,
      message,
      ...(details && { details }),
    },
    meta: {
      timestamp: new Date().toISOString(),
    },
  });
};
