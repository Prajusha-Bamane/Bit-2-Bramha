import { ReportsService } from './reports.service.js';

export const ReportsController = {
  getDashboard: async (req, res, next) => {
    try {
      const { department } = req.query;
      const summary = await ReportsService.getDashboardSummary({ department });

      return res.status(200).json({
        status: 'success',
        data: summary,
        meta: {
          timestamp: new Date().toISOString(),
        },
      });
    } catch (err) {
      next(err);
    }
  },

  getAttendance: async (req, res, next) => {
    try {
      const { department } = req.query;
      const metrics = await ReportsService.getAttendanceMetrics({ department });

      return res.status(200).json({
        status: 'success',
        data: metrics,
        meta: {
          timestamp: new Date().toISOString(),
        },
      });
    } catch (err) {
      next(err);
    }
  },

  getPayroll: async (req, res, next) => {
    try {
      const { department, month, year } = req.query;
      const metrics = await ReportsService.getPayrollMetrics({ department, month, year });

      return res.status(200).json({
        status: 'success',
        data: metrics,
        meta: {
          timestamp: new Date().toISOString(),
        },
      });
    } catch (err) {
      next(err);
    }
  },

  getLeaves: async (req, res, next) => {
    try {
      const { department } = req.query;
      const metrics = await ReportsService.getLeaveMetrics({ department });

      return res.status(200).json({
        status: 'success',
        data: metrics,
        meta: {
          timestamp: new Date().toISOString(),
        },
      });
    } catch (err) {
      next(err);
    }
  },

  getEmployees: async (req, res, next) => {
    try {
      const { department } = req.query;
      const metrics = await ReportsService.getEmployeeMetrics({ department });

      return res.status(200).json({
        status: 'success',
        data: metrics,
        meta: {
          timestamp: new Date().toISOString(),
        },
      });
    } catch (err) {
      next(err);
    }
  },
};
