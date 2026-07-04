export const roleMiddleware = (allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        status: 'error',
        error: {
          code: 'UNAUTHORIZED',
          message: 'Client authentication is required to access this resource.',
        },
        meta: {
          timestamp: new Date().toISOString(),
        },
      });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        status: 'error',
        error: {
          code: 'FORBIDDEN',
          message: 'Forbidden: Insufficient privileges to perform this operation.',
        },
        meta: {
          timestamp: new Date().toISOString(),
        },
      });
    }

    next();
  };
};
