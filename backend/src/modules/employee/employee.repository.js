import db from '../../database/db.js';

export const EmployeeRepository = {
  findByEmail: async (email) => {
    return db('employees')
      .where({ email })
      .whereNull('deleted_at')
      .first();
  },

  findById: async (id) => {
    return db('employees')
      .where({ id })
      .whereNull('deleted_at')
      .first();
  },

  findAll: async ({ 
    search, 
    department, 
    role, 
    status, 
    sortBy = 'created_at', 
    sortOrder = 'desc', 
    limit = 10, 
    offset = 0 
  }) => {
    let query = db('employees').whereNull('deleted_at');

    if (search) {
      query = query.andWhere((builder) => {
        builder.where('first_name', 'like', `%${search}%`)
          .orWhere('last_name', 'like', `%${search}%`)
          .orWhere('email', 'like', `%${search}%`)
          .orWhere('id', 'like', `%${search}%`);
      });
    }

    if (department) {
      query = query.andWhere({ department });
    }

    if (role) {
      query = query.andWhere({ role });
    }

    if (status) {
      query = query.andWhere({ status });
    }

    // Map frontend-friendly camelCase fields to database snake_case
    const dbSortBy = sortBy === 'joiningDate' ? 'created_at' : (
      sortBy === 'firstName' ? 'first_name' : (
        sortBy === 'lastName' ? 'last_name' : 'created_at'
      )
    );

    return query
      .orderBy(dbSortBy, sortOrder)
      .limit(limit)
      .offset(offset);
  },

  countAll: async ({ search, department, role, status }) => {
    let query = db('employees').whereNull('deleted_at');

    if (search) {
      query = query.andWhere((builder) => {
        builder.where('first_name', 'like', `%${search}%`)
          .orWhere('last_name', 'like', `%${search}%`)
          .orWhere('email', 'like', `%${search}%`)
          .orWhere('id', 'like', `%${search}%`);
      });
    }

    if (department) {
      query = query.andWhere({ department });
    }

    if (role) {
      query = query.andWhere({ role });
    }

    if (status) {
      query = query.andWhere({ status });
    }

    const result = await query.count('* as count').first();
    return parseInt(result?.count || 0, 10);
  },

  create: async (employeeData) => {
    await db('employees').insert({
      id: employeeData.id,
      first_name: employeeData.firstName,
      last_name: employeeData.lastName,
      email: employeeData.email,
      password: employeeData.password,
      role: employeeData.role,
      department: employeeData.department,
      status: employeeData.status,
      // Map other details if present in schema extensions
    });
    return db('employees').where({ id: employeeData.id }).first();
  },

  update: async (id, updateData) => {
    const dbUpdate = {};
    if (updateData.firstName !== undefined) dbUpdate.first_name = updateData.firstName;
    if (updateData.lastName !== undefined) dbUpdate.last_name = updateData.lastName;
    if (updateData.email !== undefined) dbUpdate.email = updateData.email;
    if (updateData.role !== undefined) dbUpdate.role = updateData.role;
    if (updateData.department !== undefined) dbUpdate.department = updateData.department;
    if (updateData.status !== undefined) dbUpdate.status = updateData.status;

    await db('employees')
      .where({ id })
      .update({
        ...dbUpdate,
        updated_at: db.fn.now(),
      });
    return db('employees').where({ id }).first();
  },

  delete: async (id) => {
    return db('employees')
      .where({ id })
      .update({
        deleted_at: db.fn.now(),
      });
  },
};
