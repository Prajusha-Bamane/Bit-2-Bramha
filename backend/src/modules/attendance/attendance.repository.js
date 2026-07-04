import db from '../../database/db.js';

export const AttendanceRepository = {
  findById: async (id) => {
    return db('attendance').where({ id }).first();
  },

  findByEmployeeAndDate: async (employeeId, dateStr) => {
    return db('attendance')
      .where({ employee_id: employeeId })
      .andWhere(db.raw('DATE(check_in) = ?', [dateStr]))
      .first();
  },

  findAll: async ({ 
    search, 
    department, 
    status, 
    startDate, 
    endDate, 
    sortBy = 'check_in', 
    sortOrder = 'desc', 
    limit = 10, 
    offset = 0 
  }) => {
    let query = db('attendance')
      .join('employees', 'attendance.employee_id', '=', 'employees.id')
      .select(
        'attendance.*',
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
      query = query.andWhere('attendance.status', '=', status);
    }

    if (startDate) {
      query = query.andWhere('attendance.check_in', '>=', startDate);
    }

    if (endDate) {
      query = query.andWhere('attendance.check_in', '<=', endDate);
    }

    return query
      .orderBy(sortBy, sortOrder)
      .limit(limit)
      .offset(offset);
  },

  countAll: async ({ search, department, status, startDate, endDate }) => {
    let query = db('attendance')
      .join('employees', 'attendance.employee_id', '=', 'employees.id');

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
      query = query.andWhere('attendance.status', '=', status);
    }

    if (startDate) {
      query = query.andWhere('attendance.check_in', '>=', startDate);
    }

    if (endDate) {
      query = query.andWhere('attendance.check_in', '<=', endDate);
    }

    const result = await query.count('* as count').first();
    return parseInt(result?.count || 0, 10);
  },

  create: async (attendanceData) => {
    await db('attendance').insert({
      id: attendanceData.id,
      employee_id: attendanceData.employeeId,
      check_in: attendanceData.checkIn,
      location: attendanceData.location,
      status: attendanceData.status,
    });
    return db('attendance').where({ id: attendanceData.id }).first();
  },

  update: async (id, updateData) => {
    const dbUpdate = {};
    if (updateData.checkIn !== undefined) dbUpdate.check_in = updateData.checkIn;
    if (updateData.checkOut !== undefined) dbUpdate.check_out = updateData.checkOut;
    if (updateData.location !== undefined) dbUpdate.location = updateData.location;
    if (updateData.status !== undefined) dbUpdate.status = updateData.status;

    await db('attendance')
      .where({ id })
      .update({
        ...dbUpdate,
        updated_at: db.fn.now(),
      });
    return db('attendance').where({ id }).first();
  },

  delete: async (id) => {
    return db('attendance').where({ id }).delete();
  },
};
