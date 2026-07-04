/**
 * SalaryBreakdown Component
 * Displays detailed current month salary breakdown
 */

import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const SalaryBreakdown = ({ breakdown }) => {
  const [expandedSection, setExpandedSection] = React.useState('all');

  if (!breakdown) {
    return null;
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-8 mb-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-8">
        Current Month Salary Breakdown - {breakdown.month}
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Allowances */}
        <div className="space-y-4">
          <div
            className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-6 cursor-pointer hover:shadow-md transition-shadow"
            onClick={() =>
              setExpandedSection(expandedSection === 'allowances' ? 'all' : 'allowances')
            }
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Allowances</p>
                <p className="text-3xl font-bold text-green-600">
                  ₹{breakdown.totalAllowances?.toLocaleString() || '0'}
                </p>
              </div>
              {expandedSection === 'allowances' ? (
                <ChevronUp className="w-6 h-6 text-green-600" />
              ) : (
                <ChevronDown className="w-6 h-6 text-green-600" />
              )}
            </div>

            {expandedSection === 'allowances' && (
              <div className="mt-6 pt-6 border-t border-green-200 space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-700">Basic Salary</span>
                  <span className="font-semibold text-gray-800">
                    ₹{breakdown.basicSalary?.toLocaleString() || '0'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">House Rent Allowance</span>
                  <span className="font-semibold text-gray-800">
                    ₹{breakdown.houseRentAllowance?.toLocaleString() || '0'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Medical Allowance</span>
                  <span className="font-semibold text-gray-800">
                    ₹{breakdown.medicalAllowance?.toLocaleString() || '0'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Travel Allowance</span>
                  <span className="font-semibold text-gray-800">
                    ₹{breakdown.travelAllowance?.toLocaleString() || '0'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Performance Bonus</span>
                  <span className="font-semibold text-gray-800">
                    ₹{breakdown.performanceBonus?.toLocaleString() || '0'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Other Allowances</span>
                  <span className="font-semibold text-gray-800">
                    ₹{breakdown.otherAllowances?.toLocaleString() || '0'}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Gross Salary */}
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-6 border-2 border-blue-200">
            <p className="text-gray-600 text-sm font-medium mb-2">Gross Salary</p>
            <p className="text-3xl font-bold text-blue-600">
              ₹{breakdown.grossSalary?.toLocaleString() || '0'}
            </p>
            <p className="text-xs text-gray-600 mt-2">Before deductions</p>
          </div>
        </div>

        {/* Deductions */}
        <div className="space-y-4">
          <div
            className="bg-gradient-to-r from-red-50 to-red-100 rounded-lg p-6 cursor-pointer hover:shadow-md transition-shadow"
            onClick={() =>
              setExpandedSection(expandedSection === 'deductions' ? 'all' : 'deductions')
            }
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Deductions</p>
                <p className="text-3xl font-bold text-red-600">
                  ₹{breakdown.totalDeductions?.toLocaleString() || '0'}
                </p>
              </div>
              {expandedSection === 'deductions' ? (
                <ChevronUp className="w-6 h-6 text-red-600" />
              ) : (
                <ChevronDown className="w-6 h-6 text-red-600" />
              )}
            </div>

            {expandedSection === 'deductions' && (
              <div className="mt-6 pt-6 border-t border-red-200 space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-700">Provident Fund</span>
                  <span className="font-semibold text-gray-800">
                    ₹{Math.abs(breakdown.providentFund)?.toLocaleString() || '0'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Professional Tax</span>
                  <span className="font-semibold text-gray-800">
                    ₹{Math.abs(breakdown.professionalTax)?.toLocaleString() || '0'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Income Tax</span>
                  <span className="font-semibold text-gray-800">
                    ₹{Math.abs(breakdown.incomeaTax)?.toLocaleString() || '0'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Other Deductions</span>
                  <span className="font-semibold text-gray-800">
                    ₹{Math.abs(breakdown.otherDeductions)?.toLocaleString() || '0'}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Net Salary */}
          <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-6 border-2 border-green-200">
            <p className="text-gray-600 text-sm font-medium mb-2">Net Salary (Take Home)</p>
            <p className="text-3xl font-bold text-green-600">
              ₹{breakdown.netSalary?.toLocaleString() || '0'}
            </p>
            <p className="text-xs text-gray-600 mt-2">After all deductions</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalaryBreakdown;
