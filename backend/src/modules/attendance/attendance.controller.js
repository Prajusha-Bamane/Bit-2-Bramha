import { AttendanceService } from './attendance.service.js';

export const AttendanceController = {
  list: async (req, res, next) => {
    try {
      const { 
        search, 
        department, 
        status, 
        startDate, 
        endDate, 
        sortBy, 
        sortOrder, 
        page, 
        limit 
      } = req.query;

      const result = await AttendanceService.getLogs({
        search,
        department,
        status,
        startDate,
        endDate,
        sortBy,
        sortOrder,
        page,
        limit,
      });

      return res.status(200).json({
        status: 'success',
        data: result.items,
        meta: {
          pagination: result.pagination,
          timestamp: new Date().toISOString(),
        },
      });
    } catch (err) {
      next(err);
    }
  },

  get: async (req, res, next) => {
    try {
      const { id } = req.params;
      const log = await AttendanceService.getLogById(id);

      return res.status(200).json({
        status: 'success',
        data: {
          attendance: log,
        },
        meta: {
          timestamp: new Date().toISOString(),
        },
      });
    } catch (err) {
      next(err);
    }
  },

  checkIn: async (req, res, next) => {
    try {
      const { employeeId, location, checkInTime } = req.body;
      const log = await AttendanceService.checkIn({ employeeId, location, checkInTime });

      return res.status(201).json({
        status: 'success',
        data: {
          attendance: log,
        },
        meta: {
          timestamp: new Date().toISOString(),
        },
      });
    } catch (err) {
      next(err);
    }
  },

  checkOut: async (req, res, next) => {
    try {
      const { employeeId, checkOutTime } = req.body;
      const log = await AttendanceService.checkOut({ employeeId, checkOutTime });

      return res.status(200).json({
        status: 'success',
        data: {
          attendance: log,
        },
        meta: {
          timestamp: new Date().toISOString(),
        },
      });
    } catch (err) {
      next(err);
    }
  },

  update: async (req, res, next) => {
    try {
      const { id } = req.params;
      const updated = await AttendanceService.updateLog(id, req.body);

      return res.status(200).json({
        status: 'success',
        data: {
          attendance: updated,
        },
        meta: {
          timestamp: new Date().toISOString(),
        },
      });
    } catch (err) {
      next(err);
    }
  },

  delete: async (req, res, next) => {
    try {
      const { id } = req.params;
      await AttendanceService.deleteLog(id);

      return res.status(200).json({
        status: 'success',
        data: {
          message: 'Attendance record deleted successfully.',
        },
        meta: {
          timestamp: new Date().toISOString(),
        },
      });
    } catch (err) {
      next(err);
    }
  },
};
