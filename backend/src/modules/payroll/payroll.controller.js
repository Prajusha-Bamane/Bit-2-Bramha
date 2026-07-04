import { PayrollService } from './payroll.service.js';

export const PayrollController = {
  list: async (req, res, next) => {
    try {
      const { 
        search, 
        department, 
        status, 
        month, 
        year, 
        sortBy, 
        sortOrder, 
        page, 
        limit 
      } = req.query;

      const result = await PayrollService.getPayrollRecords({
        search,
        department,
        status,
        month,
        year,
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
      const record = await PayrollService.getPayrollById(id);

      return res.status(200).json({
        status: 'success',
        data: {
          payroll: record,
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
      const record = await PayrollService.createPayrollRecord(req.body);

      return res.status(201).json({
        status: 'success',
        data: {
          payroll: record,
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
      const record = await PayrollService.updatePayrollRecord(id, req.body);

      return res.status(200).json({
        status: 'success',
        data: {
          payroll: record,
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
      await PayrollService.deletePayrollRecord(id);

      return res.status(200).json({
        status: 'success',
        data: {
          message: 'Payroll record deleted successfully.',
        },
        meta: {
          timestamp: new Date().toISOString(),
        },
      });
    } catch (err) {
      next(err);
    }
  },

  generate: async (req, res, next) => {
    try {
      const { month, year, department } = req.body;
      const summary = await PayrollService.generatePayroll({ month, year, department });

      return res.status(200).json({
        status: 'success',
        data: {
          summary,
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
