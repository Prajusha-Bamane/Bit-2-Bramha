/**
 * Employee Payroll Service
 * Handles all payroll-related operations
 * Prepares for future backend integration
 */

import payrollData from '../data/mockPayrollData';

// Simulate API delay
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

class EmployeePayrollService {
  /**
   * Get current month payroll summary
   */
  async getPayrollSummary() {
    await delay(300);
    return {
      success: true,
      data: payrollData.kpiSummary,
    };
  }

  /**
   * Get all payroll history
   */
  async getPayrollHistory() {
    await delay(300);
    return {
      success: true,
      data: payrollData.salaryHistory,
    };
  }

  /**
   * Get payroll history with pagination and filters
   */
  async getPayrollHistoryPaginated(page = 1, pageSize = 5, filters = {}) {
    await delay(300);
    let data = [...payrollData.salaryHistory];

    // Apply filters
    if (filters.status) {
      data = data.filter((item) => item.statusBadge === filters.status);
    }

    if (filters.year) {
      data = data.filter((item) => item.year === parseInt(filters.year));
    }

    const startIndex = (page - 1) * pageSize;
    const paginatedData = data.slice(startIndex, startIndex + pageSize);

    return {
      success: true,
      data: paginatedData,
      pagination: {
        total: data.length,
        page,
        pageSize,
        totalPages: Math.ceil(data.length / pageSize),
      },
    };
  }

  /**
   * Get specific payslip by ID
   */
  async getPayslipById(id) {
    await delay(300);
    const payslip = payrollData.salaryHistory.find((item) => item.id === id);

    if (!payslip) {
      return {
        success: false,
        error: 'Payslip not found',
      };
    }

    return {
      success: true,
      data: {
        ...payslip,
        employeeInfo: payrollData.employeePayrollInfo,
        bankInfo: {
          bankName: payrollData.employeePayrollInfo.bankName,
          accountNumber: payrollData.employeePayrollInfo.accountNumber,
          ifscCode: payrollData.employeePayrollInfo.ifscCode,
        },
      },
    };
  }

  /**
   * Get current month payroll details
   */
  async getCurrentMonthPayroll() {
    await delay(300);
    const latestPayroll = payrollData.salaryHistory[0];
    return {
      success: true,
      data: {
        ...latestPayroll,
        breakdown: payrollData.currentMonthBreakdown,
      },
    };
  }

  /**
   * Get tax summary
   */
  async getTaxSummary() {
    await delay(300);
    return {
      success: true,
      data: payrollData.taxSummary,
    };
  }

  /**
   * Get bonus history
   */
  async getBonusHistory() {
    await delay(300);
    return {
      success: true,
      data: payrollData.bonusHistory,
    };
  }

  /**
   * Get payroll status
   */
  async getPayrollStatus() {
    await delay(300);
    return {
      success: true,
      data: payrollData.payrollStatus,
    };
  }

  /**
   * Get employee payroll info (bank details, etc.)
   */
  async getEmployeePayrollInfo() {
    await delay(300);
    return {
      success: true,
      data: payrollData.employeePayrollInfo,
    };
  }

  /**
   * Get recent payroll activity
   */
  async getRecentActivity() {
    await delay(300);
    return {
      success: true,
      data: payrollData.recentActivity,
    };
  }

  /**
   * Get payroll analytics data
   */
  async getPayrollAnalytics() {
    await delay(300);
    return {
      success: true,
      data: {
        monthlyTrend: payrollData.monthlyTrend,
        allowanceDistribution: payrollData.allowanceDistribution,
        deductionDistribution: payrollData.deductionDistribution,
        annualEarnings: payrollData.annualEarnings,
      },
    };
  }

  /**
   * Download payslip (returns mock URL)
   */
  async downloadPayslip(id) {
    await delay(500);
    const payslip = payrollData.salaryHistory.find((item) => item.id === id);

    if (!payslip) {
      return {
        success: false,
        error: 'Payslip not found',
      };
    }

    // Mock PDF generation
    return {
      success: true,
      data: {
        url: `/payslips/payslip-${payslip.monthYear}.pdf`,
        fileName: `payslip-${payslip.monthYear}.pdf`,
      },
    };
  }

  /**
   * Email payslip (mock)
   */
  async emailPayslip(id, email) {
    await delay(800);
    return {
      success: true,
      data: {
        message: `Payslip has been sent to ${email}`,
      },
    };
  }

  /**
   * Get salary advance request form (for future integration)
   */
  async getSalaryAdvanceInfo() {
    await delay(300);
    return {
      success: true,
      data: {
        availableAmount: 50000,
        maxAdvanceLimit: 100000,
        processingTime: '3-5 business days',
      },
    };
  }

  /**
   * Get payroll deductions breakdown
   */
  async getDeductionsBreakdown() {
    await delay(300);
    const latestPayroll = payrollData.salaryHistory[0];
    return {
      success: true,
      data: latestPayroll.salaryComponents.deductions,
    };
  }

  /**
   * Get allowances breakdown
   */
  async getAllowancesBreakdown() {
    await delay(300);
    const latestPayroll = payrollData.salaryHistory[0];
    return {
      success: true,
      data: latestPayroll.salaryComponents.basics,
    };
  }

  /**
   * Search payroll history
   */
  async searchPayrollHistory(query) {
    await delay(300);
    const results = payrollData.salaryHistory.filter((item) =>
      item.monthYear.toLowerCase().includes(query.toLowerCase()) ||
      item.payrollMonth.includes(query)
    );

    return {
      success: true,
      data: results,
    };
  }
}

export default new EmployeePayrollService();
