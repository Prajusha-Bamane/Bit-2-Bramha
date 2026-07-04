import { LeaveService } from './leave.service.js';

export const LeaveController = {
  list: async (req, res, next) => {
    try {
      const { 
        search, 
        department, 
        status, 
        leaveType, 
        startDate, 
        endDate, 
        sortBy, 
        sortOrder, 
        page, 
        limit 
      } = req.query;

      const result = await LeaveService.getLeaves({
        search,
        department,
        status,
        leaveType,
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
      const log = await LeaveService.getLeaveById(id);

      return res.status(200).json({
        status: 'success',
        data: {
          leave: log,
        },
        meta: {
          timestamp: new Date().toISOString(),
        },
      });
    } catch (err) {
      next(err);
    }
  },

  create: async (req, res, next) => {
    try {
      const newLeave = await LeaveService.applyLeave(req.body);

      return res.status(201).json({
        status: 'success',
        data: {
          leave: newLeave,
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
      const updated = await LeaveService.updateLeave(id, req.body);

      return res.status(200).json({
        status: 'success',
        data: {
          leave: updated,
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
      await LeaveService.deleteLeave(id);

      return res.status(200).json({
        status: 'success',
        data: {
          message: 'Leave request deleted successfully.',
        },
        meta: {
          timestamp: new Date().toISOString(),
        },
      });
    } catch (err) {
      next(err);
    }
  },

  approve: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { comments } = req.body;
      const approverId = req.user?.id; // Retrieved via authMiddleware

      const updated = await LeaveService.approveLeave(id, { comments, approverId });

      return res.status(200).json({
        status: 'success',
        data: {
          leave: updated,
        },
        meta: {
          timestamp: new Date().toISOString(),
        },
      });
    } catch (err) {
      next(err);
    }
  },

  reject: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { comments } = req.body;
      const approverId = req.user?.id; // Retrieved via authMiddleware

      const updated = await LeaveService.rejectLeave(id, { comments, approverId });

      return res.status(200).json({
        status: 'success',
        data: {
          leave: updated,
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
