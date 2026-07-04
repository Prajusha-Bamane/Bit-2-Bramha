import crypto from 'crypto';
import { LeaveRepository } from './leave.repository.js';

export const LeaveService = {
  getLeaves: async ({ 
    search, 
    department, 
    status, 
    leaveType, 
    startDate, 
    endDate, 
    sortBy, 
    sortOrder, 
    page = 1, 
    limit = 10 
  }) => {
    const parsedPage = parseInt(page, 10) || 1;
    const parsedLimit = parseInt(limit, 10) || 10;
    const offset = (parsedPage - 1) * parsedLimit;

    const items = await LeaveRepository.findAll({
      search,
      department,
      status,
      leaveType,
      startDate,
      endDate,
      sortBy,
      sortOrder,
      limit: parsedLimit,
      offset,
    });

    const totalRecords = await LeaveRepository.countAll({
      search,
      department,
      status,
      leaveType,
      startDate,
      endDate,
    });

    const totalPages = Math.ceil(totalRecords / parsedLimit);

    const formattedItems = items.map((item) => ({
      id: item.id,
      employeeId: item.employee_id,
      firstName: item.first_name,
      lastName: item.last_name,
      email: item.email,
      department: item.department,
      role: item.role,
      leaveType: item.leave_type,
      startDate: item.start_date,
      endDate: item.end_date,
      halfDay: Boolean(item.half_day),
      reason: item.reason,
      emergencyPhone: item.emergency_phone,
      status: item.status,
      comments: item.comments,
      approverId: item.approver_id,
      createdAt: item.created_at,
      updatedAt: item.updated_at,
    }));

    return {
      items: formattedItems,
      pagination: {
        page: parsedPage,
        limit: parsedLimit,
        totalRecords,
        totalPages,
      },
    };
  },

  getLeaveById: async (id) => {
    const log = await LeaveRepository.findById(id);
    if (!log) {
      const error = new Error('Leave request not found.');
      error.status = 404;
      error.code = 'NOT_FOUND';
      throw error;
    }
    return log;
  },

  applyLeave: async (data) => {
    const id = crypto.randomUUID();
    const payload = {
      ...data,
      id,
      status: 'Pending',
    };

    const newLeave = await LeaveRepository.create(payload);
    return newLeave;
  },

  updateLeave: async (id, data) => {
    const log = await LeaveRepository.findById(id);
    if (!log) {
      const error = new Error('Leave request not found.');
      error.status = 404;
      error.code = 'NOT_FOUND';
      throw error;
    }

    if (log.status !== 'Pending') {
      const error = new Error('Only pending leave requests can be updated.');
      error.status = 400;
      error.code = 'BAD_REQUEST';
      throw error;
    }

    const updated = await LeaveRepository.update(id, data);
    return updated;
  },

  deleteLeave: async (id) => {
    const log = await LeaveRepository.findById(id);
    if (!log) {
      const error = new Error('Leave request not found.');
      error.status = 404;
      error.code = 'NOT_FOUND';
      throw error;
    }

    if (log.status !== 'Pending') {
      const error = new Error('Only pending leave requests can be deleted.');
      error.status = 400;
      error.code = 'BAD_REQUEST';
      throw error;
    }

    await LeaveRepository.delete(id);
  },

  approveLeave: async (id, { comments, approverId }) => {
    const log = await LeaveRepository.findById(id);
    if (!log) {
      const error = new Error('Leave request not found.');
      error.status = 404;
      error.code = 'NOT_FOUND';
      throw error;
    }

    const updated = await LeaveRepository.update(id, {
      status: 'Approved',
      comments: comments || 'Approved by Manager Review workflow',
      approverId,
    });
    return updated;
  },

  rejectLeave: async (id, { comments, approverId }) => {
    const log = await LeaveRepository.findById(id);
    if (!log) {
      const error = new Error('Leave request not found.');
      error.status = 404;
      error.code = 'NOT_FOUND';
      throw error;
    }

    const updated = await LeaveRepository.update(id, {
      status: 'Rejected',
      comments: comments || 'Rejected by Manager Review workflow',
      approverId,
    });
    return updated;
  },
};
