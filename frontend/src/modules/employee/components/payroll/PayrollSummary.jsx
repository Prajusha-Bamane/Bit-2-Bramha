/**
 * PayrollSummary Component
 * Displays 8 premium KPI cards
 */

import React from 'react';
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  PieChart,
  Minus,
  Gift,
  Calendar,
  Zap,
} from 'lucide-react';

const PayrollSummary = ({ data }) => {
  const kpis = [
    {
      icon: DollarSign,
      label: 'Net Salary',
      value: data.netSalary,
      trend: '+2.5%',
      description: 'Take-home pay',
      bgColor: 'from-green-50 to-green-100',
      iconBg: 'bg-green-500',
    },
    {
      icon: PieChart,
      label: 'Gross Salary',
      value: data.grossSalary,
      trend: '+2.1%',
      description: 'Before deductions',
      bgColor: 'from-blue-50 to-blue-100',
      iconBg: 'bg-blue-500',
    },
    {
      icon: TrendingUp,
      label: 'Total Allowances',
      value: data.totalAllowances,
      trend: '+1.8%',
      description: 'All benefits',
      bgColor: 'from-purple-50 to-purple-100',
      iconBg: 'bg-purple-500',
    },
    {
      icon: Minus,
      label: 'Total Deductions',
      value: data.totalDeductions,
      trend: '-0.5%',
      description: 'Taxes & contributions',
      bgColor: 'from-orange-50 to-orange-100',
      iconBg: 'bg-orange-500',
    },
    {
      icon: TrendingDown,
      label: 'Tax Deducted',
      value: data.taxDeducted,
      trend: 'Calculated',
      description: 'Current month tax',
      bgColor: 'from-red-50 to-red-100',
      iconBg: 'bg-red-500',
    },
    {
      icon: Gift,
      label: 'Bonus Received',
      value: data.bonusReceived,
      trend: 'This Month',
      description: 'Performance bonus',
      bgColor: 'from-pink-50 to-pink-100',
      iconBg: 'bg-pink-500',
    },
    {
      icon: Calendar,
      label: 'Upcoming Payroll',
      value: data.upcomingPayrollDate,
      trend: '27 days',
      description: 'Next salary date',
      bgColor: 'from-cyan-50 to-cyan-100',
      iconBg: 'bg-cyan-500',
    },
    {
      icon: Zap,
      label: 'YTD Earnings',
      value: data.yearToDateEarnings,
      trend: '+12.3%',
      description: 'Year-to-date total',
      bgColor: 'from-yellow-50 to-yellow-100',
      iconBg: 'bg-yellow-500',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {kpis.map((kpi, index) => {
        const Icon = kpi.icon;
        return (
          <div
            key={index}
            className={`bg-gradient-to-br ${kpi.bgColor} rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-white/50`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`${kpi.iconBg} text-white rounded-lg p-3`}>
                <Icon className="w-5 h-5" />
              </div>
              <div className="text-sm font-semibold text-gray-600">{kpi.trend}</div>
            </div>

            <p className="text-gray-600 text-sm font-medium mb-1">{kpi.label}</p>

            {typeof kpi.value === 'number' ? (
              <p className="text-2xl font-bold text-gray-800 mb-2">
                {kpi.value > 100000 ? `₹${(kpi.value / 100000).toFixed(2)}L` : `₹${kpi.value?.toLocaleString() || '0'}`}
              </p>
            ) : (
              <p className="text-2xl font-bold text-gray-800 mb-2">{kpi.value}</p>
            )}

            <p className="text-xs text-gray-600">{kpi.description}</p>
          </div>
        );
      })}
    </div>
  );
};

export default PayrollSummary;
