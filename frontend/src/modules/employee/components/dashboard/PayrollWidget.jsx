import React from 'react';
import { Banknote, Download, Receipt } from 'lucide-react';

const PayrollWidget = ({ payroll, onViewPayroll }) => {
  const handleDownload = () => {
    if (onViewPayroll) {
      onViewPayroll();
    } else {
      alert(`Generating payslip for ${payroll.latestPayslip.month}... Payslip PDF downloaded successfully.`);
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between h-full">
      <div>
        <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
          <h3 className="text-base font-bold text-slate-800 font-sans flex items-center gap-2">
            <Banknote className="h-4.5 w-4.5 text-indigo-500" />
            Payroll & Compensation
          </h3>
          <span className="text-xs font-bold text-slate-500 font-sans">
            Pay Run: Monthly
          </span>
        </div>

        {/* Financial stats */}
        <div className="grid grid-cols-2 gap-4 mb-5">
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100/50">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide font-sans">Gross Base</span>
            <p className="text-sm font-black text-slate-700 mt-0.5">{payroll.currentSalary}</p>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100/50">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide font-sans">Last Disbursed</span>
            <p className="text-xs font-bold text-slate-650 mt-1">{payroll.lastSalaryDate}</p>
          </div>
        </div>

        {/* Latest Payslip Summary breakdown */}
        <div className="border border-slate-100 rounded-xl p-3.5 space-y-2 mb-5">
          <div className="flex justify-between items-center text-xs pb-1.5 border-b border-slate-50">
            <span className="font-bold text-slate-400 uppercase tracking-wider text-[9px] flex items-center gap-1.5">
              <Receipt className="h-3.5 w-3.5 text-slate-400" />
              Latest Slip: {payroll.latestPayslip.month}
            </span>
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-100">
              {payroll.latestPayslip.status}
            </span>
          </div>

          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-500">Basic Salary:</span>
            <span className="font-semibold text-slate-700">{payroll.latestPayslip.basicPay}</span>
          </div>
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-500">Allowances & Bonuses:</span>
            <span className="font-semibold text-slate-700">{payroll.latestPayslip.allowances}</span>
          </div>
          <div className="flex justify-between items-center text-xs text-rose-500">
            <span>Deductions (Taxes/PF):</span>
            <span className="font-semibold">{payroll.latestPayslip.deductions}</span>
          </div>
          <div className="flex justify-between items-center text-xs pt-1.5 border-t border-slate-55 mt-1 font-bold">
            <span className="text-slate-800">Net Transferred:</span>
            <span className="text-indigo-650">{payroll.latestPayslip.netPay}</span>
          </div>
        </div>
      </div>

      {/* Download Statement Trigger */}
      <button
        onClick={handleDownload}
        className="w-full py-3 px-4 border border-indigo-600/20 rounded-xl text-xs font-bold text-indigo-600 bg-indigo-50/40 hover:bg-indigo-50 hover:text-indigo-700 hover:border-indigo-600/30 transition-all duration-200 cursor-pointer flex items-center justify-center gap-2"
      >
        <Download className="h-4 w-4" />
        Download June Payslip (PDF)
      </button>
    </div>
  );
};

export default PayrollWidget;
