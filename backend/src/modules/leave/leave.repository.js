import db from '../../database/db.js';

export const LeaveRepository = {
  findById: async (id) => {
    return db('leave_requests').where({ id }).first();
  },

  findAll: async ({ 
    search, 
    department, 
    status, 
    leaveType, 
    startDate, 
    endDate, 
    sortBy = 'created_at', 
    sortOrder = 'desc', 
    limit = 10, 
    offset = 0 
  }) => {
    let query = db('leave_requests')
      .join('employees', 'leave_requests.employee_id', '=', 'employees.id')
      .select(
        'leave_requests.*',
        'employees.first_name',
        'employees.last_name',
        'employees.email',
        'employees.department',
        'employees.role'
      );

    if (search) {
      query = query.andWhere((builder) => {
        builder.where('employees.first_name', 'like', `%${search}%`)
          .orWhere('employees.last_name', 'like', `%${search}%`)
          .orWhere('employees.id', 'like', `%${search}%`);
      });
    }

    if (department) {
      query = query.andWhere('employees.department', '=', department);
    }

    if (status) {
      query = query.andWhere('leave_requests.status', '=', status);
    }

    if (leaveType) {
      query = query.andWhere('leave_requests.leave_type', '=', leaveType);
    }

    if (startDate) {
      query = query.andWhere('leave_requests.start_date', '>=', startDate);
    }

    if (endDate) {
      query = query.andWhere('leave_requests.end_date', '<=', endDate);
    }

    return query
      .orderBy(sortBy, sortOrder)
      .limit(limit)
      .offset(offset);
  },

  countAll: async ({ search, department, status, leaveType, startDate, endDate }) => {
    let query = db('leave_requests')
      .join('employees', 'leave_requests.employee_id', '=', 'employees.id');

    if (search) {
      query = query.andWhere((builder) => {
        builder.where('employees.first_name', 'like', `%${search}%`)
          .orWhere('employees.last_name', 'like', `%${search}%`)
          .orWhere('employees.id', 'like', `%${search}%`);
      });
    }

    if (department) {
      query = query.andWhere('employees.department', '=', department);
    }

    if (status) {
      query = query.andWhere('leave_requests.status', '=', status);
    }

    if (leaveType) {
      query = query.andWhere('leave_requests.leave_type', '=', leaveType);
    }

    if (startDate) {
      query = query.andWhere('leave_requests.start_date', '>=', startDate);
    }

    if (endDate) {
      query = query.andWhere('leave_requests.end_date', '<=', endDate);
    }

    const result = await query.count('* as count').first();
    return parseInt(result?.count || 0, 10);
  },

  create: async (leaveData) => {
    await db('leave_requests').insert({
      id: leaveData.id,
      employee_id: leaveData.employeeId,
      leave_type: leaveData.leaveType,
      start_date: leaveData.startDate,
      end_date: leaveData.endDate,
      half_day: leaveData.halfDay,
      reason: leaveData.reason,
      emergency_phone: leaveData.emergencyPhone,
      status: leaveData.status || 'Pending',
      comments: leaveData.comments,
      approver_id: leaveData.approverId,
    });
    return db('leave_requests').where({ id: leaveData.id }).first();
  },

  update: async (id, updateData) => {
    const dbUpdate = {};
    if (updateData.leaveType !== undefined) dbUpdate.leave_type = updateData.leaveType;
    if (updateData.startDate !== undefined) dbUpdate.start_date = updateData.startDate;
    if (updateData.endDate !== undefined) dbUpdate.end_date = updateData.endDate;
    if (updateData.halfDay !== undefined) dbUpdate.half_day = updateData.halfDay;
    if (updateData.reason !== undefined) dbUpdate.reason = updateData.reason;
    if (updateData.emergencyPhone !== undefined) dbUpdate.emergency_phone = updateData.emergencyPhone;
    if (updateData.status !== undefined) dbUpdate.status = updateData.status;
    if (updateData.comments !== undefined) dbUpdate.comments = updateData.comments;
    if (updateData.approverId !== undefined) dbUpdate.approver_id = updateData.approverId;

    await db('leave_requests')
      .where({ id })
      .update({
        ...dbUpdate,
        updated_at: db.fn.now(),
      });
    return db('leave_requests').where({ id }).first();
  },

  delete: async (id) => {
    return db('leave_requests').where({ id }).delete();
  },
};
