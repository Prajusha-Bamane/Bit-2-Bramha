import db from '../../database/db.js';

export const PayrollRepository = {
  findById: async (id) => {
    return db('payroll_records').where({ id }).first();
  },

  findAll: async ({ 
    search, 
    department, 
    status, 
    month, 
    year, 
    sortBy = 'created_at', 
    sortOrder = 'desc', 
    limit = 10, 
    offset = 0 
  }) => {
    let query = db('payroll_records')
      .join('employees', 'payroll_records.employee_id', '=', 'employees.id')
      .select(
        'payroll_records.*',
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
      query = query.andWhere('payroll_records.status', '=', status);
    }

    if (month) {
      query = query.andWhere('payroll_records.month', '=', month);
    }

    if (year) {
      query = query.andWhere('payroll_records.year', '=', year);
    }

    return query
      .orderBy(sortBy, sortOrder)
      .limit(limit)
      .offset(offset);
  },

  countAll: async ({ search, department, status, month, year }) => {
    let query = db('payroll_records')
      .join('employees', 'payroll_records.employee_id', '=', 'employees.id');

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
      query = query.andWhere('payroll_records.status', '=', status);
    }

    if (month) {
      query = query.andWhere('payroll_records.month', '=', month);
    }

    if (year) {
      query = query.andWhere('payroll_records.year', '=', year);
    }

    const result = await query.count('* as count').first();
    return parseInt(result?.count || 0, 10);
  },

  create: async (payrollData) => {
    await db('payroll_records').insert({
      id: payrollData.id,
      employee_id: payrollData.employeeId,
      basic_salary: payrollData.basicSalary,
      allowances: payrollData.allowances,
      deductions: payrollData.deductions,
      bonus: payrollData.bonus,
      net_salary: payrollData.netSalary,
      status: payrollData.status || 'Pending',
      month: payrollData.month,
      year: payrollData.year,
      payment_date: payrollData.paymentDate,
    });
    return db('payroll_records').where({ id: payrollData.id }).first();
  },

  update: async (id, updateData) => {
    const dbUpdate = {};
    if (updateData.basicSalary !== undefined) dbUpdate.basic_salary = updateData.basicSalary;
    if (updateData.allowances !== undefined) dbUpdate.allowances = updateData.allowances;
    if (updateData.deductions !== undefined) dbUpdate.deductions = updateData.deductions;
    if (updateData.bonus !== undefined) dbUpdate.bonus = updateData.bonus;
    if (updateData.netSalary !== undefined) dbUpdate.net_salary = updateData.netSalary;
    if (updateData.status !== undefined) dbUpdate.status = updateData.status;
    if (updateData.paymentDate !== undefined) dbUpdate.payment_date = updateData.paymentDate;

    await db('payroll_records')
      .where({ id })
      .update({
        ...dbUpdate,
        updated_at: db.fn.now(),
      });
    return db('payroll_records').where({ id }).first();
  },

  delete: async (id) => {
    return db('payroll_records').where({ id }).delete();
  },
};
