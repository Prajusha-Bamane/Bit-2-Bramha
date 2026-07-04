/**
 * PayrollHeader Component
 * Displays header with payroll info and current month details
 */

import React from 'react';
import { Calendar, DollarSign, CheckCircle, Clock } from 'lucide-react';

const PayrollHeader = ({ payrollStatus, currentMonth, latestSalary }) => {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg shadow-lg p-8 mb-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Month */}
        <div className="flex items-start space-x-4">
          <div className="bg-white/20 rounded-lg p-3">
            <Calendar className="w-6 h-6" />
          </div>
          <div>
            <p className="text-blue-100 text-sm font-medium">Current Month</p>
            <p className="text-xl font-bold">{currentMonth}</p>
          </div>
        </div>

        {/* Latest Salary */}
        <div className="flex items-start space-x-4">
          <div className="bg-white/20 rounded-lg p-3">
            <DollarSign className="w-6 h-6" />
          </div>
          <div>
            <p className="text-blue-100 text-sm font-medium">Latest Salary</p>
            <p className="text-xl font-bold">₹{latestSalary?.toLocaleString() || '0'}</p>
          </div>
        </div>

        {/* Payroll Status */}
        <div className="flex items-start space-x-4">
          <div className="bg-white/20 rounded-lg p-3">
            <CheckCircle className="w-6 h-6" />
          </div>
          <div>
            <p className="text-blue-100 text-sm font-medium">Payroll Status</p>
            <p className="text-xl font-bold capitalize">{payrollStatus?.currentStatus || 'Pending'}</p>
          </div>
        </div>

        {/* Last Payment */}
        <div className="flex items-start space-x-4">
          <div className="bg-white/20 rounded-lg p-3">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <p className="text-blue-100 text-sm font-medium">Last Payment Date</p>
            <p className="text-xl font-bold">{payrollStatus?.lastPaymentDate || 'N/A'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PayrollHeader;
