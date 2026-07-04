/**
 * TaxSummary Component
 * Displays comprehensive tax information
 */

import React from 'react';
import { DollarSign, FileText, PieChart as PieChartIcon } from 'lucide-react';

const TaxSummary = ({ taxData }) => {
  if (!taxData) {
    return null;
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-8 mb-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-8">Tax Summary</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Total Tax Paid */}
        <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-lg p-6">
          <div className="flex items-center space-x-4 mb-4">
            <div className="bg-red-500 text-white rounded-lg p-3">
              <DollarSign className="w-6 h-6" />
            </div>
            <div>
              <p className="text-red-600 text-sm font-semibold">Total Tax Paid</p>
            </div>
          </div>
          <p className="text-3xl font-bold text-red-600">
            ₹{taxData.totalTaxPaid?.toLocaleString() || '0'}
          </p>
          <p className="text-xs text-gray-600 mt-2">FY 2025-26</p>
        </div>

        {/* Monthly Tax Average */}
        <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-6">
          <div className="flex items-center space-x-4 mb-4">
            <div className="bg-orange-500 text-white rounded-lg p-3">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <p className="text-orange-600 text-sm font-semibold">Monthly Tax Avg</p>
            </div>
          </div>
          <p className="text-3xl font-bold text-orange-600">
            ₹{taxData.monthlyTaxAverage?.toLocaleString() || '0'}
          </p>
          <p className="text-xs text-gray-600 mt-2">Per month</p>
        </div>

        {/* Professional Tax */}
        <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-lg p-6">
          <div className="flex items-center space-x-4 mb-4">
            <div className="bg-yellow-500 text-white rounded-lg p-3">
              <PieChartIcon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-yellow-600 text-sm font-semibold">Professional Tax</p>
            </div>
          </div>
          <p className="text-3xl font-bold text-yellow-600">
            ₹{taxData.professionalTax?.toLocaleString() || '0'}
          </p>
          <p className="text-xs text-gray-600 mt-2">Deducted</p>
        </div>

        {/* Income Tax */}
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-6">
          <div className="flex items-center space-x-4 mb-4">
            <div className="bg-purple-500 text-white rounded-lg p-3">
              <DollarSign className="w-6 h-6" />
            </div>
            <div>
              <p className="text-purple-600 text-sm font-semibold">Income Tax</p>
            </div>
          </div>
          <p className="text-3xl font-bold text-purple-600">
            ₹{taxData.incomeTax?.toLocaleString() || '0'}
          </p>
          <p className="text-xs text-gray-600 mt-2">Total deducted</p>
        </div>
      </div>

      {/* Tax Breakdown Details */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Tax Breakdown</h3>
        <div className="space-y-3">
          {taxData.taxBreakdown?.map((item, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg">
              <div>
                <p className="font-medium text-gray-800">{item.name}</p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex-1 w-48 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${item.percentage}%` }}
                  ></div>
                </div>
                <span className="text-gray-600 text-sm w-16 text-right">
                  {item.percentage}%
                </span>
                <span className="font-semibold text-gray-800 w-32 text-right">
                  ₹{item.value?.toLocaleString() || '0'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TaxSummary;
