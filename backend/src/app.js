import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import authRoutes from './modules/auth/auth.routes.js';
import employeeRoutes from './modules/employee/employee.routes.js';
import attendanceRoutes from './modules/attendance/attendance.routes.js';
import leaveRoutes from './modules/leave/leave.routes.js';
import payrollRoutes from './modules/payroll/payroll.routes.js';
import reportsRoutes from './modules/reports/reports.routes.js';
import { errorMiddleware } from './middleware/error.middleware.js';

const app = express();

// Security Middlewares
app.use(helmet());

const corsOptions = {
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};
app.use(cors(corsOptions));

// HTTP Request Logger
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));

// Request body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Core API endpoints routing registration
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/employees', employeeRoutes);
app.use('/api/v1/attendance', attendanceRoutes);
app.use('/api/v1/leave', leaveRoutes);
app.use('/api/v1/payroll', payrollRoutes);
app.use('/api/v1/reports', reportsRoutes);

// Fallback Route handler (404)
app.use((req, res, next) => {
  res.status(404).json({
    status: 'error',
    error: {
      code: 'RESOURCE_NOT_FOUND',
      message: `The requested endpoint ${req.method} ${req.originalUrl} does not exist on this server.`,
    },
    meta: {
      timestamp: new Date().toISOString(),
    },
  });
});

// Global Error Interceptor Middleware
app.use(errorMiddleware);

export default app;
