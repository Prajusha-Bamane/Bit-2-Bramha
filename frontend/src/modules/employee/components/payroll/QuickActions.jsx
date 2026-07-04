import React from 'react';
import { Download, Table, FileText, HelpCircle } from 'lucide-react';

const QuickActions = ({ onDownloadLatest, onViewHistory, onViewTaxSummary, onPayrollHelp }) => {
  const actions = [
    {
      label: 'Download Payslip',
      icon: Download,
      onClick: onDownloadLatest,
      color: 'bg-blue-50 text-blue-700 hover:bg-blue-100 border-blue-200/50',
      iconColor: 'text-blue-600',
    },
    {
      label: 'View Salary History',
      icon: Table,
      onClick: onViewHistory,
      color: 'bg-green-50 text-green-700 hover:bg-green-100 border-green-200/50',
      iconColor: 'text-green-600',
    },
    {
      label: 'Tax Summary',
      icon: FileText,
      onClick: onViewTaxSummary,
      color: 'bg-purple-50 text-purple-700 hover:bg-purple-100 border-purple-200/50',
      iconColor: 'text-purple-600',
    },
    {
      label: 'Payroll Help',
      icon: HelpCircle,
      onClick: onPayrollHelp,
      color: 'bg-amber-50 text-amber-700 hover:bg-amber-100 border-amber-200/50',
      iconColor: 'text-amber-600',
    },
  ];

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-md mb-8">
      <h3 className="text-lg font-bold text-slate-800 mb-4">Quick Operations</h3>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {actions.map((act, index) => {
          const Icon = act.icon;
          return (
            <button
              key={index}
              onClick={act.onClick}
              className={`flex items-center space-x-3 p-4 border rounded-xl transition-all duration-200 text-left font-semibold text-xs cursor-pointer ${act.color}`}
            >
              <div className={`p-2 bg-white rounded-lg shadow-sm ${act.iconColor}`}>
                <Icon className="w-4 h-4" />
              </div>
              <span className="truncate">{act.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default QuickActions;
