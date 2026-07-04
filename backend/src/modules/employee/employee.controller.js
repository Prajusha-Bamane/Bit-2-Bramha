import { EmployeeService } from './employee.service.js';

export const EmployeeController = {
  list: async (req, res, next) => {
    try {
      const { 
        search, 
        department, 
        role, 
        status, 
        sortBy, 
        sortOrder, 
        page, 
        limit 
      } = req.query;

      const result = await EmployeeService.getEmployees({
        search,
        department,
        role,
        status,
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
      const employee = await EmployeeService.getEmployeeById(id);

      return res.status(200).json({
        status: 'success',
        data: {
          employee,
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
      const newEmp = await EmployeeService.createEmployee(req.body);

      return res.status(201).json({
        status: 'success',
        data: {
          employee: newEmp,
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
      const updated = await EmployeeService.updateEmployee(id, req.body);

      return res.status(200).json({
        status: 'success',
        data: {
          employee: updated,
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
      await EmployeeService.deleteEmployee(id);

      return res.status(200).json({
        status: 'success',
        data: {
          message: 'Employee record successfully soft-deleted.',
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
