import crypto from 'crypto';
import { AttendanceRepository } from './attendance.repository.js';

export const AttendanceService = {
  getLogs: async ({ 
    search, 
    department, 
    status, 
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

    const items = await AttendanceRepository.findAll({
      search,
      department,
      status,
      startDate,
      endDate,
      sortBy,
      sortOrder,
      limit: parsedLimit,
      offset,
    });

    const totalRecords = await AttendanceRepository.countAll({
      search,
      department,
      status,
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
      checkIn: item.check_in,
      checkOut: item.check_out,
      location: item.location,
      status: item.status,
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

  getLogById: async (id) => {
    const log = await AttendanceRepository.findById(id);
    if (!log) {
      const error = new Error('Attendance log not found.');
      error.status = 404;
      error.code = 'NOT_FOUND';
      throw error;
    }
    return log;
  },

  checkIn: async ({ employeeId, location = 'Office', checkInTime }) => {
    const todayStr = new Date().toISOString().split('T')[0];
    const existing = await AttendanceRepository.findByEmployeeAndDate(employeeId, todayStr);
    if (existing) {
      const error = new Error('You have already clocked in for today.');
      error.status = 409;
      error.code = 'CONFLICT';
      throw error;
    }

    const id = crypto.randomUUID();
    const checkInTimestamp = checkInTime || new Date().toISOString();

    // Set status based on check-in hour (e.g. after 09:15 is Late)
    const checkInDateObj = new Date(checkInTimestamp);
    const hour = checkInDateObj.getHours();
    const minute = checkInDateObj.getMinutes();
    let status = 'Present';
    if (hour > 9 || (hour === 9 && minute > 15)) {
      status = 'Late';
    }

    const payload = {
      id,
      employeeId,
      checkIn: checkInTimestamp,
      location,
      status,
    };

    const newLog = await AttendanceRepository.create(payload);
    return newLog;
  },

  checkOut: async ({ employeeId, checkOutTime }) => {
    const todayStr = new Date().toISOString().split('T')[0];
    const log = await AttendanceRepository.findByEmployeeAndDate(employeeId, todayStr);
    if (!log) {
      const error = new Error('No check-in record found for today. You must clock in first.');
      error.status = 404;
      error.code = 'NOT_FOUND';
      throw error;
    }

    if (log.check_out) {
      const error = new Error('You have already checked out for today.');
      error.status = 409;
      error.code = 'CONFLICT';
      throw error;
    }

    const checkOutTimestamp = checkOutTime || new Date().toISOString();
    const updated = await AttendanceRepository.update(log.id, { checkOut: checkOutTimestamp });
    return updated;
  },

  updateLog: async (id, updateData) => {
    const log = await AttendanceRepository.findById(id);
    if (!log) {
      const error = new Error('Attendance log not found.');
      error.status = 404;
      error.code = 'NOT_FOUND';
      throw error;
    }

    const updated = await AttendanceRepository.update(id, updateData);
    return updated;
  },

  deleteLog: async (id) => {
    const log = await AttendanceRepository.findById(id);
    if (!log) {
      const error = new Error('Attendance log not found.');
      error.status = 404;
      error.code = 'NOT_FOUND';
      throw error;
    }

    await AttendanceRepository.delete(id);
  },
};
